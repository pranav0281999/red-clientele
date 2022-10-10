import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { IPost } from "../../interfaces/i-listing-service";
import VideoJS from "../videoJs/videoJs";
import "./listingPost.css";
import PostService from "../../services/post-service";

interface IListingPostProps {
  post: IPost;
}

function ListingPost({ post }: IListingPostProps) {
  let postService = new PostService();
  const [upvoting, setUpvoting] = useState<boolean>(false);
  const [voteDirection, setVoteDirection] = useState<boolean | null>(
    post.data.likes
  );

  const vote = async (direction: number) => {
    try {
      setUpvoting(true);
      if (
        (direction === 1 && post.data.likes) ||
        (direction === -1 && post.data.likes === false)
      ) {
        direction = 0;
      }
      await postService.upvote({
        dir: direction,
        id: post.data.name,
      });
      switch (direction) {
        case 0:
          post.data.likes = null;
          setVoteDirection(null);
          break;
        case 1:
          post.data.likes = true;
          setVoteDirection(true);
          break;
        case -1:
          post.data.likes = false;
          setVoteDirection(false);
          break;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpvoting(false);
    }
  };

  return (
    <Card className={"post-card"}>
      <CardHeader
        avatar={<Avatar alt={post.data.subreddit} src={post.data.thumbnail} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.data.subreddit}
        subheader={moment
          .unix(post.data.created)
          .format("hh:mm a, DD MMM YYYY")}
      />
      {post.data.is_video ? (
        <VideoJS
          options={{
            controls: true,
            responsive: true,
            fluid: true,
            sources: [
              {
                src: post.data.media.reddit_video.hls_url,
                type: "application/x-mpegURL",
              },
            ],
          }}
          onReady={() => {}}
        />
      ) : !!post.data.preview ? (
        <img
          src={post.data.url}
          alt={post.data.title}
          style={{
            width: "100%",
          }}
        />
      ) : null}
      <CardContent>
        <Typography>{post.data.title}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="upvote"
          onClick={() => vote(1)}
          className={voteDirection ? "post-upvote-color" : ""}
        >
          <ThumbUp />
        </IconButton>
        <IconButton
          aria-label="downvote"
          onClick={() => vote(-1)}
          className={voteDirection === false ? "post-downvote-color" : ""}
        >
          <ThumbDown />
        </IconButton>
        <IconButton aria-label="share" style={{ marginLeft: "auto" }}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ListingPost;
