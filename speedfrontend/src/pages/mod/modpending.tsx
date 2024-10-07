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

  // Status options for moderation
  const moderationOptions = ["pending", "approved", "rejected"];

  // Function to handle moderation status change
  const handleStatusChange = async (articleId: string, newStatus: string) => {
    setLoadingArticleId(articleId); // Disable dropdown for the current article

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

      // Update the local article list with the new moderation status
      setUpdatedArticles(prevArticles =>
        prevArticles.map(article =>
          article._id === articleId ? { ...article, moderation_status: newStatus } : article
        )
      );
    } catch (error) {
      console.error('Error updating moderation status:', error);
    } finally {
      setLoadingArticleId(null); // Re-enable dropdown after the status update
    }
  };

  // Filter only approved articles
  const approvedArticles = updatedArticles.filter(article => article.moderation_status === "pending");

  return (
    <div className={styles.container}>
      <h1>Moderator View: Pending Articles List</h1>
      <p>List of articles that need to be moderated</p>

      <SortableTable
        headers={headers}
        data={approvedArticles.map((article) => ({
          ...article,
          moderation_status: (
            <select
              value={article.moderation_status}
              onChange={(e) => handleStatusChange(article._id, e.target.value)}
              className={styles.dropdown}
              disabled={loadingArticleId === article._id} // Disable while loading
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
