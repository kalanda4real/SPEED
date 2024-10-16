import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import SortableTable from "@/components/table/SortableTable";
import styles from "@/styles/homepage.module.css";

interface ArticleInterface {
  author: string;
  title: string;
  journal?: string;
  year?: string;
  volume?: string;
  number?: string;
  pages?: string;
  doi?: string;
  moderation_status?: string;
  moderator_comments?: string;
  submitter_name: string;
  submitter_email: string;
  submitted_date?: string;
  analysis_status?: string;
  analysis_notes?: string;
}

type NewArticlesPageProps = {
  articles: ArticleInterface[];
};

const NewArticlesPage: React.FC<NewArticlesPageProps> = ({ articles }) => {
  const router = useRouter();

  const headers = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "journal", label: "Journal" },
    { key: "year", label: "Year" },
  ];

  return (
    <div className={styles.container}>
      <h1>Articles</h1>
      <SortableTable headers={headers} data={articles} />
      <button
        onClick={() => router.push("/analyst/Home")}
        className={styles.button}
      >
        Back
      </button>
    </div>
  );
};

// Fetch articles from the backend at build time
export const getStaticProps: GetStaticProps<
  NewArticlesPageProps
> = async () => {
  try {
    const response = await fetch("http://localhost:8082/api/articles");

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    const articles = await response.json();

    return {
      props: {
        articles,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        articles: [], // Return an empty array if the fetch fails
      },
    };
  }
};

export default NewArticlesPage;
