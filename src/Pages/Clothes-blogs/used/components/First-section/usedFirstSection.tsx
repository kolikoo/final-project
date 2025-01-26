import React from "react";
import blogBanner from "@/images/baner clothes.png";

const UsedFirstSection: React.FC = () => {
  return (
    <section className="">
      <div>
        <img
          className="h-[200px] w-[100%] object-cover "
          src={blogBanner}
          alt="blogbanner"
        />
      </div>
    </section>
  );
};

export default UsedFirstSection;
