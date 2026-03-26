import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { GeminiService } from './gemini.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('ai')
export class GeminiController {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('analyze')
  @UseGuards(AuthGuard('keycloak-jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async analyze(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    console.log('--- /ai/analyze called ---');

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!file.buffer) {
      throw new BadRequestException('Uploaded file buffer is missing');
    }

    console.log('req.user:', req.user);

    const keycloakId = req.user?.sub;

    if (!keycloakId) {
      throw new BadRequestException('Authenticated user not found in token');
    }

    const user = await this.prisma.user.findUnique({
      where: { keycloakId },
    });

    if (!user) {
      throw new BadRequestException('User not found in database');
    }

    const result = await this.geminiService.analyzeImage(
      file.buffer,
      file.mimetype,
    );

    await this.prisma.analysis.create({
      data: {
        userId: user.id,
        skinType: result.skinType,
        healthScore: result.healthScore,
        skinAge: result.skinAge,
        summary: result.summary,
        concerns: result.concerns,
        morningRoutine: result.morningRoutine,
        eveningRoutine: result.eveningRoutine,
        imageUrl: 'temporary-upload',
      },
    });

    console.log('Analysis saved for user:', user.id);

    return result;
  }

  @Get('my-latest-analysis')
  @UseGuards(AuthGuard('keycloak-jwt'))
  async getMyLatestAnalysis(@Req() req: any) {
    const keycloakId = req.user?.sub;

    if (!keycloakId) {
      throw new BadRequestException('Authenticated user not found in token');
    }

    const user = await this.prisma.user.findUnique({
      where: { keycloakId },
    });

    if (!user) {
      throw new BadRequestException('User not found in database');
    }

    const latestAnalysis = await this.prisma.analysis.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return latestAnalysis;
  }
}