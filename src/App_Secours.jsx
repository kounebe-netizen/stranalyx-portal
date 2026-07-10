import { useState } from "react";

import Header from "./components/Header";
import QuestionCard from "./components/QuestionCard";
import ExecutionReport from "./components/ExecutionReport";
import PreviewTable from "./components/PreviewTable";
import Footer from "./components/Footer";

import theme from "./styles/stranalyxTheme";

function App() {
  const [etape, setEtape] = useState(1);

  const [prefixe, setPrefixe] = useState("Pivot");
  const [nombreUnites, setNombreUnites] = useState("34");
  const [avecBlocs, setAvecBlocs] = useState("Oui");
  const [nombreBlocs, setNombreBlocs] = useState("3");

  const [lignes, setLignes] = useState([]);

  const [report, setReport] = useState(
    "Assistant prêt."
  );

  function suivant() {
    if (etape < 4) {
      setEtape(etape + 1);
    } else {
      setReport(
        "Configuration Bloc 1 terminée."
      );
    }
  }

  function precedent() {
    if (etape > 1) {
      setEtape(etape - 1);
    }
  }

  function genererLignes() {
    const result = [];

    result.push({
      nom: "Sans unité parent",
      type: "Système",
      parent: "",
      rang: 0,
      nb_blocs: "",
      nb_sous_blocs: "",
      rang_unite: "",
      rang_bloc_global: "",
      rang_bloc_local: ""
    });

    let rangAffichageGlobal = 1;
    let rangBlocGlobal = 1;

    const nbUnites =
      parseInt(nombreUnites);

    const nbBlocs =
      avecBlocs === "Oui"
        ? parseInt(nombreBlocs)
        : 0;

    for (
      let i = 1;
      i <= nbUnites;
      i++
    ) {
      const numero = String(i).padStart(
        3,
        "0"
      );

      const nomUnite =
        `${prefixe} ${numero}`;

      result.push({
        nom: nomUnite,
        type: "Parcelle",
        parent: "Sans unité parent",
        rang: rangAffichageGlobal,
        nb_blocs: nbBlocs,
        nb_sous_blocs: 0,
        rang_unite: i,
        rang_bloc_global: "",
        rang_bloc_local: ""
      });

      rangAffichageGlobal++;

      for (
        let j = 0;
        j < nbBlocs;
        j++
      ) {
        const lettre =
          String.fromCharCode(
            65 + j
          );

        result.push({
          nom:
            `${nomUnite} - Bloc ${lettre}`,

          type: "Bloc",

          parent: nomUnite,

          rang:
            rangAffichageGlobal,

          nb_blocs: "",

          nb_sous_blocs: 0,

          rang_unite: i,

          rang_bloc_global:
            rangBlocGlobal,

          rang_bloc_local: j + 1
        });

        rangAffichageGlobal++;
        rangBlocGlobal++;
      }
    }

    return result;
  }

  function handlePreview() {
    const donnees =
      genererLignes();

    setLignes(donnees);

    setReport(
      `${donnees.length} lignes générées avec succès.`
    );
  }

  function handleExport() {
    setReport(
      "Export CSV : prochaine étape."
    );
  }

  function handleImport() {
    setReport(
      "Import Airtable : prochaine étape."
    );
  }

  function renderQuestion() {
    if (etape === 1) {
      return (
        <QuestionCard
          numero="1 sur 4"
          question="Quel est le préfixe des unités principales ?"
          exemple="Exemple : Pivot, Parcelle, Secteur"
        >
          <input
            type="text"
            value={prefixe}
            onChange={(e) =>
              setPrefixe(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <button
            style={mainButtonStyle}
            onClick={suivant}
          >
            Valider →
          </button>
        </QuestionCard>
      );
    }

    if (etape === 2) {
      return (
        <QuestionCard
          numero="2 sur 4"
          question="Combien d’unités principales faut-il générer ?"
          exemple="Exemple : 34 pivots"
        >
          <input
            type="number"
            value={nombreUnites}
            onChange={(e) =>
              setNombreUnites(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <div
            style={navigationStyle}
          >
            <button
              style={
                backButtonStyle
              }
              onClick={precedent}
            >
              ← Retour
            </button>

            <button
              style={
                mainButtonStyle
              }
              onClick={suivant}
            >
              Valider →
            </button>
          </div>
        </QuestionCard>
      );
    }

    if (etape === 3) {
      return (
        <QuestionCard
          numero="3 sur 4"
          question="Les unités principales sont-elles divisées en blocs ?"
          exemple="Exemple : Oui pour blocs A/B/C"
        >
          <select
            value={avecBlocs}
            onChange={(e) =>
              setAvecBlocs(
                e.target.value
              )
            }
            style={inputStyle}
          >
            <option value="Oui">
              Oui
            </option>

            <option value="Non">
              Non
            </option>
          </select>

          <div
            style={navigationStyle}
          >
            <button
              style={
                backButtonStyle
              }
              onClick={precedent}
            >
              ← Retour
            </button>

            <button
              style={
                mainButtonStyle
              }
              onClick={suivant}
            >
              Valider →
            </button>
          </div>
        </QuestionCard>
      );
    }

    return (
      <QuestionCard
        numero="4 sur 4"
        question="Combien de blocs par unité principale ?"
        exemple="Exemple : 3 blocs par pivot"
      >
        <input
          type="number"
          value={nombreBlocs}
          onChange={(e) =>
            setNombreBlocs(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <div
          style={navigationStyle}
        >
          <button
            style={backButtonStyle}
            onClick={precedent}
          >
            ← Retour
          </button>

          <button
            style={mainButtonStyle}
            onClick={suivant}
          >
            Valider →
          </button>
        </div>
      </QuestionCard>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={shellStyle}>
        <Header />

        <main style={layoutStyle}>
          <section
            style={leftPanelStyle}
          >
            <h2 style={titleStyle}>
              Configuration
            </h2>

            {renderQuestion()}

            <div
              style={
                actionsCardStyle
              }
            >
              <h3
                style={
                  actionsTitleStyle
                }
              >
                Actions
              </h3>

              <button
                style={
                  actionButtonStyle
                }
                onClick={
                  handlePreview
                }
              >
                ◉ Générer aperçu
              </button>

              <button
                style={
                  actionButtonStyle
                }
                onClick={
                  handleExport
                }
              >
                ▣ Export CSV
              </button>

              <button
                style={
                  actionButtonStyle
                }
                onClick={
                  handleImport
                }
              >
                ⇧ Import Airtable
              </button>
            </div>

            <ExecutionReport
              report={report}
            />
          </section>

          <section
            style={
              rightPanelStyle
            }
          >
            <h2 style={titleStyle}>
              Vue générée
            </h2>

            <div
              style={
                topActionsStyle
              }
            >
              <button
                style={
                  topButtonStyle
                }
                onClick={
                  handleExport
                }
              >
                Export CSV
              </button>

              <button
                style={
                  topButtonStyle
                }
                onClick={
                  handleImport
                }
              >
                Import Airtable
              </button>
            </div>

            <PreviewTable
              lignes={lignes}
            />
          </section>
        </main>

        <div
          style={footerLineStyle}
        />

        <Footer />
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background:
    theme.colors.background,
  padding: "10px"
};

const shellStyle = {
  maxWidth: "1720px",
  margin: "0 auto",
  background: "#F7FBF8",
  border:
    `1px solid ${theme.colors.border}`,
  borderRadius: "10px",
  padding:
    "14px 18px 8px 18px"
};

const layoutStyle = {
  display: "grid",
  gridTemplateColumns:
    "31% 69%",
  gap: "18px"
};

const leftPanelStyle = {
  background: "#FFFFFF",
  border:
    `1px solid ${theme.colors.border}`,
  borderRadius: "16px",
  boxShadow: theme.shadow.card,
  padding: "18px"
};

const rightPanelStyle = {
  background: "#FFFFFF",
  border:
    `1px solid ${theme.colors.border}`,
  borderRadius: "16px",
  boxShadow: theme.shadow.card,
  padding: "18px"
};

const titleStyle = {
  marginTop: 0,
  marginBottom: "14px",
  color: "#0B6B2E",
  fontSize: "24px",
  textAlign: "center"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border:
    `1px solid ${theme.colors.border}`,
  fontSize: "14px",
  marginBottom: "12px",
  boxSizing: "border-box"
};

const navigationStyle = {
  display: "flex",
  gap: "10px"
};

const mainButtonStyle = {
  flex: 1,
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "11px 16px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer"
};

const backButtonStyle = {
  background: "#E6EFE8",
  color: "#0B6B2E",
  border: "none",
  padding: "11px 16px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer"
};

const actionsCardStyle = {
  background: "#FFFFFF",
  border:
    `1px solid ${theme.colors.border}`,
  borderRadius: "14px",
  boxShadow: theme.shadow.card,
  padding: "14px",
  marginBottom: "14px"
};

const actionsTitleStyle = {
  marginTop: 0,
  marginBottom: "10px",
  color: "#0B6B2E",
  fontSize: "17px"
};

const actionButtonStyle = {
  width: "68%",
  display: "block",
  margin: "8px auto",
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "9px 14px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer"
};

const topActionsStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "14px",
  marginBottom: "14px"
};

const topButtonStyle = {
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "10px 22px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer"
};

const footerLineStyle = {
  height: "1px",
  background:
    theme.colors.border,
  margin:
    "16px 12px 6px 12px"
};

export default App;