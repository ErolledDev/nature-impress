import { Suspense } from "react";
import Container from "@/components/container";
import CategoryClientContent from "@/components/CategoryClientContent";

export const metadata = {
  title: "Categories | Nature's Whispers",
  description: "Browse nature stories by category. Find wildlife adventures, conservation insights, and environmental content organized by topic.",
};

export default function CategoryPage() {
  return (
    <Container className="relative">
      <CategoryClientContent />
    </Container>
  );
}