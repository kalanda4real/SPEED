import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateArticleDto } from './../src/api/articles/createarticle.dto';
import { ArticleController } from './../src/api/articles/article.controller';
import { ArticleService } from './../src/api/articles/article.service';
import { HttpException, HttpStatus } from '@nestjs/common';
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

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            delete: jest.fn(), // Mock the delete method
          },
        },
      ],
    }).compile();

    articleController = moduleFixture.get<ArticleController>(ArticleController);
    articleService = moduleFixture.get<ArticleService>(ArticleService);
  });

  describe('deleteArticle', () => {
    it('should delete an article successfully', async () => {
      const articleId = '123'; // Example article ID

      // Mock the delete method to resolve successfully
      (articleService.delete as jest.Mock).mockResolvedValue({
        message: 'Article deleted successfully',
      });

      const result = await articleController.deleteArticle(articleId);
      expect(result).toEqual({ message: 'Article deleted successfully' });
      expect(articleService.delete).toHaveBeenCalledWith(articleId);
    });

    it('should throw 404 error if the article is not found', async () => {
      const articleId = 'invalid-id';

      // Mock the delete method to throw a 404 error
      (articleService.delete as jest.Mock).mockRejectedValue(
        new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No such article',
          },
          HttpStatus.NOT_FOUND,
        ),
      );

      try {
        await articleController.deleteArticle(articleId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(articleService.delete).toHaveBeenCalledWith(articleId);
      }
    });
  });
});

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            findAll: jest.fn(), // Mock the findAll method
          },
        },
      ],
    }).compile();

    articleController = moduleFixture.get<ArticleController>(ArticleController);
    articleService = moduleFixture.get<ArticleService>(ArticleService);
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const articles = [
        {
          id: '1',
          author: 'John Doe',
          title: 'Software Engineering Best Practices',
          source: 'www.testing.com',
          year: '2024',
          doi: '10.1000/test1',
        },
        {
          id: '2',
          author: 'Jane Smith',
          title: 'Agile Methodologies',
          source: 'www.agile.com',
          year: '2023',
          doi: '10.1000/test2',
        },
      ];

      // Mock the findAll method to return the articles array
      (articleService.findAll as jest.Mock).mockResolvedValue(articles);

      const result = await articleController.findAll();
      expect(result).toEqual(articles);
      expect(articleService.findAll).toHaveBeenCalled();
    });

    it('should throw 404 error if no articles are found', async () => {
      // Mock the findAll method to throw a 404 error
      (articleService.findAll as jest.Mock).mockRejectedValue(
        new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'No Articles found',
          },
          HttpStatus.NOT_FOUND,
        ),
      );

      try {
        await articleController.findAll();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(articleService.findAll).toHaveBeenCalled();
      }
    });
  });
});
