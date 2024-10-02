/*import { GetStaticProps, NextPage } from "next";
import SortableTable from "@/components/table/SortableTable";


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
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "journal", label: "Journal" },
    { key: "year", label: "Publication Year" },
    { key: "volume", label: "Volume" },
    { key: "number", label: "Number" },
    { key: "pages", label: "Pages" },
    {key: "doi", label: "DOI"},
    {key: "moderation_status", label: "Moderation Status"},
    {key: "moderator_comments", label: "Moderator Comments Status"},
    {key: "submitter_name", label: "Submitter Name"},
    {key: "submitter_email", label: "Submitter Email"},
    {key: "submitted_date", label: "Submitter Date"},
    {key: "analysis_status", label: "Analysis Status"},
    {key: "analysis_notes", label: "Analysis Notes"}
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  // Map the data to ensure all articles have consistent property names
  const articles = data.map((article) => ({
    id: article.id ?? article._id,
    title: article.title,
    author: article.author,
    journal: article.journal,
    year: article.year,
    volume: article.volume,
    number: article.number,
    pages: article.pages,
    doi: article.doi,
    moderation_status: article.moderation_status,
    moderator_comments: article.moderator_comments,
    submitter_name: article.submitter_name,
    submitter_email: article.submitter_email,
    submitted_date: article.submitted_date,
    analysis_status: article.analysis_status,
    analysis_notes: article.analysis_notes,


  }));

  return {
    props: {
      articles,
    },
  };
};

export default Articles;*/


import { GetStaticProps, NextPage } from "next";
import SortableTable from "@/components/table/SortableTable";

// Define the structure of your article data
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
    { key: "moderator_comments", label: "Moderator Comments Status" },
    { key: "submitter_name", label: "Submitter Name" },
    { key: "submitter_email", label: "Submitter Email" },
    { key: "submitted_date", label: "Submitted Date" },
    { key: "analysis_status", label: "Analysis Status" },
    { key: "analysis_notes", label: "Analysis Notes" }
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

// Fetch articles from the backend API
export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  try {
    // Replace this URL with your backend API endpoint
    const response = await fetch('http://localhost:8082/api/articles');

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    // Parse the response as JSON
    const articles = await response.json();

    return {
      props: {
        articles,  // Return the articles to the page as props
      },
      revalidate: 60,  // Optional: re-generate the page at most every 60 seconds (ISR)
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return {
      props: {
        articles: [],  // Return an empty array if the request fails
      },
    };
  }
};

export default Articles;

