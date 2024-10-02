import { Date } from 'mongoose';

export class CreateArticleDto {
    author: string;
    title: string;
    journal: string;
    year: string;
    volume?: string;
    number?: string;
    pages?: string;
    doi?: string;
  
    // Moderation fields
    moderation_status?: string; // 'pending', 'approved', 'rejected'
    moderator_comments?: string;
  
    // Submitter fields
    submitter_name: string;
    submitter_email: string;
    submitted_date?: Date;
  
    // Analysis fields
    analysis_status?: string; // "not_started", "in_progress", "completed"
    analysis_notes?: string;
  
    updated_date?: Date;
}
