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
  source: string;

  @Prop({ required: true })
  year: string;

  @Prop({ required: true })
  doi: string;

  // Moderation fields
  @Prop({ enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  moderation_status: string;

  @Prop()
  moderator_comments: string;

  // Analysis fields
  @Prop({ enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' })
  analysis_status: string;
  
  @Prop()
  claim: string;

  @Prop()
  evidence: string;

  @Prop()
  rating: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
