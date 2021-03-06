import React from "react";
import { propOr, head } from "ramda";
import { parseMetadata } from "services/helpers/format";
import Link from "components/Style/Link";
import styled from "styled-components";
import removeMarkdown from "remove-markdown";

import Body from "./components/StoryListItemBody";
import StoryExtra from "./components/StoryListItemExtra";

const StoryListItem = props => {
  const { story } = props;
  // Get images from story object
  const images = propOr([], "image")(parseMetadata(story.json_metadata));
  const image = head(images);

  const Story = styled.div`
    background-color: white;
    border: 1px solid #d4d4d5;
    margin-bottom: 1rem;
    max-width: 700px;
    box-shadow: 1px 2px 8px #d4d4d5;
  `;
  const Header = styled.h2`
    padding: 1rem 1rem 0 1rem;
    color: darkred;
    font-weight: bold;
  `;
  const Image = styled.div`
    width: 100%; /*or 70%, or what you want*/
    height: 300px; /*or 70%, or what you want*/
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #f9f9f9;
    background-image: url(${({ src }) => src});
  `;
  const Text = styled.div`
    padding: 1rem;
    color: hsla(0, 0%, 0%, 0.7);
    font-size: 16px;
    margin-bottom: 1rem;
    line-height: 1.5;
  `;
  const Extra = styled.div`
    padding: 0 1rem 1rem 1rem;
  `;

  // Convert story.body (markdown or html) to pure text.
  return (
    <Story>
      <Header>
        <Link to={`/stories/${story.author}/${story.permlink}`}>
          {story.title}
        </Link>
      </Header>
      {image ? (
        <Link to={`/stories/${story.author}/${story.permlink}`}>
          <Image src={image} />{" "}
        </Link>
      ) : null}

      <Text>
        <Body body={story.body} />
      </Text>

      {/*<Meta story={story} />*/}
      <Extra>
        <StoryExtra story={story} />
      </Extra>
    </Story>
  );
};

export default StoryListItem;
