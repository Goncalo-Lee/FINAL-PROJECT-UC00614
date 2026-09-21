import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rounded-lg shadow-soft transition active:scale-[0.98] cursor-pointer disabled:opacity-50 w-full items-center justify-center gap-4",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white font-medium hover:bg-blue-400",
        secondary: "bg-white text-gray-900 font-semibold hover:bg-gray-50",
      },
      size: {
        sm: "/* TU */",
        md: "h-12 text-lg",
        lg: "h-14",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
