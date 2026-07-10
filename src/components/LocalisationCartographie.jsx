import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import theme from "../styles/stranalyxTheme";

const F = {
  surfaceAdministrative: "U02.01_Superficie_Administrative_ha",
  latitude: "U02.02_Latitude",
  longitude: "U02.03_Longitude",
  altitude: "U02.04_Altitude_m",
  gpsBrut: "U02.05_Coordonnees_GPS_Brutes",

  urlCarte: "U03.01_URL_Carte",
  typePlan: "U03.02_Type_Plan",
  observationPlan: "U03.03_Observation_Plan",
  statutLocalisation: "U03.04_Statut_Localisation",

  typeGeometrie: "U04.01_Type_Geometrie",
  modeRepresentation: "U04.02_Mode_Representation",

  rayon: "U04.05_Rayon_m",
  largeurBande: "U04.06_Largeur_Bande_Centrale_m",
  longueurBande: "U04.07_Longueur_Bande_Centrale_m",
  surfaceBande: "U04.08_Surface_Bande_Centrale_ha",
  angleAcces: "U04.09_Angle_Acces_Deg",
  surfaceGeometrique: "U04.10_Surface_Geometrique_ha",
  surfaceOperationnelle: "U04.11_Surface_Operationnelle_ha",

  largeurCouronne: "U04.16_Largeur_Couronne_Peripherique_m",
  rayonEmpriseTotale: "U04.17_Rayon_Emprise_Totale_m",
  surfaceCouronne: "U04.18_Surface_Couronne_Peripherique_ha",
  surfaceEmpriseTotale: "U04.19_Surface_Emprise_Totale_ha",

  sourceCreation: "Z99.05_Source_Creation",
  statutEnregistrement: "Z99.06_Statut_Enregistrement",
};

function convertirNombre(valeur) {
  if (valeur === null || valeur === undefined || valeur === "") return "";
  return String(valeur).replace(",", ".");
}

function lireNombre(valeur) {
  const n = parseFloat(convertirNombre(valeur));
  return Number.isNaN(n) ? NaN : n;
}

function formaterCoordonnee(valeur) {
  if (Number.isNaN(valeur)) return "";
  return valeur.toFixed(6).replace(".", ",");
}

function nettoyerTexte(valeur) {
  if (valeur === null || valeur === undefined) return "";
  let texte = String(valeur).trim();

  while (texte.length >= 2 && texte.startsWith('"') && texte.endsWith('"')) {
    texte = texte.slice(1, -1).trim();
  }

  return texte;
}

function getValeur(ligne, champ, fallback = "") {
  if (!ligne) return "";
  return ligne[champ] ?? ligne[fallback] ?? "";
}

function getRangBlocLocal(ligne) {
  const nom = ligne?.nom || "";

  if (nom.includes("Bloc A")) return 1;
  if (nom.includes("Bloc B")) return 2;
  if (nom.includes("Bloc C")) return 3;

  return Number(ligne?.rang_bloc_local || ligne?.U01_09_Rang_Bloc_Local || 0);
}

function getCoefficientSurfaceBloc(nombreBlocs, rangBlocLocal) {
  if (nombreBlocs === 1) return 1;

  if (nombreBlocs === 2) {
    return 0.5;
  }

  if (nombreBlocs === 3) {
    if (rangBlocLocal === 1) return 0.5;
    if (rangBlocLocal === 2) return 0.25;
    if (rangBlocLocal === 3) return 0.25;
  }

  if (nombreBlocs === 4) {
    return 0.25;
  }

  return 1;
}

function getAngleBloc(anglePivot, rangBlocLocal, nombreBlocs) {
  const angleSecteur = 360 / nombreBlocs;

  return anglePivot + (rangBlocLocal - 1) * angleSecteur;
}

function calculPointDepuisCentre(lat, lng, distanceM, angleDeg) {
  const rayonTerre = 6378137;
  const angleRad = (angleDeg * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  const newLat = Math.asin(
    Math.sin(latRad) * Math.cos(distanceM / rayonTerre) +
      Math.cos(latRad) *
        Math.sin(distanceM / rayonTerre) *
        Math.cos(angleRad)
  );

  const newLng =
    lngRad +
    Math.atan2(
      Math.sin(angleRad) *
        Math.sin(distanceM / rayonTerre) *
        Math.cos(latRad),
      Math.cos(distanceM / rayonTerre) -
        Math.sin(latRad) * Math.sin(newLat)
    );

  return [
    formaterCoordonnee((newLat * 180) / Math.PI),
    formaterCoordonnee((newLng * 180) / Math.PI),
  ];
}

function LocalisationCartographie({ lignes = [], setLignes }) {
  const unitesDisponibles = useMemo(() => {
    return lignes.filter((ligne) => ligne.type !== "Système");
  }, [lignes]);

  const [nomUnite, setNomUnite] = useState("");
  const [pasDeplacement, setPasDeplacement] = useState("0.0005");
  const [sommetsPolygone, setSommetsPolygone] = useState([
  { ordre: 1, latitude: "", longitude: "" },
  { ordre: 2, latitude: "", longitude: "" },
  { ordre: 3, latitude: "", longitude: "" },
  { ordre: 4, latitude: "", longitude: "" },
  { ordre: 5, latitude: "", longitude: "" },
  { ordre: 6, latitude: "", longitude: "" },
  { ordre: 7, latitude: "", longitude: "" },
  { ordre: 8, latitude: "", longitude: "" },
  { ordre: 9, latitude: "", longitude: "" },
  { ordre: 10, latitude: "", longitude: "" },
  { ordre: 11, latitude: "", longitude: "" },
]);
const pointsPolygone = sommetsPolygone
  .filter((s) => s.latitude !== "" && s.longitude !== "")
  .map((s) => [parseFloat(s.latitude), parseFloat(s.longitude)]);
const majSommet = (index, champ, valeur) => {
  setSommetsPolygone((precedent) =>
    precedent.map((sommet, i) =>
      i === index
        ? {
            ...sommet,
            [champ]: valeur,
          }
        : sommet
    )
  );
};

  const nomUniteActive = nomUnite || unitesDisponibles[0]?.nom || "";
  const uniteActive = lignes.find((ligne) => ligne.nom === nomUniteActive);

  if (!uniteActive) {
    return (
      <section style={panelStyle}>
        <h2 style={titleStyle}>Localisation & Cartographie</h2>
        <div style={warningStyle}>
          Aucune unité disponible. Génère d’abord les unités dans Structure
          hiérarchique.
        </div>
      </section>
    );
  }

  const estBloc = uniteActive.type === "Bloc";
  const uniteParent = estBloc
    ? lignes.find((ligne) => ligne.nom === uniteActive.parent)
    : null;
  const chargerSommetsPolygone = (unite) => {
  if (!unite) {
    setSommetsPolygone(
      Array.from({ length: 11 }, (_, i) => ({
        ordre: i + 1,
        latitude: "",
        longitude: "",
      }))
    );
    return;
  }

  if (unite.nom === "GAG 1") {
  setSommetsPolygone([
    { ordre: 1, latitude: "9.009919", longitude: "18.467696" },
    { ordre: 2, latitude: "9.017676", longitude: "18.475935" },
    { ordre: 3, latitude: "9.025644", longitude: "18.468193" },
    { ordre: 4, latitude: "9.021745", longitude: "18.464071" },
    { ordre: 5, latitude: "9.019096", longitude: "18.461217" },
    { ordre: 6, latitude: "9.014921", longitude: "18.462824" },
    { ordre: 7, latitude: "", longitude: "" },
    { ordre: 8, latitude: "", longitude: "" },
    { ordre: 9, latitude: "", longitude: "" },
    { ordre: 10, latitude: "", longitude: "" },
    { ordre: 11, latitude: "", longitude: "" },
  ]);
  return;
}

setSommetsPolygone(
  Array.from({ length: 11 }, (_, i) => ({
    ordre: i + 1,
    latitude: "",
    longitude: "",
  }))
);
};
useEffect(() => {
  chargerSommetsPolygone(uniteActive);
}, [uniteActive]);

  const uniteReference = estBloc && uniteParent ? uniteParent : uniteActive;

  const surfaceAdministrative = getValeur(
    uniteActive,
    F.surfaceAdministrative,
    "superficie_totale_ha"
  );

  const latitudeParent = getValeur(uniteReference, F.latitude, "latitude");
  const longitudeParent = getValeur(uniteReference, F.longitude, "longitude");

  const rayon = getValeur(uniteReference, F.rayon);
  const largeurBande = getValeur(uniteReference, F.largeurBande);
  const angleAcces = getValeur(uniteReference, F.angleAcces);

  const latParent = lireNombre(latitudeParent);
  const lngParent = lireNombre(longitudeParent);
  const rayonNum = lireNombre(rayon);
  const largeurBandeNum = lireNombre(largeurBande);
  const angleNum = lireNombre(angleAcces || "0");


  const distanceCentroide =
    !Number.isNaN(rayonNum) && rayonNum > 0
      ? (4 * rayonNum) / (3 * Math.PI)
      : NaN;

  const rangBlocLocal = getRangBlocLocal(uniteActive);

  const nombreBlocs = Math.max(
  1,
  Number(
    uniteReference?.nombre_blocs ||
    uniteReference?.U01_05_Nombre_Blocs ||
    uniteReference?.["U01.05_Nombre_Blocs"] ||
    uniteParent?.nombre_blocs ||
    uniteParent?.U01_05_Nombre_Blocs ||
    uniteParent?.["U01.05_Nombre_Blocs"] ||
    1
  )
);

  const coefficientBloc = estBloc
  ? getCoefficientSurfaceBloc(nombreBlocs, rangBlocLocal)
  : 1;
const nbCentroide = Math.max(
  1,
  Number(
    uniteReference?.nb_blocs ||
    uniteReference?.U01_05_Nombre_Blocs ||
    uniteReference?.["U01.05_Nombre_Blocs"] ||
    1
  )
);
  const centroideBloc =
    estBloc &&
    !Number.isNaN(latParent) &&
    !Number.isNaN(lngParent) &&
    !Number.isNaN(distanceCentroide)
      ? calculPointDepuisCentre(
          latParent,
          lngParent,
          distanceCentroide,
          getAngleBloc(angleNum, rangBlocLocal, nbCentroide)
        )
      : null;
console.log("CENTROIDE", {
  unite: uniteActive?.nom,
  rangBlocLocal,
  nbCentroide,
  centroideBloc,
});

  const latitude = estBloc
    ? centroideBloc?.[0] || getValeur(uniteActive, F.latitude, "latitude")
    : getValeur(uniteActive, F.latitude, "latitude");

  const longitude = estBloc
    ? centroideBloc?.[1] || getValeur(uniteActive, F.longitude, "longitude")
    : getValeur(uniteActive, F.longitude, "longitude");

  const altitude = getValeur(uniteActive, F.altitude, "altitude_m");
  const gpsBrut = getValeur(uniteActive, F.gpsBrut, "coordonnees_gps_brutes");

  const typeGeometrie = getValeur(uniteActive, F.typeGeometrie);
  const modeRepresentation = getValeur(uniteActive, F.modeRepresentation);

  const sourceCreation =
  getValeur(uniteActive, F.sourceCreation) || "Interface React";

  const statutEnregistrement =
  getValeur(uniteActive, F.statutEnregistrement) || "Actif";

  const typePlan = nettoyerTexte(
    getValeur(uniteActive, F.typePlan, "type_plan")
  );

  const observationPlan = nettoyerTexte(
    getValeur(uniteActive, F.observationPlan, "observation_plan")
  );

  const lat = lireNombre(latitude);
  const lng = lireNombre(longitude);
  const positionValide = !Number.isNaN(lat) && !Number.isNaN(lng);

  const surfaceGeometrique =
  uniteActive?.[F.surfaceGeometrique] ||
  (!Number.isNaN(rayonNum) && rayonNum > 0
    ? (
        ((Math.PI * rayonNum * rayonNum) / 10000) *
        coefficientBloc
      ).toFixed(2)
    : "");

  const longueurBande =
    !Number.isNaN(rayonNum) && rayonNum > 0 ? (rayonNum * 2).toFixed(2) : "";

  const surfaceBande =
  longueurBande && !Number.isNaN(largeurBandeNum)
    ? ((Number(longueurBande) * largeurBandeNum) / 10000).toFixed(2)
    : "";

  const surfaceOperationnelle =
  uniteActive?.[F.surfaceOperationnelle] ||
  (estBloc
    ? surfaceGeometrique || ""
    : surfaceGeometrique && surfaceBande
    ? (Number(surfaceGeometrique) - Number(surfaceBande)).toFixed(2)
    : surfaceGeometrique || "");

    const largeurCouronne =
  getValeur(
    uniteActive,
    F.largeurCouronne,
    "U04.16_Largeur_Couronne_Peripherique_m"
  ) || "8";

    const rayonEmpriseTotale =
  getValeur(
    uniteActive,
    F.rayonEmpriseTotale,
    "U04.17_Rayon_Emprise_Totale_m"
  ) || "";

    const surfaceCouronne =
  getValeur(
    uniteActive,
    F.surfaceCouronne,
    "U04.18_Surface_Couronne_Peripherique_ha"
  ) || "";

    const surfaceEmpriseTotale =
  getValeur(
    uniteActive,
    F.surfaceEmpriseTotale,
    "U04.19_Surface_Emprise_Totale_ha"
  ) || "";

    const urlCarte = positionValide
    ? `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`
    : "";

  function majChamp(champ, valeur) {
  console.log("MAJ CHAMP", champ, valeur, typeof setLignes);

  if (!setLignes) {
    console.log("setLignes absent");
    return;
  }

    const valeurNettoyee =
      champ === F.typePlan || champ === F.observationPlan || champ === F.gpsBrut
        ? nettoyerTexte(valeur)
        : valeur;

    setLignes((anciennesLignes) =>
      anciennesLignes.map((ligne) => {
        if (ligne.nom !== uniteActive.nom) return ligne;

        return {
          ...ligne,
          [champ]: valeurNettoyee,
          [F.statutLocalisation]:
            ligne[F.statutLocalisation] === "Validé"
              ? "En cours"
              : ligne[F.statutLocalisation] || "En cours",
        };
      })
    );
  }

  function majCalculsBloc4() {
  if (!setLignes) return;

  const nb = Math.max(
    1,
    Number(
      uniteReference?.nb_blocs ||
        uniteReference?.U01_05_Nombre_Blocs ||
        uniteReference?.["U01.05_Nombre_Blocs"] ||
        1
    )
  );

  console.log("DEBUG BLOC4", {
  unite: uniteActive?.nom,
  parent: uniteReference?.nom,
  estBloc,
  nb,
  rangBlocLocal,
  coefficientBloc: estBloc
    ? getCoefficientSurfaceBloc(nb, rangBlocLocal)
    : 1,
});

  const coefficientBloc = estBloc
  ? getCoefficientSurfaceBloc(nb, rangBlocLocal)
  : 1;

  const surfaceAdministrativeParent = lireNombre(
    getValeur(uniteReference, F.surfaceAdministrative, "superficie_totale_ha")
  );

  const surfaceAdministrativeCalculee = !Number.isNaN(surfaceAdministrativeParent)
    ? (surfaceAdministrativeParent * coefficientBloc).toFixed(2)
    : "";

  const longueurBandeCalculee =
    !Number.isNaN(rayonNum) && rayonNum > 0 ? (rayonNum * 2).toFixed(2) : "";

  const surfaceBandeCalculee =
    longueurBandeCalculee && !Number.isNaN(largeurBandeNum)
      ? (
          ((Number(longueurBandeCalculee) * largeurBandeNum) / 10000) *
          coefficientBloc
        ).toFixed(2)
      : "";

  const surfaceGeometriquePivot =
  !Number.isNaN(rayonNum) && rayonNum > 0
    ? (Math.PI * rayonNum * rayonNum) / 10000
    : NaN;

const surfaceBandePivot =
  longueurBandeCalculee && !Number.isNaN(largeurBandeNum)
    ? (Number(longueurBandeCalculee) * largeurBandeNum) / 10000
    : 0;

const surfaceGeometriqueCalculee = !Number.isNaN(surfaceGeometriquePivot)
  ? (surfaceGeometriquePivot * coefficientBloc).toFixed(2)
  : "";

const surfaceOperationnellePivot = !Number.isNaN(surfaceGeometriquePivot)
  ? surfaceGeometriquePivot - surfaceBandePivot
  : NaN;

const surfaceOperationnelleCalculee = !Number.isNaN(surfaceOperationnellePivot)
  ? (surfaceOperationnellePivot * coefficientBloc).toFixed(2)
  : "";

  const largeurCouronneNum = lireNombre(
  getValeur(uniteActive, F.largeurCouronne, "U04.16_Largeur_Couronne_Peripherique_m")
) || 8;

const rayonEmpriseTotaleCalcule =
  !Number.isNaN(rayonNum) && rayonNum > 0
    ? (rayonNum + largeurCouronneNum).toFixed(2)
    : "";

const surfaceCouronneCalculee =
  !Number.isNaN(rayonNum) && rayonNum > 0
    ? (
        (Math.PI * Math.pow(rayonNum + largeurCouronneNum, 2) -
          Math.PI * Math.pow(rayonNum, 2)) /
        10000
      ).toFixed(2)
    : "";

const surfaceEmpriseTotaleCalculee =
  !Number.isNaN(rayonNum) && rayonNum > 0
    ? ((Math.PI * Math.pow(rayonNum + largeurCouronneNum, 2)) / 10000).toFixed(2)
    : "";

  console.log("DEBUG SURFACES", {
  surfaceGeometriquePivot,
  surfaceBandePivot,
  coefficientBloc,
  surfaceGeometriqueCalculee:
    !Number.isNaN(surfaceGeometriquePivot)
      ? (surfaceGeometriquePivot * coefficientBloc).toFixed(2)
      : "",
});

  setLignes((anciennesLignes) =>
    anciennesLignes.map((ligne) => {
      if (ligne.nom !== uniteActive.nom) return ligne;

      return {
        ...ligne,
        [F.surfaceAdministrative]: surfaceAdministrativeCalculee,
        [F.latitude]: latitude,
        [F.longitude]: longitude,
        [F.urlCarte]: urlCarte,
        [F.rayon]: rayon,
        [F.largeurBande]: largeurBande,
        [F.angleAcces]: angleAcces,
        [F.longueurBande]: longueurBandeCalculee,
        [F.surfaceBande]: surfaceBandeCalculee,
        [F.surfaceGeometrique]: surfaceGeometriqueCalculee,
        [F.surfaceOperationnelle]: surfaceOperationnelleCalculee,
        [F.largeurCouronne]: String(largeurCouronneNum),
        [F.rayonEmpriseTotale]: rayonEmpriseTotaleCalcule,
        [F.surfaceCouronne]: surfaceCouronneCalculee,
        [F.surfaceEmpriseTotale]: surfaceEmpriseTotaleCalculee,
        [F.statutLocalisation]:
          ligne[F.statutLocalisation] === "Validé"
            ? "Validé"
            : ligne[F.statutLocalisation] || "En cours",
      };
    })
  );

  alert(`${uniteActive.nom} : Bloc 4 recalculé.`);
}

  function deplacerLatitude(direction) {
    if (estBloc) return;

    const valeurActuelle = lireNombre(latitude || "0");
    const pas = lireNombre(pasDeplacement);

    if (Number.isNaN(valeurActuelle) || Number.isNaN(pas)) return;

    const nouvelleValeur =
      direction === "nord" ? valeurActuelle + pas : valeurActuelle - pas;

    majChamp(F.latitude, formaterCoordonnee(nouvelleValeur));
  }

  function deplacerLongitude(direction) {
    if (estBloc) return;

    const valeurActuelle = lireNombre(longitude || "0");
    const pas = lireNombre(pasDeplacement);

    if (Number.isNaN(valeurActuelle) || Number.isNaN(pas)) return;

    const nouvelleValeur =
      direction === "est" ? valeurActuelle + pas : valeurActuelle - pas;

    majChamp(F.longitude, formaterCoordonnee(nouvelleValeur));
  }

  function deplacerAltitude(direction) {
    const valeurActuelle = lireNombre(altitude || "0");

    if (Number.isNaN(valeurActuelle)) return;

    const nouvelleValeur =
      direction === "plus" ? valeurActuelle + 1 : valeurActuelle - 1;

    majChamp(F.altitude, String(nouvelleValeur));
  }

  function validerUnite() {
    const erreurs = [];

    if (!latitude) erreurs.push(F.latitude);
    if (!longitude) erreurs.push(F.longitude);
    if (!typePlan) erreurs.push(F.typePlan);
    if (!observationPlan) erreurs.push(F.observationPlan);

    if (!estBloc && !surfaceAdministrative) {
      erreurs.push(F.surfaceAdministrative);
    }

    if (erreurs.length > 0) {
      alert("Champs obligatoires manquants :\n\n" + erreurs.join("\n"));
      return;
    }

    setLignes((anciennesLignes) =>
      anciennesLignes.map((ligne) =>
        ligne.nom === uniteActive.nom
          ? {
              ...ligne,
              [F.latitude]: latitude,
              [F.longitude]: longitude,
              [F.typePlan]: typePlan,
              [F.observationPlan]: observationPlan,
              [F.urlCarte]: urlCarte,
              [F.typeGeometrie]: typeGeometrie,
              [F.modeRepresentation]: modeRepresentation,
              [F.rayon]: rayon,
              [F.largeurBande]: largeurBande,
              [F.angleAcces]: angleAcces,
              [F.longueurBande]: longueurBande,
              [F.surfaceBande]: surfaceBande,
              [F.surfaceGeometrique]: surfaceGeometrique,
              [F.surfaceOperationnelle]: surfaceOperationnelle,
              [F.sourceCreation]: sourceCreation,
              [F.statutEnregistrement]: statutEnregistrement,
              [F.statutLocalisation]: "Validé",
            }
          : ligne
      )
    );

    alert(`${uniteActive.nom} validé avec succès.`);
  }

  return (
    <section style={panelStyle}>
      <h2 style={titleStyle}>Localisation & Cartographie</h2>

      <div style={introStyle}>
        Les blocs héritent maintenant automatiquement du pivot parent. Leur
        latitude et longitude affichées sont celles de leur centroïde calculé.
      </div>
      <div style={pageGridStyle}>
        <aside style={actionPanelStyle}>
    <h3 style={actionTitleStyle}>Actions</h3>

    <button
      style={actionButtonStyle}
      onClick={majCalculsBloc4}
    >
      ✓ Valider cette unité
    </button>

    <button style={actionButtonStyle}>
      ⇉ Propager paramètres uniformes
    </button>

    <button style={actionButtonStyle}>
      ⇧ Synchroniser Airtable
    </button>

    <div style={reportBoxStyle}>
      <strong>Rapport d'exécution</strong>
      <br />
      Aucun traitement exécuté.
    </div>
  </aside>
        <div style={leftColumnStyle}>

      <div style={sectionTitleStyle}>1. Sélection de l’unité</div>

      <div style={statusBoxStyle}>
        Statut :
        <span
          style={{
            ...statusBadgeStyle,
            background:
              uniteActive?.[F.statutLocalisation] === "Validé"
                ? "#D8F3DC"
                : uniteActive?.[F.statutLocalisation] === "En cours"
                ? "#DDEBFF"
                : "#FFF3CD",
            color:
              uniteActive?.[F.statutLocalisation] === "Validé"
                ? "#1B5E20"
                : uniteActive?.[F.statutLocalisation] === "En cours"
                ? "#174EA6"
                : "#7A5200",
          }}
        >
          {uniteActive?.[F.statutLocalisation] || "À renseigner"}
        </span>
      </div>

      <div style={formOneColumnStyle}>
        <div style={fieldBlockStyle}>
          <label style={labelStyle}>Unité physique</label>
          <select
            style={inputStyle}
            value={nomUniteActive}
            onChange={(e) => setNomUnite(e.target.value)}
          >
            {unitesDisponibles.map((ligne, index) => (
              <option key={`${ligne.nom}-${index}`} value={ligne.nom}>
                {ligne.nom} — {ligne.type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {estBloc && (
        <div style={warningStyle}>
          Bloc sélectionné : les coordonnées sont calculées depuis le pivot
          parent <strong>{uniteParent?.nom || "introuvable"}</strong>.
        </div>
      )}

      <div style={sectionTitleStyle}>2. Bloc 2 — GPS & superficies</div>

      <div style={pasBoxStyle}>
        <label style={labelStyle}>Pas de déplacement</label>
        <select
          style={smallSelectStyle}
          value={pasDeplacement}
          onChange={(e) => setPasDeplacement(e.target.value)}
          disabled={estBloc}
        >
          <option value="0.0001">Fin</option>
          <option value="0.0005">Moyen</option>
          <option value="0.0010">Large</option>
        </select>
      </div>

      <div style={formStyle}>
        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U02.01 Superficie administrative (ha)</label>
          <input
            style={inputStyle}
            value={surfaceAdministrative}
            onChange={(e) => majChamp(F.surfaceAdministrative, e.target.value)}
            readOnly={estBloc}
          />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U02.02 Latitude</label>
          <div style={coordControlStyle}>
            <input
              style={inputStyle}
              value={latitude}
              onChange={(e) => majChamp(F.latitude, e.target.value)}
              readOnly={estBloc}
            />
            <div style={miniButtonsColumnStyle}>
              <button style={miniButtonStyle} onClick={() => deplacerLatitude("nord")}>
                ↑
              </button>
              <button style={miniButtonStyle} onClick={() => deplacerLatitude("sud")}>
                ↓
              </button>
            </div>
          </div>
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U02.03 Longitude</label>
          <div style={coordControlStyle}>
            <input
              style={inputStyle}
              value={longitude}
              onChange={(e) => majChamp(F.longitude, e.target.value)}
              readOnly={estBloc}
            />
            <div style={miniButtonsRowStyle}>
              <button style={miniButtonStyle} onClick={() => deplacerLongitude("ouest")}>
                ←
              </button>
              <button style={miniButtonStyle} onClick={() => deplacerLongitude("est")}>
                →
              </button>
            </div>
          </div>
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U02.04 Altitude (m)</label>
          <div style={coordControlStyle}>
            <input
              style={inputStyle}
              value={altitude}
              onChange={(e) => majChamp(F.altitude, e.target.value)}
            />
            <div style={miniButtonsColumnStyle}>
              <button style={miniButtonStyle} onClick={() => deplacerAltitude("plus")}>
                +
              </button>
              <button style={miniButtonStyle} onClick={() => deplacerAltitude("moins")}>
                −
              </button>
            </div>
          </div>
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U02.05 Coordonnées GPS brutes</label>
          <input
            style={inputStyle}
            value={gpsBrut}
            onChange={(e) => majChamp(F.gpsBrut, e.target.value)}
          />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U04.11 Surface opérationnelle (ha)</label>
          <input
  style={inputStyle}
  value={uniteActive?.[F.surfaceOperationnelle] || surfaceOperationnelle}
  readOnly
/>
        </div>
      </div>

      <div style={sectionTitleStyle}>3. Bloc 4 — Paramètres géométriques liés</div>

      <div style={formStyle}>
        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U04.05 Rayon (m)</label>
          <input
            style={inputStyle}
            value={rayon}
            onChange={(e) => majChamp(F.rayon, e.target.value)}
            readOnly={estBloc}
          />
        </div>

        <div style={fieldBlockStyle}>
  <label style={labelStyle}>U04.01 Type géométrie</label>
  <select
    style={inputStyle}
    value={typeGeometrie}
    onChange={(e) => majChamp(F.typeGeometrie, e.target.value)}
  >
    <option value="">Sélectionner</option>
    <option value="Cercle">Cercle</option>
    <option value="Demi-cercle">Demi-cercle</option>
    <option value="Quart de cercle">Quart de cercle</option>
    <option value="Polygone">Polygone</option>
    <option value="Autre">Autre</option>
  </select>
</div>

<div style={fieldBlockStyle}>
  <label style={labelStyle}>U04.02 Mode représentation</label>
  <select
    style={inputStyle}
    value={modeRepresentation}
    onChange={(e) => majChamp(F.modeRepresentation, e.target.value)}
  >
    <option value="">Sélectionner</option>
    <option value="Centre + rayon">Centre + rayon</option>
    <option value="Coordonnées GPS">Coordonnées GPS</option>
    <option value="Centroïde bloc">Centroïde bloc</option>
    <option value="Polygone cartographié">Polygone cartographié</option>
    <option value="Autre">Autre</option>
  </select>
</div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U04.06 Largeur bande centrale (m)</label>
          <input
            style={inputStyle}
            value={largeurBande}
            onChange={(e) => majChamp(F.largeurBande, e.target.value)}
            readOnly={estBloc}
          />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U04.09 Angle accès (deg)</label>
          <input
            style={inputStyle}
            value={angleAcces}
            onChange={(e) => majChamp(F.angleAcces, e.target.value)}
            readOnly={estBloc}
          />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U04.07 Longueur bande centrale (m)</label>
          <input style={inputStyle} value={longueurBande} readOnly />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U04.08 Surface bande centrale (ha)</label>
          <input style={inputStyle} value={surfaceBande} readOnly />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U04.10 Surface géométrique (ha)</label>
          <input
  style={inputStyle}
  value={uniteActive?.[F.surfaceGeometrique] || surfaceGeometrique}
  readOnly
/>
        </div>
        <div style={fieldBlockStyle}>
  <label style={labelStyle}>U04.16 Largeur couronne périphérique (m)</label>
  <input
    style={inputStyle}
    value={largeurCouronne}
    onChange={(e) => majChamp(F.largeurCouronne, e.target.value)}
    readOnly={estBloc}
  />
</div>

<div style={fieldBlockStyle}>
  <label style={labelStyle}>U04.17 Rayon emprise totale (m)</label>
  <input style={inputStyle} value={rayonEmpriseTotale} readOnly />
</div>

<div style={fieldBlockStyle}>
  <label style={labelStyle}>U04.18 Surface couronne périphérique (ha)</label>
  <input style={inputStyle} value={surfaceCouronne} readOnly />
</div>

<div style={fieldBlockStyle}>
  <label style={labelStyle}>U04.19 Surface emprise totale (ha)</label>
  <input style={inputStyle} value={surfaceEmpriseTotale} readOnly />
</div>
      </div>

      

      <div style={sectionTitleStyle}>4.3 Coordonnées des sommets du polygone</div>

<div style={{ ...fieldBlockStyle, gridColumn: "1 / -1" }}>
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th>Sommet</th>
        <th>Latitude</th>
        <th>Longitude</th>
      </tr>
    </thead>
    <tbody>
      {sommetsPolygone.map((sommet, index) => (
        <tr key={sommet.ordre}>
          <td>S{sommet.ordre}</td>
          <td>
            <input
              style={inputStyle}
              value={sommet.latitude}
              onChange={(e) => majSommet(index, "latitude", e.target.value)}
            />
          </td>
          <td>
            <input
              style={inputStyle}
              value={sommet.longitude}
              onChange={(e) => majSommet(index, "longitude", e.target.value)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      <div style={sectionTitleStyle}>4. Carte interactive</div>

      {urlCarte && (
        <div style={urlBoxStyle}>
          <strong>URL carte : </strong>
          <a href={urlCarte} target="_blank" rel="noreferrer">
            Ouvrir la carte OpenStreetMap
          </a>
        </div>
      )}

      <div style={mapWrapperStyle}>
        {positionValide ? (
          <MapContainer
            key={`${lat}-${lng}-${nomUniteActive}`}
            center={[lat, lng]}
            zoom={16}
            scrollWheelZoom={true}
            style={mapStyle}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            />

           <Polygon positions={pointsPolygone}>
  <Popup>Contour {nomUniteActive}</Popup>
</Polygon>

{pointsPolygone.map((point, index) => (
  <Marker key={`sommet-${index}`} position={point}>
    <Popup>
      Sommet S{index + 1}
      <br />
      Lat : {point[0]}
      <br />
      Long : {point[1]}
    </Popup>
  </Marker>
))}

            <Marker
              position={[lat, lng]}
              draggable={!estBloc}
              eventHandlers={{
                dragend: (e) => {
                  if (estBloc) return;
                  const position = e.target.getLatLng();
                  majChamp(F.latitude, formaterCoordonnee(position.lat));
                  majChamp(F.longitude, formaterCoordonnee(position.lng));
                },
              }}
            >
              <Popup>
                <strong>{nomUniteActive}</strong>
                <br />
                Lat : {latitude}
                <br />
                Long : {longitude}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div style={errorStyle}>
            Coordonnées invalides ou pivot parent non renseigné.
          </div>
        )}
      </div>

      <div style={sectionTitleStyle}>5. Bloc 3 — Plan & observations</div>

      <div style={formTwoColumnsStyle}>
        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U03.01 URL carte</label>
          <input style={inputStyle} value={urlCarte} readOnly />
        </div>

        <div style={fieldBlockStyle}>
          <label style={labelStyle}>U03.02 Type plan</label>
          <select
            style={inputStyle}
            value={typePlan}
            onChange={(e) => majChamp(F.typePlan, e.target.value)}
          >
            <option value="">Sélectionner</option>
            <option value="Capture carte">Capture carte</option>
            <option value="Plan cadastral">Plan cadastral</option>
            <option value="Image satellite">Image satellite</option>
            <option value="Plan drone">Plan drone</option>
            <option value="Croquis terrain">Croquis terrain</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div style={{ ...fieldBlockStyle, gridColumn: "1 / -1" }}>
          <label style={labelStyle}>U03.03 Observation plan</label>
          <textarea
            style={textareaStyle}
            value={observationPlan}
            onChange={(e) => majChamp(F.observationPlan, e.target.value)}
            rows={4}
          />
        </div>
       </div>
        
      
      <div style={sectionTitleStyle}>6. Audit & Traçabilité</div>

<div style={formTwoColumnsStyle}>
  <div style={fieldBlockStyle}>
    <label style={labelStyle}>Z99.05 Source création</label>
    <select
  style={inputStyle}
  value={sourceCreation}
  onChange={(e) => majChamp(F.sourceCreation, e.target.value)}
>
  <option value="Manuelle">Manuelle</option>
  <option value="Import CSV">Import CSV</option>
  <option value="Interface React">Interface React</option>
  <option value="Script Sync">Script Sync</option>
  <option value="Automatisation">Automatisation</option>
  <option value="Duplication">Duplication</option>
  <option value="Migration">Migration</option>
  <option value="API Externe">API Externe</option>
</select>
  </div>

  <div style={fieldBlockStyle}>
    <label style={labelStyle}>Z99.06 Statut enregistrement</label>
    <select
  style={inputStyle}
  value={statutEnregistrement}
  onChange={(e) => majChamp(F.statutEnregistrement, e.target.value)}
>
  <option value="Actif">Actif</option>
  <option value="Archivé">Archivé</option>
  <option value="Bloqué">Bloqué</option>
  <option value="En contrôle">En contrôle</option>
  <option value="Obsolète">Obsolète</option>
  <option value="Erreur">Erreur</option>
</select>
  </div>
</div>

  </div>

  

</div>

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

const warningStyle = {
  background: "#FFF8E5",
  border: "1px solid #E6C36A",
  borderRadius: "12px",
  padding: "12px",
  color: "#6B4A00",
  fontSize: "13px",
  fontWeight: "700",
  marginBottom: "16px",
};

const sectionTitleStyle = {
  marginTop: "18px",
  marginBottom: "10px",
  padding: "8px 10px",
  background: "#EAF5EE",
  borderLeft: "5px solid #0B6B2E",
  borderRadius: "8px",
  color: "#0B6B2E",
  fontWeight: "800",
  fontSize: "15px",
};

const statusBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
  fontWeight: "700",
  color: "#0B6B2E",
};

const statusBadgeStyle = {
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "800",
};

const formOneColumnStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "12px",
  marginBottom: "16px",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "12px",
  marginBottom: "16px",
};

const formTwoColumnsStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginBottom: "16px",
};

const fieldBlockStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#0B6B2E",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: `1px solid ${theme.colors.border}`,
  fontSize: "14px",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  fontFamily: "inherit",
};

const pasBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "14px",
};

const smallSelectStyle = {
  padding: "8px",
  borderRadius: "8px",
  border: `1px solid ${theme.colors.border}`,
};

const coordControlStyle = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
};

const miniButtonsColumnStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const miniButtonsRowStyle = {
  display: "flex",
  gap: "4px",
};

const miniButtonStyle = {
  width: "34px",
  height: "34px",
  borderRadius: "8px",
  border: "none",
  background: "#0B6B2E",
  color: "#FFFFFF",
  fontWeight: "800",
  cursor: "pointer",
};

const urlBoxStyle = {
  background: "#F7F7F7",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "10px",
  padding: "10px",
  marginBottom: "12px",
  fontSize: "14px",
};

const mapWrapperStyle = {
  height: "430px",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "14px",
  overflow: "hidden",
  marginBottom: "16px",
};

const mapStyle = {
  height: "100%",
  width: "100%",
};

const errorStyle = {
  padding: "20px",
  color: "#B00020",
  fontWeight: "700",
};

const validationBoxStyle = {
  marginTop: "18px",
  display: "flex",
  justifyContent: "center",
  gap: "12px",
};

const pageGridStyle = {
  display: "grid",
  gridTemplateColumns: "200px minmax(0, 2fr)",
  gap: "24px",
  alignItems: "start",
};

const leftColumnStyle = {
  minWidth: 0,
};

const actionPanelStyle = {
  width: "150px",
  background: "#F8FAF9",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "16px",
  padding: "16px",
  position: "sticky",
  top: "18px",
};

const actionTitleStyle = {
  marginTop: 0,
  marginBottom: "14px",
  color: "#0B6B2E",
  fontSize: "18px",
  fontWeight: "800",
};

const actionButtonStyle = {
  width: "100%",
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "12px 14px",
  borderRadius: "12px",
  fontWeight: "800",
  fontSize: "14px",
  cursor: "pointer",
  marginBottom: "10px",
};

const reportBoxStyle = {
  marginTop: "14px",
  background: "#FFFFFF",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "12px",
  padding: "12px",
  fontSize: "13px",
  lineHeight: 1.5,
  color: theme.colors.text,
};

const validationButtonStyle = {
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "14px 26px",
  borderRadius: "12px",
  fontWeight: "800",
  fontSize: "15px",
  cursor: "pointer",
};

export default LocalisationCartographie;