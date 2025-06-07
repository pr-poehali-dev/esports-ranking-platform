import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

interface Team {
  id: string;
  name: string;
  rating: number;
  rank: number;
}

interface TeamRankingTableProps {
  teams: Team[];
  isAdmin: boolean;
  onUpdateTeam: (teamId: string, newRating: number) => void;
}

const TeamRankingTable = ({
  teams,
  isAdmin,
  onUpdateTeam,
}: TeamRankingTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (team: Team) => {
    setEditingId(team.id);
    setEditValue(team.rating.toString());
  };

  const handleSave = (teamId: string) => {
    const newRating = parseInt(editValue);
    if (!isNaN(newRating) && newRating >= 0) {
      onUpdateTeam(teamId, newRating);
    }
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
          <Icon name="Shield" className="mr-3 text-purple-600" size={24} />
          Рейтинг команд
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
                <TableHead className="font-semibold">Команда</TableHead>
                <TableHead className="w-24 text-center font-semibold">
                  Рейтинг
                </TableHead>
                {isAdmin && (
                  <TableHead className="w-24 text-center font-semibold">
                    Действия
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow
                  key={team.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="text-center font-medium">
                    <div
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        team.rank === 1
                          ? "bg-yellow-100 text-yellow-800"
                          : team.rank === 2
                            ? "bg-gray-100 text-gray-800"
                            : team.rank === 3
                              ? "bg-orange-100 text-orange-800"
                              : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {team.rank}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {team.name}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingId === team.id ? (
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-20 text-center"
                        type="number"
                        min="0"
                      />
                    ) : (
                      <span className="font-semibold text-purple-600">
                        {team.rating}
                      </span>
                    )}
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-center">
                      {editingId === team.id ? (
                        <div className="flex justify-center space-x-1">
                          <Button
                            onClick={() => handleSave(team.id)}
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Icon name="Check" size={14} />
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Icon name="X" size={14} />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleEdit(team)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-purple-50"
                        >
                          <Icon name="Edit" size={14} />
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamRankingTable;
