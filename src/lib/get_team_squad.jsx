import { supabase } from "./supabase"; 

// Function to fetch players bought by a given team
export const getPlayersByTeam = async (teamId) => {
    const { data, error } = await supabase
        .from("CricketPlayers")
        .select("*")
        .eq("sold_to_team_id", teamId);

    if (error) {
        console.error("Error fetching players by team:", error);
        return [];
    }

    return data;
};
