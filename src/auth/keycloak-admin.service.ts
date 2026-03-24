// src/auth/keycloak-admin.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

// Force le chargement de .env
dotenv.config();

@Injectable()
export class KeycloakAdminService implements OnModuleInit {
  private baseUrl: string;
  private realm: string;
  private clientId: string;
  private clientSecret: string;
  
  // Gestion des tokens
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenExpiresAt: Date | null = null;
  private refreshTokenExpiresAt: Date | null = null;

  constructor() {
    // Charger les variables au moment de l'initialisation
    this.baseUrl = process.env.KEYCLOAK_URL || 'http://localhost:8085';
    this.realm = process.env.KEYCLOAK_REALM || 'deepskyn';
    this.clientId = process.env.KEYCLOAK_ADMIN_CLIENT_ID || 'backend-admin';
    this.clientSecret = process.env.KEYCLOAK_ADMIN_CLIENT_SECRET || 'SBK07GI51lyrSCbgfnJWOV7Ob2uay3QE';
  }

  async onModuleInit() {
    console.log('=== KeycloakAdminService Initialized ===');
    console.log('KEYCLOAK_URL:', this.baseUrl);
    console.log('KEYCLOAK_REALM:', this.realm);
    console.log('KEYCLOAK_ADMIN_CLIENT_ID:', this.clientId);
    console.log('KEYCLOAK_ADMIN_CLIENT_SECRET:', this.clientSecret ? '****' : 'NON DÉFINI');
    console.log('========================================');
    
    // Obtenir le premier token au démarrage
    await this.getValidToken();
    
    // Vérifier toutes les minutes si le token a besoin d'être refresh
    setInterval(() => {
      this.checkAndRefreshToken().catch(err => 
        console.error('Erreur lors de la vérification périodique du token:', err)
      );
    }, 60000); // Toutes les 60 secondes
  }

  /**
   * Vérifie si le token est expiré et le refresh si nécessaire
   */
  private async checkAndRefreshToken(): Promise<void> {
    if (!this.accessToken || !this.tokenExpiresAt) {
      await this.getValidToken();
      return;
    }

    // Si le token expire dans moins de 2 minutes, on le refresh
    const twoMinutesFromNow = new Date(Date.now() + 2 * 60 * 1000);
    if (this.tokenExpiresAt < twoMinutesFromNow) {
      console.log('🟡 Token va expirer bientôt, refresh automatique...');
      await this.getValidToken();
    }
  }

  /**
   * Obtient un token valide (refresh si nécessaire, sinon nouveau)
   */
  private async getValidToken(): Promise<string> {
    // Si on a un token valide (expire dans plus de 30 secondes), on le retourne
    if (this.accessToken && this.tokenExpiresAt && 
        this.tokenExpiresAt.getTime() > Date.now() + 30000) {
      console.log('🟢 Token encore valide jusqu\'à', this.tokenExpiresAt);
      return this.accessToken;
    }

    // Si on a un refresh token valide, on l'utilise
    if (this.refreshToken && this.refreshTokenExpiresAt && 
        this.refreshTokenExpiresAt.getTime() > Date.now()) {
      console.log('🟡 Rafraîchissement du token avec refresh_token...');
      return this.refreshAccessToken();
    }

    // Sinon, on obtient un nouveau token
    console.log('🔴 Obtention d\'un nouveau token...');
    return this.getNewToken();
  }

  /**
   * Obtient un nouveau token via client_credentials
   */
  private async getNewToken(): Promise<string> {
    const tokenUrl = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    try {
      const { data } = await axios.post(tokenUrl, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      this.accessToken = data.access_token;
      this.refreshToken = data.refresh_token || null;
      
      // Calculer les dates d'expiration
      const now = Date.now();
      this.tokenExpiresAt = new Date(now + (data.expires_in * 1000));
      
      // Keycloak ne retourne pas toujours refresh_expires_in pour client_credentials
      // On met une valeur par défaut de 24h si non fourni
      const refreshExpiresIn = data.refresh_expires_in || 86400; // 24h par défaut
      this.refreshTokenExpiresAt = new Date(now + (refreshExpiresIn * 1000));

      console.log('✅ Nouveau token obtenu, expire à:', this.tokenExpiresAt);
      if (this.refreshToken) {
        console.log('✅ Refresh token obtenu, expire à:', this.refreshTokenExpiresAt);
      }
      
      return this.accessToken!;
    } catch (error) {
      console.error('❌ Erreur obtention token:', error.response?.data || error.message);
      throw new Error(
        `Échec de l'authentification Keycloak: ${error.response?.data?.error_description || error.message}`
      );
    }
  }

  /**
   * Rafraîchit le token via refresh_token
   */
  private async refreshAccessToken(): Promise<string> {
    const tokenUrl = `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`;
    
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);
    body.set('refresh_token', this.refreshToken!);

    try {
      const { data } = await axios.post(tokenUrl, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      this.accessToken = data.access_token;
      if (data.refresh_token) {
        this.refreshToken = data.refresh_token; // Nouveau refresh token
      }
      
      const now = Date.now();
      this.tokenExpiresAt = new Date(now + (data.expires_in * 1000));
      
      console.log('🟢 Token rafraîchi, expire à:', this.tokenExpiresAt);
      return this.accessToken!;
    } catch (error) {
      console.error('❌ Erreur refresh token:', error.response?.data || error.message);
      // Si le refresh échoue (token invalide), on obtient un nouveau token
      console.log('⚠️ Refresh token invalide, obtention d\'un nouveau token...');
      this.refreshToken = null; // Invalider le refresh token
      return this.getNewToken();
    }
  }

  /**
   * Exécute une requête avec gestion automatique des tokens expirés
   */
  private async executeRequest<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    retryCount = 0
  ): Promise<T | { location?: string }> {
    try {
      const token = await this.getValidToken();
      
      const config: any = {
        method,
        url,
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      };

      if (data && (method === 'post' || method === 'put')) {
        config.data = data;
        config.headers['Content-Type'] = 'application/json';
      }

      const response = await axios(config);
      
      // Pour les créations, on retourne aussi les headers pour récupérer l'ID
      if (method === 'post' && response.headers.location) {
        return {
          ...response.data,
          location: response.headers.location,
        } as T & { location?: string };
      }
      
      return response.data;
    } catch (error) {
      // Si erreur 401 (Unauthorized) et qu'on n'a pas déjà retenté
      if (error.response?.status === 401 && retryCount < 1) {
        console.log('⚠️ Token invalide ou expiré, tentative de refresh et nouvelle requête...');
        // Forcer l'obtention d'un nouveau token
        this.accessToken = null;
        this.refreshToken = null;
        // Réessayer la requête
        return this.executeRequest(method, url, data, retryCount + 1);
      }
      
      console.error(`❌ Erreur lors de la requête ${method.toUpperCase()} ${url}:`, 
        error.response?.data || error.message);
      throw error;
    }
  }

  // ================ MÉTHODES PUBLIQUES ================

  async listUsers(search?: string) {
    const url = `${this.baseUrl}/admin/realms/${this.realm}/users`;
    const finalUrl = search ? `${url}?search=${encodeURIComponent(search)}` : url;
    
    console.log('📋 Listing users from:', finalUrl);
    return this.executeRequest<any[]>('get', finalUrl);
  }

  async createUser(userData: {
    username: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    enabled?: boolean;
  }) {
    console.log('🟡 Tentative de création utilisateur:', { 
      username: userData.username,
      email: userData.email,
      hasPassword: !!userData.password 
    });

    const url = `${this.baseUrl}/admin/realms/${this.realm}/users`;

    // Validation des données
    if (!userData.username) {
      throw new Error('Le nom d\'utilisateur est requis');
    }

    const user: any = {
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      enabled: userData.enabled ?? true,
    };

    // Ajouter le mot de passe si fourni
    if (userData.password) {
      user.credentials = [{
        type: 'password',
        value: userData.password,
        temporary: false,
      }];
    }

    try {
      const response = await this.executeRequest<any>('post', url, user);
      
      // Récupérer l'ID depuis l'en-tête Location
      let userId = null;
      
      if (response && response.location) {
        userId = response.location.split('/').pop();
      }
      
      console.log('✅ Utilisateur créé avec succès, ID:', userId);
      
      return { 
        success: true, 
        message: 'Utilisateur créé avec succès',
        id: userId 
      };
    } catch (error: any) {
      console.error('❌ Erreur création utilisateur:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      // Améliorer le message d'erreur
      let errorMessage = 'Erreur inconnue';
      if (error.response?.data?.errorMessage) {
        errorMessage = error.response.data.errorMessage;
      } else if (error.response?.data?.error_description) {
        errorMessage = error.response.data.error_description;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(`Échec de la création utilisateur: ${errorMessage}`);
    }
  }

  async setEnabled(userId: string, enabled: boolean) {
    console.log(`🟡 ${enabled ? 'Déblocage' : 'Blocage'} utilisateur:`, userId);
    
    const url = `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}`;
    
    try {
      await this.executeRequest('put', url, { enabled });
      console.log(`✅ Utilisateur ${enabled ? 'débloqué' : 'bloqué'}`);
      return { success: true, message: `Utilisateur ${enabled ? 'débloqué' : 'bloqué'}` };
    } catch (error: any) {
      console.error('❌ Erreur changement statut:', error.message);
      throw new Error(`Échec du changement de statut: ${error.message}`);
    }
  }

  async setPassword(userId: string, password: string) {
    console.log('🟡 Changement mot de passe pour:', userId);
    
    const url = `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}/reset-password`;

    const credentials = {
      type: 'password',
      value: password,
      temporary: false,
    };

    try {
      await this.executeRequest('put', url, credentials);
      console.log('✅ Mot de passe mis à jour');
      return { success: true, message: 'Mot de passe mis à jour' };
    } catch (error: any) {
      console.error('❌ Erreur changement mot de passe:', error.message);
      throw new Error(`Échec du changement de mot de passe: ${error.message}`);
    }
  }

  async deleteUser(userId: string) {
    console.log('🟡 Suppression utilisateur:', userId);
    
    const url = `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}`;
    
    try {
      await this.executeRequest('delete', url);
      console.log('✅ Utilisateur supprimé');
      return { success: true, message: 'Utilisateur supprimé' };
    } catch (error: any) {
      console.error('❌ Erreur suppression:', error.message);
      throw new Error(`Échec de la suppression: ${error.message}`);
    }
  }

  // Méthode utilitaire pour obtenir le token actuel (pour debug)
  async getCurrentTokenInfo() {
    return {
      hasAccessToken: !!this.accessToken,
      hasRefreshToken: !!this.refreshToken,
      accessTokenExpiresAt: this.tokenExpiresAt,
      refreshTokenExpiresAt: this.refreshTokenExpiresAt,
      isValid: this.tokenExpiresAt ? this.tokenExpiresAt.getTime() > Date.now() : false,
    };
  }

  // Dans src/auth/keycloak-admin.service.ts
// Ajoutez cette méthode

async updateUser(
  userId: string,
  userData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    attributes?: Record<string, any>;
  }
) {
  console.log('🟡 Mise à jour utilisateur:', { userId, ...userData });

  try {
    const token = await this.getValidToken();
    const url = `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}`;

    // Construire l'objet de mise à jour (seulement les champs fournis)
    const updateData: any = {};
    
    if (userData.firstName !== undefined) {
      updateData.firstName = userData.firstName;
    }
    if (userData.lastName !== undefined) {
      updateData.lastName = userData.lastName;
    }
    if (userData.email !== undefined) {
      updateData.email = userData.email;
    }
    if (userData.attributes !== undefined) {
      updateData.attributes = userData.attributes;
    }

    // Ne pas envoyer de requête si aucun champ à mettre à jour
    if (Object.keys(updateData).length === 0) {
      throw new Error('Aucune donnée à mettre à jour');
    }

    console.log('📦 Données de mise à jour:', updateData);

    await axios.put(url, updateData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('✅ Utilisateur mis à jour avec succès');
    return { 
      success: true, 
      message: 'Utilisateur mis à jour avec succès' 
    };
  } catch (error: any) {
    console.error('❌ Erreur mise à jour:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    throw new Error(
      `Échec de la mise à jour: ${error.response?.data?.errorMessage || error.message}`
    );
  }
}
}