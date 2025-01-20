import * as React from "react";
import { Input } from "@/components/ui/input"; // დარწმუნდით, რომ ფაილის გზა სწორია.
import { Button } from "@/components/ui/button"; // შეცვალეთ რეალური გზით, თუ საჭიროა.
import { useState } from "react";
import { register } from "../../supabase/auth";
import { useMutation } from "@tanstack/react-query"
import { useTranslation } from "react-i18next";

const RegisterForm: React.FC = () => {
  const {t}=useTranslation()
  const [registerPayload, setRegisterPayload] = useState({
    email: "",
    password: "",
  });

  const { mutate: handleRegister } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!!registerPayload.email && !!registerPayload.password) {
      handleRegister(registerPayload);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex w-full max-w-sm flex-col justify-start gap-4 space-x-2 dark:bg-black dark:text-black"
    >
      <div className="ml-2 w-[98%]  dark:text-[#C4D7F2]">
        <label htmlFor="email">{t("SignIn-Page.email")}</label>
        <Input
          value={registerPayload.email}
          onChange={(e) => {
            setRegisterPayload({
              email: e.target.value,
              password: registerPayload.password,
            });
          }}
          name="email"
          type="email"
          placeholder={t("SignIn-Page.emailHolder")}
          required
          className="border-[#450920] dark:border-slate-400 focus:outline-none focus:ring-2 focus:dark:bg-slate-800 dark:bg-zinc-900 placeholder:text-zinc-500 "
        />
      </div>

      <div className="dark:text-[#C4D7F2]">
        <label htmlFor="password">{t("SignIn-Page.password")}</label>
        <Input
          value={registerPayload.password}
          onChange={(e) => {
            setRegisterPayload({
              password: e.target.value,
              email: registerPayload.email,
            });
          }}
          name="password"
          className="w-[100%] border-[#450920] dark:border-slate-400 focus:outline-none focus:ring-2 focus:dark:bg-slate-800 dark:bg-zinc-900 placeholder:text-zinc-500"
          type="password"
          placeholder={t("SignIn-Page.passwordHolder")}
          required
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="w-[100%]  bg-[#450920]  text-white font-bold py-2 px-4 rounded border-[#450920] dark:border-slate-400 focus:dark:bg-slate-400 focus:opacity-30 hover:bg-opacity-10 focus:text-black dark:bg-[#C4D7F2] placeholder:text-zinc-500 transition-colors "
        type="submit"
      >
        {t("SignIn-Page.sign up")}
      </Button>
    </form>
  );
};

export default RegisterForm;


