import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import SortableTable from '@/components/table/SortableTable';
import styles from '@/styles/articles.module.css';
import { useRouter } from "next/router";

interface ArticlesInterface {
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

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<string>("pending");

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
  };

  const headers: { key: keyof ArticlesInterface; label: string }[] = [
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
    { key: "submitter_name", label: "Submitter Name" },
    { key: "submitter_email", label: "Submitter Email" },
    { key: "submitted_date", label: "Submitted Date" },
  ];

  // Filter articles based on the selected moderation status
  const filteredArticles = articles.filter(article => article.moderation_status === filterStatus);

  return (
    <div className={styles.container}>
      <h1>Articles - Moderator View</h1>
      <p className={styles.p}>Table of articles for moderation</p>
      <div className={styles.filterContainer}>
        <label htmlFor="statusFilter">Filter by Moderation Status: </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={handleStatusChange}
          className={styles.dropdown}
        >
          <option value="pending">Pending/New</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <SortableTable headers={headers} data={filteredArticles} />

     
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
