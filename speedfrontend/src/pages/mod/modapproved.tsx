import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import SortableTable from '@/components/table/SortableTable';
import styles from '@/styles/articles.module.css';
import { useRouter } from "next/router";

interface ArticlesInterface {
  _id: string;
  author: string;
  title: string;
  journal: string;
  year: string;
  volume?: string;
  number?: string;
  pages: string;
  doi?: string;
  moderation_status?: string;
  moderator_comments?: string;
  submitter_name: string;
  submitter_email: string;
  submitted_date?: string;
  analysis_status?: string;
  analysis_notes?: string;
}

type ApprovedArticlesProps = {
  articles: ArticlesInterface[];
};

const ApprovedArticles: NextPage<ApprovedArticlesProps> = ({ articles }) => {
  const router = useRouter();

  const [updatedArticles, setUpdatedArticles] = useState(articles);
  const [loadingArticleId, setLoadingArticleId] = useState<string | null>(null);
  const [editedComments, setEditedComments] = useState<{ [key: string]: string }>({}); 

  const headers = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "journal", label: "Journal" },
    { key: "year", label: "Publication Year" },
    { key: "volume", label: "Volume" },
    { key: "number", label: "Number" },
    { key: "pages", label: "Pages" },
    { key: "doi", label: "DOI" },
    { key: "moderation_status", label: "Moderation Status" },
    { key: "moderator_comments", label: "Moderator Comments" },
    { key: "submitted_date", label: "Submitted Date" },
  ];

 
  const moderationOptions = ["pending", "approved", "rejected"];

 
  const handleStatusChange = async (articleId: string, newStatus: string) => {
    setLoadingArticleId(articleId);

    try {
      const response = await fetch(`http://localhost:8082/api/articles/test/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moderation_status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update moderation status');
      }

      
      setUpdatedArticles(prevArticles =>
        prevArticles.map(article =>
          article._id === articleId ? { ...article, moderation_status: newStatus } : article
        )
      );
    } catch (error) {
      console.error('Error updating moderation status:', error);
    } finally {
      setLoadingArticleId(null); 
    }
  };

  
  const handleCommentChange = (articleId: string, comment: string) => {
    setEditedComments({ ...editedComments, [articleId]: comment });
  };

  
  const saveComment = async (articleId: string) => {
    const newComment = editedComments[articleId];
    setLoadingArticleId(articleId); 

    try {
      const response = await fetch(`http://localhost:8082/api/articles/test/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moderator_comments: newComment }),
      });

      if (!response.ok) {
        throw new Error('Failed to update moderator comment');
      }

      
      setUpdatedArticles(prevArticles =>
        prevArticles.map(article =>
          article._id === articleId ? { ...article, moderator_comments: newComment } : article
        )
      );
    } catch (error) {
      console.error('Error updating moderator comment:', error);
    } finally {
      setLoadingArticleId(null); 
    }
  };

 
  const approvedArticles = updatedArticles.filter(article => article.moderation_status === "approved");

  return (
    <div className={styles.container}>
      <h1>Moderator View: Approved Articles List</h1>
      <p>List of approved articles with their moderation statuses</p>

      <SortableTable
        headers={headers}
        data={approvedArticles.map((article) => ({
          ...article,
          moderation_status: (
            <select
              value={article.moderation_status}
              onChange={(e) => handleStatusChange(article._id, e.target.value)}
              className={styles.dropdown}
              disabled={loadingArticleId === article._id} 
            >
              {moderationOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          ),
          moderator_comments: (
            <>
              <textarea
                value={editedComments[article._id] || article.moderator_comments || ""}
                onChange={(e) => handleCommentChange(article._id, e.target.value)}
                className={styles.textarea}
                disabled={loadingArticleId === article._id}
              />
              <button
                onClick={() => saveComment(article._id)}
                className={styles.button}
                disabled={loadingArticleId === article._id} 
              >
                Save Comment
              </button>
            </>
          ),
        }))}
      />

      <button
        className={styles.button}
        onClick={() => router.push('/mod/')}
      >
        Back to Mod home
      </button>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ApprovedArticlesProps> = async () => {
  try {
    const response = await fetch('http://localhost:8082/api/articles');

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const articles = await response.json();

    return {
      props: {
        articles,
      },
      revalidate: 60,  
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      props: {
        articles: [],
      },
    };
  }
};

export default ApprovedArticles;
