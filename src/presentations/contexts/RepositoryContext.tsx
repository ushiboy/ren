import { useContext, createContext } from "react";
import { RepositoryComposition } from "@/repositoryComposition";

const RepositoryContext = createContext(
  Object.create(null) as RepositoryComposition,
);

export const RepositoryContextProvider: React.FC<{
  repositoryComposition: RepositoryComposition;
  children: React.ReactNode;
}> = ({ repositoryComposition, children }) => {
  return (
    <RepositoryContext.Provider value={repositoryComposition}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepository = () => useContext(RepositoryContext);
