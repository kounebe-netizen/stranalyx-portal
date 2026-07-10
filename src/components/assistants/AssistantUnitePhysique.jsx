import { useState } from "react";
import AssistantPivot from "./AssistantPivot";
import AssistantGAG from "./AssistantGAG";
import AssistantPepiniere from "./AssistantPepiniere";
import AssistantAutre from "./AssistantAutre";

import {
  panelStyle,
  titleStyle,
  introStyle,
  sectionTitleStyle,
  formTwoColumnsStyle,
  fieldBlockStyle,
  labelStyle,
  inputStyle,
  validationBoxStyle,
  validationButtonStyle,
} from "../../styles/assistantStyles";

export default function AssistantUnitePhysique({
  lignes,
  setLignes,
  onChoisirPivot,
}) {

  const [typeUnite, setTypeUnite] = useState("Pivot");
  const [assistantActif, setAssistantActif] = useState(null);

  if (assistantActif === "Pivot") {
  return (
    <AssistantPivot
      lignes={lignes}
      setLignes={setLignes}
    />
  );
}

  if (assistantActif === "GAG") {
  return <AssistantGAG />;
}

if (assistantActif === "Pépinière") {
  return <AssistantPepiniere />;
}

if (assistantActif === "Autre") {
  return <AssistantAutre />;
}

  return (
    <div style={panelStyle}>
      <h2 style={titleStyle}>Assistant de création d'une unité physique</h2>

      <div style={introStyle}>
        Sélectionnez l'assistant métier à utiliser pour créer une nouvelle unité physique.
      </div>

      <h3 style={sectionTitleStyle}>Étape 1 — Choix de l'assistant</h3>

      <div style={formTwoColumnsStyle}>
        <div style={fieldBlockStyle}>
          <label style={labelStyle}>Type d'unité physique</label>

          <select
            style={inputStyle}
            value={typeUnite}
            onChange={(e) => setTypeUnite(e.target.value)}
          >
            <option value="Pivot">Pivot</option>
            <option value="GAG">GAG</option>
            <option value="Pépinière">Pépinière</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
      </div>

      <div style={validationBoxStyle}>
        <button
          style={validationButtonStyle}
          onClick={() => {
  if (typeUnite === "Pivot") {
  setAssistantActif("Pivot");
  return;
}

  setAssistantActif(typeUnite);
}}
        >
          Continuer →
        </button>
      </div>

    </div>
  );
}