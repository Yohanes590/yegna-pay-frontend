"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("dark");
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        const saved = localStorage.getItem("yegna_theme") as Theme | null;
        // Default to dark mode unless explicitly set to light
        const effective: "light" | "dark" = saved === "light" ? "light" : "dark";
        setThemeState(effective);
        setResolvedTheme(effective);
        if (effective === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        let effective: "light" | "dark" = "dark";

        if (theme === "system") {
            effective = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        } else {
            effective = theme === "light" ? "light" : "dark";
        }

        setResolvedTheme(effective);

        if (effective === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("yegna_theme", effective);
    }, [theme]);

    const setTheme = (t: Theme) => {
        setThemeState(t);
    };

    const toggleTheme = () => {
        setThemeState((prev) => {
            const next = prev === "dark" ? "light" : "dark";
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

const defaultContext: ThemeContextType = {
    theme: "system",
    resolvedTheme: "dark",
    setTheme: () => {},
    toggleTheme: () => {},
};

export function useTheme() {
    const ctx = useContext(ThemeContext);
    return ctx || defaultContext;
}

