import { useEffect } from "react";
import { redirectToOAuth } from "../../common/util-auth";

function App() {
  useEffect(() => {
    redirectToOAuth();
  }, []);

  return <div>Redirecting</div>;
}

export default App;
