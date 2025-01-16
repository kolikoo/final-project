import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/auth";
import { getProfileInfo } from "@/supabase/profile";
import { useNavigate } from "react-router-dom";

const ProfileSectionInformation: React.FC = () => {
  const user = useAtomValue(userAtom);
  const [profile, setProfile] = useState<any>(null);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-black py-10 w-[40%] m-auto mt-[40px] flex flex-col align-middle">
      <div className="w-[80%] m-auto pl-[28%] pr-[20%] flex flex-col items-center">
        {profile.avatar_url && (
          <div className="flex justify-center mb-4">
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
          </div>
        )}
        <div className="text-lg font-semibold mb-2">
          Username: {profile.username}
        </div>
        <div className="text-lg font-semibold mb-4">
          Full Name: {profile.full_name_en}
        </div>
        <div
          onClick={() => navigate("/profileDetailsEdit")}
          className="cursor-pointer text-black bg-yellow-400 w-30 border-black border-[1px] rounded-md text-center px-4 py-2"
        >
          Edit Profile
        </div>
      </div>
    </div>
  );
};

export default ProfileSectionInformation;
