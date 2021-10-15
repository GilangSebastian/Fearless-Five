import React from "react";

const About = () => {
  return (
    <div className="pb-40">
      <div className="flex justify-center items-center">
        <span className="text-center font-bold text-4xl">Our Developers</span>
      </div>
      <div className="flex justify-around items-center h-72">
        <div className="flex flex-col items-center">
          <div className="h-48 w-48 border-2 border-black rounded-full flex justify-center ">
            <span>profil</span>
          </div>
          <span className="text-center">name</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-48 w-48 border-2 border-black rounded-full flex justify-center ">
            <span>profil</span>
          </div>
          <span className="text-center">name</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-48 w-48 border-2 border-black rounded-full flex justify-center ">
            <span>profil</span>
          </div>
          <span className="text-center">name</span>
        </div>
      </div>
      <div>
        <br />
        <div className="border-2 border-gray-300"></div>
      </div>
    </div>
  );
};

export default About;
