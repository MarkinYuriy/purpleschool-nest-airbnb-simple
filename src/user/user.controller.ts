import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getByEmail/:id')
  async getUserByEmail(@Param() params: any): Promise<User> {
    const userDocument = await this.userService.getByEmail(params.id);
    const user: User = new User();
    user.email = userDocument.email;
    user.password = userDocument.password;
    user.images = userDocument.images;
    return user;
  }

  @Post('create')
  async createUser(
    @Body() { email, password }: { email: string; password: string },
  ) {
    const user = await this.userService.create({ email, password });
    return user;
  }
}
