'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/sliders/childs-raccoon-tee.jpg",
  "/sliders/folded-tees-on-table.jpg",
  "/sliders/gold-zipper-on-black-fashion-backpack.jpg",
  "/sliders/modern-time-pieces.jpg",
];

export default function Slider() {  
          const [currentIndex, setCurrentIndex] = useState(0);
        
          const prevSlide = () => {
            const isFirstSlide = currentIndex === 0;
            const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
            setCurrentIndex(newIndex);
          };
        
          const nextSlide = () => {
            const isLastSlide = currentIndex === images.length - 1;
            const newIndex = isLastSlide ? 0 : currentIndex + 1;
            setCurrentIndex(newIndex);
          };

          useEffect(() => {
            const slideInterval = setInterval(nextSlide, 10000);

            return () =>{
              clearInterval(slideInterval);
            };
          },[currentIndex]);

          const setSlide = (index:number) => {
            setCurrentIndex(index);
          };
        
          return (
            <div className="max-w-lg mx-auto py-8 relative">
              <div className="relative">
                <Image
                  src={images[currentIndex]}
                  alt={`Slide ${currentIndex + 1}`}
                  width={600}
                  height={400}
                  className="rounded-lg"
                  objectFit="cover"
                />
                <button
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  onClick={prevSlide}
                >
                  &lt;
                </button>
                <button
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  onClick={nextSlide}
                >
                  &gt;
                </button>
              </div>
              <div className="absolute bottom-14 left-1/2 gap-1.5 transform -translate-x-1/2 flex">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-3 w-3 mx-2 rounded-full cursor-pointer ${
                      index === currentIndex ? "bg-white" : "bg-sky-400"
                    }`}
                    onClick={() => setSlide(index)}
                  />
                ))}
              </div>
            </div>
          );
        };

