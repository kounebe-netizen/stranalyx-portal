import { useState, useEffect } from "react";
import Header from "./components/Header";
import QuestionCard from "./components/QuestionCard";
import ExecutionReport from "./components/ExecutionReport";
import PreviewTable from "./components/PreviewTable";
import Footer from "./components/Footer";
import LocalisationCartographie from "./components/LocalisationCartographie";
import PlanMasseExploitation from "./components/PlanMasseExploitation";
import AssistantUnitePhysique from "./components/assistants/AssistantUnitePhysique";
import theme from "./styles/stranalyxTheme";


const CLE_LOCAL_STORAGE = "stranalyx_blocs23_local";

function AgroIndustrieApp() {
  const [assistantActif, setAssistantActif] = useState("nouvelle-unite");
  const [etape, setEtape] = useState(1);

  const [prefixe, setPrefixe] = useState("Pivot");
  const [nombreUnites, setNombreUnites] = useState("34");
  const [typeUnite, setTypeUnite] = useState("Pivot");
  const [avecBlocs, setAvecBlocs] = useState("Oui");
  const [nombreBlocs, setNombreBlocs] = useState("3");

  const [lignes, setLignes] = useState([]);
  const [report, setReport] = useState("Assistant prêt.");
  const [statutSauvegarde, setStatutSauvegarde] =
    useState("Aucune sauvegarde locale");

  useEffect(() => {
    try {
      const sauvegarde = localStorage.getItem(CLE_LOCAL_STORAGE);

      if (sauvegarde) {
        const donnees = JSON.parse(sauvegarde);

        if (Array.isArray(donnees) && donnees.length > 0) {
          setLignes(donnees);
          setStatutSauvegarde(
            `Sauvegarde locale restaurée (${donnees.length} lignes)`
          );
          setReport(
            `Restauration automatique réussie : ${donnees.length} lignes retrouvées.`
          );
        }
      }
    } catch (error) {
      console.error(error);
      setStatutSauvegarde("Erreur restauration locale");
    }
  }, []);

  useEffect(() => {
    if (!lignes || lignes.length === 0) {
      return;
    }

    try {
      localStorage.setItem(CLE_LOCAL_STORAGE, JSON.stringify(lignes));
      setStatutSauvegarde(
        `Sauvegarde locale automatique (${lignes.length} lignes)`
      );
    } catch (error) {
      console.error(error);
      setStatutSauvegarde("Erreur sauvegarde locale");
    }
  }, [lignes]);

  function suivant() {
    if (etape < 5) {
      setEtape(etape + 1);
    } else {
      setReport("Configuration Bloc 1 terminée.");
    }
  }

  function precedent() {
    if (etape > 1) {
      setEtape(etape - 1);
    }
  }

  function champsBlocs23Vides() {
  return {
    superficie_totale_ha: "",
    superficie_exploitable_ha: "",

    latitude: "",
    longitude: "",
    altitude_m: "",
    coordonnees_gps_brutes: "",

    url_carte: "",

    plan_unite: "",
    type_plan: "",
    observation_plan: "",

    statut_localisation: "À renseigner",

    U04_01_Type_Geometrie: "",
    U04_02_Mode_Representation: "",
    U04_03_Nombre_Sommets: "",
    U04_04_Coordonnees_Geometriques: "",

    U04_05_Rayon_m: "",

    U04_06_Largeur_Bande_Centrale_m: "",

    U04_07_Longueur_Bande_Centrale_m: "",

    U04_08_Surface_Bande_Centrale_ha: "",

    U04_09_Angle_Acces_Deg: "",
  };
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
      rang_bloc_local: "",
      ...champsBlocs23Vides(),
    });

    let rangAffichageGlobal = 1;
    let rangBlocGlobal = 1;

    const nbUnites = parseInt(nombreUnites);
    const nbBlocs = avecBlocs === "Oui" ? parseInt(nombreBlocs) : 0;

    for (let i = 1; i <= nbUnites; i++) {
      const numero = String(i).padStart(3, "0");
      const nomUnite = `${prefixe} ${numero}`;

      result.push({
        nom: nomUnite,
        type: "Parcelle",
        parent: "Sans unité parent",
        rang: rangAffichageGlobal,
        nb_blocs: nbBlocs,
        nb_sous_blocs: 0,
        rang_unite: i,
        rang_bloc_global: "",
        rang_bloc_local: "",
        ...champsBlocs23Vides(),
      });

      rangAffichageGlobal++;

      for (let j = 0; j < nbBlocs; j++) {
        const lettre = String.fromCharCode(65 + j);

        result.push({
          nom: `${nomUnite} - Bloc ${lettre}`,
          type: "Bloc",
          parent: nomUnite,
          rang: rangAffichageGlobal,
          nb_blocs: nbBlocs,
          nb_sous_blocs: 0,
          rang_unite: i,
          rang_bloc_global: rangBlocGlobal,
          rang_bloc_local: j + 1,

          latitude: "",
          longitude: "",
          U04_05_Rayon_m: "",
          U04_06_Largeur_Bande_Centrale_m: "",
          U04_07_Longueur_Bande_Centrale_m: "",
          U04_08_Surface_Bande_Centrale_ha: "",
          U02_05_Altitude_m: "",
          coordonnees_gps_brutes: "",
          url_carte: "",
          type_plan: "Bloc dérivé",
          observation_plan: `Bloc ${lettre} généré automatiquement à partir du pivot ${nomUnite}`,
          statut_localisation: "Calcul automatique en attente",
        });

        rangAffichageGlobal++;
        rangBlocGlobal++;
      }
    }

    return result;
  }

  function restaurerSauvegardeLocale() {
    try {
      const sauvegarde = localStorage.getItem(CLE_LOCAL_STORAGE);

      if (!sauvegarde) {
        setReport("Aucune sauvegarde locale trouvée.");
        return;
      }

      const donnees = JSON.parse(sauvegarde);

      if (!Array.isArray(donnees)) {
        setReport("Sauvegarde locale invalide.");
        return;
      }

      setLignes(donnees);

      setReport(
        `${donnees.length} lignes restaurées depuis la sauvegarde locale.`
      );

      setStatutSauvegarde("Sauvegarde restaurée manuellement");
    } catch (error) {
      console.error(error);
      setReport(`Erreur restauration : ${error.message}`);
    }
  }

  function reinitialiserSauvegardeLocale() {
    const confirmation = window.confirm(
      "Supprimer définitivement la sauvegarde locale ?"
    );

    if (!confirmation) {
      return;
    }

    localStorage.removeItem(CLE_LOCAL_STORAGE);

    setLignes([]);

    setStatutSauvegarde("Sauvegarde locale supprimée");
    setReport("Sauvegarde locale supprimée.");
  }

  function handlePreview() {
    const donnees = genererLignes();
    setLignes(donnees);
    setReport(`${donnees.length} lignes générées avec succès.`);
  }

  function handleExport() {
    if (!lignes || lignes.length === 0) {
      setReport("Aucune ligne à exporter. Génère d’abord l’aperçu.");
      return;
    }

   const colonnes = [
  "nom",
  "type",
  "parent",
  "rang",
  "nb_blocs",
  "nb_sous_blocs",
  "rang_unite",
  "rang_bloc_global",
  "rang_bloc_local",

  "superficie_totale_ha",
  "superficie_exploitable_ha",

  "latitude",
  "longitude",
  "altitude_m",
  "coordonnees_gps_brutes",

  "url_carte",
  "plan_unite",
  "type_plan",
  "observation_plan",

  "statut_localisation",

  "U04_01_Type_Geometrie",
  "U04_02_Mode_Representation",
  "U04_03_Nombre_Sommets",
  "U04_04_Coordonnees_Geometriques",
  "U04_05_Rayon_m",
  "U04_06_Largeur_Bande_Centrale_m",
  "U04_07_Longueur_Bande_Centrale_m",
  "U04_08_Surface_Bande_Centrale_ha",
  "U04_09_Angle_Acces_Deg",
];

    function echapperCsv(valeur) {
      if (valeur === null || valeur === undefined) return "";

      const texte = String(valeur).replace(/"/g, '""');

      if (
        texte.includes(";") ||
        texte.includes(",") ||
        texte.includes('"') ||
        texte.includes("\n")
      ) {
        return `"${texte}"`;
      }

      return texte;
    }

    const lignesCsv = [];
    lignesCsv.push(colonnes.join(";"));

    lignes.forEach((ligne) => {
      const valeurs = colonnes.map((colonne) => echapperCsv(ligne[colonne]));
      lignesCsv.push(valeurs.join(";"));
    });

    const contenuCsv = lignesCsv.join("\n");

    const blob = new Blob(["\uFEFF" + contenuCsv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const lien = document.createElement("a");
    const maintenant = new Date();

    const horodatage =
      maintenant.getFullYear() +
      String(maintenant.getMonth() + 1).padStart(2, "0") +
      String(maintenant.getDate()).padStart(2, "0") +
      "_" +
      String(maintenant.getHours()).padStart(2, "0") +
      String(maintenant.getMinutes()).padStart(2, "0") +
      String(maintenant.getSeconds()).padStart(2, "0");

    lien.href = url;
    lien.download = `IMPORT_Table0_Bloc1_Blocs23_${horodatage}.csv`;

    document.body.appendChild(lien);
    lien.click();
    document.body.removeChild(lien);

    URL.revokeObjectURL(url);

    setReport(`${lignes.length} lignes exportées en CSV avec succès.`);
  }

function preparerLignePourApi(ligne) {
  return {
    ...ligne,

    U02_01_Superficie_Administrative_ha:
      ligne["U02.01_Superficie_Administrative_ha"] ?? ligne.superficie_totale_ha ?? "",
    U02_02_Latitude:
      ligne["U02.02_Latitude"] ?? ligne.latitude ?? "",
    U02_03_Longitude:
      ligne["U02.03_Longitude"] ?? ligne.longitude ?? "",
    U02_04_Altitude_m:
      ligne["U02.04_Altitude_m"] ?? ligne.altitude_m ?? "",
    U02_05_Coordonnees_GPS_Brutes:
      ligne["U02.05_Coordonnees_GPS_Brutes"] ?? ligne.coordonnees_gps_brutes ?? "",

    U03_01_URL_Carte:
      ligne["U03.01_URL_Carte"] ?? ligne.url_carte ?? "",
    U03_02_Type_Plan:
      ligne["U03.02_Type_Plan"] ?? ligne.type_plan ?? "",
    U03_03_Observation_Plan:
      ligne["U03.03_Observation_Plan"] ?? ligne.observation_plan ?? "",
    U03_04_Statut_Localisation:
      ligne["U03.04_Statut_Localisation"] ?? ligne.statut_localisation ?? "",

    Z99_05_Source_Creation:
      ligne["Z99.05_Source_Creation"] ?? ligne.Z99_05_Source_Creation ?? "",
    Z99_06_Statut_Enregistrement:
      ligne["Z99.06_Statut_Enregistrement"] ?? ligne.Z99_06_Statut_Enregistrement ?? "",

    U04_01_Type_Geometrie:
      ligne["U04.01_Type_Geometrie"] ?? ligne.U04_01_Type_Geometrie ?? "",
    U04_02_Mode_Representation:
      ligne["U04.02_Mode_Representation"] ?? ligne.U04_02_Mode_Representation ?? "",
    U04_05_Rayon_m:
      ligne["U04.05_Rayon_m"] ?? ligne.U04_05_Rayon_m ?? "",
    U04_06_Largeur_Bande_Centrale_m:
      ligne["U04.06_Largeur_Bande_Centrale_m"] ?? ligne.U04_06_Largeur_Bande_Centrale_m ?? "",
    U04_07_Longueur_Bande_Centrale_m:
      ligne["U04.07_Longueur_Bande_Centrale_m"] ?? ligne.U04_07_Longueur_Bande_Centrale_m ?? "",
    U04_08_Surface_Bande_Centrale_ha:
      ligne["U04.08_Surface_Bande_Centrale_ha"] ?? ligne.U04_08_Surface_Bande_Centrale_ha ?? "",
    U04_09_Angle_Acces_Deg:
      ligne["U04.09_Angle_Acces_Deg"] ?? ligne.U04_09_Angle_Acces_Deg ?? "",
    U04_10_Surface_Geometrique_ha:
      ligne["U04.10_Surface_Geometrique_ha"] ?? "",
    U04_11_Surface_Operationnelle_ha:
      ligne["U04.11_Surface_Operationnelle_ha"] ?? "",
  };
}
  async function handleImport() {
    if (!lignes || lignes.length === 0) {
      setReport("Aucune ligne à importer. Génère d’abord l’aperçu.");
      return;
    }

    try {
      setReport("Import Airtable en cours...");
      setStatutSauvegarde("Import Airtable en cours");

      const response = await fetch("http://127.0.0.1:8000/import-bloc1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  lignes: lignes.map(preparerLignePourApi),
  }),
});

      const resultat = await response.json();

      if (!response.ok || resultat.status === "KO") {
        setReport(`Erreur import : ${JSON.stringify(resultat)}`);
        setStatutSauvegarde(
          "Erreur import Airtable — données conservées localement"
        );
        return;
      }

      const responseUpdate = await fetch("http://127.0.0.1:8000/update-blocs234", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    lignes: lignes.map(preparerLignePourApi),
  }),
});

const resultatUpdate = await responseUpdate.json();

if (!responseUpdate.ok || resultatUpdate.status !== "OK") {
  setReport(`Erreur mise à jour Blocs 2/3/4 : ${JSON.stringify(resultatUpdate)}`);
  setStatutSauvegarde(
    "Erreur mise à jour Airtable — données conservées localement"
  );
  return;
}

const responseGeo = await fetch(
  "http://127.0.0.1:8000/reparer-liens-geo-pivots",
  {
    method: "GET",
  }
);

const resultatGeo = await responseGeo.json();

if (!responseGeo.ok || resultatGeo.status !== "OK") {
  setReport(
    `Erreur réparation GEO : ${JSON.stringify(resultatGeo)}`
  );
  setStatutSauvegarde(
    "Erreur réparation GEO — données conservées localement"
  );
  return;
}

const responseSites = await fetch(
  "http://127.0.0.1:8000/reparer-liens-sites",
  {
    method: "GET",
  }
);

const resultatSites = await responseSites.json();

if (!responseSites.ok || resultatSites.status !== "OK") {
  setReport(
    `Erreur réparation Sites : ${JSON.stringify(resultatSites)}`
  );

  setStatutSauvegarde(
    "Erreur réparation Sites – données conservées localement"
  );

  return;
}

      setReport(
 `Import terminé : ${resultat.total_importe} lignes importées après nettoyage. ` +
 `${resultat.records_supprimes} anciennes lignes supprimées. ` +
 `Mise à jour Blocs 2/3/4 : ${resultatUpdate.total_updates} lignes mises à jour. ` +
 `Liens géospatiaux réparés : ${resultatGeo.total_updates}. ` +
 `Liens sites réparés : ${resultatSites.total_updates}.`
);

      setStatutSauvegarde("Import Airtable réussi");
    } catch (error) {
      setReport(`Erreur connexion API : ${error.message}`);
      setStatutSauvegarde(
        "Erreur import Airtable — données conservées localement"
      );
    }
  }

  function renderQuestion() {
    if (etape === 1) {
      return (
        <QuestionCard
          numero="1 sur 4"
          question="Quel type d'unité physique souhaitez-vous créer ?"
          exemple="Choix possibles : Pivot, GAG, Pépinière, Autre"
        >
          <input
            type="text"
            value={prefixe}
            onChange={(e) => setPrefixe(e.target.value)}
            style={inputStyle}
          />

          <button style={mainButtonStyle} onClick={suivant}>
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
            onChange={(e) => setNombreUnites(e.target.value)}
            style={inputStyle}
          />

          <div style={navigationStyle}>
            <button style={backButtonStyle} onClick={precedent}>
              ← Retour
            </button>

            <button style={mainButtonStyle} onClick={suivant}>
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
            onChange={(e) => setAvecBlocs(e.target.value)}
            style={inputStyle}
          >
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </select>

          <div style={navigationStyle}>
            <button style={backButtonStyle} onClick={precedent}>
              ← Retour
            </button>

            <button style={mainButtonStyle} onClick={suivant}>
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
        exemple="Exemple : 2 blocs par pivot"
      >
        <input
          type="number"
          value={nombreBlocs}
          onChange={(e) => setNombreBlocs(e.target.value)}
          style={inputStyle}
        />

        <div style={navigationStyle}>
          <button style={backButtonStyle} onClick={precedent}>
            ← Retour
          </button>

          <button style={mainButtonStyle} onClick={suivant}>
            Valider →
          </button>
        </div>
      </QuestionCard>
    );
  }

  function renderStructure() {
    return (
      <main style={layoutStyle}>
        <section style={leftPanelStyle}>
          <h2 style={titleStyle}>Configuration</h2>

          {renderQuestion()}

          <div style={actionsCardStyle}>
            <h3 style={actionsTitleStyle}>Actions</h3>

            <button style={actionButtonStyle} onClick={handlePreview}>
              ◉ Générer aperçu
            </button>

            <button style={actionButtonStyle} onClick={handleExport}>
              ▣ Export CSV
            </button>

            <button style={actionButtonStyle} onClick={handleImport}>
              ⇧ Import Airtable
            </button>

            <button
              style={secondaryActionButtonStyle}
              onClick={restaurerSauvegardeLocale}
            >
              ↺ Restaurer sauvegarde locale
            </button>

            <button
              style={{
                ...actionButtonStyle,
                background: "#A94442",
              }}
              onClick={reinitialiserSauvegardeLocale}
            >
              ✖ Supprimer sauvegarde locale
            </button>
          </div>

          <div style={statutSauvegardeStyle}>{statutSauvegarde}</div>

          <ExecutionReport report={report} />
        </section>

        <section style={rightPanelStyle}>

  <h2 style={titleStyle}>Référentiel des unités physiques</h2>

  <PreviewTable lignes={lignes} />

  <div style={createUnitButtonBoxStyle}>
  <button
    style={createUnitButtonStyle}
    onClick={() => {
      setAssistantActif("nouvelle-unite");
    }}
  >
    + Créer une nouvelle unité
  </button>
</div>

</section>
      </main>
    );
  }

  function renderAssistantActif() {
    if (assistantActif === "structure") {
      return renderStructure();
    }

    if (assistantActif === "cartographie") {
      return (
        <LocalisationCartographie
          lignes={lignes}
          setLignes={setLignes}
        />
      );
    }

    if (assistantActif === "planmasse") {
      return <PlanMasseExploitation lignes={lignes} />;
    }

    if (assistantActif === "nouvelle-unite") {
  return (
    <AssistantUnitePhysique
  lignes={lignes}
  setLignes={setLignes}
  onChoisirPivot={() => setAssistantActif("structure")}
/>
  );
}

    return renderStructure();
  }

  return (
    <div style={pageStyle}>
      <div style={shellStyle}>
        <Header />

        <div style={tabsStyle}>
          <button
            style={assistantActif === "structure" ? activeTabStyle : tabStyle}
            onClick={() => setAssistantActif("structure")}
          >
            Structure hiérarchique
          </button>

          <button
            style={assistantActif === "cartographie" ? activeTabStyle : tabStyle}
            onClick={() => setAssistantActif("cartographie")}
          >
            Localisation & Cartographie
          </button>

          <button
            style={assistantActif === "planmasse" ? activeTabStyle : tabStyle}
            onClick={() => setAssistantActif("planmasse")}
          >
            Plan de masse
          </button>
        </div>

        {renderAssistantActif()}

        <div style={footerLineStyle} />

        <Footer />
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: theme.colors.background,
  padding: "10px",
};

const shellStyle = {
  maxWidth: "1720px",
  margin: "0 auto",
  background: "#F7FBF8",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "10px",
  padding: "14px 18px 8px 18px",
};

const tabsStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "18px",
  flexWrap: "wrap",
};

const tabStyle = {
  background: "#EAF5ED",
  color: "#0B6B2E",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
};

const activeTabStyle = {
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "10px 16px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
};

const layoutStyle = {
  display: "grid",
  gridTemplateColumns: "31% 69%",
  gap: "18px",
};

const leftPanelStyle = {
  background: "#FFFFFF",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "16px",
  boxShadow: theme.shadow.card,
  padding: "18px",
};

const rightPanelStyle = {
  background: "#FFFFFF",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "16px",
  boxShadow: theme.shadow.card,
  padding: "18px",
  alignSelf: "start",
};

const titleStyle = {
  marginTop: 0,
  marginBottom: "14px",
  color: "#0B6B2E",
  fontSize: "24px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: `1px solid ${theme.colors.border}`,
  fontSize: "14px",
  marginBottom: "12px",
  boxSizing: "border-box",
};

const navigationStyle = {
  display: "flex",
  gap: "10px",
};

const mainButtonStyle = {
  flex: 1,
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "11px 16px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
};

const backButtonStyle = {
  background: "#E6EFE8",
  color: "#0B6B2E",
  border: "none",
  padding: "11px 16px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
};

const actionsCardStyle = {
  background: "#FFFFFF",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "14px",
  boxShadow: theme.shadow.card,
  padding: "14px",
  marginBottom: "14px",
};

const actionsTitleStyle = {
  marginTop: 0,
  marginBottom: "10px",
  color: "#0B6B2E",
  fontSize: "17px",
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
  cursor: "pointer",
};

const secondaryActionButtonStyle = {
  width: "68%",
  display: "block",
  margin: "8px auto",
  background: "#FFFFFF",
  color: "#0B6B2E",
  border: "2px solid #0B6B2E",
  padding: "9px 14px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
};

const topActionsStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "14px",
  marginBottom: "14px",
};

const topButtonStyle = {
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "10px 22px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer",
};

const statutSauvegardeStyle = {
  background: "#EEF7F0",
  border: "1px solid #CFE6D5",
  borderRadius: "10px",
  padding: "10px",
  marginBottom: "12px",
  fontWeight: "600",
  color: "#0B6B2E",
  textAlign: "center",
};

const footerLineStyle = {
  height: "1px",
  background: theme.colors.border,
  margin: "16px 12px 6px 12px",
};

const createUnitButtonBoxStyle = {
  marginTop: "12px",
  padding: "0 18px",
};

const createUnitButtonStyle = {
  width: "100%",
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  fontWeight: "800",
  fontSize: "14px",
  cursor: "pointer",
};

export default AgroIndustrieApp;