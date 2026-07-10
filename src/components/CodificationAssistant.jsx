import { useState } from "react";
import theme from "../styles/stranalyxTheme";

function CodificationAssistant() {
  const [report, setReport] = useState(
    "Assistant Bloc 2 prêt. En attente du chargement des unités."
  );

  const [units, setUnits] = useState([]);
  const [codificationProposee, setCodificationProposee] = useState(false);

  const handleLoadUnits = () => {
    const loadedUnits = [
      {
        nom: "Sans unité parent",
        type: "Système",
        parent: "",
        rangPrincipal: "",
        rangBlocGlobal: "",
        rangBlocLocal: "",
      },
      {
        nom: "Pivot 001",
        type: "Parcelle",
        parent: "Sans unité parent",
        rangPrincipal: "001",
        rangBlocGlobal: "",
        rangBlocLocal: "",
      },
      {
        nom: "Pivot 001 - Bloc A",
        type: "Bloc",
        parent: "Pivot 001",
        rangPrincipal: "001",
        rangBlocGlobal: "001",
        rangBlocLocal: "1",
      },
      {
        nom: "Pivot 001 - Bloc B",
        type: "Bloc",
        parent: "Pivot 001",
        rangPrincipal: "001",
        rangBlocGlobal: "002",
        rangBlocLocal: "2",
      },
      {
        nom: "Pivot 001 - Bloc C",
        type: "Bloc",
        parent: "Pivot 001",
        rangPrincipal: "001",
        rangBlocGlobal: "003",
        rangBlocLocal: "3",
      },
    ];

    setUnits(loadedUnits);
    setCodificationProposee(false);

    setReport(
      "Étape 1 terminée — Les unités du Bloc 1 sont chargées. La ligne système reste non codifiable."
    );
  };

  const buildCodification = (unit) => {
    if (unit.type === "Système") {
      return {
        prefixeUnitePropose: "",
        rangFormatePropose: "",
      };
    }

    if (unit.type === "Parcelle") {
      return {
        prefixeUnitePropose: "PIV",
        rangFormatePropose: unit.rangPrincipal,
      };
    }

    if (unit.type === "Bloc") {
      const lettreBloc =
        unit.rangBlocLocal === "1"
          ? "A"
          : unit.rangBlocLocal === "2"
          ? "B"
          : unit.rangBlocLocal === "3"
          ? "C"
          : unit.rangBlocLocal;

      return {
        prefixeUnitePropose: "BLOC",
        rangFormatePropose: lettreBloc,
      };
    }

    return {
      prefixeUnitePropose: "",
      rangFormatePropose: "",
    };
  };

  const handleSuggestCodification = () => {
    if (units.length === 0) {
      setReport(
        "Impossible de proposer la codification : il faut d’abord charger les unités du Bloc 1."
      );
      return;
    }

    setCodificationProposee(true);

    setReport(
      "Étape 2 terminée — React propose uniquement U02.02_Prefixe_Unite et U02.03_Rang_Formate. U02.01_Code_Parent et U03.01_Code_Unite_Genere restent calculés dans Airtable."
    );
  };

  const handleUpdateAirtable = () => {
    if (units.length === 0) {
      setReport("Mise à jour refusée : aucune unité n’est chargée.");
      return;
    }

    if (!codificationProposee) {
      setReport(
        "Mise à jour refusée : il faut d’abord proposer la codification avant d’écrire dans Airtable."
      );
      return;
    }

    setReport(
      "Étape 3 non activée — La mise à jour Airtable devra écrire uniquement U02.02_Prefixe_Unite et U02.03_Rang_Formate. La ligne système restera vide."
    );
  };

  return (
    <section style={panelStyle}>
      <h2 style={titleStyle}>Assistant Bloc 2 — Codification</h2>

      <div style={introStyle}>
        Cet assistant prépare uniquement deux champs du Bloc 2 :
        U02.02_Prefixe_Unite et U02.03_Rang_Formate. La ligne système “Sans
        unité parent” reste vide. Les champs U02.01_Code_Parent et
        U03.01_Code_Unite_Genere sont laissés à Airtable.
      </div>

      <div style={actionsStyle}>
        <button style={buttonStyle} onClick={handleLoadUnits}>
          Charger les unités du Bloc 1
        </button>

        <button style={buttonStyle} onClick={handleSuggestCodification}>
          Proposer la codification
        </button>

        <button style={buttonStyle} onClick={handleUpdateAirtable}>
          Mettre à jour Airtable
        </button>
      </div>

      <div style={reportStyle}>{report}</div>

      {units.length > 0 && (
        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={stickyThStyle}>Nom unité</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Parent</th>
                <th style={thStyle}>Rang principal</th>
                <th style={thStyle}>Rang bloc global</th>
                <th style={thStyle}>Rang bloc local</th>

                {codificationProposee && (
                  <>
                    <th style={thStyle}>U02.02_Prefixe_Unite proposé</th>
                    <th style={thStyle}>U02.03_Rang_Formate proposé</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {units.map((unit, index) => {
                const codification = buildCodification(unit);

                return (
                  <tr key={`${unit.nom}-${index}`}>
                    <td style={stickyTdStyle}>{unit.nom}</td>
                    <td style={tdStyle}>{unit.type}</td>
                    <td style={tdStyle}>{unit.parent}</td>
                    <td style={tdStyle}>{unit.rangPrincipal}</td>
                    <td style={tdStyle}>{unit.rangBlocGlobal}</td>
                    <td style={tdStyle}>{unit.rangBlocLocal}</td>

                    {codificationProposee && (
                      <>
                        <td style={tdStyle}>
                          {codification.prefixeUnitePropose}
                        </td>
                        <td style={codeTdStyle}>
                          {codification.rangFormatePropose}
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

const panelStyle = {
  background: "#FFFFFF",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "16px",
  boxShadow: theme.shadow.card,
  padding: "18px",
  minHeight: "600px",
};

const titleStyle = {
  marginTop: 0,
  marginBottom: "14px",
  color: "#0B6B2E",
  fontSize: "24px",
  textAlign: "center",
  fontWeight: "800",
};

const introStyle = {
  background: "#F5FAF6",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "12px",
  padding: "14px",
  fontSize: "14px",
  color: theme.colors.text,
  marginBottom: "16px",
  lineHeight: 1.5,
};

const actionsStyle = {
  display: "flex",
  gap: "12px",
  justifyContent: "center",
  flexWrap: "wrap",
  marginBottom: "16px",
};

const buttonStyle = {
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "13px",
};

const reportStyle = {
  background: "#FFFFFF",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "12px",
  padding: "14px",
  color: theme.colors.textLight,
  fontSize: "13px",
  lineHeight: 1.5,
  marginBottom: "16px",
};

const tableWrapperStyle = {
  overflowX: "auto",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "12px",
  marginTop: "14px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
  minWidth: "1150px",
};

const thStyle = {
  background: "#F5FAF6",
  color: "#0B6B2E",
  borderBottom: `1px solid ${theme.colors.border}`,
  borderRight: `1px solid ${theme.colors.border}`,
  padding: "10px",
  textAlign: "left",
  fontWeight: "800",
  whiteSpace: "nowrap",
};

const stickyThStyle = {
  ...thStyle,
  position: "sticky",
  left: 0,
  zIndex: 3,
  background: "#F5FAF6",
  boxShadow: `2px 0 0 ${theme.colors.border}`,
  minWidth: "260px",
  width: "260px",
  maxWidth: "260px",
};

const tdStyle = {
  borderBottom: `1px solid ${theme.colors.border}`,
  borderRight: `1px solid ${theme.colors.border}`,
  padding: "9px",
  color: theme.colors.text,
  whiteSpace: "nowrap",
  background: "#FFFFFF",
};

const stickyTdStyle = {
  ...tdStyle,
  position: "sticky",
  left: 0,
  zIndex: 2,
  background: "#FFFFFF",
  fontWeight: "600",
  boxShadow: `2px 0 0 ${theme.colors.border}`,
  minWidth: "260px",
  width: "260px",
  maxWidth: "260px",
};

const codeTdStyle = {
  ...tdStyle,
  fontWeight: "800",
  color: "#0B6B2E",
};

export default CodificationAssistant;