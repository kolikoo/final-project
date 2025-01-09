import * as React from "react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"



export default function InputWithButton() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('Form submitted')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="Class Propertiesw-full m-auto flex max-w-sm flex-col justify-start gap-4 space-x-2 dark:bg-black dark:text-black"
    >
      <div className="dark:text-white">
        <label htmlFor="email">Email</label>
        <Input className="w-[100%]" type="email" placeholder="Email" required />
      </div>

      <div className=" dark:text-white">
        <label htmlFor="password"> Password</label>
        <Input
          className="w-[100%]"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <Button className="w-[100%] dark:bg-blue-700 dark:text-white" type="submit">
        Subscribe
      </Button>
    </form>
  );
}


const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };










 const InputTitle = React.forwardRef<
   HTMLInputElement,
   React.ComponentProps<"input">
 >(({ className, type, ...props }, ref) => {
   return (
     <>
       <label htmlFor="title">Question Title</label>
       <input name="title"
         type={type}
         className={cn(
           "w-[100%] flex h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
           className,
         )}
         ref={ref}
         {...props}
       />
     </>
   );
 });
 Input.displayName = "Input";

 export { InputTitle };


  const InputDescription =()=>{

   return (
     <>
       <label htmlFor="Description">Question Description</label>

       <textarea
         className="w-[100%] flex  rounded-md border-[3px] border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm border-black
          "
         name="Description"
         id=""
         cols={80}
         rows={10}
       ></textarea>
     </>
   );}

 Input.displayName = "InputDescription";

 export { InputDescription };




