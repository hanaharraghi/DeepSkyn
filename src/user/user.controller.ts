import { Controller, Get, Post, Body, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users') // all routes will start with /users
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /users → list all users
  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }

  // POST /users → create a new user
  @Post('add')
  async create(
    @Body('email') email: string,
    @Body('role') role: 'USER' | 'ADMIN',
  ) {
    return this.userService.create(email, role);
  }
  @Get(':id') // GET /users/:id → get user by id
  async findById(@Body('id') id: string) {
    return this.userService.findById(id);
  }
  @Delete(':id') // DELETE /users/:id → delete user by id
  async deleteById(@Body('id') id: string) {
    return this.userService.deleteById(id);
  }

  @Patch(':id') // PATCH /users/:id → update user by id
  async update(
    @Body('id') id: string,
    @Body('email') email?: string,
    @Body('role') role?: 'USER' | 'ADMIN',
  ) {
    return this.userService.update(id, email, role);
  }
}