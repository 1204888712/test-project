import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './models/user.model';

const models = TypegooseModule.forFeature([User])

@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        }
      }
    }),
    // TypegooseModule.forRoot(process.env.DB, {
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    // }),
    models],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
