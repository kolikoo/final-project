import React, { useEffect, useState } from "react"; // იმპორტირებულია useState
import { Input } from "@/components/ui/input"; // დარწმუნდით, რომ ესკას მნიშვნელობა სწორია
import { useMutation } from "@tanstack/react-query"; // useMutation იმპორტირება
import { FillProfileInfoPayload } from "@/supabase/profile/index.types";
import { fillProfileInfo, getProfileInfo } from "@/supabase/profile";
import { userAtom } from "@/store/auth";
import { useAtomValue } from "jotai";

const ProfileView: React.FC = () => {

const user = useAtomValue(userAtom);
console.log(user)

  const [profilePayload, setProfilePayload] = useState<FillProfileInfoPayload>({
    full_name_ka: "",
    avatar_url: "",
    full_name_en: "",
    username: "",
    
  });

  useEffect(()=>{
   if(user){
    getProfileInfo(user.user.id).then(res=>console.log(res))
   }
   
  },[user])

  
  

  const {
    mutate: handleFillProfileInfo,
    error,
    isError,
  } = useMutation({
    mutationKey: ["fill-Profile-Info"],
    mutationFn: fillProfileInfo,
   
  });

  const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
    handleFillProfileInfo({ ...profilePayload, id: user.user.id });
  };
  



  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex w-full max-w-sm flex-col justify-start gap-4 space-x-2 dark:bg-black dark:text-black"
    >
      <div className="ml-2 w-[98%] dark:bg-black dark:text-white">
        <label htmlFor="username">username</label>
        <Input
          value={profilePayload.username}
          onChange={(e) => {
            setProfilePayload({
              username: e.target.value,
              avatar_url: profilePayload.avatar_url,
              full_name_en: profilePayload.full_name_en,
              full_name_ka: profilePayload.full_name_ka,
            });
          }}
          name="username"
          type="username"
          placeholder="username"
          required
        />
      </div>

      <div className="ml-2 w-[98%] dark:bg-black dark:text-white">
        <label htmlFor="Avatar Url">Avatar Url</label>
        <Input
          value={profilePayload.avatar_url}
          onChange={(e) => {
            setProfilePayload({
              username: profilePayload.username,
              avatar_url: e.target.value,
              full_name_en: profilePayload.full_name_en,
              full_name_ka: profilePayload.full_name_ka,
            });
          }}
          name="Avatar Url"
          type="Avatar Url"
          placeholder="Avatar Url"
          required
        />
      </div>

      

      <div className="ml-2 w-[98%] dark:bg-black dark:text-white">
        <label>Full Name En</label>
        <Input
          value={profilePayload.full_name_en}
          onChange={(e) => {
            setProfilePayload({
              username: profilePayload.username,
              avatar_url: profilePayload.avatar_url,
              full_name_en: e.target.value,
              full_name_ka: profilePayload.full_name_ka,
            });
          }}
          name="Full Name En"
          type="Full Name En"
          placeholder="Full Name En"
          required
        />
      </div>

      <div className="ml-2 w-[98%] dark:bg-black dark:text-white">
        <label htmlFor="Full Name Ka">Full Name Ka</label>
        <Input
          value={profilePayload.full_name_ka}
          onChange={(e) => {
            setProfilePayload({
              username: profilePayload.username,
              avatar_url: profilePayload.avatar_url,
              full_name_en: profilePayload.full_name_en,
              full_name_ka: e.target.value,
            });
          }}
          name="Full Name Ka"
          type="Full Name Ka"
          placeholder="Full Name Ka"
          required
        />
      </div>

      <button
        className="h-10 w-[100%] rounded-[10px] bg-blue-700 dark:bg-blue-700 dark:text-white"
        type="submit"
        onClick={handleSubmit}
      >
        submit
      </button>
    </form>
  );
};

export default ProfileView;
