// app.module.ts - Version corrigée
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from './admin/admin.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    // ConfigModule DOIT être en premier
    ConfigModule.forRoot({
      isGlobal: true, // Rendre global pour éviter d'importer partout
      envFilePath: '.env', // Spécifier le chemin du fichier .env
    }),
    PrismaModule, 
    UserModule, 
    AuthModule,
    AdminModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
