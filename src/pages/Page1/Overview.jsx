import React, { useEffect, useState } from "react";
import { fetchTeamsWithSquads } from "../../utils/teamswithplayers";

const Overview = () => {

  const [teams, setTeams] = useState([]);
  const getAllTeamswithplayers = async () => {
    fetchTeamsWithSquads().then((teamslist) => {
      setTeams(teamslist);
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
    <div className="w-11/12 mx-5 max-w-4xl bg-white/10 hover:bg-white/5 cursor-default hover:scale-105 transition backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6">
      <h2 className="text-2xl font-bold text-white text-center">Team Overview</h2>
      <table className="table-auto w-full text-left  border-0">
        <thead className="">
          <tr>
            <th className="p-2 ">ID</th>
            <th className="p-2 ">Team Name</th>
            <th className="p-2 text-center">No. of Players</th>
            <th className="p-2 text-right">Funds Remaining</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr key={idx} className="hover:bg-white/5 rounded-lg">
              <td className="p-2">{team.team_id}</td>
              <td className="p-2">{team.name}</td>
              <td className="p-2 text-center">{team.playerCount}</td>
              <td className="p-2 text-right">₹{formatPriceInLakhs(team.purse)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Overview;
