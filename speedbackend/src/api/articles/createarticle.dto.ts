export class CreateArticleDto {
  author: string;
  title: string;
  source: string;
  year: string;
  doi: string;

  moderation_status?: 'pending' | 'approved' | 'rejected';
  moderator_comments?: string;

  analysis_status?: 'not_started' | 'in_progress' | 'completed';
  claim?: string;
  evidence?: string;
  rating?: string;
}
