import { cva } from "class-variance-authority";

export const HomeBlogStyles = cva(["Card", "bg-white"], {
  variants: {
    size: {
      big: ["text-3xl"],
      small: ["text-sm"],
      medium: ["text-base", "py-2", "px-4"],
    },

    background: {
      white: [
        "bg-white text-black dark:bg-black dark:text-white dark:border-none",
      ],
    },
    border: {
      blue: ["border-blue-950 border-solid border-[2px]rounded-xl "],
      white: ["rounded-xl border-white-600 border-solid  border-[2px]"],
    },
    colors: {
      white: ["text-white darl:text-black"],
      black: ["text-black darl:text-white"],
    },
  },
});
