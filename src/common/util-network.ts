export function objectToURLSearchParams(object: Object) {
  const data = new URLSearchParams();
  for (const pair of Object.entries(object)) {
    data.append(pair[0], pair[1] as string);
  }
  return data;
}