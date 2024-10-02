import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/users/user.module';
import { ArticleModule } from './api/articles/article.module';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UserModule, 
    JwtModule.register({
      secret: 'SPEED', 
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.DB_URI), 
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}