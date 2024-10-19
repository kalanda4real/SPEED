import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/homepage.module.css";
import SortableTable from "@/components/table/SortableTable";
import { GetStaticProps } from "next";

// Define the interface for articles
interface PastArticleInterface {
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

// Define the component props type
type PastReviewedArticlesPageProps = {
  pastArticles: PastArticleInterface[];
};

const PastReviewedArticlesPage: React.FC<PastReviewedArticlesPageProps> = ({
  pastArticles,
}) => {
  const router = useRouter();
  const [sortOption, setSortOption] =
    useState<keyof PastArticleInterface>("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedArticles, setSortedArticles] = useState(pastArticles);

  // Headers for the table
  const headers: { key: keyof PastArticleInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "source", label: "Source" },
    { key: "year", label: "Publication Year" },
    { key: "doi", label: "DOI" },
  ];

  // Handle sorting
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value as keyof PastArticleInterface;
    setSortOption(selectedOption);
    const sorted = [...pastArticles].sort((a, b) => {
      const valA = a[selectedOption] || "";
      const valB = b[selectedOption] || "";
      return valA.toString().localeCompare(valB.toString());
    });
    setSortedArticles(sorted);
  };

  // Handle search functionality
  const handleSearch = () => {
    const filteredArticles = pastArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortedArticles(filteredArticles);
  };

  return (
    <div className={styles.container}>
      <h1>Past Articles</h1>
      <div className={styles.controls}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search past articles"
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.button}>
          Search
        </button>

        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          {headers.map((header) => (
            <option key={header.key} value={header.key}>
              {header.label}
            </option>
          ))}
        </select>
      </div>

      <SortableTable headers={headers} data={sortedArticles} />

      <button
        className={styles.button}
        onClick={() => router.push("/analyst/new-articles")}
      >
        New Submissions
      </button>
    </div>
  );
};

// Sample getStaticProps function if you're fetching articles data
export const getStaticProps: GetStaticProps<
  PastReviewedArticlesPageProps
> = async () => {
  try {
    const response = await fetch("http://localhost:8082/api/past-articles"); // Change to your API endpoint

    if (!response.ok) {
      throw new Error("Failed to fetch past articles");
    }

    const pastArticles = await response.json();

    return {
      props: {
        pastArticles,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching past articles:", error);
    return {
      props: {
        pastArticles: [],
      },
    };
  }
};

export default PastReviewedArticlesPage;
