import React from "react";
import { Skeleton } from "antd";
function WeatherSkeletonCard() {
  return (
     <div className="max-w-4xl bg-[#003049] text-white rounded-2xl shadow-2xl shadow-black/30 m-10 px-8 py-6 flex flex-col items-start gap-6">
      {/* Head (city name + date) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
        <Skeleton.Input
          active
          size="large"
          style={{ width: 200, backgroundColor: "#1e1e1e" }}
        />
        <Skeleton.Input
          active
          size="small"
          style={{ width: 150, backgroundColor: "#1e1e1e", marginTop: "10px" }}
        />
      </div>

      {/* Body (temperature, state, icons) */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-8">
        {/* Left side: Textual data */}
        <div className="flex flex-col text-left gap-3 w-full sm:w-1/2">
          <Skeleton.Input
            active
            size="large"
            style={{ width: 120, height: 64, backgroundColor: "#1e1e1e" }}
          />
          <Skeleton.Input
            active
            size="default"
            style={{ width: 180, backgroundColor: "#1e1e1e" }}
          />
          <Skeleton.Input
            active
            size="default"
            style={{ width: 200, backgroundColor: "#1e1e1e" }}
          />
        </div>

        {/* Right side: Weather image */}
        <div className="w-[180px] sm:w-[220px]">
          <Skeleton.Image
            active
            style={{ width: "200px", backgroundColor: "#1e1e1e" }}
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherSkeletonCard;
