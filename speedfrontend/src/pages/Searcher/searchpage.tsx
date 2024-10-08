import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import SortableTable from '@/components/table/SortableTable';
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
  rating?: string;
}

type SearchArticlesProps = {
  articles: ArticlesInterface[];
};


const SearchArticles: NextPage<SearchArticlesProps> = ({ articles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<ArticlesInterface[]>(articles);

  const approvedArticles = articles.filter(article => article.moderation_status === 'approved');

  const headers = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "source", label: "Source" },
    { key: "year", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    {key: "claim", label: "Review Comments"},
    {key: "evidence", label: "Evidence"},
    {key: "rating", label: "Rating"},
  ];

 
  const handleSearch = () => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
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

      <SortableTable
        headers={headers}
        data={approvedArticles}
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
