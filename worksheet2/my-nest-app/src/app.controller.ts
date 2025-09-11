import { ARTICLES } from './dummydata/articles';
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

// 假设文章数据结构如下，根据实际数据结构调整
interface Article {
  _id: string | number;
  title: string;
  content: string;
  // 其他字段...
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/api/articles')
  getArticles(): Article[] {
    return ARTICLES as Article[];
  }

  @Get('/api/articles/:id')
  getArticleById(@Param('id') id: string): Article | undefined {
    return (ARTICLES as Article[]).find((n: Article) => n._id === id);
  }
}
