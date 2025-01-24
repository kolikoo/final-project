import React, { useState, useEffect } from "react";
import ProfileSectionInformation from "../profileComponents/profileSectionInformation/profileSectionInformation";
import ProfileSectionBlogs from "../profileComponents/profileSectionBlogs/profileSectionBlogs";
import Loading from "@/MainComponents/defaultComponents/loadingPage/loading";

const ProfileMainView: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-20 small:ml-[150px] semimedium:ml-[0px]">
      <ProfileSectionInformation />
      <ProfileSectionBlogs />
    </div>
  );
};

export default ProfileMainView;
