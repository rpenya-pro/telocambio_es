import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function safeBase64Decode(encodedData: string): {
  owner: string;
  ident: string;
} {
  const jsonData = atob(encodedData);
  return JSON.parse(jsonData);
}

export const PropositionsStore = () => {
  const [propositions, setPropositions] = useState<
    Array<{ owner: string; ident: string }>
  >([]);

  useEffect(() => {
    // Recuperar todas las cookies que comiencen con "proposition_"
    const allCookies = Cookies.get();
    const propositionCookies = Object.keys(allCookies)
      .filter((key) => key.startsWith("proposition_")) //TODO ya no comienzan con proposition
      .map((key) => allCookies[key]);

    // Decodificar todas las cookies de proposición y guardarlas en el estado
    const decodedPropositions = propositionCookies.map(safeBase64Decode);
    setPropositions(decodedPropositions);
  }, []);

  return (
    <div>
      <h3>Proposiciones</h3>
      {propositions.map((prop, index) => (
        <div key={index}>
          <p>Owner: {prop.owner}</p>
          <p>Ident: {prop.ident}</p>
        </div>
      ))}
    </div>
  );
};
