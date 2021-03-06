import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { map } from "ramda";
import { Segment, Header } from "semantic-ui-react";
import UserLink from "components/User/UserLink";
import { Link } from "react-router-dom";

// Render provided users.
const renderUsers = map(user => <UserLink key={user.id} user={user} />);

// A segment with links of featured journalists.
const FeaturedBox = props => {
  const { data: { loading, users } } = props;
  if (loading) return null;
  return (
    <div>
      <Header attached="top">Featured</Header>
      <Segment attached>{renderUsers(users)}</Segment>
      <Segment attached="bottom">
        <Link to="/journalists">All</Link>
      </Segment>
    </div>
  );
};

const QUERY = gql`
  query users($usernames: [String!]!) {
    users(usernames: $usernames) {
      id
      name
      reputation
      profile {
        profile_image
      }
    }
  }
`;

export default graphql(QUERY, {
  options: {
    variables: {
      usernames: ["johnvibes", "lilyraabe", "leecamp", "patricklancaster"]
    }
  }
})(FeaturedBox);
