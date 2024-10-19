import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/homepage.module.css";

interface ArticleInterface {
  author: string;
  title: string;
  source: string;
  year: string;
  doi: string;
  moderation_status?: string;
  moderator_comments?: string;
  analysis_status?: string;
  claim?: string;
  evidence?: string;
  rating?: number;
}

const ArticleSummaryPage: React.FC = () => {
  const [article, setArticle] = useState<ArticleInterface | null>(null);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query; // Assuming the article ID is passed via the URL query

  useEffect(() => {
    // Fetch the article data when the component mounts
    const fetchArticle = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `http://localhost:8082/api/articles/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = () => {
    // Submit review logic here (e.g., sending the review to an API)
    // After submission, redirect to the past reviewed articles page
    router.push("/past-reviewed-articles");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!article) {
    return <p>Article not found.</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Article Summary</h1>
      <p>Title: {article.title}</p>
      <p>Author: {article.author}</p>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here"
        className={styles.textarea}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Submit
      </button>
      <button
        onClick={() => router.push("/new-articles")}
        className={styles.button}
      >
        New Submissions
      </button>
    </div>
  );
};

export default ArticleSummaryPage;
