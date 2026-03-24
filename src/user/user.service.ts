// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { User } from '@prisma/client';

type SubscriptionTier = 'FREE' | 'SILVER' | 'GOLD' | 'PLATINUM';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany(); // ✅ now works
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
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  async deleteById(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
   
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
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

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
      default:
        return 1;
    }
  }
}
