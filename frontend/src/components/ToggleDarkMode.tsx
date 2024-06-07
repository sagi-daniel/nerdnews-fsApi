import { FiSun, FiMoon } from "react-icons/fi";
import { useDarkMode } from "../context/DarkModeContext";

function ToggleDarkMode() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative inline-block w-10 h-5 cursor-pointer"
        onClick={toggleDarkMode}
      >
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition duration-300 ${
            isDarkMode ? "bg-bg-light" : "bg-bg-dark"
          }`}
        ></div>
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            isDarkMode
              ? "translate-x-5 bg-bg-dark text-txt-dark"
              : "bg-bg-light text-txt-light"
          }`}
          style={{
            transform: isDarkMode ? "translateX(1.25rem)" : "translateX(0)",
          }}
        >
          {isDarkMode ? (
            <FiSun className="size-3 " />
          ) : (
            <FiMoon className="size-3 " />
          )}
        </div>
      </div>
    </div>
  );
}

export default ToggleDarkMode;
