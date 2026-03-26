import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Req,
  Param,
  UseGuards,
<<<<<<< HEAD
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  NotFoundException, // Added this
} from '@nestjs/common';
import { SubscriptionTier } from '@prisma/client';
=======
} from '@nestjs/common';
>>>>>>> 575955a (backend v2.2)
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
<<<<<<< HEAD
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../core/cloudinary/cloudinary.service';
import { PrismaService } from '../core/prisma/prisma.service'; // Ensure this path is correct
import { GeminiService } from 'src/core/ai/gemini.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
=======

@Controller('users')
@UseGuards(JwtAuthGuard)
>>>>>>> 575955a (backend v2.2)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly prisma: PrismaService, // ✅ FIX: Added Prisma injection
     private readonly geminiService: GeminiService,
  ) {}

  @Get('test')
  test(@Req() req: any) {
    return req.user;
  }

<<<<<<< HEAD
=======
  @Post('sync-me')
  async syncMe(@Req() req: any) {
    const { sub, email, preferred_username } = req.user;

    return this.userService.upsertFromKeycloak({
      keycloakId: sub,
      email,
      username: preferred_username ?? email,
    });
  }

  @Get('test')
  test(@Req() req: any) {
    return req.user;
  }

  @Get('me')
  async getMe(@Req() req: any) {
    return this.userService.getMeByKeycloakId(req.user?.sub);
  }

  @Patch('subscription')
  async updateMySubscription(@Req() req: any, @Body('tier') tier: string) {
    const keycloakId = req.user?.sub;
    return this.userService.updateSubscriptionByKeycloakId(keycloakId, tier);
  }

  @UseGuards(RolesGuard)
>>>>>>> 575955a (backend v2.2)
  @Get('all')
  @Roles('admin')
  async findAll() {
    return this.userService.findAll();
  }

<<<<<<< HEAD
=======
  @UseGuards(RolesGuard)
>>>>>>> 575955a (backend v2.2)
  @Post('add')
  @Roles('admin')
  async create(
    @Body('email') email: string,
    @Body('role') role: 'USER' | 'ADMIN' = 'USER',
  ) {
    return this.userService.create(email, role);
  }

<<<<<<< HEAD
=======
  @UseGuards(RolesGuard)
>>>>>>> 575955a (backend v2.2)
  @Get(':id')
  @Roles('admin')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

<<<<<<< HEAD
=======
  @UseGuards(RolesGuard)
>>>>>>> 575955a (backend v2.2)
  @Delete(':id')
  @Roles('admin')
  async deleteById(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }

<<<<<<< HEAD
=======
  @UseGuards(RolesGuard)
>>>>>>> 575955a (backend v2.2)
  @Patch(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body('email') email?: string,
    @Body('role') role?: 'USER' | 'ADMIN',
    @Body('subscriptionTier') subscriptionTier?: SubscriptionTier,
  ) {
    return this.userService.update(id, email, role, subscriptionTier);
  }

  @Patch(':id/subscription')
  @Roles('admin', 'USER')
  async upgradeSubscription(
    @Param('id') id: string,
    @Body('newTier') newTier: SubscriptionTier,
  ) {
    return this.userService.upgradeSubscription(id, newTier);
  }

  @Post('upload-analysis')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any,
  ) {
    const userId = req.user.sub;

    // 1. Get user and handle potential null
    const user = await this.userService.findById(userId);

    // ✅ FIX: TypeScript "User is possibly null" guard
    if (!user) {
      throw new NotFoundException('User not found in the database.');
    }

    // 2. Enforce tier limits
    const limit = this.userService.getImageLimit(user.subscriptionTier);

    if (files.length > limit) {
      throw new BadRequestException(
        `Your ${user.subscriptionTier} plan only allows up to ${limit} photos.`,
      );
    }

    // 3. Upload to Cloudinary
    const uploadResults = await Promise.all(
      files.map((file) => this.cloudinaryService.uploadFile(file)),
    );

    // 4. Save to Prisma
    // ✅ FIX: 'this.prisma' now exists because of constructor injection
    const savedPhotos = await Promise.all(
      uploadResults.map((res) =>
        this.prisma.photo.create({
          data: {
            url: res.secure_url,
            publicId: res.public_id,
            userId: userId,
          },
        }),
      ),
    );

    return { 
      message: 'Analysis started successfully', 
      count: savedPhotos.length,
      photos: savedPhotos 
    };
  }

  @Post('upload-analysis')
@UseInterceptors(FilesInterceptor('files', 5))
async uploadAndAnalyze(@UploadedFiles() files: Express.Multer.File[], @Req() req: any) {
  const userId = req.user.sub;

  // 1. Upload the primary photo to Cloudinary
  const cloudinaryRes = await this.cloudinaryService.uploadFile(files[0]);

  // 2. Ask Gemini to analyze the same photo
  const aiResult = await this.geminiService.analyzeImage(files[0].buffer, files[0].mimetype);

  // 3. Save the analysis to the database
  const savedAnalysis = await this.prisma.analysis.create({
    data: {
      userId: userId,
      skinType: aiResult.skinType,
      healthScore: aiResult.healthScore,
      skinAge: aiResult.skinAge,
      summary: aiResult.summary,
      concerns: aiResult.concerns,
      morningRoutine: aiResult.morningRoutine,
      eveningRoutine: aiResult.eveningRoutine,
      imageUrl: cloudinaryRes.secure_url,
    }
  });

  // 4. Reward user points (Gamification)
  await this.prisma.user.update({
    where: { id: userId },
    data: { points: { increment: 50 } }
  });

  return { 
    message: "Analysis complete", 
    analysisId: savedAnalysis.id,
    result: aiResult 
  };
}
}