import { cx } from "@/utils/all";

export default function Label(props) {
  const color = {
    green: "text-brand-primary dark:text-brand-accent",
    blue: "text-blue-600",
    orange: "text-orange-700",
    purple: "text-purple-600",
    pink: "text-pink-600"
  };
  const bgcolor = {
    green: "bg-brand-primary/10 dark:bg-brand-accent/10",
    blue: "bg-blue-50",
    orange: "bg-orange-50",
    purple: "bg-purple-50",
    pink: "bg-pink-50"
  };
  const margin = props.nomargin;

  if (props.pill) {
    return (
      <div
        className={
          "inline-flex items-center justify-center font-semibold px-3 h-6 text-xs bg-brand-primary/10 text-brand-primary rounded-full shrink-0 dark:bg-brand-accent/10 dark:text-brand-accent"
        }>
        {props.children}
      </div>
    );
  }

  return (
    <span
      className={cx(
        "inline-block text-xs font-semibold tracking-wider uppercase px-2 py-1 rounded-md",
        !margin && "mt-4 mb-2",
        bgcolor[props.color] ?? bgcolor["green"],
        color[props.color] ?? color["pink"]
      )}>
      {props.children}
    </span>
  );
}
