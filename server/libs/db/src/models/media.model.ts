import { prop, arrayProp, Ref, modelOptions } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { Episode } from "./episode.model";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Media {
    @ApiProperty({ description: '媒体标题', example: '标题1' })
    @prop()
    name: string

    @ApiProperty({ description: '媒体封面', example: '封面1' })
    @prop()
    post: string

    // // 关联表
    // // 数组属性
    // // 定义给mongoose
    // @arrayProp({ itemsRef: 'Episode' })
    // // 下面为了提示
    // episodes: Ref<Episode>[]
}   