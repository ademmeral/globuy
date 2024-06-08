import { createContext, useContext } from "react";

export const StoryContext = createContext(null);

function StoryProvider({ children, value }) {
  return (
    <StoryContext.Provider value={value}>
      {children}
    </StoryContext.Provider>
  )
}

export default StoryProvider

export const useStoryContext = () => useContext(StoryContext);