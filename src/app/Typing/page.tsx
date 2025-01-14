import SettingsButton from "../../components/typing/SettingsButton";
import Settings from "../../components/typing/Settings";
import GameContainer from "../../components/typing/GameContainer";

export default function TypingGame() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <SettingsButton />
      <Settings />
      <GameContainer />
    </div>
  );
}
