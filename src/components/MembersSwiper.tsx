import { useRef, FC, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import { useState } from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

interface CarouselProps {
  cards: { id: number; headline: string, text:string; logo: string; hero: string, memberurl:string; }[];
}

const MembersSwiper: FC<CarouselProps> = ({ cards }) => { 

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

  const goPrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev()
  }

  const goNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext()
  }

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
                slidesPerView: 1.5,
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
                slidesPerView: 4.5,
                spaceBetween: 12,
                slidesOffsetBefore:320
              },
            }}
            
        >
        {cards.map((card) => (
            <SwiperSlide key={card.id} className='cursor-grab'>
              <div className="relative select-none flex flex-col h-full w-full mx-auto rounded-2xl overflow-hidden bg-gray-900">
                  <div className='w-auto aspect-[4/3] relative'>
                    <img
                        src={card.hero}
                        className="w-full h-full object-cover aspect-video"
                    />
                    <div className='absolute bottom-2 left-4 flex items-start justify-start flex-col gap-y-2 mt-2 mb-1'>
                      <img src={card.logo} className='w-auto h-12 lg:h-16' />
                    </div>
                  </div>
                  <div className="bg-gray-900 flex flex-col gap-y-3 items-start justify-between w-full px-4 py-3 h-full text-white">
                    
                    <div className="block">
                      <h1 className={`font-serif text-orange-400 font-semibold text-xl lg:text-2xl xl:text-3xl mt-2 mb-3`}>
                          {card.headline}
                      </h1>
                      <p className='text-sm font-sans'>{card.text}</p>
                      
                    </div>
                    <a href={'https://' + card.memberurl} className='text-sm py-2 block font-semibold font-sans mt-3'>{card.memberurl}</a>
                  </div>
              </div>

            </SwiperSlide>
        ))}
        </Swiper>
        <div className="block w-full mt-12 text-center">
          <div className='flex gap-x-4 justify-center p-2'>
            <button
              onClick={goPrev}
              
              className={`hover:outline-none focus:outline-none hover:border-black/50 group flex cursor-pointer items-center space-x-3 rounded-full p-2 text-sm font-medium border`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className='size-10 lg:size-12 group-hover:stroke-black/50 stroke-black'>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className={`hover:outline-none focus:outline-none hover:border-black/50 group flex cursor-pointer items-center space-x-3 rounded-full p-2 text-sm font-medium border`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className='size-10 lg:size-12 group-hover:stroke-black/50 stroke-black'>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
    </>
    
  );
};

export default MembersSwiper;
