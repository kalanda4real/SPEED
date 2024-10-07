import { Date } from 'mongoose';

export class CreateArticleDto {
    author: string;
    title: string;
    source: string;
    year: string;
    doi: string;

    // Moderation fields
    moderation_status?: 'pending' | 'approved' | 'rejected';
    moderator_comments?: string;
  
    // Analysis fields
    analysis_status?: 'pending' | 'approved' | 'rejected'; 
    claim?: string;
    evidence?: string;
    rating?: string;
}
