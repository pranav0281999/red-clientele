import * as React from "react";
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

interface IListingPostProps {
  post: IPost;
}

function ListingPost({ post }: IListingPostProps) {
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
        <IconButton aria-label="upvote">
          <ThumbUp />
        </IconButton>
        <IconButton aria-label="downvote">
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
