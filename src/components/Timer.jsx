import React, { useEffect, useState } from "react";

import { fetchExpensivePlayer } from "../utils/expensivePlayer.js";
import { fetchPrevPlayer } from '../utils/previousPlayer.js';

const Timer = ({ auctionEndTime, setAuctionEndTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [expensivePlayer, setExpensivePlayer] = useState(null)
  const [lastSoldPlayer, setLastSoldPlayer] = useState(null)
  function calculateTimeLeft() {
    console.log(new Date(auctionEndTime));
    const difference = new Date(auctionEndTime) - new Date();
    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return null;
    }
  }
  useEffect(() => {
    if (auctionEndTime) {
      setTimeLeft(calculateTimeLeft(auctionEndTime));
    }
  }, [auctionEndTime]);

  function formatPriceInLakhs(price) {
    if (price >= 100) {
      const crore = (price / 100).toFixed(2); // 2 decimal places
      return `${Number(crore).toLocaleString('en-IN')} Crore`;
    } else {
      return `${Number(price).toLocaleString('en-IN')} Lakh`;
    }
  }
  useEffect(() => {
    const getPlayerData = async () => {
      const data = await fetchExpensivePlayer(); // Call the function
      setExpensivePlayer(data); // Save the response array to state
    };

    // Fetch last sold player
    const getLastSoldPlayer = async () => {
      const data = await fetchPrevPlayer();
      setLastSoldPlayer(data);
    };
    getPlayerData();
    getLastSoldPlayer();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const updatedTimeLeft = calculateTimeLeft(auctionEndTime);
        return updatedTimeLeft ? { ...updatedTimeLeft } : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [auctionEndTime]);
  if (!timeLeft) {
    return (
      <div className="text-red-600 text-xl font-bold text-center">
        Auction Ended
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-6 rounded-lg shadow-lg space-x-4 w-full">

      {/* Last Purchased Player */}
      {lastSoldPlayer &&
        <div className="flex items-center space-x-4">
          {/* <img
            src={lastSoldPlayerteamlogo}
            alt="MS Dhoni"
            className="w-16 h-16 rounded-full border border-gray-700"
          /> */}
          <div>
            <p className="text-sm text-gray-400">Last Purchased Player</p>
            <p className="text-xl font-bold">{lastSoldPlayer[0].player_name}</p>
            <p className="text-sm text-gray-400">Team: {lastSoldPlayer[0].sold_to_team}</p>
            <p className="text-lg text-green-500">Rs. {formatPriceInLakhs(lastSoldPlayer[0].final_price)}</p>
          </div>
        </div>}

      {/* Countdown Timer */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2">IPL Auction Countdown</h1>
        <div className="flex space-x-4">
          <div className="text-center">
            <p className="text-4xl font-semibold">{timeLeft.hours}</p>
            <p className="text-sm uppercase text-gray-400">Hours</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-semibold">{timeLeft.minutes}</p>
            <p className="text-sm uppercase text-gray-400">Minutes</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-semibold">{timeLeft.seconds}</p>
            <p className="text-sm uppercase text-gray-400">Seconds</p>
          </div>
        </div>
        <p className="mt-4 text-gray-400 text-sm">
          Auction ends at{" "}
          <span className="text-white font-medium">
            {new Date(auctionEndTime).toLocaleString()}
          </span>
        </p>
      </div>

      {/* Highest Bid */}

      {expensivePlayer &&
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm text-gray-400">Highest Bid</p>
            <p className="text-xl font-bold">Rs. {formatPriceInLakhs(expensivePlayer[0].final_price)}</p>
            <p className="text-sm text-gray-400">Player: {expensivePlayer[0].player_name}</p>
            <p className="text-sm text-gray-400">Team: {expensivePlayer[0].sold_to_team}</p>
          </div>
          {/* <img
            src="https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg"
            alt="Ben Stokes"
            className="w-16 h-16 rounded-full border border-gray-700"
          /> */}
        </div>}
    </div>
  );
};

export default Timer;
