import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/database/schemas/user.schema';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'users', schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository]
})
export class UsersModule {}
