import * as React from "react"

import { cn } from "@/lib/utils"

const Email = (e: React.ChangeEvent<HTMLInputElement>) => {
  let val = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '');
  e.target.value = val;
}

const TextOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
  let val = e.target.value.replace(/[^a-zA-Z]/g, '');
  e.target.value = val;
}

const Positivenumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  let val = parseInt(e.target.value, 10);
  if (isNaN(val)) {
    e.target.value = "";
  } else {
    val = val >= 0 ? val : 0;
    e.target.value = val.toString();
  }
}

const Tel = (e: React.ChangeEvent<HTMLInputElement>) => {
  let val = e.target.value.replace(/\D/g, '');
  var result = '';
  for (var i = 0; i < val.length; i += 2) {
    result += val.slice(i, i + 2) + ' ';
  }
  e.target.value = result.trim().substring(0, 14);
}

const InputType = {
  "positive": Positivenumber,
  "tel": Tel,
  "email": Email,
  "textonly": TextOnly,
  "text": TextOnly,
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  contrains?: keyof typeof InputType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, contrains, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}

        onChange={
          (e) => {
            if (contrains) { InputType[contrains](e) };
            if (props.onChange) { props.onChange(e) }
          }
        }
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
