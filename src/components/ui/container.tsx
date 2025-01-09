import React, { PropsWithChildren } from "react";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full mx-4 m-auto  lg:w-[80%] ">
        {children}
      </div>
    </div>
  );
};

export default Container;
