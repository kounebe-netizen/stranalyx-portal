import React, { useState } from "react";

import {
  panelStyle,
  titleStyle,
  introStyle,
  sectionTitleStyle,
  labelStyle,
  inputStyle,
  textareaStyle,
  formStyle,
  formOneColumnStyle,
  fieldBlockStyle,
  validationBoxStyle,
  validationButtonStyle,
} from "../../styles/assistantStyles";

export default function AssistantGAG() {
  const [formData, setFormData] = useState({
    U01_01_Nom_Usuel_Unite: "",
    U01_02_Type_Unite: "Parcelle",
    U01_03_Unite_Parent: "",
    U01_04_Ordre_Hierarchique: 1,
    U01_05_Nombre_Blocs: 0,
    U01_06_Nombre_Sous_Blocs: 0,
    U01_10_Site_Rattache: "",
    U01_11_Type_Parcelle: "GAG",

    U02_01_Superficie_Administrative_ha: "",
    U02_02_Latitude: "",
    U02_03_Longitude: "",
    U02_04_Altitude_m: "",
    U02_05_Coordonnees_GPS_Brutes: "",

    U03_01_URL_Carte: "",
    U03_02_Plan_Unite: "",
    U03_03_Type_Plan: "",
    U03_04_Observation_Plan: "",

    U04_01_Type_Geometrie: "Polygone",
    U04_02_Mode_Representation: "Sommets GPS",
    U04_03_Nombre_Sommets: "",
    U04_04_Coordonnees_Geometriques: "",
    U04_10_Surface_Geometrique_ha: "",
    U04_11_Surface_Operationnelle_ha: "",

    Z99_05_Source_Creation: "Interface React",
    Z99_06_Statut_Enregistrement: "Actif",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (

  <div style={panelStyle}>
  <h2 style={titleStyle}>Assistant GAG</h2>

  <div style={introStyle}>
    Assistant dédié aux parcelles GAG polygonales du référentiel des unités physiques.
  </div>

      <section>
        <h3 style={sectionTitleStyle}>1. Identification de l’unité</h3>

        <div style={formStyle}>
          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U01.01 Nom usuel unité</label>
            <input
            style={inputStyle}
              value={formData.U01_01_Nom_Usuel_Unite}
              onChange={(e) =>
                handleChange("U01_01_Nom_Usuel_Unite", e.target.value)
              }
            />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U01.02 Type unité</label>
            <input value={formData.U01_02_Type_Unite} disabled />
          </div>

          <div style={fieldBlockStyle}>
           <label style={labelStyle}>U01.11 Type parcelle</label>
            <input value={formData.U01_11_Type_Parcelle} disabled />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U01.10 Site rattaché</label>
            <input
            style={inputStyle}
              value={formData.U01_10_Site_Rattache}
              onChange={(e) =>
                handleChange("U01_10_Site_Rattache", e.target.value)
              }
            />
          </div>
        </div>
      </section>

      <section>
        <h3 style={sectionTitleStyle}>2. Caractéristiques générales</h3>

        <div style={formStyle}>
          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U02.01 Superficie administrative ha</label>
            <input
            style={inputStyle}
              type="number"
              value={formData.U02_01_Superficie_Administrative_ha}
              onChange={(e) =>
                handleChange("U02_01_Superficie_Administrative_ha", e.target.value)
              }
            />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U02.04 Altitude m</label>
            <input
            style={inputStyle}
              type="number"
              value={formData.U02_04_Altitude_m}
              onChange={(e) =>
                handleChange("U02_04_Altitude_m", e.target.value)
              }
            />
          </div>

          <div style={{ ...fieldBlockStyle, gridColumn: "1 / -1" }}>
            <label style={labelStyle}>U02.05 Coordonnées GPS brutes</label>
            <textarea
            style={textareaStyle}
              rows="3"
              value={formData.U02_05_Coordonnees_GPS_Brutes}
              onChange={(e) =>
                handleChange("U02_05_Coordonnees_GPS_Brutes", e.target.value)
              }
            />
          </div>
        </div>
      </section>

      <section>
        <h3 style={sectionTitleStyle}>3. Géométrie polygonale</h3>

        <div style={formStyle}>
          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.01 Type géométrie</label>
            <input
          style={inputStyle}
           value={formData.U04_01_Type_Geometrie}
          disabled
          />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.02 Mode représentation</label>
            <input
          style={inputStyle}
            value={formData.U04_02_Mode_Representation}
           disabled
            />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.03 Nombre sommets</label>
            <input
          style={inputStyle}
            value={formData.U04_03_Nombre_Sommets}
          disabled
            />
          </div>

          <div style={{ ...fieldBlockStyle, gridColumn: "1 / -1" }}>
            <label style={labelStyle}>U04.04 Coordonnées géométriques</label>
            <textarea
              style={textareaStyle}
              rows="4"
              value={formData.U04_04_Coordonnees_Geometriques}
              onChange={(e) =>
                handleChange("U04_04_Coordonnees_Geometriques", e.target.value)
              }
            />
          </div>
        </div>

        <div style={introStyle}>
          Zone carte Leaflet / polygone S1 à S11 à brancher ici
        </div>
      </section>

      <section>
        <h3 style={sectionTitleStyle}>4. Surfaces calculées</h3>

        <div style={formStyle}>
          <div style={fieldBlockStyle}>
           <label style={labelStyle}>U04.10 Surface géométrique ha</label>
            <input
            style={inputStyle}
             value={formData.U04_10_Surface_Geometrique_ha}
              disabled />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.11 Surface opérationnelle ha</label>
            <input
            style={inputStyle}
              value={formData.U04_11_Surface_Operationnelle_ha}
              onChange={(e) =>
                handleChange("U04_11_Surface_Operationnelle_ha", e.target.value)
              }
            />
          </div>
        </div>
      </section>

      <section>
        <h3 style={sectionTitleStyle}>5. Contrôle avant validation</h3>
        <div style={introStyle}>
          <p>Type unité : {formData.U01_02_Type_Unite}</p>
          <p>Type parcelle : {formData.U01_11_Type_Parcelle}</p>
          <p>Type géométrie : {formData.U04_01_Type_Geometrie}</p>
          <p>Mode représentation : {formData.U04_02_Mode_Representation}</p>
        </div>

        <div style={validationBoxStyle}>
          <button style={validationButtonStyle}>
           ✓ Valider la parcelle GAG
        </button>
      </div>
      </section>
    </div>
  );
}
