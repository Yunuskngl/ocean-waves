"use client";

import { useLoadingStore } from "./store/loading-store";
import ShortLoadingScreen from "./components/ui/short-loading";

export default function GlobalLoadingScreen() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const message = useLoadingStore((state) => state.message);

  if (!isLoading) {
    return null;
  }

  return (
    <ShortLoadingScreen 
      message={message} 
      variant="fullscreen" 
      size="lg"
    />
  );
}

