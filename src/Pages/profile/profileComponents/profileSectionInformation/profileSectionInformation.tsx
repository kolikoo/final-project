import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/auth";
import { getProfileInfo } from "@/supabase/profile";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Profile {
  username: string;
  full_name_en: string;
  phone_number: string;
  avatar_url?: string; 
}

const ProfileSectionInformation: React.FC = () => {
  const { t } = useTranslation();
  const user = useAtomValue(userAtom);
const [profile, setProfile] = useState<Profile | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getProfileInfo(user.user.id)
        .then((data) => {
          if (data && data.length > 0) {
            setProfile(data[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching profile info:", error);
        });
    }
  }, [user]);

  if (!profile) {
    return <div>{t("loading")}</div>;
  }
 
    

  return (
    <div
      className="w-[40%] mx-auto mt-8 bg-[#f8f4e3] dark:bg-zinc-900 dark:text-[#C4D7F2]  rounded-xl shadow-lg p-20 text-center text-black
    small:w-[140%]
    small:ml-[20%]
    semismall:w-[100%]
    extramedium:w-[60%]
    extramedium:ml-[35%]
    semimedium:w-[40%]
    xl:w-[30%]

    "
    >
      <div className="flex justify-center">
        <img
          src={profile.avatar_url || "/default-avatar.png"} // Provide a default avatar if `avatar_url` is missing
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />
      </div>
      <h2 className="text-3xl font-bold mt-4 dark:text-[#C4D7F2] ">
        {" "}
        {profile.username}
      </h2>
      <p className="text-2xl font-semibold dark:text-[#C4D7F2] ">
        {profile.full_name_en}
      </p>
      <p className="text-2xl text-black  dark:text-[#C4D7F2] mt-10">
        {profile.phone_number}
      </p>
      <button
        onClick={() => navigate("/profileDetailsEdit")}
        className="mt-6 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-full hover:bg-gray-200 transition"
      >
        {t("ProfileInformation.editProfile")}
      </button>
    </div>
  );
};

export default ProfileSectionInformation;
