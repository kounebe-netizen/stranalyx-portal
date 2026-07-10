import { useState } from "react";

import {
  panelStyle,
  titleStyle,
  introStyle,
  sectionTitleStyle,
  labelStyle,
  inputStyle,
  formStyle,
  fieldBlockStyle,
  validationBoxStyle,
  validationButtonStyle,
} from "../../styles/assistantStyles";

export default function AssistantPepiniere() {
  const [formData, setFormData] = useState({
    U01_01_Nom_Usuel_Unite: "",
    U01_05_Nombre_Subdivisions: 0,
    Mode_Numerotation_Planches: "Numérique",
  });

  function handleChange(champ, valeur) {
    setFormData((prev) => ({
      ...prev,
      [champ]: valeur,
    }));
  }

  function validerPepiniere() {
    console.log("Données Assistant Pépinière :", formData);
  }

  return (
    <section style={panelStyle}>
      <div style={titleStyle}>Assistant Pépinière</div>

      <div style={introStyle}>
        Création d'une pépinière organisée directement en planches.
      </div>

      <div style={sectionTitleStyle}>
        Étape 1 — Informations générales
      </div>

      <div style={formStyle}>
        <div style={fieldBlockStyle}>
          <label style={labelStyle}>Nom de la pépinière</label>
          <input
            style={inputStyle}
            type="text"
            value={formData.U01_01_Nom_Usuel_Unite}
            onChange={(e) =>
              handleChange("U01_01_Nom_Usuel_Unite", e.target.value)
            }
            placeholder="Exemple : Pépinière Banda"
          />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>Nombre de planches</label>
          <input
            style={inputStyle}
            type="number"
            min="0"
            value={formData.U01_05_Nombre_Subdivisions}
            onChange={(e) =>
              handleChange("U01_05_Nombre_Subdivisions", e.target.value)
            }
          />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>Mode de numérotation des planches</label>
          <select
            style={inputStyle}
            value={formData.Mode_Numerotation_Planches}
            onChange={(e) =>
              handleChange("Mode_Numerotation_Planches", e.target.value)
            }
          >
            <option value="Numérique">Numérique</option>
            <option value="Alphabétique">Alphabétique</option>
          </select>
        </div>
      </div>

      <div style={sectionTitleStyle}>
        Étape 2 — Confirmation
      </div>

      <div style={introStyle}>
        La pépinière sera créée comme unité physique principale. Les planches
        seront générées comme subdivisions directes de cette pépinière.
      </div>

      <div style={validationBoxStyle}>
        <button style={validationButtonStyle} onClick={validerPepiniere}>
          ✓ Valider cette pépinière
        </button>
      </div>
    </section>
  );
}