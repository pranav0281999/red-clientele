export function redirectToOAuth() {
  window.open(
    "https://www.reddit.com/api/v1/authorize?client_id=2G_1fZBEII27CUGHkg49Ng&response_type=code&state=auth&redirect_uri=http://localhost:3000/home&duration=permanent&scope=identity,read",
    "_self"
  );
}
