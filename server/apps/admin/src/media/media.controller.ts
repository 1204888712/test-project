import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { Media } from '@libs/db/models/media.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({model:Media})
@Controller('media')
@ApiTags('媒体')
export class MediaController {
    constructor(
        @InjectModel(Media) private readonly model:ReturnModelType<typeof Media>
    ){}
    // :ReturnModelType<typeof Media> 是为了类型提示

}
