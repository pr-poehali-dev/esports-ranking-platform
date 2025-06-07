import { useState, useEffect } from "react";

interface Player {
  id: string;
  name: string;
  rating: number;
  rank: number;
}

interface Team {
  id: string;
  name: string;
  rating: number;
  rank: number;
}

const initialPlayers = [
  "Fade",
  "Xenoxz",
  "Dani",
  "Madper",
  "Flim",
  "Zandor",
  "Wewevof",
  "bleaff",
  "hedwig",
  "zaiko",
  "Mikus",
  "Yoshimura",
  "Danone",
  "Chieva",
  "Sankidd",
  "Mabo",
  "Jyro",
  "Silent",
  "Shafir",
  "Bloody",
  "Lucas",
  "Lorex",
  "Campion",
  "Frank",
  "Xineos",
  "Rashen",
  "Уго",
  "Amka",
  "Yarch",
  "Switch",
  "Zink",
  "Xazz",
  "Clash",
  "Hatacke",
  "Zeleek",
  "Nobita",
  "Outplayer",
  "Dezeent",
  "Ratik",
  "Саньок",
  "Retka",
  "Sadeo",
  "Sentinel",
  "Maz Bez",
  "Snow",
  "Пингвин",
  "Timoxa",
  "Ronax",
  "Lewry",
  "Кирилл",
  "Chiru",
  "Perfection",
  "DarkMaster",
  "Zmexcix",
  "Zak",
  "Maksimka",
  "Kyami",
  "Jesse pinkman",
  "Makaron",
  "Gotteally",
  "Готтеали",
  "Fayger",
  "Wolfor",
  "Dragon",
  "Astit",
  "lostee",
  "Weox",
  "Beliver",
  "Undertaker",
  "Evilboy",
  "Zobik",
  "Gargadan",
  "Leon",
  "KsiRix",
  "Forever",
  "Kurami",
  "Cloudy",
  "Exciting",
  "Owen",
  "An1sh",
  "Zaktempo",
  "Meloyy",
  "Decruel",
  "Simple kay",
  "Егорка Прайм",
  "slite",
  "patriot",
  "calvin klein",
  "Warent",
  "Tasherka",
  "Heltoxx",
  "Goodmart",
  "Hope",
  "Skrill",
];

const initialTeams = [
  "Ironclad",
  "Sky gaiming",
  "Paurigon-Z Academy",
  "Paurigon-Z emea",
  "hQd academy",
  "Pon",
  "Natare six",
  "LCG",
  "F/A Crabs",
  "AGS Fantasy",
  "MBT Summit",
  "Pride",
  "Oguzki",
  "Quest gaiming",
  "ChurkaSquad",
  "Петухи",
  "F/A Peremoga",
  "Lunacy",
  "Brave Beavers",
  "Salad Drip",
  "RPG",
  "Глисты",
  "Timbaumba",
];

const generateRandomRating = () => Math.floor(Math.random() * 2000) + 1000;

const createInitialData = () => {
  const players = initialPlayers.map((name, index) => ({
    id: `player-${index}`,
    name,
    rating: generateRandomRating(),
    rank: 0,
  }));

  const teams = initialTeams.map((name, index) => ({
    id: `team-${index}`,
    name,
    rating: generateRandomRating(),
    rank: 0,
  }));

  return { players, teams };
};

const calculateRanks = <T extends { rating: number }>(items: T[]): T[] => {
  return items
    .sort((a, b) => b.rating - a.rating)
    .map((item, index) => ({ ...item, rank: index + 1 }));
};

export const useRankingData = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("cyber-rankings");
    if (savedData) {
      const { players: savedPlayers, teams: savedTeams } =
        JSON.parse(savedData);
      setPlayers(calculateRanks(savedPlayers));
      setTeams(calculateRanks(savedTeams));
    } else {
      const { players: initialPlayersData, teams: initialTeamsData } =
        createInitialData();
      const rankedPlayers = calculateRanks(initialPlayersData);
      const rankedTeams = calculateRanks(initialTeamsData);
      setPlayers(rankedPlayers);
      setTeams(rankedTeams);
      localStorage.setItem(
        "cyber-rankings",
        JSON.stringify({
          players: rankedPlayers,
          teams: rankedTeams,
        }),
      );
    }
  }, []);

  const updatePlayer = (playerId: string, newRating: number) => {
    const updatedPlayers = players.map((player) =>
      player.id === playerId ? { ...player, rating: newRating } : player,
    );
    const rankedPlayers = calculateRanks(updatedPlayers);
    setPlayers(rankedPlayers);
    localStorage.setItem(
      "cyber-rankings",
      JSON.stringify({
        players: rankedPlayers,
        teams,
      }),
    );
  };

  const updateTeam = (teamId: string, newRating: number) => {
    const updatedTeams = teams.map((team) =>
      team.id === teamId ? { ...team, rating: newRating } : team,
    );
    const rankedTeams = calculateRanks(updatedTeams);
    setTeams(rankedTeams);
    localStorage.setItem(
      "cyber-rankings",
      JSON.stringify({
        players,
        teams: rankedTeams,
      }),
    );
  };

  return {
    players,
    teams,
    updatePlayer,
    updateTeam,
  };
};
