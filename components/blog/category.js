import Link from "next/link";
import Label from "@/components/ui/label";

export default function CategoryLabel({
  categories,
  nomargin = false
}) {
  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link
            href={`/category?category=${category.slug?.current || category.title?.toLowerCase().replace(/\s+/g, '-')}`}
            key={index}>
            <Label nomargin={nomargin} color="green">
              {category.title}
            </Label>
          </Link>
        ))}
    </div>
  );
}
