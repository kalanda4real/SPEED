/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateArticleDto } from './../src/api/articles/createarticle.dto';
import { ArticleController } from './../src/api/articles/article.controller';
import { ArticleService } from './../src/api/articles/article.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

describe('ArticleController (e2e)', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            create: jest.fn(), // Mock the create method
          },
        },
      ],
    }).compile();

    articleController = moduleFixture.get<ArticleController>(ArticleController);
    articleService = moduleFixture.get<ArticleService>(ArticleService);
  });

  it('should create an article (POST)', async () => {
    const createArticleDto: CreateArticleDto = {
      author: 'John Doe',
      title: 'Best Practices in Software Engineering',
      source: 'www.testing.com',
      year: '2024',
      doi: '8th October 2024',
    };

    await articleController.addArticle(createArticleDto);
    expect(articleService.create).toHaveBeenCalledWith(createArticleDto);
  });
});
