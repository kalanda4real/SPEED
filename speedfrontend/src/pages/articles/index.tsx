import { GetStaticProps, NextPage } from "next";
import SortableTable from "@/components/table/SortableTable";
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
  
  // Filter articles to only include approved ones
  const approvedArticles = articles.filter(article => article.moderation_status === 'approved');

  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "journal", label: "Journal" },
    { key: "year", label: "Publication Year" },
    { key: "volume", label: "Volume" },
    { key: "number", label: "Number" },
    { key: "pages", label: "Pages" },
    { key: "doi", label: "DOI" }
  ];

  return (
    <div className={styles.container}>
      <h1> Articles List</h1>
      <p>Reviewed articles available on the SPEED database</p>
      <SortableTable headers={headers} data={approvedArticles} />
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
