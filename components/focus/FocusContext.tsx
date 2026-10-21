"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { soundEngine } from "./soundEngine";

export type SoundscapeType = "none" | "rain" | "coffee" | "forest" | "vinyl";

interface FocusContextType {
  isActive: boolean;
  isPaused: boolean;
  secondsLeft: number;
  totalSeconds: number;
  taskTitle: string;
  soundscape: SoundscapeType;
  volume: number;
  startFocus: (title?: string, durationMinutes?: number) => void;
  pauseFocus: () => void;
  resumeFocus: () => void;
  resetFocus: () => void;
  setSoundscape: (type: SoundscapeType) => void;
  setVolume: (vol: number) => void;
  formattedTime: string;
}

const FocusContext = createContext<FocusContextType | null>(null);

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(45 * 60);
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);
  const [taskTitle, setTaskTitle] = useState("Design UI Kit & Tokens");
  const [soundscape, setSoundscapeState] = useState<SoundscapeType>("none");
  const [volume, setVolumeState] = useState(0.5);

  // Ticking Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !isPaused && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => Math.max(0, s - 1));
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      setIsPaused(false);
      if (soundEngine) soundEngine.stop();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, secondsLeft]);

  const startFocus = (title = "Design UI Kit & Tokens", durationMinutes = 45) => {
    const total = durationMinutes * 60;
    setTaskTitle(title);
    setTotalSeconds(total);
    setSecondsLeft(total);
    setIsActive(true);
    setIsPaused(false);

    if (soundscape !== "none" && soundEngine) {
      soundEngine.play(soundscape, volume);
    }
  };

  const pauseFocus = () => {
    setIsPaused(true);
    if (soundEngine) soundEngine.stop();
  };

  const resumeFocus = () => {
    setIsPaused(false);
    if (soundscape !== "none" && soundEngine) {
      soundEngine.play(soundscape, volume);
    }
  };

  const resetFocus = () => {
    setIsActive(false);
    setIsPaused(false);
    setSecondsLeft(totalSeconds);
    if (soundEngine) soundEngine.stop();
  };

  const setSoundscape = (type: SoundscapeType) => {
    setSoundscapeState(type);
    if (isActive && !isPaused && soundEngine) {
      soundEngine.play(type, volume);
    } else if (type === "none" && soundEngine) {
      soundEngine.stop();
    }
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    if (soundEngine) {
      soundEngine.setVolume(vol);
    }
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <FocusContext.Provider
      value={{
        isActive,
        isPaused,
        secondsLeft,
        totalSeconds,
        taskTitle,
        soundscape,
        volume,
        startFocus,
        pauseFocus,
        resumeFocus,
        resetFocus,
        setSoundscape,
        setVolume,
        formattedTime,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error("useFocus must be used within a FocusProvider");
  }
  return context;
}
