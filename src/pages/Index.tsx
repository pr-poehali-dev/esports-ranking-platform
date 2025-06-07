import { useState } from "react";
import Header from "@/components/Header";
import PlayerRankingTable from "@/components/PlayerRankingTable";
import TeamRankingTable from "@/components/TeamRankingTable";
import LoginForm from "@/components/LoginForm";
import { useRankingData } from "@/hooks/useRankingData";

const ADMIN_PASSWORD = "Retka123";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { players, teams, updatePlayer, updateTeam } = useRankingData();

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLoginClick={() => setIsLoginOpen(true)}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cyber Rankings
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Официальный рейтинг киберспортсменов и команд
          </p>
          <p className="text-sm text-gray-500">
            Проект создан{" "}
            <span className="font-semibold text-purple-600">TG Rosters</span> с
            помощью набранной комиссии
          </p>
        </div>

        {/* Players Table */}
        <section id="players" className="mb-12">
          <PlayerRankingTable
            players={players}
            isAdmin={isAdmin}
            onUpdatePlayer={updatePlayer}
          />
        </section>

        {/* Teams Table */}
        <section id="teams" className="mb-12">
          <TeamRankingTable
            teams={teams}
            isAdmin={isAdmin}
            onUpdateTeam={updateTeam}
          />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200 mt-16">
          <p className="text-gray-500 text-sm">
            © 2024 Cyber Rankings by TG Rosters. Все права защищены.
          </p>
        </footer>
      </main>

      <LoginForm
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
