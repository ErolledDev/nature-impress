import { cx } from "@/utils/all";

export default function Container(props) {
  return (
    <div
      className={cx(
        "container mx-auto",
        // Responsive padding with better mobile spacing
        "px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12",
        // Max width with better breakpoints
        props.large ? "max-w-screen-xl" : "max-w-screen-lg",
        // Vertical spacing with mobile-first approach
        !props.alt && "py-6 sm:py-8 md:py-10 lg:py-12",
        props.className
      )}>
      {props.children}
    </div>
  );
}
