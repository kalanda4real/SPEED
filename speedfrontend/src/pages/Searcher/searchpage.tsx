import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import SearchTable from "@/components/table/SearchTable";
import styles from '@/styles/search.module.scss';

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
}

type SearchArticlesProps = {
  articles: ArticlesInterface[];
};

const SearchArticles: NextPage<SearchArticlesProps> = ({ articles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter the approved articles once
  const approvedArticles = articles.filter(article => article.moderation_status === 'approved');

  // Start with the approved articles in the filtered list
  const [filteredArticles, setFilteredArticles] = useState<ArticlesInterface[]>(approvedArticles);

  // This will handle rating changes for each article
  const handleRatingChange = async (articleId: string, rating: number) => {
    try {
      const response = await fetch(`/api/articles/${articleId}/rate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating }),
      });

      if (!response.ok) {
        throw new Error('Failed to update rating');
      }

      console.log('Rating updated successfully');
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const headers = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "source", label: "Source" },
    { key: "year", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    {key: "claim", label: "Review Comments"},
    {key: "evidence", label: "Evidence"},
    {key: "rating", label: "Rating (out of 5)"},
  ];

  const handleSearch = () => {
    const filtered = approvedArticles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered); // Update the table with filtered results
  };

  return (
    <div className={styles.container}>
      <h1>Search Articles</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>

      {/* Use filteredArticles instead of approvedArticles */}
      <SearchTable
        headers={headers}
        data={filteredArticles} // This now shows the filtered results
        onRatingChange={handleRatingChange} // Pass the rating change handler
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<SearchArticlesProps> = async () => {
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

export default SearchArticles;
