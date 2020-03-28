import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MediaModule } from './media/media.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import multer = require('multer');
import { CommonModule } from 'libs/common/src';
@Module({
  imports: [
    CommonModule,
    UsersModule,
    MediaModule,
    EpisodesModule,
    MulterModule.registerAsync({
      useFactory() {
        return {
          storage: multer.diskStorage({
            destination: (req, file, cb) => {
              cb(null, 'uploads');
            },
            filename: (req, file, cb) => {
              cb(null, file.originalname);
            },
          })
        }
      }
    }),
    
    // MulterModule.register({
    //   // dest: "uploads",
    //   // 用以配置文件名
    //   storage: multer.diskStorage({
    //     destination: (req, file, cb) => {
    //       cb(null, 'uploads');
    //     },
    //     filename: (req, file, cb) => {
    //       cb(null, file.originalname);
    //     },
    //   }),
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
