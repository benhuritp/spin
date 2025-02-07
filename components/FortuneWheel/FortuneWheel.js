"use client"
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import wheelLogo from "@/public/wheelLogo.png"
import logo from "@/public/logo.png"
import homeIcon from "@/public/home.svg"
import tasksIcon from "@/public/tasks.svg"
import ticketIcon from "@/public/ticket.png"
import friendsIcon from "@/public/friends.svg"
import walletIcon from "@/public/wallet.svg"
import arrowIcon from "@/public/arrow.png"
import { segments } from "./segments";
import { colorMap, glowColors } from "./colors";
import Link from "next/link";
const FortuneWheel = () => {
  const SPIN_DURATION = 1000; // Время вращения в миллисекундах



  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(360 / segments.length / 2); // Устанавливаем начальное положение на середину первого сегмента
  const [winner, setWinner] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [targetSegment, setTargetSegment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (isSpinning) {
      interval = setInterval(() => {
        setCurrentColorIndex((prev) => (prev + 1) % glowColors.length);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isSpinning]);

  const spinWheel = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setWinner(null);

      const fullRotation = Math.ceil(rotation / 360) * 360;
      const segmentSize = 360 / segments.length;

      // Если targetSegment не установлен - берем случайный
      const segment = targetSegment ?? Math.floor(Math.random() * segments.length);

      // Инвертируем сегмент из-за направления вращения
      const invertedSegment = (segments.length - segment - 1 + segments.length) % segments.length;

      const targetDegree = invertedSegment * segmentSize + segmentSize / 2;
      const spins = (Math.floor(Math.random() * 3) + 3) * 360;
      const finalRotation = fullRotation + spins + targetDegree;

      setRotation(finalRotation);

      setTimeout(() => {
        setIsSpinning(false);
        setWinner(segments[segment].text);
      }, SPIN_DURATION);
    }
  };

  const getConicGradient = () => {
    const segmentSize = 360 / segments.length;
    const colors = segments.map((segment, index) => {
      const start = index * segmentSize;
      const end = start + segmentSize;
      const color = segment.color.replace('bg-', '');
      return `${getColorFromClass(color)} ${start}deg ${end}deg`;
    });
    return `conic-gradient(${colors.join(', ')})`;
  };

  const getColorFromClass = (tailwindColor) => {

    return colorMap[tailwindColor];
  };

  // const getWinningSegment = () => {
  //   return segments[targetSegment ?? 0] || segments[0];
  // };

  return (

    <div className="max-w-[400px] lg:max-w-[450px] px-[15px] mx-auto pt-[15px] pb-[15px] min-h-[100vh] flex flex-col">
 
      <Image className="mx-auto mb-[10px]" src={logo.src} width={50} height={50} alt="Coin" />
      <div className="text-center uppercase mb-[5px]">LTX</div>
      <div className="font-montserrat font-bold text-center text-[22px]">100.000.000</div>
      <div className="relative flex flex-col items-center justify-center gap-8 mt-[32px]">
        <div className="relative w-[280px] h-[280px] lg:w-[325px] lg:h-[325px] overflow-hidden  border-[3px] border-[#3E3E3E] rounded-full ">
          <div
            className="absolute w-full border-[3px] border-[#161616]  overflow-hidden h-full rounded-full shadow-lg transition-transform ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              background: getConicGradient(),
              transitionDuration: `${SPIN_DURATION}ms`
            }}
          >
            {segments.map((segment, index) => {
              const degreePerSegment = 360 / segments.length;
              const degree = index * degreePerSegment;
              return (
                <div
                  key={segment.id}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${degree + degreePerSegment / 2}deg)`
                  }}
                >
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 text-white font-bold">
                    {segment.text}
                  </span>
                </div>
              );
            })}

            {segments.map((_, index) => {
              const degreePerSegment = 360 / segments.length;
              const degree = index * degreePerSegment; // Всего 2 градуса смещения
              return (
                <div
                  key={`line-${index}`}
                  className="absolute top-0 left-1/2 w-[3px] h-1/2 bg-[#3C3C3C] border border-black  origin-bottom"
                  style={{
                    transform: `rotate(${degree}deg)  scale(1.05) `,
                    transformOrigin: ""
                  }}
                />
              );
            })}
          </div>

          <Image
            onClick={() => setIsModalOpen(true)}
            className="absolute top-1/2 left-1/2 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 w-[90%] cursor-pointer"
            src={wheelLogo.src}
            width={100}
            height={100}
            alt="Logo"
          />

      
        </div>
        <Image
            className="absolute top-0 left-[50%] -translate-x-1/2 -translate-y-[30px] z-10"
            style={{
              filter: isSpinning ? `drop-shadow(0 0 10px ${glowColors[currentColorIndex]})` : '',
              transition: 'filter 0.3s ease-in-out'
            }}
            src={arrowIcon.src}
            width={24}
            height={41}
            alt="Arrow"
          />

      </div>


      {winner ? (
        <div className="mt-[20px] mb-[15px] flex justify-center">
          {
            winner === "NFT GOLD" ? (
              <div className="flex gap-[7px] items-center">
                <div className="leading-[100%] text-[15px]">
                  YOU WIN
                </div>
                <div className="h-[25px] w-[4px] rounded-[5px] bg-brand">
                </div>
                <div className="leading-[100%] text-[15px]">{winner}</div>
              </div>
            ) : winner === "5 XTICKET" ? (
              <div className="flex gap-[5px] items-center flex-col">
                <div className="leading-[100%] text-[15px]">
                  YOU WIN
                </div>
                <div className="w-[25px] h-[4px] rounded-[5px] bg-purple">
                </div>
                <div className="leading-[100%] text-[15px]">{winner}</div>
              </div>
            ) : winner === "1000 XPOINTS" ? (
              <div className="flex gap-[5px] items-center flex-col">
                <div className="leading-[100%] text-[15px]">
                  YOU WIN
                </div>
                <div className="w-[25px] h-[4px] rounded-[5px] bg-red">
                </div>
                <div className="leading-[100%] text-[15px]">{winner}</div>
              </div>
            ) : winner === "5 USDT" ? (
              <div className="flex gap-[5px] items-center flex-col">
                <div className="leading-[100%] text-[15px]">
                  YOU WIN
                </div>
                <div className="w-[25px] h-[4px] rounded-[5px] bg-blue">
                </div>
                <div className="leading-[100%] text-[15px]">{winner}</div>
              </div>
            ) : winner === "NONE" ? (
              <div className="flex gap-[5px] items-center flex-col">
                <div className="leading-[100%] text-[15px]">
                  YOU WIN
                </div>
                <div className="w-[25px] h-[4px] rounded-[5px] bg-[#858585]">
                </div>
                <div className="leading-[100%] text-[15px]">{winner}</div>
              </div>
            ) : null
          }
        </div>
      ): <div className="mt-[20px] mb-[15px] min-h-[44px]"></div>}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
       
          className="fixed backdrop-blur-[15px] inset-0  flex items-center justify-center z-50">
          <div
            onClick={(e) => e.stopPropagation()}
            style={
              {
                background: 'rgba(54, 54, 54, 0.6)',
                border: "3px solid rgba(255, 255, 255, 0.25)"
              }
            }
            className=" py-[50px] px-[20px] rounded-[30px] relative max-w-[300px] w-[100%]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-[25px] right-[25px] text-white/50 hover:text-white"
            >
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43 5L5 43M5 5L43 43" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="grid gap-[10px] justify-center">
              <div className="flex gap-[10px] items-center"><div className="rounded-[5px]  h-[25px] w-[4px] bg-brand"></div> NFT GOLD</div>
              <div className="flex gap-[10px] items-center"><div className="rounded-[5px]  h-[25px] w-[4px] bg-purple"></div> XTICKETS</div>
              <div className="flex gap-[10px] items-center"><div className="rounded-[5px]  h-[25px] w-[4px] bg-red"></div> XPOINTS</div>
              <div className="flex gap-[10px] items-center"><div className="rounded-[5px]  h-[25px] w-[4px] bg-blue"></div> USDT</div>
              <div className="flex gap-[10px] items-center"><div className="rounded-[5px] h-[25px] w-[4px] bg-[#858585c7]"></div> NONE</div>
            </div>

          </div>
        </div>
      )
      }
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="disabled:bg-[#FFC700]/20 bg-[#FFC700]/50 hover:bg-[#FFC700]/90 transition-all mt-auto rounded-[10px] min-h-[55px] py-[7px] px-[20px]"
      >
        {isSpinning ?
          <div className="uppercase leading-[1] text-[18px] font-medium font-montserrat">
            spining...
          </div> :
          <div>
            <div className="uppercase leading-[1] text-[18px] font-medium font-montserrat">
              spin
            </div>
            <div className="uppercase text-[15px]">1 xticket</div>
          </div>}
        <div>

        </div>
      </button>
        <nav className="mt-[15px] ">
          <div className="flex justify-between items-end">
            <Link href={"#"} className="flex items-center flex-col ">
              <Image className="object-cover" src={homeIcon.src} width={32} height={32} alt="home" />
              <div>home</div>
            </Link>
            <Link href={"#"} className="flex items-center flex-col opacity-50 ">
              <Image className="object-cover" src={tasksIcon.src} width={32} height={32} alt="tasks"/>
              <div>tasks</div>
            </Link>
            <Link href={"#"} className="flex items-center flex-col ">
              <Image className="object-cover" src={ticketIcon.src}  width={ 97} height={67.5} alt="ticket"/>
            </Link>
            <Link href={"#"} className="flex items-center flex-col opacity-50">
              <Image className="object-cover" src={friendsIcon.src} width={32} height={32} alt="friends" />
              <div>friends</div>
            </Link>
            <Link href={"#"} className="flex items-center flex-col opacity-50">
              <Image className="object-cover" src={walletIcon.src} width={32} height={32} alt="wallet"/>
              <div>wallet</div>
            </Link>
          </div>
        </nav>
    </div >
  );
};

export default FortuneWheel;