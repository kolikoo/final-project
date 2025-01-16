import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { FillProfileInfoPayload } from "@/supabase/profile/index.types";
import { fillProfileInfo, getProfileInfo } from "@/supabase/profile";
import { userAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";
import { z } from "zod";


const profileSchema = z.object({
  full_name_en: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  avatar_url: z
    .string()
    .url({ message: "Please provide a valid Avatar URL" })
    .optional(),
});

const ProfileDetailsEdit: React.FC = () => {
  const user = useAtomValue(userAtom);
  const [profilePayload, setProfilePayload] = useState<FillProfileInfoPayload>({
    id: user?.user.id || "",
    full_name_ka: "",
    avatar_url: "",
    full_name_en: "",
    username: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user) {
      getProfileInfo(user.user.id).then((res) => {
    
        setProfilePayload({
          id: user.user.id,
          full_name_ka: res.full_name_ka || "",
          avatar_url: res.avatar_url || "",
          full_name_en: res.full_name_en || "",
          username: res.username || "",
        });
      });
    }
  }, [user]);

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

    // Zod სქემის ვალიდაცია
    const validation = profileSchema.safeParse(profilePayload);
    if (!validation.success) {
      const errors: { [key: string]: string } = {};
      validation.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFormErrors(errors);
      return;
    }

    handleFillProfileInfo(
      { ...profilePayload, id: user.user.id },
      {
        onSuccess: () => {
      
          navigate("/profile");
        },
      }
    );
  };

  const handleNavigate=(path:string)=>{
    navigate(path)
  }

  const handleAvatarChange = (selectedAvatarValue: string) => {
    const avatar = createAvatar(avataaars, {
      seed: selectedAvatarValue,
    });
    const svg = avatar.toString();
    const encodedSvg = encodeURIComponent(svg).replace(/%20/g, " ");
    const avatarUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

    setProfilePayload((prev) => ({
      ...prev,
      avatar_url: avatarUrl,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex w-full max-w-sm flex-col justify-start gap-4 space-x-2 dark:bg-black dark:text-black"
    >
      <div className="mt-4 flex justify-center items-center">
        {profilePayload.avatar_url ? (
          <img
            src={profilePayload.avatar_url}
            alt="Selected Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <p>Select an Avatar</p>
        )}
      </div>

      <div className="ml-2 w-[98%] dark:bg-black dark:text-white">
        <label>Avatar Selection</label>
        <div>
          <select
            onChange={(e) => handleAvatarChange(e.target.value)}
            className="bg-blue-500 text-white rounded min-w-full p-2 m-1"
          >
            <option value="avatar1">Avatar 1</option>
            <option value="avatar2">Avatar 2</option>
            <option value="avatar3">Avatar 3</option>
            <option value="avatar4">Avatar 4</option>
            <option value="avatar5">Avatar 5</option>
            <option value="avatar6">Avatar 6</option>
            <option value="avatar7">Avatar 7</option>
            <option value="avatar8">Avatar 8</option>
            <option value="avatar9">Avatar 9</option>
            <option value="avatar10">Avatar 10</option>
            <option value="avatar11">Avatar 11</option>
            <option value="avatar12">Avatar 12</option>
            <option value="avatar13">Avatar 13</option>
            <option value="avatar14">Avatar 14</option>
            <option value="avatar15">Avatar 15</option>
          </select>
        </div>
        {formErrors.avatar_url && (
          <p className="text-red-500">{formErrors.avatar_url}</p>
        )}
      </div>

      <div className="ml-2 w-[98%] dark:bg-black dark:text-white">
        <label htmlFor="username">Username</label>
        <Input
          value={profilePayload.username}
          onChange={(e) => {
            setProfilePayload({
              id: user.user.id,
              username: e.target.value,
              avatar_url: profilePayload.avatar_url,
              full_name_en: profilePayload.full_name_en,
              full_name_ka: profilePayload.full_name_ka,
            });
          }}
          name="username"
          type="text"
          placeholder="Username"
          required
        />
        {formErrors.username && (
          <p className="text-red-500">{formErrors.username}</p>
        )}
      </div>

      <div className="ml-2 w-[98%] dark:bg-black dark:text-white">
        <label>Full Name</label>
        <Input
          value={profilePayload.full_name_en}
          onChange={(e) => {
            setProfilePayload((prev) => ({
              ...prev,
              full_name_en: e.target.value,
            }));
          }}
          name="Full Name"
          type="text"
          placeholder="Full Name"
          required
        />
        {formErrors.full_name_en && (
          <p className="text-red-500">{formErrors.full_name_en}</p>
        )}
      </div>

      <button
        className="h-10 w-[100%] rounded-[10px] bg-blue-700 dark:bg-blue-700 dark:text-white"
        type="submit"
      >
        Submit
      </button>

      <div className="cursor-pointer" onClick={() => handleNavigate("/profile")}>Go Back To Profile</div>
    </form>
  );
};

export default ProfileDetailsEdit;
