import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './images/images.module';
import { ImagesService } from './images/images.service';

@Module({
  imports: [ImagesModule],
  controllers: [AppController],
  providers: [AppService, ImagesService],
})
export class AppModule {}
