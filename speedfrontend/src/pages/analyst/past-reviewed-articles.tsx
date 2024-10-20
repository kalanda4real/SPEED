import { useRouter } from "next/router";
import styles from "@/styles/homepage.module.css";
import SortableTable from "@/components/table/SortableTable";
import { useState, useEffect } from "react";

// Interface for reviewed articles
interface ReviewedArticleInterface {
  article: {
    id: string;
    title: string;
    author: string;
    journal?: string;
    year?: string;
  };
  comment: string; // Analysis comment associated with the article
}

// Props for PastReviewedArticlesPage
type PastReviewedArticlesPageProps = {
  reviewedArticles: ReviewedArticleInterface[];
};

const PastReviewedArticlesPage: React.FC<
  PastReviewedArticlesPageProps
> = () => {
  const router = useRouter();
  const [sortedArticles, setSortedArticles] = useState<
    ReviewedArticleInterface[]
  >([]);

  // Fetch reviewed articles from local storage
  useEffect(() => {
    const savedReviewedArticles = localStorage.getItem("reviewedArticles");
    if (savedReviewedArticles) {
      setSortedArticles(JSON.parse(savedReviewedArticles));
    }
  }, []);

  const headers = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "journal", label: "Journal" },
    { key: "year", label: "Year" },
    { key: "comment", label: "Analysis Comment" }, // Display analysis comment
  ];

  // Map the sorted articles to include the title and other details
  const tableData = sortedArticles.map(({ article, comment }) => ({
    title: article.title,
    author: article.author,
    journal: article.journal,
    year: article.year,
    comment,
  }));

  return (
    <div className={styles.container}>
      <h1>Reviewed Articles</h1>
      <SortableTable headers={headers} data={tableData} />

      <button
        className={styles.button}
        onClick={() => router.push("/analyst/new-articles")}
      >
        New Submissions
      </button>
    </div>
  );
};

export default PastReviewedArticlesPage;
