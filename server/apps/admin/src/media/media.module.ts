import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Media } from '@libs/db/models/media.model';

@Module({
  imports:[TypegooseModule.forFeature([Media])],
  controllers: [MediaController]
})
export class MediaModule {}
