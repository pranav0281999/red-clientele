export function urlRemoveParams(url: string | undefined) {
  return url?.split("?")[0];
}
