import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
import { Media } from '@libs/db/models/media.model';

@Crud({ model: Episode })
@Controller('episodes')
@ApiTags('稿件内容')
export class EpisodesController {
    constructor(
        @InjectModel(Episode) private readonly model: ReturnModelType<typeof Episode>,
        @InjectModel(Media) private readonly mediaModel: ReturnModelType<typeof Media>
    ) {
    }

    @Get('/options')
    async getOptions() {
        // 获取稿件列表，事实上这里不太好
        const media = ((await this.mediaModel.find().sort({ 'updatedAt': -1 })).map(i => {
            return {
                label: i.name,
                value: i._id
            }
        }))


        return {
            title: "内容管理",
            searchMenuSpan: 8,
            column: [
                {
                    label: "ID",
                    prop: "_id",
                    addDisplay: false,
                    editDisplay: false,
                    formHidden: true,
                    row: true,
                    sortable: true,
                },
                {
                    label: "所属稿件",
                    prop: "media",
                    type: 'select',
                    row: true,
                    dicData: media
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
                    label: '视频',
                    prop: "file",
                    row: true,
                    type: 'upload',
                    params: {
                        is: 'video'
                    },
                    slot: true,
                    listType: 'picture-img',
                    span: 24,
                    // tip: '只能上传jpg/png用户头像，且不超过500kb',
                    action: '/upload'
                }
            ],
        }
    }
}
