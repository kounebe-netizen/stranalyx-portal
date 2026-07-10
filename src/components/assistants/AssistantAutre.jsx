import {
  panelStyle,
  titleStyle,
  introStyle,
  sectionTitleStyle,
  labelStyle,
  inputStyle,
  textareaStyle,
  formStyle,
  fieldBlockStyle,
  validationBoxStyle,
  validationButtonStyle,
} from "../../styles/assistantStyles";


export default function AssistantAutre() {
  return (
    <section style={panelStyle}>
      <div style={titleStyle}>Assistant Autre</div>

      <div style={introStyle}>
        Création d'une unité physique spécifique non couverte par les assistants standards.
      </div>

      <div style={sectionTitleStyle}>
        Étape 1 — Informations générales
      </div>

      <div style={formStyle}>
        <div style={fieldBlockStyle}>
          <label style={labelStyle}>Nom de l'unité physique</label>
          <input style={inputStyle} type="text" placeholder="Exemple : Serre 001, Bassin 001, Verger 001" />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>Type d'unité spécifique</label>
          <input style={inputStyle} type="text" placeholder="Exemple : Serre, Bassin, Verger, Parc expérimental" />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>Nombre de subdivisions</label>
          <input style={inputStyle} type="number" min="0" placeholder="0" />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>Observation</label>
          <textarea style={textareaStyle} placeholder="Préciser la logique de découpage ou les particularités de cette unité." />
        </div>
      </div>

      <div style={validationBoxStyle}>
        <button style={validationButtonStyle}>
          ✓ Valider cette unité
        </button>
      </div>
    </section>
  );
}