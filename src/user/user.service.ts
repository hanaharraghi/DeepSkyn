// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany(); // ✅ now works
  }

  async create(email: string, role: 'USER' | 'ADMIN') {
    return this.prisma.user.create({
      data: { email, role },
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
   
  async update (id: string, email?: string, role?: 'USER' | 'ADMIN') {
    const data: { email?: string; role?: 'USER' | 'ADMIN' } = {};
    if (email) data.email = email;
    if (role) data.role = role; 
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}