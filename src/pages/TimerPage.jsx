"use client";
import React, { useEffect, useState } from "react";
import Timer from "../components/Timer";
import { InfiniteMovingCardsDemo } from "../components/InfiniteMovingCardsDemo";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";

const TimerPage = () => {
  // useEffect(() => {
  //   // Enable autoplay after user interaction
  //   const audio = document.getElementById("background-audio");
  //   if (audio) {
  //     audio.play();
  //   }
  // }, []);

  const [auctionEndTime, setAuctionEndTime] = useState(Date.now() + 1000 * 60 * 5);
  const incrementby5 = () => {
    setAuctionEndTime((auctionEndTime) => auctionEndTime + 1000 * 60 * 5);
  }
  const incrementby30 = () => {
    setAuctionEndTime((auctionEndTime) => auctionEndTime + 1000 * 60 * 30);
  }
  const decrementby5 = () => {
    setAuctionEndTime((auctionEndTime) => auctionEndTime - 1000 * 60 * 5);
  }
  const decrementby30 = () => {
    setAuctionEndTime((auctionEndTime) => auctionEndTime - 1000 * 60 * 30);
  }
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-evenly text-white overflow-hidden">
      <Link
        to={"/"}
        className="absolute z-20 top-5 left-10 bg-green-500 text-white px-4 py-2 my-2 rounded hover:bg-green-600"
      >
        Home
      </Link>
      <Link
        to={"/teamswithsquad"}
        className="absolute z-20 top-20 left-10 bg-green-500 text-white px-4 py-2 my-2 rounded hover:bg-green-600"
      >
        Team Squad
      </Link>
      <button onClick={incrementby5} className="rounded-full w-10 absolute bottom-4 left-4 bg-white text-black p-2 z-30">+5</button>
      <button onClick={incrementby30} className="rounded-full w-10 absolute bottom-4 left-16 bg-white text-black p-2 z-30">+30</button>
      <button onClick={decrementby5} className="rounded-full w-10 absolute bottom-4 right-4 bg-white text-black p-2 z-30">-5</button>
      <button onClick={decrementby30} className="rounded-full w-10 absolute bottom-4 right-16 bg-white text-black p-2 z-30">-30</button>
      {/* Background Music */}
      {/* <audio id="background-audio" loop>
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio> */}

      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-orange-500 to-blue-600 animate-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:30px_30px] opacity-40 animate-cross"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 w-full max-w-4xl p-4">
        <Header />
      </div>

      {/* Timer Section */}
      <div className="relative z-10 w-full max-w-4xl p-4">
        <div className="p-3 rounded-lg border border-gray-700 shadow-lg backdrop-blur-m bg-white/10" >
          <Timer auctionEndTime={auctionEndTime} setAuctionEndTime={setAuctionEndTime} />
        </div>
      </div>

      {/* Infinite Moving Cards Section */}
      <div className="relative z-10 w-full max-w-4xl p-4">
        <InfiniteMovingCardsDemo />
      </div>
    </div>
  );
};

export default TimerPage;
