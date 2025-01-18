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
      className="m-auto flex w-full max-w-sm flex-col justify-start gap-4 space-x-2 dark:bg-black dark:text-black"
    >
      <div className="ml-2 w-[98%] dark:text-white dark:bg-black">
        <label htmlFor="email">{t("LogIn-Page.email")}</label>
        <Input
          {...register("email")}
          name="email"
          type="email"
          placeholder={t("LogIn-Page.emailHolder")}
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
          className="w-[100%]"
          type="password"
          placeholder={t("LogIn-Page.password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <Button
        className="w-[100%] dark:bg-blue-700 dark:text-white"
        type="submit"
      >
        {t("LogIn-Page.login")}
      </Button>
    </form>
  );
};

export default LoginInput;
