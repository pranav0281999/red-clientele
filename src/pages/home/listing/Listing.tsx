import { ReactElement, useEffect, useRef, useState } from "react";
import { IGetAllBestResult } from "../../../interfaces/i-listing-service";
import ListingService from "../../../services/listing-service";
import { CircularProgress } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
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
import VideoJS from "../../../components/videoJs/videoJs";

const ExpandMore = styled(
  (props: {
    children: ReactElement;
    expand: boolean;
    onClick: () => void;
    "aria-expanded": boolean;
    "aria-label": string;
  }) => {
    const { expand, children, ...other } = props;
    return <IconButton {...other}>{children}</IconButton>;
  }
)(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function App() {
  let listingService = new ListingService();
  let isListingLoading = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [listing, setListing] = useState<IGetAllBestResult>();
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getAllHot();
  }, []);

  const getAllHot = async () => {
    if (isListingLoading.current) {
      return;
    }
    try {
      isListingLoading.current = true;
      setListing(
        await listingService.getAllBest({
          g: "GLOBAL",
          limit: "50",
        })
      );
    } catch (e) {
      console.error(e);
    } finally {
      isListingLoading.current = false;
    }
  };

  return (
    <div>
      {!!listing ? (
        listing.data.children.map((post) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar alt={post.data.subreddit} src={post.data.thumbnail} />
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
              <Typography>
                {post.data.title}
              </Typography>
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
        ))
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default App;
