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
  rating?: number;
  actions?:string;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const router = useRouter();
  const [sortOption, setSortOption] = useState<keyof ArticlesInterface>("title");
  const [sortedArticles, setSortedArticles] = useState(articles);

  // Headers for the table
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "source", label: "Source" },
    { key: "year", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "moderation_status", label: "Moderation Status" },
    { key: "moderator_comments", label: "Moderation Comments" },
    { key: "analysis_status", label: "Analysis Status" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
    { key: "rating", label: "Rating" },
    { key: "actions", label: "Actions" }, // Changed to Actions
  ];

  // Function to handle sorting
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value as keyof ArticlesInterface;
    setSortOption(selectedOption);
    const sorted = [...articles].sort((a, b) => {
      const valA = a[selectedOption] || ""; 
      const valB = b[selectedOption] || "";
      return valA.toString().localeCompare(valB.toString());
    });
    setSortedArticles(sorted);
  };

  // Function to handle article deletion
  const handleDelete = async (articleId: string) => {
    try {
      const response = await fetch(`http://localhost:8082/api/articles/${articleId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }

      // Remove the deleted article from the list of displayed articles
      const updatedArticles = sortedArticles.filter(article => article._id !== articleId);
      setSortedArticles(updatedArticles);
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Articles Administrators View</h1>
      <p>Table of articles for moderation</p>

      <div className={styles.controls}>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          {headers.map(header => (
            <option key={header.key} value={header.key}>
              {header.label}
            </option>
          ))}
        </select>
      </div>

      <SortableTable 
        headers={headers} 
        data={sortedArticles.map(article => ({
          ...article,
          actions: (
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(article._id)}
            >
              Delete
            </button>
          ),
        }))} 
      />

      <button
        className={styles.button} 
        onClick={() => router.push('/admin/adminhome')} 
      >
        Back to admin home
      </button>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
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

export default Articles;
