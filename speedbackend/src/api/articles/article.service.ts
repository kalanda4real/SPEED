import { Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './createarticle.dto';

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}

  test(): string {
    return 'article route testing';
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }

  async create(createarticle: CreateArticleDto) {
    return await this.articleModel.create(createarticle);
  }

  async update(id: string, createBookDto: CreateArticleDto) {
    return await this.articleModel.findByIdAndUpdate(id, createBookDto).exec();
  }

  async delete(id: string) {
    const deletedBook = await this.articleModel.findByIdAndDelete(id).exec();
    return deletedBook;
  }
}
