import * as React from "react";
import { useEffect, useState } from "react";
import { IGetAllBestResult } from "../../../interfaces/i-listing-service";
import ListingService from "../../../services/listing-service";
import ListingPost from "../../../components/listingPost/listingPost";
import "./listing.css";

function Listing() {
  let listingService = new ListingService();
  const [loadingCount, setLoadingCount] = useState<number>(0);
  const [listing, setListing] = useState<IGetAllBestResult>();

  useEffect(() => {
    getAllHot();
  }, []);

  useEffect(() => {
    console.log(loadingCount);
  }, [loadingCount]);

  const getAllHot = async () => {
    try {
      setLoadingCount((loadingCount) => loadingCount + 1);
      setListing(
        await listingService.getAllBest({
          g: "GLOBAL",
          limit: "50",
        })
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCount((loadingCount) => loadingCount - 1);
    }
  };

  return (
    <div className={"listing-div"}>
      {loadingCount === 0 ? (
        listing?.data.children.map((post) => (
          <ListingPost key={post.data.id} post={post} />
        ))
      ) : (
        <span className="animate-ping inline-flex h-8 w-8 rounded-full bg-sky-400"></span>
      )}
    </div>
  );
}

export default Listing;
