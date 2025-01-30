"use client";

import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { fetcnsoldPlayers } from "../utils/getSoldPlayers";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  const [soldPlayers, setsoldPlayers] = useState([]);
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await fetcnsoldPlayers();
        const filteredPlayers = data.filter(player => player.sold_to_team_id > 0);
        setsoldPlayers(filteredPlayers); // Update state with the fetched players
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, [soldPlayers])
  function formatPriceInLakhs(price) {

    if (price >= 100) {
      // Convert to crore
      const crore = (price / 100).toFixed(2); // 2 decimal places
      return `${Number(crore).toLocaleString('en-IN')} Cr`;
    } else {
      // Keep it in lakh
      return `${Number(price).toLocaleString('en-IN')} Lakh`;
      // return price;
    }
  }
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-6xl bg-gray-900 p-6 rounded-lg border border-gray-700 shadow-xl mb-8">
      {/* Purchased Players Subheading */}
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Purchased Players
      </h2>
      <InfiniteMovingCards
        items={soldPlayers}
        direction="right"
        speed="fast"
      />
      {/* <div className="h-96 rounded-md flex items-center justify-center relative overflow-hidden">
        <div className="relative w-full overflow-hidden">
          {/* Infinite scroll container 
          <div
            className={`flex gap-8 ${isHovered ? "pause" : "animate-[scroll_5s_linear_infinite]"
              }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {soldPlayers.map((player, index) => (
              <div
                key={index}
                className="w-72 h-96 p-4 bg-gray-800 dark:bg-gray-900 rounded-xl shadow-xl flex-shrink-0 border border-gray-700 relative transform transition-transform duration-300 hover:scale-110"
              >
                <div className="w-full h-2/3 bg-gray-600 rounded-t-xl overflow-hidden flex items-center justify-center">
                  <img
                    src={player.player_image}
                    alt={player.player_name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 text-center flex flex-col justify-between h-1/3">
                  <p className="text-lg text-gray-300">Team: {player.player_name}</p>
                  <p className="text-lg text-green-400 font-semibold">
                    Sold Price: {formatPriceInLakhs(player.final_price)}
                  </p>
                  <p className="text-lg text-green-400 font-semibold">
                    Sold To: {player.sold_to_team}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}



