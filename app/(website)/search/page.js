import Container from "@/components/container";
import SearchClientContent from "@/components/SearchClientContent";

export const metadata = {
  title: "Search | Nature's Whispers",
  description: "Search through our collection of nature stories, wildlife adventures, and conservation insights.",
};

export default function SearchPage() {
  return (
    <Container className="relative">
      <SearchClientContent />
    </Container>
  );
}