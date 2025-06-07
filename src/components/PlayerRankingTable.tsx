import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Icon from "@/components/ui/icon";

interface Player {
  id: string;
  name: string;
  rank: number;
}

interface PlayerRankingTableProps {
  players: Player[];
  isAdmin: boolean;
}

const PlayerRankingTable = ({ players, isAdmin }: PlayerRankingTableProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
          <Icon name="Users" className="mr-3 text-purple-600" size={24} />
          Рейтинг игроков
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center font-semibold">
                  Место
                </TableHead>
                <TableHead className="font-semibold">Игрок</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow
                  key={player.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-center font-medium">
                    <div
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        player.rank === 1
                          ? "bg-yellow-100 text-yellow-800"
                          : player.rank === 2
                            ? "bg-gray-100 text-gray-800"
                            : player.rank === 3
                              ? "bg-orange-100 text-orange-800"
                              : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {player.rank}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {player.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerRankingTable;
