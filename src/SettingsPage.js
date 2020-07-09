import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { observer } from "mobx-react";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { Redirect } from "react-router-dom";
import defaultFeeds from "./DefaultFeeds";
const querystring = require("querystring");

const schema = yup.object({
  name: yup.string().required("URL is required"),
  url: yup
    .string()
    .required("URL is required")
    .matches(
      /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
      "Invalid URL"
    ),
});

function SettingsPage({ feedsStore }) {
  const [initialized, setInitialized] = useState(false);
  const [redirectToFeed, setRedirectToFeed] = useState(false);

  const handleSubmit = async (evt, { setSubmitting, setErrors, resetForm }) => {
    try {
      await schema.validate(evt);
      resetForm({});
      feedsStore.feeds.push(evt);
      feedsStore.setFeeds(feedsStore.feeds);
      localStorage.setItem("newsfeeds", JSON.stringify(feedsStore.feeds));
    } catch (error) {
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  const setSelectedFeed = (url) => {
    feedsStore.setSelectedFeed(url);
    setRedirectToFeed(true);
  };

  const deleteFeed = (index) => {
    feedsStore.feeds.splice(index, 1);
    feedsStore.setFeeds(feedsStore.feeds);
    localStorage.setItem("newsfeeds", JSON.stringify(feedsStore.feeds));
  };

  const resetSettings = () => {
    localStorage.removeItem("newsfeeds");
    setInitialized(false);
  };

  const darkModeSettings = (e) => {
    feedsStore.setDarkMode(e);
    localStorage.setItem("darkmode", JSON.stringify(e));
    console.log("darkmode ran  " + e);
  };

  useEffect(() => {
    if (!initialized) {
      let rssFeeds = [];
      let color = "";
      try {
        rssFeeds = JSON.parse(localStorage.getItem("newsfeeds"));
        if (Array.isArray(rssFeeds)) {
          feedsStore.setFeeds(rssFeeds);
        } else {
          feedsStore.setFeeds(defaultFeeds);
        }
      } catch (ex) {
        console.log("error" + ex);
      }
      try {
        color = JSON.parse(localStorage.getItem("darkmode"));
        if (color == false || true) {
          feedsStore.setDarkMode(color);
          console.log(color);
        }
      } catch (ex) {
        console.log("error" + ex);
      }
      setInitialized(true);
      console.log("Useeffect ran");
    }
  }, [initialized]);

  if (redirectToFeed) {
    return (
      <Redirect to={`/feed?${querystring.encode({ url: feedsStore.feed })}`} />
    );
  }

  return (
    <div className="home-page">
      <h1 className="center">RSS Feeds</h1>
      <Button
        variant={feedsStore.darkmode != true ? "primary" : "info"}
        onClick={() => darkModeSettings(!feedsStore.darkmode)}
      >
        {feedsStore.darkmode != true
          ? "Turn On Dark Mode"
          : "Turn Off Dark Mode"}
      </Button>
      <br></br>
      <br></br>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{ name: "", url: "" }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isInvalid,
          errors,
        }) => (
          <div>
            <h5>Add a RSS feed</h5>
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md="12" controlId="name">
                  <Form.Control
                    className={
                      feedsStore.darkmode != true
                        ? "bg-light"
                        : "bg-dark text-light"
                    }
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.name || ""}
                    onChange={handleChange}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="url">
                  <Form.Control
                    className={
                      feedsStore.darkmode != true
                        ? "bg-light"
                        : "bg-dark text-light"
                    }
                    type="text"
                    name="url"
                    placeholder="URL"
                    value={values.url || ""}
                    onChange={handleChange}
                    isInvalid={touched.url && errors.url}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.url}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button
                variant={feedsStore.darkmode != true ? "primary" : "info"}
                type="submit"
              >
                Add
              </Button>
            </Form>
          </div>
        )}
      </Formik>
      <br />
      <Button
        variant={feedsStore.darkmode != true ? "primary" : "info"}
        onClick={resetSettings}
      >
        Reset to Default Feeds
      </Button>
      <br />
      <br />

      {feedsStore.feeds.map((f, i) => {
        return (
          <Card key={i}>
            <div
              className={feedsStore.darkmode != true ? "bg-white" : "bg-dark"}
            >
              <Card.Title
                className={
                  feedsStore.darkmode != true
                    ? "card-title"
                    : "card-title bg-dark text-light "
                }
              >
                {f.name}
              </Card.Title>
              <Card.Subtitle style={{ paddingLeft: "20px" }}>
                {f.url}
              </Card.Subtitle>
              <Card.Body>
                {/* <Button
                  variant="primary"
                  onClick={setSelectedFeed.bind(this, f.url)}
                >
                  Open
                </Button>{" "} */}
                <Button
                  variant={feedsStore.darkmode != true ? "primary" : "info"}
                  onClick={deleteFeed.bind(this, i)}
                >
                  Delete
                </Button>
              </Card.Body>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
export default observer(SettingsPage);
