type ThemeMode = "light" | "dark";
export const changeTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if(mode === "dark"){
        root.classList.add("dark");
    }else{
        root.classList.remove("dark");
    }
    localStorage.setItem("theme", mode);
}