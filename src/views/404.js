import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-[70vh] md:h-screen flex flex-col gap-3 items-center justify-center">
      <img
        src="/Images/404.png"
        alt="404"
        width={200}
        height={200}
        className="object-cover "
      />
      <p>Page Not Found</p>
      <Link to={`/`} className="bg-black text-white flex items-center justify-center capitalize font-bold p-3 text-xs rounded-full max-w-[100px] w-full">Go Back</Link>
    </div>
  );
};

export default NotFound;
