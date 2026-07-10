import { useState, useEffect } from "react";
import QuestionCard from "../QuestionCard";
import ExecutionReport from "../ExecutionReport";
import PreviewTable from "../PreviewTable";
import theme from "../../styles/stranalyxTheme";

const CLE_LOCAL_STORAGE = "stranalyx_pivot_local";

export default function AssistantPivot({ lignes, setLignes }) {
  const [etape, setEtape] = useState(1);

  const [prefixe, setPrefixe] = useState("Pivot");
  const [nombreUnites, setNombreUnites] = useState("34");
  const [avecBlocs, setAvecBlocs] = useState("Oui");
  const [nombreBlocs, setNombreBlocs] = useState("2");

  const [report, setReport] = useState("Assistant Pivot prêt.");
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
    if (!lignes || lignes.length === 0) return;

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
    if (etape < 4) {
      setEtape(etape + 1);
    } else {
      setReport("Configuration Pivot terminée.");
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
    return texte.includes(";") || texte.includes(",") || texte.includes('"') || texte.includes("\n")
      ? `"${texte}"`
      : texte;
  }

  const lignesCsv = [colonnes.join(";")];

  lignes.forEach((ligne) => {
    lignesCsv.push(colonnes.map((colonne) => echapperCsv(ligne[colonne])).join(";"));
  });

  const blob = new Blob(["\uFEFF" + lignesCsv.join("\n")], {
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
  lien.download = `IMPORT_Table0_Pivot_${horodatage}.csv`;
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
    U02_02_Latitude: ligne["U02.02_Latitude"] ?? ligne.latitude ?? "",
    U02_03_Longitude: ligne["U02.03_Longitude"] ?? ligne.longitude ?? "",
    U02_04_Altitude_m: ligne["U02.04_Altitude_m"] ?? ligne.altitude_m ?? "",
    U02_05_Coordonnees_GPS_Brutes:
      ligne["U02.05_Coordonnees_GPS_Brutes"] ?? ligne.coordonnees_gps_brutes ?? "",
    U03_01_URL_Carte: ligne["U03.01_URL_Carte"] ?? ligne.url_carte ?? "",
    U03_02_Type_Plan: ligne["U03.02_Type_Plan"] ?? ligne.type_plan ?? "",
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
    U04_05_Rayon_m: ligne["U04.05_Rayon_m"] ?? ligne.U04_05_Rayon_m ?? "",
    U04_06_Largeur_Bande_Centrale_m:
      ligne["U04.06_Largeur_Bande_Centrale_m"] ??
      ligne.U04_06_Largeur_Bande_Centrale_m ??
      "",
    U04_07_Longueur_Bande_Centrale_m:
      ligne["U04.07_Longueur_Bande_Centrale_m"] ??
      ligne.U04_07_Longueur_Bande_Centrale_m ??
      "",
    U04_08_Surface_Bande_Centrale_ha:
      ligne["U04.08_Surface_Bande_Centrale_ha"] ??
      ligne.U04_08_Surface_Bande_Centrale_ha ??
      "",
    U04_09_Angle_Acces_Deg:
      ligne["U04.09_Angle_Acces_Deg"] ?? ligne.U04_09_Angle_Acces_Deg ?? "",
    U04_10_Surface_Geometrique_ha: ligne["U04.10_Surface_Geometrique_ha"] ?? "",
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lignes: lignes.map(preparerLignePourApi) }),
    });

    const resultat = await response.json();

    if (!response.ok || resultat.status === "KO") {
      setReport(`Erreur import : ${JSON.stringify(resultat)}`);
      setStatutSauvegarde("Erreur import Airtable — données conservées localement");
      return;
    }

    setReport(
      `Import terminé : ${resultat.total_importe} lignes importées après nettoyage. ` +
        `${resultat.records_supprimes} anciennes lignes supprimées.`
    );

    setStatutSauvegarde("Import Airtable réussi");
  } catch (error) {
    setReport(`Erreur connexion API : ${error.message}`);
    setStatutSauvegarde("Erreur import Airtable — données conservées localement");
  }
}

function calculerSurfacesUniformes(ligneModele) {
  const typeGeometrie =
    ligneModele["U04.01_Type_Geometrie"] ||
    ligneModele.U04_01_Type_Geometrie ||
    "";

  const rayon = Number(ligneModele["U04.05_Rayon_m"] || ligneModele.U04_05_Rayon_m || 0);
  const longueur = Number(ligneModele["U04.12_Longueur_m"] || ligneModele.U04_12_Longueur_m || 0);
  const largeur = Number(ligneModele["U04.13_Largeur_m"] || ligneModele.U04_13_Largeur_m || 0);

  if (typeGeometrie === "Cercle" && rayon > 0) {
    return {
      surfaceGeometrique: ((Math.PI * rayon * rayon) / 10000).toFixed(2),
    };
  }

  if (typeGeometrie === "Carré" && longueur > 0) {
    return {
      surfaceGeometrique: ((longueur * longueur) / 10000).toFixed(2),
    };
  }

  if (typeGeometrie === "Rectangle" && longueur > 0 && largeur > 0) {
    return {
      surfaceGeometrique: ((longueur * largeur) / 10000).toFixed(2),
    };
  }

  return {
    surfaceGeometrique: ligneModele["U04.10_Surface_Geometrique_ha"] || "",
  };
}

function propagerParametresUniformes() {
  if (!lignes || lignes.length === 0) {
    setReport("Aucune ligne disponible pour la propagation.");
    return;
  }

  const modele = lignes.find(
    (ligne) => ligne.nom === "Pivot 001" && ligne.type === "Parcelle"
  );
  console.log(modele);

  if (!modele) {
    setReport("Propagation impossible : Pivot 001 introuvable.");
    return;
  }

  const typeGeometrie = modele["U04.01_Type_Geometrie"] || "";
  const geometriesAutorisees = ["Cercle", "Carré", "Rectangle"];

  if (!geometriesAutorisees.includes(typeGeometrie)) {
    setReport(
      `Propagation refusée : géométrie "${typeGeometrie}" non prise en charge.`
    );
    return;
  }

  const surfaces = calculerSurfacesUniformes(modele);

  const champsAPropager = [
    "U02.01_Superficie_Administrative_ha",
    "U02.04_Altitude_m",

    "U03.02_Type_Plan",
    "U03.03_Observation_Plan",

    "U04.01_Type_Geometrie",
    "U04.02_Mode_Representation",
    "U04.05_Rayon_m",
    "U04.06_Largeur_Bande_Centrale_m",
    "U04.09_Angle_Acces_Deg",
    "U04.12_Longueur_m",
    "U04.13_Largeur_m",

    "U04.16_Largeur_Couronne_Peripherique_m",

    "Z99.05_Source_Creation",
    "Z99.06_Statut_Enregistrement",
  ];

  let totalPivots = 0;
  let totalBlocs = 0;

  setLignes((anciennesLignes) =>
    anciennesLignes.map((ligne) => {
      if (ligne.nom === modele.nom) return ligne;

      const estParcelleCompatible =
        ligne.type === "Parcelle" && ligne.nom.startsWith("Pivot ");

      const estBlocCompatible =
        ligne.type === "Bloc" && ligne.parent?.startsWith("Pivot ");

      if (!estParcelleCompatible && !estBlocCompatible) {
        return ligne;
      }

      const nouvelleLigne = { ...ligne };

      champsAPropager.forEach((champ) => {
        if (modele[champ] !== undefined && modele[champ] !== "") {
          nouvelleLigne[champ] = modele[champ];
        }
      });

      nouvelleLigne["U04.10_Surface_Geometrique_ha"] =
        surfaces.surfaceGeometrique;

      nouvelleLigne["U04.11_Surface_Operationnelle_ha"] =
        modele["U04.11_Surface_Operationnelle_ha"] ||
        surfaces.surfaceGeometrique;

      nouvelleLigne["U03.04_Statut_Localisation"] = "En cours";

      if (estParcelleCompatible) totalPivots += 1;
      if (estBlocCompatible) totalBlocs += 1;

      return nouvelleLigne;
    })
  );

  setReport(
    `Propagation terminée : ${totalPivots} pivots et ${totalBlocs} blocs mis à jour.`
  );
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
    setReport(`${donnees.length} lignes restaurées depuis la sauvegarde locale.`);
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

  function renderQuestion() {
    if (etape === 1) {
      return (
        <QuestionCard
          numero="1 sur 4"
          question="Quel préfixe utiliser pour les pivots ?"
          exemple="Exemple : Pivot"
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
          question="Combien de pivots faut-il générer ?"
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
          question="Les pivots sont-ils divisés en blocs ?"
          exemple="Exemple : Oui pour blocs A/B"
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
        question="Combien de blocs par pivot ?"
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

  return (
    <main style={layoutStyle}>
      <section style={leftPanelStyle}>
        <h2 style={titleStyle}>Assistant Pivot</h2>

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
          style={actionButtonStyle}
          onClick={propagerParametresUniformes}
        >
           ⇉ Propager paramètres uniformes
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
        <h2 style={titleStyle}>Aperçu des pivots générés</h2>

        <PreviewTable lignes={lignes} />
      </section>
    </main>
  );
}

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
  fontSize: "18px",
  fontWeight: "700",
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