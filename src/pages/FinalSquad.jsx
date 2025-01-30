import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTeamsWithSquads } from "../utils/teamswithplayers";

const roleIcons = {
  "Batsmen": "🏏",
  "WK": "🧤",
};

const TeamsWithCompactDesign = () => {

  const [teamswithsquad, setTeamsWithSquad] = useState([]);
  const getAllTeamswithplayers = async () => {
    fetchTeamsWithSquads().then((teams) => {
      setTeamsWithSquad(teams);
    });
  }
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
  useEffect(() => {
    getAllTeamswithplayers();
  }, [])

  return (
    <div className="p-4 bg-[url('https://ykpijunxogyxoiveffdq.supabase.co/storage/v1/object/sign/teamlogo/bg.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZWFtbG9nby9iZy5qcGciLCJpYXQiOjE3Mzc2NjkyMTksImV4cCI6MTc2OTIwNTIxOX0.EV0N-PHzI_vLLYN6ImccszenCZbYuHWPf_DQ_5nWOaw&t=2025-01-23T21%3A53%3A36.437Z')] bg-no-repeat bg-cover from-[#361602] from-40% to-[#021e31] min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-6xl font-extrabold text-center mt-2 mb-4 tracking-wide animate-pulse text-white">
        Teams Squad
      </h1>
      <Link
        to={"/"}
        className="absolute top-5 left-10 bg-green-500 text-white px-4 py-2 my-2 rounded hover:bg-green-600"
      >
        Home
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {teamswithsquad.map((team, index) => (
          <div
            key={index}
            className="border min-h-60 rounded-xl shadow-lg bg-gradient-to-tr from-gray-100 to-white transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out"
          >
            {/* Team Header */}
            <div
              className={`px-4 py-3 rounded-t-xl  flex flex-row justify-between items-center text-${team.textColor}`}
              style={{
                background: `linear-gradient(to bottom right, #${team.color1}, #${team.color2})`,
              }}
            >
              <div>
                <h2 className="text-lg font-extrabold">{team.name}</h2>
                <p className="text-xs font-medium">
                  Purse Balance: {formatPriceInLakhs(team.purse)}
                </p>
              </div>
              <img
                src={`${team.teamLogo}`}
                alt={team.name}
                className="h-14 w-14 rounded-full border-2 border-white"
              />
            </div>

            {/* Squad Section */}
            <div className="grid grid-cols-2 gap-1 px-2 py-1">
              {/* First column */}
              <ul>
                {team.squad.slice(0, Math.ceil(team.squad.length / 2)).map((player, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-gray-200 p-2 my-1 rounded-lg transform hover:bg-gray-300 transition duration-200"
                  >
                    <div className="flex items-center justify-even">
                      <span className="text-[8px]   text-gray-800 font-semibold mr-2">
                        {player.name}
                      </span>
                      {player.isOverseas && (
                        <img src="https://cdn-icons-png.flaticon.com/512/723/723955.png" alt="ball" className="w-3 absolute right-0 top-0" />
                      )}
                      {
                        (player.role == "Batsman") && <img src="https://cdn-icons-png.flaticon.com/512/1454/1454437.png" alt="ball" className="w-3 absolute right-4" />
                      }
                      {
                        (player.role == "Bowler") && <img src="https://cdn-icons-png.flaticon.com/512/5140/5140352.png" alt="ball" className="w-3 absolute right-4" />
                      }
                      {
                        (player.role == "Wicket Keeper") && <img src="https://cdn-icons-png.flaticon.com/512/13132/13132322.png" alt="ball" className="w-3 absolute right-4" />
                      }
                      {
                        (player.role == "All Rounder") && <img src="https://cdn-icons-png.flaticon.com/512/9097/9097536.png" alt="ball" className="w-3 absolute right-4" />
                      }
                    </div>
                  </li>
                ))}
              </ul>

              {/* Second column */}
              <ul>
                {team.squad.slice(Math.ceil(team.squad.length / 2)).map((player, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-gray-200 px-1 p-2 my-1 rounded-lg transform hover:bg-gray-300 transition duration-200"
                  >
                    <div className="flex items-center">
                      <span className="text-[8px] text-gray-800 font-semibold mr-2">
                        {player.name}
                      </span>
                      {player.isOverseas && (
                        <img src="https://cdn-icons-png.flaticon.com/512/723/723955.png" alt="ball" className="w-3 absolute right-0 top-0" />
                      )}
                      {
                        (player.role == "Batsman") && <img src="https://cdn-icons-png.flaticon.com/512/1454/1454437.png" alt="ball" className="w-3 absolute right-4" />
                      }
                      {
                        (player.role == "Bowler") && <img src="https://cdn-icons-png.flaticon.com/512/5140/5140352.png" alt="ball" className="w-3 absolute right-4" />
                      }
                      {
                        (player.role == "Wicket Keeper") && <img src="https://cdn-icons-png.flaticon.com/512/13132/13132322.png" alt="ball" className="w-3 absolute right-4" />
                      }
                      {
                        (player.role == "All Rounder") && <img src="https://cdn-icons-png.flaticon.com/512/9097/9097536.png" alt="ball" className="w-3 absolute right-4" />
                      }
                    </div>

                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsWithCompactDesign;
