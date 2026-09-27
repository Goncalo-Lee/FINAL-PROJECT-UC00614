import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "mt-3 block w-full h-12 rounded-lg bg-white px-4 text-gray-800 shadow-soft outline-none focus:ring-2 focus:ring-brand/60",
  {
    variants: {
      variant: {
        primary: "",
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

type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants>;

export function Input({ className, variant, size, ...props }: InputProps) {
  return (
    <input
      id=""
      name=""
      type=""
      autoComplete=""
      required
      className={cn(inputVariants({ variant, size }), className)}
    />
  )
}
