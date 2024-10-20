import { useState } from "react";
import { useRouter } from "next/router";
import SortableTable from "@/components/table/SortableTable";
import styles from "@/styles/homepage.module.css";
import { GetStaticProps } from "next";

// Interface for Article
interface ArticleInterface {
  id: string;
  title: string;
  author: string;
  journal?: string;
  year?: string;
  submitter_name: string;
  submitter_email: string;
}

// Props for NewArticlesPage
type NewArticlesPageProps = {
  articles: ArticleInterface[];
};

const NewArticlesPage: React.FC<NewArticlesPageProps> = ({ articles }) => {
  const router = useRouter();
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [analysisComment, setAnalysisComment] = useState("");

  const handleSubmit = () => {
    if (selectedTitle && analysisComment) {
      const articleToReview = articles.find(
        (article) => article.title === selectedTitle
      );

      if (articleToReview) {
        // Get existing reviewed articles from localStorage or create a new array
        const existingReviews = JSON.parse(
          localStorage.getItem("reviewedArticles") || "[]"
        );

        // Add the new review
        const updatedReviews = [
          ...existingReviews,
          { article: articleToReview, comment: analysisComment },
        ];

        // Save updated reviews to localStorage
        localStorage.setItem(
          "reviewedArticles",
          JSON.stringify(updatedReviews)
        );

        // Set timeout to clear reviews after 120 seconds
        setTimeout(() => {
          localStorage.removeItem("reviewedArticles");
        }, 120000); // 120 seconds

        // Reset the state
        setAnalysisComment("");
        setSelectedTitle(null);
        router.push("/analyst/past-reviewed-articles");
      }
    } else {
      alert("Please select a title and enter a comment.");
    }
  };

  const tableData = articles.map((article) => ({
    ...article,
    title: (
      <button
        onClick={() => setSelectedTitle(article.title)}
        style={{
          cursor: "pointer",
          background: "none",
          border: "none",
          color: "blue",
          textDecoration: "underline",
        }}
        key={article.id}
      >
        {article.title}
      </button>
    ),
  }));

  return (
    <div className={styles.container}>
      <h1>Articles</h1>
      <SortableTable
        headers={[
          { key: "title", label: "Title" },
          { key: "author", label: "Author" },
          { key: "journal", label: "Journal" },
          { key: "year", label: "Year" },
        ]}
        data={tableData}
      />
      <button
        onClick={() => router.push("/analyst/Home")}
        className={styles.button}
      >
        Back
      </button>

      {selectedTitle && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{selectedTitle}</h2>
            <textarea
              className={styles.textarea}
              style={{ width: "100%", height: "300px", resize: "none" }}
              value={analysisComment}
              onChange={(e) => setAnalysisComment(e.target.value)}
              placeholder="Enter your analysis comments here..."
            />
            <button onClick={handleSubmit} className={styles.button}>
              Submit
            </button>
            <button
              onClick={() => setSelectedTitle(null)}
              className={styles.button}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Fetch new articles data from the backend
export const getStaticProps: GetStaticProps<
  NewArticlesPageProps
> = async () => {
  try {
    const response = await fetch("http://localhost:8082/api/articles"); // database API endpoint

    if (!response.ok) {
      throw new Error("Failed to fetch new articles");
    }

    const articles: ArticleInterface[] = await response.json();

    return {
      props: {
        articles,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching new articles:", error);
    return {
      props: {
        articles: [],
      },
    };
  }
};

export default NewArticlesPage;
