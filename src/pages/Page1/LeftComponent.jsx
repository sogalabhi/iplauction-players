import React from 'react';
import { useEffect, useState } from 'react';
import { fetchExpensivePlayer } from '../../utils/expensivePlayer.js';
import { fetchPrevPlayer } from '../../utils/previousPlayer.js';
import { getTeamFromTeamID } from '../../utils/getTeamfromTeamId.js';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const LeftComponent = () => {

  function formatPriceInLakhs(price) {

    if (price >= 100) {
      // Convert to crore
      const crore = (price / 100).toFixed(2); // 2 decimal places
      return `${Number(crore).toLocaleString('en-IN')} Crore`;
    } else {
      // Keep it in lakh
      return `${Number(price).toLocaleString('en-IN')} Lakh`;
      // return price;
    }
  }

  const [mostExpensivePlayer1, setPlayerData] = useState([]);
  const [lastSoldPlayer1, setLastSoldPlayer] = useState(null);
  const [mostExpensiveTeam, setMostExpensiveTeam] = useState(null); // Store data2
  const [lastSoldTeam, setLastSoldTeam] = useState(null); // Store data1

  useEffect(() => {
    const getPlayerData = async () => {
      const data = await fetchExpensivePlayer(); // Call the function
      setPlayerData(data); // Save the response array to state
    };

    // Fetch last sold player
    const getLastSoldPlayer = async () => {
      const data = await fetchPrevPlayer();
      setLastSoldPlayer(data);
    };
    getPlayerData(); // Fetch data on component mount
    getLastSoldPlayer();
    /*formatPriceInLakhs(mostExpensivePlayer1[0].final_price);
    formatPriceInLakhs(lastSoldPlayer1[0].final_price);*/
  }, []);
  useEffect(() => {
    if (mostExpensivePlayer1.length > 0) {
      const fetchTeam = async () => {
        const teamData = await getTeamFromTeamID(mostExpensivePlayer1[0].sold_to_team_id);
        setMostExpensiveTeam(teamData[0]); // Assuming teamData is an array
      };
      fetchTeam();
    }
  }, [mostExpensivePlayer1]);

  useEffect(() => {
    if (lastSoldPlayer1 && lastSoldPlayer1.length > 0) {
      const fetchTeam = async () => {
        const teamData = await getTeamFromTeamID(lastSoldPlayer1[0].sold_to_team_id);
        setLastSoldTeam(teamData[0]); // Assuming teamData is an array
      };
      fetchTeam();
    }
  }, [lastSoldPlayer1]);

  return (
    <div className="p-8 font-sans space-y-6">
      {/* Most Expensive Player */}
      {mostExpensiveTeam?.team_name && <div
        className="flex flex-col mb-6 border-slate-1000 bg-white/5 hover:bg-white/0 cursor-default hover:scale-105 transition backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6n"
      >
        <div className='relative overflow-hidden isolate rounded-lg'>

          {/* Heading */}
          <div className="text-left text-xl font-semibold py-2 pb-1 px-4">
            Most Expensive Player
          </div>

          {/* Player Info */}
          <div className="flex items-center">
            {/* Player Image */}
            {mostExpensivePlayer1.length > 0 ? (
              <>
                <div className="flex-shrink-0 p-4">
                  <img
                    src={mostExpensivePlayer1[0].player_image}
                    alt={mostExpensivePlayer1[0].player_name}
                    style={{ backgroundImage: `linear-gradient(to bottom right, #${mostExpensiveTeam?.color1}, #${mostExpensiveTeam?.color2}),url(${mostExpensiveTeam?.team_logo})`, backdropFilter: 'blur(25px) saturate(150%)' }}
                    className="w-[100px] h-[100px] rounded-full border-2 border-white object-cover"
                  />
                </div>

                {/* Player Details */}
                <div className="flex-grow p-4">
                  <h2 className="text-[20px] font-bold">{mostExpensivePlayer1[0].player_name}</h2>
                  <p className="text-[18px]">{mostExpensiveTeam?.team_name || 'Loading...'}</p>
                  <p className="text-[18px]">&#8377; {formatPriceInLakhs(mostExpensivePlayer1[0].final_price)}</p>
                </div>
              </>
            ) : (
              //<p className="p-4 text-gray-400">Loading...</p>
              <div className="flex items-center mr-10 mb-50 p-4">
              <DotLottieReact
                      src="https://lottie.host/e03cc549-83a8-4fd0-b662-7351abed847c/ziI4NFMwPL.lottie"
                      loop
                      autoplay
                      style={{ width: "100px", height: "100px" }}
                    />
              <div className="flex flex-col gap-y-1">
              <p className="p-1 text-white text-3xl">IPL Auction</p>
              <p className="p-1 text-white text-lg">Starting Soon...</p>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>}

      {/* Last Sold Player */}
      {lastSoldTeam?.team_name && <div
        className="flex flex-col mb-6 border-slate-1000 bg-white/5 hover:bg-white/0 cursor-default hover:scale-105 transition backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6n"
      >
        <div className='relative overflow-hidden isolate rounded-lg'>
          {/* Heading */}
          <div className="text-left text-xl font-semibold py-2 px-4">
            Last Sold Player
          </div>

          {/* Player Info */}
          <div className="flex items-center">
            {/* Player Image */}
            {lastSoldPlayer1 ? (
              <>
                <div className="flex-shrink-0 p-4">
                  <img

                    style={{ backgroundImage: `linear-gradient(to bottom right, #${lastSoldTeam?.color1}, #${lastSoldTeam?.color2}), url(${lastSoldTeam?.team_logo})`, backdropFilter: 'blur(25px) saturate(150%)' }}
                    src={lastSoldPlayer1[0].player_image}
                    alt={lastSoldPlayer1[0].player_name}
                    className="w-[100px] h-[100px] rounded-full border-2 border-white object-cover"
                  />
                </div>

                {/* Player Details */}
                <div className="flex-grow p-4">
                  <h2 className="text-[20px] font-bold">{lastSoldPlayer1[0].player_name}</h2>
                  <p className="text-[18px]">{lastSoldTeam?.team_name || 'Loading...'}</p>
                  <p className="text-[18px]">&#8377; {formatPriceInLakhs(lastSoldPlayer1[0].final_price)}</p>
                </div>
              </>
            ) : (
              //<p className="p-4 text-gray-400">Loading...</p>
              <div className="flex items-center mr-10 mb-50 p-4">
              <DotLottieReact
                      src="https://lottie.host/e03cc549-83a8-4fd0-b662-7351abed847c/ziI4NFMwPL.lottie"
                      loop
                      autoplay
                      style={{ width: "100px", height: "100px" }}
                    />
              <div className="flex flex-col gap-y-1">
              <p className="p-1 text-white text-3xl">IPL Auction</p>
              <p className="p-1 text-white text-lg">Starting Soon...</p>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
};

export default LeftComponent;
