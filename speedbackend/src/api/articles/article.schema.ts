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

  // Moderation fields
  @Prop({ default: 'pending' }) // ADD ARRAY? can be 'pending', 'approved', 'rejected'
  moderation_status: string;

  @Prop()
  moderator_comments: string;

  // Submitter fields
  @Prop({ required: true })
  submitter_name: string;

  @Prop({ required: true })
  submitter_email: string;

  @Prop({ type: Date, default: Date.now })
  submitted_date: Date;

  // Analysis fields
  @Prop()
  analysis_status: string; // ADD ARRAY? "not_started", "in_progress", "completed"

  @Prop()
  analysis_notes: string;


  @Prop({ type: Date, default: Date.now })
  updated_date: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
