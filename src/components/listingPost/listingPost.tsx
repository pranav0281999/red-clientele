import { useEffect, useState } from "react";
import moment from "moment";
import { IPost } from "../../interfaces/i-listing-service";
import VideoJS from "../videoJs/videoJs";
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
    <div className="flex rounded-md shadow-md w-11/12 max-w-xl my-4 bg-white flex-col">
      <div className="flex flex-row justify-between items-center p-2">
        <div className="flex flex-row items-center">
          <img
            alt={post.data.subreddit}
            src={urlRemoveParams(subredditAbout?.data.community_icon)}
            className="h-16 w-16 object-contain rounded-full"
          />
          <div className="ml-2">
            <p className="text-base">
              {post.data.subreddit}
            </p>
            <p className="text-sm">
              {moment
                .unix(post.data.created)
                .format("hh:mm a, DD MMM YYYY")}
            </p>
          </div>
        </div>
        <span className="material-icons">
          more_vert
        </span>
      </div>
      <p className="p-4 text-lg">{post.data.title}</p>
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
          onReady={() => { }}
          className="w-full"
        />
      ) : !!post.data.preview?.enabled ? (
        <img
          src={post.data.url}
          alt={post.data.title}
          className="w-full"
        />
      ) : null}
      <div className="flex flex-row items-center p-4">
        <span
          onClick={() => vote(1)}
          className={`material-icons ${voteDirection ? "text-orange-500" : ""}`}
        >
          thumb_up
        </span>
        <p className="px-2 text-sm">{post.data.score}</p>
        <span
          onClick={() => vote(-1)}
          className={`material-icons ${voteDirection === false ? "text-blue-500" : ""}`}
        >
          thumb_down
        </span>
        <span
          className={`material-icons pl-4`}
        >
          chat_bubble
        </span>
        <p className="px-2 text-sm">{post.data.num_comments} comments</p>
        <span
          className={`material-icons ml-auto`}
        >
          share
        </span>
      </div>
    </div>
  );
}

export default ListingPost;
