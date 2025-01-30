import { useState, useEffect } from "react";
import { supabase } from "./supabase"; 

export const useRealtimeAuction = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const { data: playersData, error: playersError } = await supabase
                .from("CricketPlayers")
                .select("*")
                .order("time_of_selling", { ascending: true });

            const { data: teamsData, error: teamsError } = await supabase.from("Teams").select("*");

            if (playersError) console.error("Error fetching players:", playersError);
            if (teamsError) console.error("Error fetching teams:", teamsError);

            setPlayers(playersData || []);
            setTeams(teamsData || []);
        };

        fetchInitialData();

        // Realtime Subscription for Players Table (Only Listen for Changes)
        const playerSubscription = supabase
            .channel("realtime:CricketPlayers")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "CricketPlayers" },
                (payload) => {
                    console.log("Player data changed:", payload);
                    fetchInitialData(); // Re-fetch to reflect latest data
                }
            )
            .subscribe();

        // Realtime Subscription for Teams Table (Only Listen for Changes)
        const teamSubscription = supabase
            .channel("realtime:Teams")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "Teams" },
                (payload) => {
                    console.log("Team data changed:", payload);
                    fetchInitialData(); // Re-fetch to reflect latest data
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(playerSubscription);
            supabase.removeChannel(teamSubscription);
        };
    }, []);

    return { players, teams };
};
