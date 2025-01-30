import { Card, CardContent } from "../components/card";

const PlayerCard = ({ player }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg shadow-md rounded-xl p-4">
      <CardContent>
        <img src={player.player_image} alt={player.player_name} className="w-16 h-16 mx-auto rounded-full" />
        <h3 className="text-xl font-semibold text-center">{player.player_name}</h3>
        <p className="text-gray-300 text-center">Role: {player.category}</p>
        <p className="text-lg font-bold text-center">₹{player.final_price} Cr</p>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
