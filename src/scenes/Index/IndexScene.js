import React from "react";
import { rejectByTag } from "services/helpers/filter";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { Grid } from "semantic-ui-react";

import Meta from "components/Meta";
import Loader from "components/Loader";
import FeaturedBox from "./components/FeaturedBox";
import StoryList from "components/StoryList";
import HowToBox from "components/Layout/HowToBox";
import AboutBox from "components/Layout/AboutBox";

const StoriesScene = props => {
  const { data: { loading, getDiscussions: stories } } = props;
  if (loading) return <Loader />;
  return (
    <Grid stackable>
      <Meta />
      <Grid.Column width={10}>
        <StoryList stories={rejectByTag(stories, "nsfw") || []} />
      </Grid.Column>
      <Grid.Column width={6}>
        <HowToBox />
        <br />
        <FeaturedBox />
        <br />
        <AboutBox />
      </Grid.Column>
    </Grid>
  );
};

const QUERY = gql`
  {
    getDiscussions(by: "hot", query: { tag: "news" }) {
      id
      title
      body
      author
      author_reputation
      net_votes
      category
      permlink
      json_metadata
      created
    }
  }
`;

export default graphql(QUERY, {
  options: {
    pollInterval: 1000 * 60 * 5 // 5 min
  }
})(StoriesScene);
