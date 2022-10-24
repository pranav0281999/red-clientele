import { useEffect, useState } from "react";
import { IGetAllBestResult } from "../../../interfaces/i-listing-service";
import ListingService from "../../../services/listing-service";
import ListingPost from "../../../components/listingPost/listingPost";

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
    <div className={"flex flex-col justify-center items-center h-full flex-grow"}>
      {loadingCount === 0 ? (
        listing?.data.children.map((post) => (
          <ListingPost key={post.data.id} post={post} />
        ))
      ) : (
        <span className="animate-ping inline-flex h-8 w-8 rounded-full"></span>
      )}
    </div>
  );
}

export default Listing;
