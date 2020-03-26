import { Controller, Get, Post, Param, Put, Body, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiExtraModels, ApiProperty } from '@nestjs/swagger';

class createPostDTO {
    @ApiProperty({ description: '标题' })
    title: string;
    @ApiProperty({ description: '内容' })
    content: string
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
    @Get()
    @ApiOperation({ summary: '显示列表' })
    index() {
        return []
    }

    @Post()
    @ApiOperation({ summary: '新增' })
    create(@Body() body: createPostDTO) {
        return {
            sucess: 1,
            body
        }
    }


    @Get(':id')
    @ApiOperation({ summary: '获取详情' })
    detail(@Param('id') id: string) {
        return {
            id: id,
            title: 'name'
        }
    }

    @Put(':id')
    @ApiOperation({ summary: '编辑' })
    update(@Param('id') id: string, @Body() body: createPostDTO) {
        return {
            id,
            sucess: 1,
            body
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除' })
    remove(@Param('id') id: string) {
        return {
            id,
            sucess: 1,
        }
    }
}
