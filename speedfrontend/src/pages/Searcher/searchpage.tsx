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
  const [sortOption, setSortOption] = useState<keyof ArticlesInterface>("title");
  
  // Filter the approved articles once
  const approvedArticles = articles.filter(article => article.moderation_status === 'approved');
  const [filteredArticles, setFilteredArticles] = useState<ArticlesInterface[]>(approvedArticles);

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

  // Search by title, author, or evidence
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = approvedArticles.filter(article =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.author.toLowerCase().includes(searchTerm) ||
      article.year?.toLowerCase().includes(searchTerm)||
      article.source?.toLowerCase().includes(searchTerm)
    );
    setFilteredArticles(filtered); 
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value as keyof ArticlesInterface;
    setSortOption(selectedOption);
    const sorted = [...filteredArticles].sort((a, b) => {
      
      if (selectedOption === "rating") {
        const ratingA = parseFloat(a.rating || "0"); 
        const ratingB = parseFloat(b.rating || "0"); 
        return ratingB - ratingA; 
      } else {
        const valA = a[selectedOption]?.toString() || ""; 
        const valB = b[selectedOption]?.toString() || "";
        return valA.localeCompare(valB); 
      }
    });
    setFilteredArticles(sorted); 
  };
  

  return (
    <div className={styles.container}>
      <h1>Search Articles</h1>
      <div className={styles.searchContainer}>
        <input  
          type="text"
          placeholder="Search by title, author, source, or pub-year..."
          value={searchTerm}
          onChange={handleSearch} 
          className={styles.searchInput}
        />
      </div>
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
        data={filteredArticles} 
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
