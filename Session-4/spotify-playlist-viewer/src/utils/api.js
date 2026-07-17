// Task 4: read the Zomato environment variables and print them to the console.
//
// Because both variables are prefixed with NEXT_PUBLIC_, Next.js inlines them
// into the bundle, so this works on the server and in the browser.

export function readZomatoConfig() {
  const apiKey = process.env.NEXT_PUBLIC_ZOMATO_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_ZOMATO_API_URL;

  console.log("NEXT_PUBLIC_ZOMATO_API_KEY =", apiKey);
  console.log("NEXT_PUBLIC_ZOMATO_API_URL =", apiUrl);

  return { apiKey, apiUrl };
}

export default readZomatoConfig;
