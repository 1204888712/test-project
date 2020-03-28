import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud'
import { Media } from '@libs/db/models/media.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({ model: Media })
@Controller('media')
@ApiTags('媒体')
export class MediaController {
    constructor(
        @InjectModel(Media) private readonly model: ReturnModelType<typeof Media>
    ) { }
    // :ReturnModelType<typeof Media> 是为了类型提示

    @Get('/options')
    async getOptions() {
        return {
            title: "稿件管理",
            searchMenuSpan: 8,
            column: [
                {
                    label: "ID",
                    prop: "_id",
                    addDisplay: false,
                    editDisplay: false,
                    row: true,
                    formHidden: true,
                    sortable: true,
                    // search: true, // 无法搜索
                    // regex:true
                },
                {
                    label: "名字",
                    prop: "name",
                    row: true,
                    sortable: true,
                    search: true,
                    regex: true
                },
                {
                    label: "封面",
                    type: 'upload',
                    listType: 'picture-img',
                    action: '/upload',
                    prop: "post",
                    row: true,
                    width:200
                }
            ]
        }
    }
}
