"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function ModeToggle() {
    const [theme, setTheme] = React.useState<"light" | "dark">("light");

    React.useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
        const initialTheme = savedTheme || systemTheme;

        setTheme(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative">
            <motion.div
                initial={false}
                animate={{
                    scale: theme === "dark" ? 1 : 0,
                    rotate: theme === "dark" ? 0 : 180,
                }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    scale: theme === "light" ? 1 : 0,
                    rotate: theme === "light" ? 0 : -180,
                }}
                transition={{ duration: 0.2 }}
            >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
