import { useState, useEffect } from "react";
import { supabase } from "./supabase"; // Ensure this is correctly imported

export const useRealtimeAuction = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            const { data: playersData, error: playersError } = await supabase.from("CricketPlayers").select("*").order("time_of_selling", { ascending: true });
            const { data: teamsData, error: teamsError } = await supabase.from("Teams").select("*");

            if (playersError) console.error("Error fetching players:", playersError);
            if (teamsError) console.error("Error fetching teams:", teamsError);

            setPlayers(playersData || []);
            setTeams(teamsData || []);
        };

        fetchInitialData();

        // ✅ Use supabase.channel() for Realtime Subscriptions
        const playerSubscription = supabase
            .channel("realtime:CricketPlayers")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "CricketPlayers" },
                (payload) => {
                    console.log("Realtime Update:", payload);
                    setPlayers((prev) => {
                        if (payload.eventType === "INSERT") return [...prev, payload.new];
                        if (payload.eventType === "UPDATE") return prev.map((p) => (p.id === payload.new.id ? payload.new : p));
                        return prev;
                    });
                }
            )
            .subscribe();

        const teamSubscription = supabase
            .channel("realtime:Teams")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "Teams" },
                (payload) => {
                    console.log("Realtime Team Update:", payload);
                    setTeams((prev) => {
                        if (payload.eventType === "INSERT") return [...prev, payload.new];
                        if (payload.eventType === "UPDATE") return prev.map((t) => (t.id === payload.new.id ? payload.new : t));
                        return prev;
                    });
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
