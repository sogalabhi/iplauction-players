import React, { useState, useEffect, useRef } from "react";
import PlayerCard from "./PlayerCard";
import LeftComponent from "./LeftComponent";
import Overview from "./Overview";

import { Link } from 'react-router-dom';
import ReactConfetti from "react-confetti";
import { markPlayerAsSold } from "../../utils/updatePlayer";
import { fetchTeamsWithSquads } from "../../utils/teamswithplayers";
import { fetchUnsoldPlayers } from "../../utils/getUnSoldPlayers";
import { updatePurseOfTeam } from "../../utils/updateTeam";

const CenterComponent = ({ initteamlist, initplayersList }) => {
  const [isPlayerSold, setIsPlayerSold] = useState(false);
  const [showPlayerCard, setShowPlayerCard] = useState(false);
  const [showHammer, setShowHammer] = useState(false);
  const [currentBidder, setCurrentBidder] = useState(null);
  const [currentBidderId, setCurrentBidderId] = useState(0);
  const [currentBid, setCurrentBid] = useState(0);
  const [playersList, setPlayersList] = useState(initplayersList);
  const [teamsList, setTeamsList] = useState(initteamlist);
  useEffect(() => {
    setPlayersList(initplayersList);
  }, [initplayersList])
  useEffect(() => {
    if (!showPlayerCard)
      getTeamAndPlayers();
  }, [])

  useEffect(() => {
    setTeamsList(initteamlist);
  }, [initteamlist])
  const getTeamAndPlayers = async () => {
    fetchUnsoldPlayers().then((players) => {
      setPlayersList(players);
    });
    fetchTeamsWithSquads().then((teams) => {
      setTeamsList(teams);
    });
  }

  const markAsSold = async () => {
    setShowHammer(true);
    var player = playersList[0];
    const { id, final_price, sold_to_team_id, sold_to_team } = player;
    try {
      await markPlayerAsSold(id, final_price, sold_to_team_id, sold_to_team);
    } catch (error) {
      console.error("Error in marking as sold:", error.message);
    }
    var team = teamsList[sold_to_team_id - 1];
    team.purse = team.purse - final_price;
    try {
      await updatePurseOfTeam(sold_to_team_id, team.purse);
    } catch (error) {
      console.error("Error in marking as sold:", error.message);
    }
    setTimeout(() => {
      setShowHammer(false);
      setShowPlayerCard(true);
      setIsPlayerSold(true);
    }, 2000);
  };


  const nextPlayer = async () => {
    setShowPlayerCard(false);
    setIsPlayerSold(false);
    setCurrentBid(0);
    setCurrentBidderId(0);
    setCurrentBidder(null);
    await getTeamAndPlayers();
  };

  const markAsUnSold = async () => {

    try {
      await markPlayerAsSold(playersList[0].id, 0, -1, null);
    } catch (error) {
      console.error("Error in marking as unsold:", error.message);
    }
    setCurrentBid(0);
    setCurrentBidderId(0);
    setCurrentBidder(null);
    await getTeamAndPlayers();
  }
  const handleKeyPress = async (event) => {
    var key = event.key;
    if (key >= 0 && key <= teamsList.length) {
      if (key == 0) {
        key = 10;
      }
      setCurrentBid((prevBid) => {
        let final_bid;
        if (prevBid === 0) {
          final_bid = playersList[0].base_price;
        }
        else if (prevBid === 150) {
          final_bid = prevBid + 10;
        }
        else if (prevBid < 100) {
          final_bid = prevBid + 10;
        } else if (prevBid < 500) {
          final_bid = prevBid + 20;
        } else {
          final_bid = prevBid + 50;
        }
        var bidding_team = teamsList[key - 1].name;
        var bidding_team_purse = teamsList[key - 1].purse;
        if (final_bid > bidding_team_purse) {
          return prevBid;
        }
        else {
          setCurrentBidder(bidding_team);
          setCurrentBidderId(key);
          try {
            setPlayersList(prevList => {
              const updatedList = [...prevList];
              updatedList[0] = { ...updatedList[0], final_price: final_bid, sold_to_team_id: parseInt(key), sold_to_team: bidding_team };
              return updatedList;
            });
          } catch (error) {
            console.error('Error during bidding:', error.message);
          }
        }
        return final_bid;
      });

    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [teamsList]);

  return (
    <div className={`min-h-screen bg-[#193153]  text-white`}>
      <video src=
        "https://ykpijunxogyxoiveffdq.supabase.co/storage/v1/object/public/video//video_2025-01-28%2022_42_02.webm"
        autoplay="{true}" loop muted
        className="absolute w-auto h-full max-h-full object-cover opacity-40 z-0"></video>
      <img src="https://ecell.nitk.ac.in/navLogo.png" alt="" className="w-40 absolute z-40 top-5 left-4" />
      <img src="https://ecell.nitk.ac.in/incub8L.png" alt="" className="w-32 absolute z-40 top-4 right-4" />
      {!isPlayerSold && !showPlayerCard && (
        <div className="py-1 relative z-10">
          <h1 className="text-center text-5xl pt-2 relative z-10 heading-font" style={{ textShadow: "4px 4px 0px #4f829c" }}>IPL MOCK AUCTION</h1>
          <h2 className="text-center text-lg pt-4">Sponsored by</h2>
          <div className="flex justify-center items-center gap-4  mt-2">
            <img src="https://ecellnitk.netlify.app/sponsors/sponsor13.png" className=" bg-white p-2 h-10 rounded-full hover:scale-105 transition" alt="" />
            <div className="w-24 h-10 overflow-hidden rounded-full bg-white flex items-center justify-center">
              <img
                src="https://ecellnitk.netlify.app/sponsors/sponsor7.png"
                className="h-8 w-full object-cover transition-transform duration-300 hover:scale-110"
                alt="Sponsor Logo"
              />
            </div>
            <div className="w-24 h-10 p-2 overflow-hidden rounded-full bg-white flex items-center justify-center">
              <img
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcScjLrrFN2bwj-z-AsXUtrzZnR4_OI-3w-XkNC0ngVPsLUrdyCy"
                className="h-8 w-full object-cover transition-transform duration-300 hover:scale-110"
                alt="Sponsor Logo"
              />
            </div>
            <img src="https://ecellnitk.netlify.app/sponsors/sponsor14.png" className=" bg-white p-2 h-10 rounded-full hover:scale-105 transition" alt="" />
            <img src="https://ecellnitk.netlify.app/sponsors/sponsor1.png" className=" bg-white p-2 h-10 rounded-full hover:scale-105 transition" alt="" />
          </div>
          <div className="relative flex justify-center items-center">
            <div className="flex-1 pl-10">
              <LeftComponent />
            </div>
            <div className="relative flex-1 mt-20">
              {playersList.length > 0 && <PlayerCard
                markAsUnSold={markAsUnSold}
                markAsSold={markAsSold}
                player={playersList[0]}
                onSold={setIsPlayerSold}
                isPlayerSold={isPlayerSold}
                showPlayerCard={showPlayerCard}
                showHammer={showHammer}
                currentBidder={currentBidder}
                currentBid={currentBid}
              />}
              {playersList.length == 0 &&
                <div className="text-center">
                  <h1 className="text-2xl mb-5">No Players Left</h1>
                  <Link
                    to={"/teamswithsquad"}
                    className="flexw-36 h-12 max-w-xs bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Team Squad
                  </Link>
                </div>
              }
            </div>
            <div className="flex-1">
              <Overview />
            </div>
          </div>

        </div>
      )
      }


      {
        showPlayerCard && (
          <div className="flex flex-col items-center">
            {isPlayerSold && (
              <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
            )}
            <h1 className="text-center pt-2 relative heading-font text-5xl mt-6 py-8 mb-20 z-20" style={{ textShadow: "4px 4px 0px #4f829c" }}>Player Sold</h1>
            {playersList.length > 0 && <PlayerCard
              key={0}
              player={playersList[0]}
              onSold={setIsPlayerSold}
              currentBidder={currentBidder}
              currentBid={currentBid}
              showPlayerCard={showPlayerCard}
            />}
            <div className="text-center mt-4 flex gap-4">
              <button
                onClick={nextPlayer}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 relative z-30"
              >
                Next Player
              </button>

              <Link
                to={"/break"}
                className="relative z-30 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Break
              </Link>
              <Link
                to={"/teamswithsquad"}
                className="relative z-30 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Team Squad
              </Link>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default CenterComponent;
