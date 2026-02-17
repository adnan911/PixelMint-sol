import { useState, useCallback, useRef } from "react";

interface UseHistoryReturn<T> {
  state: T;
  setState: (newState: T, shouldOverwrite?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clearHistory: () => void;
}

/**
 * Custom hook for managing undo/redo history
 * Maintains a history stack with a maximum size
 * Uses refs to avoid stale closure issues
 */
export const useHistory = <T>(
  initialState: T,
  maxHistory = 20
): UseHistoryReturn<T> => {
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use refs to track the latest values and avoid stale closures
  const historyRef = useRef(history);
  const currentIndexRef = useRef(currentIndex);
  
  // Update refs whenever state changes
  historyRef.current = history;
  currentIndexRef.current = currentIndex;

  const setState = useCallback(
    (newState: T, shouldOverwrite = false) => {
      const currentIdx = currentIndexRef.current;
      const currentHistory = historyRef.current;
      
      if (shouldOverwrite) {
        const newHistory = [...currentHistory];
        newHistory[currentIdx] = newState;
        setHistory(newHistory);
        // currentIndex remains same
      } else {
        // Remove any future states if we're not at the end
        const newHistory = currentHistory.slice(0, currentIdx + 1);
        
        // Add new state
        newHistory.push(newState);
        
        // Limit history size
        if (newHistory.length > maxHistory) {
          newHistory.shift();
          setHistory(newHistory);
          setCurrentIndex(maxHistory - 1);
        } else {
          setHistory(newHistory);
          setCurrentIndex(newHistory.length - 1);
        }
      }
    },
    [maxHistory]
  );

  const undo = useCallback(() => {
    const currentIdx = currentIndexRef.current;
    if (currentIdx > 0) {
      setCurrentIndex(currentIdx - 1);
    }
  }, []);

  const redo = useCallback(() => {
    const currentIdx = currentIndexRef.current;
    const historyLength = historyRef.current.length;
    if (currentIdx < historyLength - 1) {
      setCurrentIndex(currentIdx + 1);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([initialState]);
    setCurrentIndex(0);
  }, [initialState]);

  return {
    state: history[currentIndex],
    setState,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    clearHistory,
  };
};
