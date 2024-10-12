import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import formStyles from "../../styles/Form.module.scss";

const NewArticle = () => {
  const navigate = useRouter();

  const [article, setArticle] = useState({
    title: "",
    author: "",
    source: "",
    year: "",
    doi: "",
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(JSON.stringify(article));
    fetch("http://localhost:8082/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(`Failed to create article: ${error.message}`);
          });
        }
        return res.json();
      })
      .then(() => {
        // Reset the form after successful submission
        setArticle({
          title: "",
          author: "",
          source: "",
          year: "",
          doi: "",
        });
        // Redirect or navigate
        navigate.push("/"); // Redirect to another page, e.g., homepage or articles list
      })
      .catch((err) => {
        console.error("Error from NewArticle: ", err);
      });
  };

  return (
    <div className="container">
      <h1>New Article</h1>
      <form className={formStyles.form} onSubmit={onSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="title"
          id="title"
          value={article.title}
          onChange={onChange}
        />

        <label htmlFor="author">Authors:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="author"
          id="author"
          value={article.author}
          onChange={onChange}
        />

        <label htmlFor="source">Source:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="source"
          id="source"
          value={article.source}
          onChange={onChange}
        />

        <label htmlFor="year">Publication Year:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="year"
          id="year"
          value={article.year}
          onChange={onChange}
        />

        <label htmlFor="doi">DOI:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="doi"
          id="doi"
          value={article.doi}
          onChange={onChange}
        />

        <button className={formStyles.formItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
