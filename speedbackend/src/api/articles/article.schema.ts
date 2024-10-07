import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  journal: string;

  @Prop({ required: true })
  year: string;

  @Prop()
  volume: string;

  @Prop()
  number: string;

  @Prop()
  pages: string;

  @Prop()
  doi: string;

  @Prop({ default: 'pending' }) 
  moderation_status: string;

  @Prop()
  moderator_comments: string;

  @Prop({ required: true })
  submitter_name: string;

  @Prop({ required: true })
  submitter_email: string;

  @Prop({ type: Date, default: Date.now })
  submitted_date: Date;

  @Prop()
  analysis_status: string; 

  @Prop()
  analysis_notes: string;


  @Prop({ type: Date, default: Date.now })
  updated_date: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
