import { cx } from "@/utils/all";

export default function Container(props) {
  return (
    <div
      className={cx(
        "container mx-auto",
        // Responsive padding with better mobile spacing
        "px-4 sm:px-6 lg:px-8 xl:px-12",
        // Max width with better breakpoints
        props.large ? "max-w-screen-xl" : "max-w-screen-lg",
        // Vertical spacing with mobile-first approach
        !props.alt && "py-4 sm:py-6 lg:py-8 xl:py-12",
        props.className
      )}>
      {props.children}
    </div>
  );
}
