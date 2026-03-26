// app.module.ts - Version corrigée
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from "./auth/auth.module";
import { AdminModule } from './admin/admin.module';
<<<<<<< HEAD
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    // ConfigModule DOIT être en premier
    ConfigModule.forRoot({
      isGlobal: true, // Rendre global pour éviter d'importer partout
      envFilePath: '.env', // Spécifier le chemin du fichier .env
=======
import { GeminiService } from './core/ai/gemini.service';
import { GeminiController } from './core/ai/gemini.controller';
import { ProductsModule } from './core/products/products.module';
import { ProductsController } from './core/products/products.controller';
import { ProductsService } from './core/products/products.service';
import { RemindersModule } from './core/reminders/reminders.module';
import { RemindersController } from './core/reminders/reminders.controller';
import { RemindersService } from './core/reminders/reminders.service';

@Module({
  exports: [GeminiService], // Exporter pour pouvoir l'injecter dans d'autres modules si besoin
  imports: [
    // ConfigModule DOIT être en premier
    ConfigModule.forRoot({
      isGlobal: true, // This makes ConfigService available everywhere
      envFilePath: '.env',
>>>>>>> 575955a (backend v2.2)
    }),
    PrismaModule, 
    UserModule, 
    AuthModule,
    AdminModule,
<<<<<<< HEAD
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
=======
    RemindersModule,
    ProductsModule

  ],
  controllers: [AppController,GeminiController,ProductsController,RemindersController],
  providers: [AppService,GeminiService,ProductsService,RemindersService],
>>>>>>> 575955a (backend v2.2)
})
export class AppModule {}
