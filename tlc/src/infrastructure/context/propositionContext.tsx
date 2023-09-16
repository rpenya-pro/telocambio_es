import { createContext, useContext, useState, ReactNode } from "react";

interface PropositionState {
  proposition: null | {
    owner: string;
    ident: string;
    descr: string;
    selectedThread?: string;
    reference?: string;
  };
  setProposition: (proposition: PropositionState["proposition"]) => void;
}

// Proporcionamos un valor predeterminado para el contexto.
const defaultValue: PropositionState = {
  proposition: null,
  setProposition: () => {}, // una función vacía por defecto
};

export const PropositionContext = createContext<PropositionState>(defaultValue);

export const useProposition = () => {
  return useContext(PropositionContext);
};

interface PropositionProviderProps {
  children: ReactNode; // Esto proporciona un tipo para children
}

export const PropositionProvider: React.FC<PropositionProviderProps> = ({
  children,
}) => {
  const [proposition, setProposition] =
    useState<PropositionState["proposition"]>(null);

  return (
    <PropositionContext.Provider value={{ proposition, setProposition }}>
      {children}
    </PropositionContext.Provider>
  );
};
