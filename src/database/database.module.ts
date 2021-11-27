import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // user: configService.get('MONGO_USER'),
        // pass: configService.get('MONGO_PASS'),
        // localAddress: configService.get('MONGO_ADDRESS'),
        // localPort: configService.get('MONGO_PORT'),
        // dbName: configService.get('MONGO_DB'),
        uri: configService.get('MONGO_URI')
      }),
    }),
  ],
})
export class DatabaseModule {}
