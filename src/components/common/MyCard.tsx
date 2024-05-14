import Image from "next/image";
import React from "react";

export const MyCard = () => {
  return (
    <div className="product-card w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
      <div className="absolute -left-[40%] top-0 group-hover:rotate-12 transition-all duration-300 group-hover:scale-150">
        <div className="flex gap-1">
          <svg
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1"
            fill="none"
            viewBox="0 0 24 24"
            className="fill-gray-300 rotate-[24deg]"
            height="200"
            width="200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
      </div>
      <div className="absolute rounded-full bg-gray-500 z-20 left-1/2 top-[44%] h-[110%] w-[110%] -translate-x-1/2 group-hover:top-[58%] transition-all duration-300"></div>
      <div className="para uppercase text-center leading-none z-40">
        <p className="text-black font-semibold text-xs font-serif">Best</p>
        <p className="font-bold text-xl tracking-wider text-gray-500">
          Fashion
        </p>
      </div>
      <div className="img w-[180px] aspect-square bg-gray-100 z-40 rounded-md">
        <Image
          src="https://images.unsplash.com/photo-1564053487104-3b23e6e4e4d3"
          alt="product"
          className="object-cover"
        />
      </div>
      <div className="btm-_container z-40 flex flex-row justify-between items-end gap-10">
        <div className="flex flex-col items-start gap-1">
          <div className="inline-flex gap-3 items-center justify-center">
            <div className="p-1 bg-white flex items-center justify-center rounded-full">
              <svg
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="1"
                fill="none"
                viewBox="0 0 24 24"
                className="fill-gray-800 h-3 w-3 stroke-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <p className="font-semibold text-xs text-white">+1234 456 780</p>
          </div>
          <div className="flex flex-row gap-2">
            <div className="inline-flex gap-3 items-center justify-center">
              <div className="p-1 bg-white flex items-center justify-center rounded-full">
                <svg
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="1"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="fill-gray-800 h-3 w-3 stroke-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <p className="font-semibold text-xs text-white">
                email@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="btn">
          <button className="uppercase font-semibold text-xs px-2 whitespace-nowrap py-1 rounded-full bg-white text-gray-800">
            ORDER NOW
          </button>
        </div>
      </div>
    </div>
  );
};
