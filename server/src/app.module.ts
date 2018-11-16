import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'app.controller';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';

/**
 * Application Module
 *
 * Responsible for bootstrapping the application
 */
@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.load(path.resolve(__dirname, 'config/**/*.{ts,js}')),
  ],
})
export class AppModule {}
