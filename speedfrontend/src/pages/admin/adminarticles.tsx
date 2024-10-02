import { GetStaticProps, NextPage } from "next";
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


  return (
    <div className={styles.container}>
      <h1>Articles Administrators View</h1>
      <p>Table of articles for moderation</p>
      <SortableTable headers={headers} data={articles}/>
      <button
        className={styles.button} 
        onClick={() => router.push('/admin/adminhome')} >
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
