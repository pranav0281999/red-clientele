export function redirectToOAuth() {
  window.open(
    "https://www.reddit.com/api/v1/authorize?client_id=ALQwmg16YCEWNOQRJMratw&response_type=code&state=auth&redirect_uri=http://localhost:3000&duration=permanent&scope=identity,read,vote",
    "_self"
  );
}
