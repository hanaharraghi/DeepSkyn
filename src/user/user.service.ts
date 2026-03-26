import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { User } from '@prisma/client';

type SubscriptionTier = 'FREE' | 'SILVER' | 'GOLD' | 'PLATINUM';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async create(
    email: string,
    role: 'USER' | 'ADMIN',
    subscriptionTier: SubscriptionTier = 'FREE',
  ) {
    return this.prisma.user.create({
      data: { email, role, subscriptionTier },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async deleteById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
<<<<<<< HEAD
   
  async update(
    id: string,
    email?: string,
    role?: 'USER' | 'ADMIN',
    subscriptionTier?: SubscriptionTier,
  ) {
    const data: {
      email?: string;
      role?: 'USER' | 'ADMIN';
      subscriptionTier?: SubscriptionTier;
    } = {};
    if (email) data.email = email;
    if (role) data.role = role;
    if (subscriptionTier) data.subscriptionTier = subscriptionTier;
=======

  async update(id: string, email?: string, role?: 'USER' | 'ADMIN') {
    const data: { email?: string; role?: 'USER' | 'ADMIN' } = {};

    if (email) data.email = email;
    if (role) data.role = role;

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

>>>>>>> 575955a (backend v2.2)
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

<<<<<<< HEAD
  /**
   * upgrade the subscription tier for a given user
   */
  async upgradeSubscription(id: string, newTier: SubscriptionTier) {
    return this.prisma.user.update({
      where: { id },
      data: { subscriptionTier: newTier },
    });
  }

  /**
   * return whether a particular tier (or user's tier) grants access to a feature
   */
  hasFeatureAccess(
    tierOrUser: SubscriptionTier | User,
    feature: 'progressTracker' | 'scanner' | 'educationHub' | 'rewards',
  ): boolean {
    const tier: SubscriptionTier =
      typeof tierOrUser === 'string' ? tierOrUser : tierOrUser.subscriptionTier;
    const access: Record<SubscriptionTier, string[]> = {
      FREE: [],
      SILVER: ['progressTracker'],
      GOLD: ['progressTracker', 'scanner', 'educationHub'],
      PLATINUM: ['progressTracker', 'scanner', 'educationHub', 'rewards'],
    };
    return access[tier]?.includes(feature);
  }

  /**
   * returns the current image upload limit for a given tier
   */
  getImageLimit(tier: SubscriptionTier | User): number {
    const t: SubscriptionTier =
      typeof tier === 'string' ? tier : tier.subscriptionTier;
    switch (t) {
      case 'SILVER':
        return 2;
      case 'GOLD':
        return 3;
      case 'PLATINUM':
        return 5;
=======
  async upsertFromKeycloak(dto: {
    keycloakId: string;
    email: string;
    username: string;
  }) {
    return this.prisma.user.upsert({
      where: { keycloakId: dto.keycloakId },
      update: {
        email: dto.email,
        username: dto.username,
      },
      create: {
        keycloakId: dto.keycloakId,
        email: dto.email,
        username: dto.username,
      },
    });
  }

  async getMeByKeycloakId(keycloakId: string) {
    if (!keycloakId) {
      throw new BadRequestException('Missing authenticated user id');
    }

    const user = await this.prisma.user.findUnique({
      where: { keycloakId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateSubscriptionByKeycloakId(keycloakId: string, newTier: string) {
    if (!keycloakId) {
      throw new BadRequestException('Missing authenticated user id');
    }

    const allowedTiers = ['FREE', 'SILVER', 'GOLD', 'PLATINUM'];
    const normalizedTier = String(newTier || '').toUpperCase();

    if (!allowedTiers.includes(normalizedTier)) {
      throw new BadRequestException('Invalid subscription tier');
    }

    const user = await this.prisma.user.findUnique({
      where: { keycloakId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        subscriptionTier: normalizedTier as any,
      },
    });
  }

  getImageLimit(tier: string): number {
    switch ((tier || 'FREE').toUpperCase()) {
      case 'PLATINUM':
        return 10;
      case 'GOLD':
        return 5;
      case 'SILVER':
        return 3;
>>>>>>> 575955a (backend v2.2)
      default:
        return 1;
    }
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 575955a (backend v2.2)
