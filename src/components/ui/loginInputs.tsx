import * as React from "react";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import { login } from "../../supabase/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import { z } from "zod"; 


const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginInput: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    mutate: handleLogin,
    error,
    isError,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    handleLogin(data);
  };

  console.log(error, isError);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-auto flex w-full max-w-sm flex-col justify-start gap-4 space-x-2 dark:bg-zinc-900 dark:text-zinc-900"
    >
      <div className="ml-2 w-[98%] dark:text-white dark:bg-zinc-900">
        <label htmlFor="email">{t("LogIn-Page.email")}</label>
        <Input
          {...register("email")}
          name="email"
          type="email"
          placeholder={t("LogIn-Page.emailHolder")}
          className="border-[#450920] dark:border-slate-400 focus:outline-none focus:ring-2 focus:dark:bg-slate-800 dark:bg-zinc-900 placeholder:text-zinc-500"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="dark:text-white">
        <label htmlFor="password">{t("LogIn-Page.passwordHolder")}</label>
        <Input
          {...register("password")}
          name="password"
          className="border-[#450920] dark:border-slate-400 focus:outline-none focus:ring-2 focus:dark:bg-slate-800 dark:bg-zinc-900 placeholder:text-zinc-500"
          type="password"
          placeholder={t("LogIn-Page.password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <Button
        className="w-[100%]  bg-[#450920]  text-white font-bold py-2 px-4 rounded border-[#450920] dark:border-slate-400 focus:dark:bg-slate-400 focus:opacity-30 hover:bg-opacity-10 focus:text-black dark:bg-[#C4D7F2] placeholder:text-zinc-500 transition-colors"
        type="submit"
      >
        {t("LogIn-Page.login")}
      </Button>
    </form>
  );
};

export default LoginInput;
