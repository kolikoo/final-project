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
  phone_number: z
    .string()
    .regex(
      /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      { message: "Invalid phone number format" }
    )
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
    phone_number: "",
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
          phone_number: res.phone_number || "",
        });
      });
    }
  }, [user]);

  const {
    mutate: handleFillProfileInfo,
   
  } = useMutation({
    mutationKey: ["fill-Profile-Info"],
    mutationFn: fillProfileInfo,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

  const handleNavigate = (path: string) => {
    navigate(path);
  };

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
          <p className="animate-pulse opacity-50">Loading Avatar...</p>
        )}
      </div>

      <div className="ml-2 w-[98%] dark:bg-black dark:text-white">
        <label>Avatar Selection</label>
        <div>
          <select
            onChange={(e) => handleAvatarChange(e.target.value)}
            className="bg-blue-500 text-white rounded min-w-full p-2 m-1"
          >
            {/* Avatar options */}
            <option value="avatar1">Avatar 1</option>
            {/* More options */}
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
              phone_number: profilePayload.phone_number,
            });
          }}
          name="username"
          type="text"
          placeholder="Username"
          required
          className="animate-pulse opacity-50" // Skeleton effect
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
          className="animate-pulse opacity-50" // Skeleton effect
        />
        {formErrors.full_name_en && (
          <p className="text-red-500">{formErrors.full_name_en}</p>
        )}
      </div>

      <div className="ml-2 w-[98%] dark:bg-black dark:text-white">
        <label htmlFor="phone_number">Phone Number</label>
        <Input
          value={profilePayload.phone_number}
          onChange={(e) => {
            setProfilePayload((prev) => ({
              ...prev,
              phone_number: e.target.value,
            }));
          }}
          name="phone_number"
          type="text"
          placeholder="Phone Number"
          className="animate-pulse opacity-50" // Skeleton effect
        />
        {formErrors.phone_number && (
          <p className="text-red-500">{formErrors.phone_number}</p>
        )}
      </div>

      <button
        className="h-10 w-[100%] rounded-[10px] bg-blue-700 dark:bg-blue-700 dark:text-white"
        type="submit"
      >
        Submit
      </button>

      <div
        className="cursor-pointer h-10 w-[100%] rounded-[10px] text-center text-white p-2 bg-blue-700 dark:bg-blue-700 dark:text-white"
        onClick={() => handleNavigate("/profile")}
      >
        Go Back To Profile
      </div>
    </form>
  );
};

export default ProfileDetailsEdit;
