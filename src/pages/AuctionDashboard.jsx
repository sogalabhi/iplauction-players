import { useState } from "react";
import { useRealtimeAuction } from "../lib/useRealtimeAuction";
import PlayerCard from "./PlayerCard";
import { Card, CardContent } from "../components/card";
import { getPlayersByTeam } from "../lib/get_team_squad"; // Import the function
import PlayerTable from "./PlayerTable";
import { formatPriceInLakhs } from "../lib/lakhstocr"; // Import the function
const AuctionDashboard = () => {
    const { players, teams, teamLogos } = useRealtimeAuction();
    const [teamPlayers, setTeamPlayers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const mostExpensive = players.reduce(
        (max, p) => (p.final_price > max.final_price ? p : max),
        { final_price: 0 }
    );
    const lastSold = players[players.length - 1];

    // Handle team card click to show the players bought by the team
    const handleTeamClick = async (teamId) => {
        const playersBought = await getPlayersByTeam(teamId);
        setTeamPlayers(playersBought);
        setShowModal(true);
    };
    const getTeamLogo = (teamId) => teamLogos[teamId] || "";
    var team_colors = ['740622', '101dc3', '545978', 'd0062f', 'e54e6a', '32323f', '2f9cbd', '35c2c6', 'eb5c03', 'FCCC10'];
    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold text-center mb-4">🏏 IPL Mock Auction</h1>
            {/* Highlights Section */}
            <div className="my-10 flex flex-col md:flex-row justify-center gap-6 ">
                <div className={`p-6 backdrop-blur-md rounded-xl bg-[#${team_colors[mostExpensive.sold_to_team_id - 1]}] shadow-lg`}>
                    <h2 className="text-xl font-semibold text-center">💰 Most Expensive Player</h2>
                    {mostExpensive.player_name ? (
                        <div className="flex items-center p-4 rounded-lg">
                            {/* Player Image */}
                            <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden mr-4">
                                <img src={mostExpensive.player_image} alt={mostExpensive.player_name} className="w-full h-full object-cover" />
                            </div>
                            {/* Player Details */}
                            <div className="flex-grow text-white">
                                <h3 className="text-2xl font-bold">{mostExpensive.player_name}</h3>
                                <p className="text-lg">Final Price: ₹{formatPriceInLakhs(mostExpensive.final_price)}</p>
                            </div>
                            {/* Team Logo */}
                            <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden ml-4">
                                <img src={getTeamLogo(mostExpensive.sold_to_team_id)} alt="Team Logo" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400">No players sold yet.</p>
                    )}
                </div>
                {lastSold && (
                    <div className={`p-6 backdrop-blur-md rounded-xl bg-[#${team_colors[lastSold.sold_to_team_id - 1]}] shadow-lg`}>
                        <h2 className="text-xl font-semibold text-center">📢 Last Sold Player</h2>

                        <div className="flex items-center p-4 rounded-lg">
                            {/* Player Image */}
                            <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden mr-4">
                                <img src={lastSold.player_image} alt={lastSold.player_name} className="w-full h-full object-cover" />
                            </div>
                            {/* Player Details */}
                            <div className="flex-grow text-white">
                                <h3 className="text-2xl font-bold">{lastSold.player_name}</h3>
                                <p className="text-lg">Final Price: ₹{formatPriceInLakhs(lastSold.final_price)}</p>
                            </div>
                            {/* Team Logo */}
                            <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden ml-4">
                                <img src={getTeamLogo(lastSold.sold_to_team_id)} alt="Team Logo" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                )}
            </div>


            {/* Teams Section */}
            <h1 className="text-3xl font-bold text-center">Teams</h1>
            <h1 className="text-center mb-4">Click to view the squad</h1>
            <div className="grid grid-cols-5 px-5 gap-4 justify-center">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className="p-4 bg-white/10 backdrop-blur-lg rounded-xl cursor-pointer"
                        onClick={() => handleTeamClick(team.id)} // Open popup with team players
                    >
                        <img
                            src={team.team_logo}
                            alt={team.team_name}
                            className="w-16 h-16 mx-auto"
                        />
                        <h2 className="text-xl font-semibold">{team.team_name}</h2>
                        <p className="text-gray-300">Purse: ₹{formatPriceInLakhs(team.purse)} Cr</p>
                    </div>
                ))}
            </div>


            {/* Modal for displaying players bought by the team */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                    <div className="bg-gray-900/50 backdrop-blur-md  p-6 rounded-xl w-1/2">
                        <h2 className="text-xl font-semibold mb-4">
                            Players Bought by {teamPlayers[0]?.sold_to_team?.team_name || "Team"}
                        </h2>
                        <button
                            onClick={() => setShowModal(false)}
                            className="text-sm text-red-500 mb-4"
                        >
                            Close
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {teamPlayers.map((player) => (
                                <PlayerCard key={player.id} player={player} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <PlayerTable />
        </div>
    );
};

export default AuctionDashboard;
