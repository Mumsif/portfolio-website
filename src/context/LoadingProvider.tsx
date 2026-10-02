import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

const checkIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 1024 || "ontouchstart" in window;
};

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(() => {
    // Never show full-screen 3D loader on mobile/tablet screens
    if (checkIsMobile()) return false;
    return true;
  });
  const [loading, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  useEffect(() => {
    if (checkIsMobile()) {
      // Ensure scrolling is immediately unlocked on mobile
      document.body.style.overflow = "auto";
      document.body.style.overflowY = "auto";
      import("../components/utils/initialFX").then((module) => {
        if (module.initialFX) {
          setTimeout(() => {
            module.initialFX();
          }, 50);
        }
      });
    } else {
      // Safety fallback: if desktop 3D loader hangs or WebGL fails, dismiss loader after 3.5s
      const fallbackTimer = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "auto";
        document.body.style.overflowY = "auto";
      }, 3500);

      return () => clearTimeout(fallbackTimer);
    }
  }, []);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
