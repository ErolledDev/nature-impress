import HomePage from "./home";
import { getAllPosts } from "@/lib/staticData/fetcher";

export default async function IndexPage() {
  const posts = await getAllPosts();
  return <HomePage posts={posts} />;
}

// export const revalidate = 60;
