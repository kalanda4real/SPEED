import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import SortableTable from '@/components/table/SortableTable';
import styles from '@/styles/articles.module.css';
import { useRouter } from "next/router";

interface ArticlesInterface {
  _id: string;
  author: string;
  title: string;
  source: string;
  year: string;
  doi: string;
  moderation_status?: string;
  moderator_comments?: string;
  analysis_status?: string;
  analysis_notes?: string;
  claim?: string;
  evidence?: string;
  rating?: string;
}

type ApprovedArticlesProps = {
  articles: ArticlesInterface[];
};

const ApprovedArticles: NextPage<ApprovedArticlesProps> = ({ articles }) => {
  const router = useRouter();

  const [updatedArticles, setUpdatedArticles] = useState(articles);
  const [loadingArticleId, setLoadingArticleId] = useState<string | null>(null);

  const headers = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "journal", label: "Journal" },
    { key: "year", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "moderation_status", label: "Moderation Status" },
    { key: "moderator_comments", label: "Moderator Comments" },
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

  
  const approvedArticles = updatedArticles.filter(article => article.moderation_status === "rejected");

  return (
    <div className={styles.container}>
      <h1>Admin View: Rejected Articles List</h1>
      <p>This is a List of all rejected articles</p>

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
