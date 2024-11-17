export const useTheme = () => {
  const isDarkMode = ref(false);

  const setDarkMode = (toggle) => {
    isDarkMode.value = toggle;
    document.documentElement.classList.toggle("dark", toggle);
    localStorage.setItem("theme-color", toggle ? "dark" : "light");
  };

  const loadDarkMode = () => {
    const savedTheme = localStorage.getItem("theme-color");
    const isDark = savedTheme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    isDarkMode.value = isDark;
  };

  const toggleDarkMode = () => setDarkMode(!isDarkMode.value);

  onMounted(() => {
    loadDarkMode();
  });

  return { isDarkMode, setDarkMode, toggleDarkMode };
};
