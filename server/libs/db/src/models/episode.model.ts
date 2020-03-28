import { prop, modelOptions, Ref } from "@typegoose/typegoose";
import { Media } from "./media.model";
import { ApiProperty } from "@nestjs/swagger";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Episode {
    @prop()
    name: string

    @prop()
    file: string

    @prop({ rfe: 'Media' })
    media: Ref<Media>
}