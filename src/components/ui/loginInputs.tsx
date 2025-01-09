import * as React from "react";
import { Input } from "@/components/ui/input"; // დარწმუნდით, რომ ფაილის გზა სწორია.
import { Button } from "@/components/ui/button"; // შეცვალეთ რეალური გზით, თუ საჭიროა.
import { useState } from "react";
import { login,  } from "../../supabase/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const LoginInput: React.FC = () => {
  const [loginPayload, setLoginPayload] = useState({ email: "", password: "" });
const navigate = useNavigate()

  const { mutate: handleLogin ,error,isError} = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess:()=>{
     navigate("/")
    }
  });

  const handleSubmit = (e:React.FormEvent) => {
   e.preventDefault()
    if (!!loginPayload.email && !!loginPayload.password) {
      handleLogin(loginPayload);
    }
  };
 console.log(error,isError)

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex w-full max-w-sm flex-col justify-start gap-4 space-x-2 dark:bg-black dark:text-black"
    >
      <div className="ml-2 w-[98%] dark:text-white dark:bg-black">
        <label htmlFor="email">Email</label>
        <Input
          value={loginPayload.email}
          onChange={(e) => {
            setLoginPayload({
              email: e.target.value,
              password: loginPayload.password,
            });
          }}
          name="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>

      <div className="dark:text-white">
        <label htmlFor="password">Password</label>
        <Input
        value={loginPayload.password}
        onChange={(e)=>{
        setLoginPayload({
         email:loginPayload.email,
         password:e.target.value
        })
        }}
          name="password"
          className="w-[100%]"
          type="password"
          placeholder="Password"
          required
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="w-[100%] dark:bg-blue-700 dark:text-white"
        type="submit"
      >
        Log In
      </Button>
    </form>
  );
};

export default LoginInput;
