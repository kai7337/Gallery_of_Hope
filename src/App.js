import React, { useState, useEffect } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "easymde/dist/easymde.min.css";
import { firestore } from "./utils/database";
import { Container, Button, Card, ButtonGroup } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function App() {
  const [category, setCategory] = useState(undefined);
  const [posts, setPosts] = useState([]);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [BegginingReached, setBeginningReached] = useState(false);

  useEffect(() => {
    setReachedEnd(false);
    setBeginningReached(false);

    let query = category
      ? firestore.collection("blog-posts").where("category", "==", category)
      : firestore.collection("blog-posts");

    query
      .orderBy("date", "desc")
      .limit(3)
      .get()
      .then((data) => {
        setPosts(data.docs);
        if (data.docs.length < 3) setReachedEnd(true);
      });
  }, [category]);

  function showNextPage() {
    setReachedEnd(false);
    setBeginningReached(false);
    let query = category
      ? firestore.collection("blog-posts").where("category", "==", category)
      : firestore.collection("blog-posts");

    query
      .orderBy("date", "desc")
      .startAfter(posts[posts.length - 1].data().date)
      .limit(3)
      .get()
      .then((data) => {
        if (data.docs.length > 0) setPosts(data.docs);
        else if (data.docs.length < 3) setReachedEnd(true);
      });
  }

  function showPrevPage() {
    setReachedEnd(false);
    setBeginningReached(false);
    let query = category
      ? firestore.collection("blog-posts").where("category", "==", category)
      : firestore.collection("blog-posts");
    query
      .orderBy("date", "desc")
      .endBefore(posts[0].data().date)
      .limit(3)
      .get()
      .then((data) => {
        if (data.docs.length === 0) setBeginningReached(true);
        if (data.docs.length > 0) setPosts(data.docs);
        else if (data.docs.length < 3) setBeginningReached(true);
      });
  }

  return (
    <Container className="App">
      <div class="titleHeight">
        <a href="galohope.org">
          <img
            className="logo"
            src="https://cdn.discordapp.com/attachments/701196516680794114/759255160794644490/unknown.png"
            alt=""
          />
        </a>
      </div>
      <ButtonGroup className="Buttons">
        <div className="top-right">
          <Button className="b1" onClick={() => setCategory("Art")}>
            ART WORKS
          </Button>
          <Button className="b1" onClick={() => setCategory("Info")}>
            INFO
          </Button>
          <Button className="b1" onClick={() => setCategory("")}>
            ALL
          </Button>
        </div>
      </ButtonGroup>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      {!BegginingReached && (
        <Button className="b1" onClick={showPrevPage}>
          prev
        </Button>
      )}
      {!reachedEnd && (
        <Button className="b1" onClick={showNextPage}>
          next
        </Button>
      )}
      <hr />
    </Container>
  );
}

function CodeBlock({ value, language }) {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
}

function Post({ post }) {
  const { text } = post.data();

  return (
    <Card className="mb-5">
      <Card.Body className="post-body">
        <Card.Text>
          <ReactMarkdown source={text} renderers={{ code: CodeBlock }} />
        </Card.Text>
      </Card.Body>
      <Card.Footer
        className="text-right"
        style={{ fontSize: "0.8em" }}
      ></Card.Footer>
    </Card>
  );
}
