import { useRef, FC, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import { useState } from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

interface CarouselProps {
  cards: { id: number; headline: string, logo: string; }[];
}

const IndustryMembersSwiper: FC<CarouselProps> = ({ cards }) => { 

const swiperRef = useRef<SwiperType>();
const [activeIndex, setActiveIndex] = useState(0);
const totalSlides = cards.length;

const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const onSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
        <Swiper
            onInit={onSwiperInit}
            // Use snapIndex for the current page index
            onSlideChange={(swiper) => setActiveIndex(swiper.snapIndex)}
            spaceBetween={20}
            pagination={{ clickable: true }}
            slidesOffsetAfter={40}
            centeredSlides={false}
            loop={false}
            autoHeight={false}
            direction="horizontal"
            maxBackfaceHiddenSlides={5}
            className={`transition-opacity duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
            style={{ position: isMounted ? "relative" : "absolute", left: isMounted ? "0" : "-9999px" }}
            breakpoints={{
              320: {
                slidesPerView: 2.5,
                spaceBetween: 10,
                slidesOffsetBefore:40
                
              },
              640: {
                slidesPerView: 3.5,
                spaceBetween: 10,
                slidesOffsetBefore:80
              },
              1024: {
                slidesPerView: 4.5,
                spaceBetween: 12,
                slidesOffsetBefore:160
              },
              1200: {
                slidesPerView: 5.5,
                spaceBetween: 12,
                slidesOffsetBefore:320
              },
            }}
            
        >
        {cards.map((card) => (
            <SwiperSlide key={card.id} className='cursor-grab'>
              <div className="relative select-none flex flex-col h-full w-full mx-auto rounded-2xl overflow-hidden bg-emerald-700">
                 <div className="flex flex-col gap-y-3 items-center justify-between w-full px-4 pt-2 pb-4 h-full text-white">
                    <div className="block">
                      <div className='flex items-center justify-center flex-col mt-4 mb-4'>
                        <img src={card.logo} className='w-auto h-8 lg:h-10' />
                      </div>
                      <h1 className={`text-center font-serif font-semibold text-sm lg:text-base xl:text-lg`}>
                          {card.headline}
                      </h1>
                    </div>
                  </div>
              </div>
            </SwiperSlide>
        ))}
        </Swiper>
    </>
    
  );
};

export default IndustryMembersSwiper;
