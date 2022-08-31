import React, { useContext } from "react";
import Switch from "react-switch";
import { ThemeContext } from "../../App";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="header-toggle">
      <h4>{theme} mode</h4>
      <Switch
        onChange={handleThemeToggle}
        checked={theme === "light"}
        uncheckedIcon={false}
        checkedIcon={false}
        onColor={"#eee"}
      />
    </div>
  );
};

export default ThemeToggle;
