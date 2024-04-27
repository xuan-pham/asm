import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { ValidateUuid } from 'src/share/decorators/validate-uuid.decorator';
import { CreateUserDto, UpdatePasswordDto } from '../dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  @ApiParam({ name: 'userId', type: 'string' })
  async getUserByUserId(@ValidateUuid('userId') userId: string) {
    return this.userService.getUserByUserId(userId);
  }

  @Post('register')
  async create(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Put('/update/:userId')
  @ApiParam({ name: 'userId', type: 'string' })
  async update(
    @ValidateUuid('userId') userId: string,
    @Body() body: UpdatePasswordDto,
  ) {
    return this.userService.updateUser(userId, body);
  }

  @Delete('delete/:userId')
  @ApiParam({ name: 'userId', type: 'string' })
  async remove(@ValidateUuid('userId') userId: string) {
    return this.userService.destroyUser(userId);
  }
}
