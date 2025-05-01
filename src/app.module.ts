import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RoomModule } from './room/room.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongoConfig';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: getMongoConfig,
      },
      //'mongodb://localhost:27018/db'
    ),
    RoomModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
