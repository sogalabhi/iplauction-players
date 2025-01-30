import React, { useState, useEffect } from "react";
import { useRealtimeAuction } from "../lib/useRealtimeAuction"; // Reuse your hook
import { formatPriceInLakhs } from "../lib/lakhstocr";

const PlayerTable = () => {
    const { players } = useRealtimeAuction();  // Get the real-time players' data
    const [sortBy, setSortBy] = useState(null); // Tracks the column to sort by
    const [ascending, setAscending] = useState(true); // Tracks the sort order
    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
    const [playersPerPage, setPlayersPerPage] = useState(10); // Players per page

    // Sorting function
    const sortData = (data) => {
        if (!sortBy) return data;

        return [...data].sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return ascending ? -1 : 1;
            if (a[sortBy] > b[sortBy]) return ascending ? 1 : -1;
            return 0;
        });
    };

    // Sort handler
    const handleSort = (column) => {
        setSortBy(column);
        setAscending((prev) => (sortBy === column ? !prev : true)); // Toggle the sorting order
    };

    const sortedData = sortData(players);

    // Pagination logic
    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = sortedData.slice(indexOfFirstPlayer, indexOfLastPlayer);

    const totalPages = Math.ceil(sortedData.length / playersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePlayersPerPageChange = (e) => {
        setPlayersPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to the first page when the players per page option changes
    };
    function refreshPage() {
        window.location.reload();
    }
    return (
        <div className="p-6 bg-gray-900 text-white mt-10">
            <button type="button" className="absolute top-10 left-10" onClick={refreshPage}> <span>Reload</span> </button>

            <h1 className="text-3xl font-bold text-center mb-6">Player Stats Table</h1>

            {/* Players Per Page Selection */}
            <div className="mb-4 flex justify-end gap-x-5 items-center">
                <label className="text-lg">Players per page:</label>
                <select
                    className="bg-gray-700 text-white p-2 rounded"
                    value={playersPerPage}
                    onChange={handlePlayersPerPageChange}
                >
                    {[15, 20, 50, 100].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table Section */}
            <table className="w-full table-auto">
                <thead className="bg-gray-800">
                    <tr>
                        <th
                            className="px-4 py-2"
                        >
                            Image
                        </th>
                        <th
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort("player_name")}
                        >
                            Player Name
                        </th>
                        <th
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort("sold_to_team")}
                        >
                            Team Name
                        </th>
                        <th
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort("runs")}
                        >
                            Runs
                        </th>
                        <th
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort("wickets")}
                        >
                            Wickets
                        </th>
                        <th
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort("bat_avg")}
                        >
                            Batting Avg
                        </th>
                        <th
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort("bowl_avg")}
                        >
                            Bowling Avg
                        </th>
                        <th
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort("base_price")}
                        >
                            Base Price (₹)
                        </th>
                        <th
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort("final_price")}
                        >
                            Final Price (₹)
                        </th>
                        <th
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort("catches")}
                        >
                            Catches
                        </th>
                        <th
                            className="px-4 py-2 cursor-pointer"
                            onClick={() => handleSort("stumpings")}
                        >
                            Stumpings
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentPlayers.map((player) => (
                        <tr key={player.id}>
                            <td className="px-4 py-2"><img src={player.player_image} alt="" className="h-40 mx-auto" /></td>
                            <td className="px-4 py-2">{player.player_name}</td>
                            <td className="px-4 py-2">{player.sold_to_team}</td>
                            <td className="px-4 py-2">{player.runs}</td>
                            <td className="px-4 py-2">{player.wickets}</td>
                            <td className="px-4 py-2">{player.bat_avg}</td>
                            <td className="px-4 py-2">{player.bowl_avg}</td>
                            <td className="px-4 py-2">{formatPriceInLakhs(player.base_price)}</td>
                            <td className="px-4 py-2">{formatPriceInLakhs(player.final_price)}</td>
                            <td className="px-4 py-2">{player.catches}</td>
                            <td className="px-4 py-2">{player.stumpings}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-l"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx}
                        className={`px-4 py-2 ${currentPage === idx + 1 ? "bg-gray-700" : "bg-gray-600"} text-white`}
                        onClick={() => handlePageChange(idx + 1)}
                    >
                        {idx + 1}
                    </button>
                ))}

                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-r"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PlayerTable;
