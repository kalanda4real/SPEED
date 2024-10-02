import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import formStyles from "../../styles/Form.module.scss";

const NewDiscussion = () => {
  const navigate = useRouter();

  const [article, setArticle] = useState({
    title: "",
    authors: [""],
    journal: "",
    publication_year: 0,
    doi: "",
    volume: "",
    number: "",
    pages: "",
    moderation_status: "pending",
    submitter_name: "",
    submitter_email: "",
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const onChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const addAuthor = () => {
    setArticle((prev) => ({
      ...prev,
      authors: [...prev.authors, ""],
    }));
  };

  const changeAuthor = (index: number, value: string) => {
    setArticle((prev) => {
      const newAuthors = [...prev.authors];
      newAuthors[index] = value;
      return { ...prev, authors: newAuthors };
    });
  };

  const removeAuthor = (index: number) => {
    setArticle((prev) => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index),
    }));
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
          authors: [""],
          journal: "",
          publication_year: 0,
          doi: "",
          volume: "",
          number: "",
          pages: "",
          moderation_status: "pending",
          submitter_name: "",
          submitter_email: "",
        });
        // Redirect or navigate
        navigate.push("/"); // Redirect to another page, e.g., homepage or articles list
      })
      .catch((err) => {
        console.error("Error from NewDiscussion: ", err);
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

        <label htmlFor="authors">Authors:</label>
        {article.authors.map((author, index) => (
          <div key={index} className={formStyles.arrayItem}>
            <input
              type="text"
              name="authors"
              value={author}
              onChange={(event) => changeAuthor(index, event.target.value)}
              className={formStyles.formItem}
            />
            <button
              onClick={() => removeAuthor(index)}
              className={formStyles.buttonItem}
              style={{ marginLeft: "3rem" }}
              type="button"
            >
              -
            </button>
          </div>
        ))}
        <button
          onClick={addAuthor}
          className={formStyles.buttonItem}
          style={{ marginLeft: "auto" }}
          type="button"
        >
          +
        </button>

        <label htmlFor="journal">Journal:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="journal"
          id="journal"
          value={article.journal}
          onChange={onChange}
        />

        <label htmlFor="publication_year">Publication Year:</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="publication_year"
          id="publication_year"
          value={article.publication_year}
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

        <label htmlFor="volume">Volume:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="volume"
          id="volume"
          value={article.volume}
          onChange={onChange}
        />

        <label htmlFor="number">Number:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="number"
          id="number"
          value={article.number}
          onChange={onChange}
        />

        <label htmlFor="pages">Pages:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="pages"
          id="pages"
          value={article.pages}
          onChange={onChange}
        />

        <label htmlFor="submitter_name">Submitter Name:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="submitter_name"
          id="submitter_name"
          value={article.submitter_name}
          onChange={onChange}
        />

        <label htmlFor="submitter_email">Submitter Email:</label>
        <input
          className={formStyles.formItem}
          type="email"
          name="submitter_email"
          id="submitter_email"
          value={article.submitter_email}
          onChange={onChange}
        />

        <button className={formStyles.formItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewDiscussion;
