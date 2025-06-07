import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  onLoginClick: () => void;
  isAdmin: boolean;
  onLogout: () => void;
}

const Header = ({ onLoginClick, isAdmin, onLogout }: HeaderProps) => {
  const [activeTab, setActiveTab] = useState("players");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveTab(sectionId);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900">
              <Icon
                name="Trophy"
                className="inline mr-2 text-purple-600"
                size={28}
              />
              Cyber Rankings
            </h1>
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => scrollToSection("players")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "players"
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Игроки
              </button>
              <button
                onClick={() => scrollToSection("teams")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "teams"
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                Команды
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Выйти
              </Button>
            ) : (
              <Button
                onClick={onLoginClick}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-purple-600"
              >
                <Icon name="Settings" size={16} className="mr-2" />
                Админ
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
