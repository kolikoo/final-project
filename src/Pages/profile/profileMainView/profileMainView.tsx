import React from "react";
import ProfileSectionInformation from "../profileComponents/profileSectionInformation/profileSectionInformation";
import ProfileSectionBlogs from "../profileComponents/profileSectionBlogs/profileSectionBlogs";


const ProfileMainView: React.FC = () => {
  return (
    <div className="flex flex-col gap-20">
      <ProfileSectionInformation />
      <ProfileSectionBlogs/>
    </div>
  );
};

export default ProfileMainView;
