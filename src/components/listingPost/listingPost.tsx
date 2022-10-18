import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import { ChatBubbleOutline, ThumbDown, ThumbUp } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { IPost } from "../../interfaces/i-listing-service";
import VideoJS from "../videoJs/videoJs";
import "./listingPost.css";
import PostService from "../../services/post-service";
import SubredditService from "../../services/subreddit-service";
import { IGetSubredditAboutResult } from "../../interfaces/i-subreddit-service";
import { urlRemoveParams } from "../../common/util-url";

interface IListingPostProps {
  post: IPost;
}

function ListingPost({ post }: IListingPostProps) {
  let postService = new PostService();
  let subredditService = new SubredditService();
  const [upvoting, setUpvoting] = useState<boolean>(false);
  const [subredditAbout, setSubredditAbout] =
    useState<IGetSubredditAboutResult | null>(null);
  const [voteDirection, setVoteDirection] = useState<boolean | null>(
    post.data.likes
  );

  useEffect(() => {
    getSubredditAbout(post.data.subreddit);
  }, []);

  const getSubredditAbout = async (subreddit: string) => {
    try {
      setSubredditAbout(await subredditService.getAbout(post.data.subreddit));
    } catch (e) {
      console.error(e);
    }
  };

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
        avatar={
          <Avatar
            alt={post.data.subreddit}
            src={urlRemoveParams(subredditAbout?.data.community_icon)}
          />
        }
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
      ) : !!post.data.preview?.enabled ? (
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
        <Typography>{post.data.score}</Typography>
        <IconButton
          aria-label="downvote"
          onClick={() => vote(-1)}
          className={voteDirection === false ? "post-downvote-color" : ""}
        >
          <ThumbDown />
        </IconButton>
        &nbsp;
        <IconButton aria-label="comments" onClick={() => {}}>
          <ChatBubbleOutline />
        </IconButton>
        <Typography>{post.data.num_comments} comments</Typography>
        <IconButton aria-label="share" style={{ marginLeft: "auto" }}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ListingPost;
