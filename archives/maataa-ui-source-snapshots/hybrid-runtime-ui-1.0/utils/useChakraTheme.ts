export const useChakraTheme = () => {
    const setTheme = (mode: "light" | "dark") =>
      document.documentElement.setAttribute("data-theme", mode);
    return { setTheme };
  };
  