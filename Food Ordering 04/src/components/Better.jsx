import React from "react";
import playStore from "../assets/play_store.png";
import appStore from "../assets/app_store.png";

const Better = () => {
  return (
    <div className="bg-white
 py-16 text-center mt-16">

     
      <h2 className="text-3xl md:text-4xl font-semibold mb-8">
        For Better Experience Download <br />
        <span className="font-bold">Tomato App</span>
      </h2>

     
      <div className="flex justify-center items-center gap-6">

        <img
          src={playStore}
          alt="Google Play"
          className="w-44 cursor-pointer hover:scale-105 transition"
        />

        <img
          src={appStore}
          alt="App Store"
          className="w-44 cursor-pointer hover:scale-105 transition"
        />

      </div>
    </div>
  );
};

export default Better;
