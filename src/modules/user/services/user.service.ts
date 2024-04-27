import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { plainToClass } from 'class-transformer';
import {
  ICreateUser,
  IUpdatePassword,
  IUser,
  IUserResponse,
} from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findAll(): Promise<IUserResponse[]> {
    try {
      const userList = await this.userRepo.getAll();
      return plainToClass(UserEntity, userList);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async checkUserExists(userId: string): Promise<IUser> {
    try {
      const user = await this.userRepo.findOne({ id: userId });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async getUserByUserId(userId: string): Promise<IUserResponse> {
    const user = await this.checkUserExists(userId);
    return plainToClass(UserEntity, user);
  }

  async createUser(body: ICreateUser): Promise<IUserResponse> {
    const { login } = body;
    const userInfo = await this.userRepo.findOne({ login: login });
    if (userInfo) {
      throw new BadRequestException('Login already registered');
    }

    try {
      const user = await this.userRepo.create(body);
      return plainToClass(UserEntity, user);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async updateUser(userId: string, body: IUpdatePassword): Promise<string> {
    const { oldPassword, newPassword } = body;

    const userInfo = await this.checkUserExists(userId);
    if (userInfo.password !== oldPassword) {
      throw new BadRequestException('Wrong password');
    }

    try {
      await this.userRepo.update(
        { id: userInfo.id },
        { ...userInfo, password: newPassword },
      );
      return 'update successfully';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }

  async destroyUser(userId: string): Promise<string> {
    await this.checkUserExists(userId);
    try {
      await this.userRepo.delete({ id: userId });
      return 'delete successfully';
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}
