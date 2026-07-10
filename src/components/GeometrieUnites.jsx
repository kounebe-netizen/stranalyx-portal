import { useMemo, useState } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  ScaleControl,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import theme from "../styles/stranalyxTheme";

function convertirNombre(valeur) {
  if (valeur === null || valeur === undefined || valeur === "") return NaN;
  return parseFloat(String(valeur).replace(",", "."));
}

function calculPointDepuisCentre(lat, lng, distanceM, angleDeg) {
  const rayonTerre = 6378137;
  const angleRad = (angleDeg * Math.PI) / 180;

  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;

  const newLat = Math.asin(
    Math.sin(latRad) * Math.cos(distanceM / rayonTerre) +
      Math.cos(latRad) * Math.sin(distanceM / rayonTerre) * Math.cos(angleRad)
  );

  const newLng =
    lngRad +
    Math.atan2(
      Math.sin(angleRad) * Math.sin(distanceM / rayonTerre) * Math.cos(latRad),
      Math.cos(distanceM / rayonTerre) - Math.sin(latRad) * Math.sin(newLat)
    );

  return [(newLat * 180) / Math.PI, (newLng * 180) / Math.PI];
}

function GeometrieUnites({ lignes = [], setLignes }) {
  const unitesDisponibles = useMemo(() => {
    return lignes.filter((ligne) => ligne.type === "Parcelle");
  }, [lignes]);

  const [nomUnite, setNomUnite] = useState("");

  const uniteActive =
    lignes.find((ligne) => ligne.nom === nomUnite) || unitesDisponibles[0] || null;
    console.log("UNITE ACTIVE GEOMETRIE =", uniteActive);

  function majChamp(champ, valeur) {
    if (!uniteActive || !setLignes) return;

    setLignes((anciennesLignes) =>
      anciennesLignes.map((ligne) =>
        ligne.nom === uniteActive.nom
          ? {
              ...ligne,
              [champ]: valeur,
            }
          : ligne
      )
    );
  }

  if (!uniteActive) {
    return (
      <section style={panelStyle}>
        <h2 style={titleStyle}>Géométrie des unités physiques</h2>

        <div style={emptyStyle}>
          Aucune unité disponible. Génère d’abord les unités dans Structure
          hiérarchique.
        </div>
      </section>
    );
  }

  const nomUniteActif = uniteActive.nom;

  const typeGeometrie = uniteActive.U04_01_Type_Geometrie || "Cercle";

  const modeRepresentation =
    uniteActive.U04_02_Mode_Representation || "Centre + Rayon";

  const latitudeCentre =
    uniteActive["U02.02_Latitude"] ?? "";

  const longitudeCentre =
    uniteActive["U02.03_Longitude"] ?? "";


  const nombreSommets = uniteActive.U04_03_Nombre_Sommets || "";
  const coordonneesGeometriques =
    uniteActive.U04_04_Coordonnees_Geometriques || "";

  const rayonM = uniteActive.U04_05_Rayon_m || "581";

  const largeurBandeCentrale =
    uniteActive.U04_06_Largeur_Bande_Centrale_m || "12";

  const angleAcces = uniteActive.U04_09_Angle_Acces_Deg || "0";

  const superficieTotaleHa =
 uniteActive["U02.01_Superficie_Administrative_ha"] ?? "106";

  const lat = convertirNombre(latitudeCentre);
  const lng = convertirNombre(longitudeCentre);
  const rayon = convertirNombre(rayonM);
  const largeurBande = convertirNombre(largeurBandeCentrale);
  const angle = convertirNombre(angleAcces);
  const superficieTotale = convertirNombre(superficieTotaleHa);

  const positionValide =
    !Number.isNaN(lat) &&
    !Number.isNaN(lng) &&
    !Number.isNaN(rayon) &&
    rayon > 0;

  const surfaceGeometriqueHa = positionValide
    ? ((Math.PI * rayon * rayon) / 10000).toFixed(2)
    : "";

  const longueurBandeCentraleM = positionValide ? (rayon * 2).toFixed(2) : "";

  const surfaceBandeCentraleHa =
    positionValide && !Number.isNaN(largeurBande)
      ? ((largeurBande * convertirNombre(longueurBandeCentraleM)) / 10000).toFixed(2)
      : "";

  const surfaceExploitableHa =
    positionValide &&
    !Number.isNaN(superficieTotale) &&
    !Number.isNaN(convertirNombre(surfaceBandeCentraleHa))
      ? (superficieTotale - convertirNombre(surfaceBandeCentraleHa)).toFixed(2)
      : "";

  const rayonInterieur =
    positionValide && !Number.isNaN(largeurBande)
      ? rayon - largeurBande
      : rayon;

  const pointA = positionValide
    ? calculPointDepuisCentre(lat, lng, rayon, angle)
    : null;

  const pointB = positionValide
    ? calculPointDepuisCentre(lat, lng, rayon, angle + 180)
    : null;

  function enregistrerCalculs() {
    majChamp("U04_01_Type_Geometrie", typeGeometrie);
    majChamp("U04_02_Mode_Representation", modeRepresentation);

    majChamp("U04_05_Rayon_m", rayonM);
    majChamp("U04_06_Largeur_Bande_Centrale_m", largeurBandeCentrale);
    majChamp("U04_09_Angle_Acces_Deg", angleAcces);

    majChamp("U04_07_Longueur_Bande_Centrale_m", longueurBandeCentraleM);
    majChamp("U04_08_Surface_Bande_Centrale_ha", surfaceBandeCentraleHa);

    majChamp("superficie_exploitable_ha", surfaceExploitableHa);

    alert(`${nomUniteActif} : calculs géométriques enregistrés.`);
  }

  return (
    <section style={panelStyle}>
      <h2 style={titleStyle}>Géométrie des unités physiques</h2>

      <div style={introStyle}>
        Cette vue lit les coordonnées saisies dans Localisation & Cartographie
        et calcule la géométrie du pivot à partir du rayon, de la bande centrale
        et de la superficie totale retenue.
      </div>

      <div style={layoutStyle}>
        <div style={leftStyle}>
          <div style={sectionTitleStyle}>1. Sélection de l’unité</div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>Unité physique</label>
            <select
              style={inputStyle}
              value={nomUniteActif}
              onChange={(e) => setNomUnite(e.target.value)}
            >
              {unitesDisponibles.map((ligne, index) => (
                <option key={`${ligne.nom}-${index}`} value={ligne.nom}>
                  {ligne.nom}
                </option>
              ))}
            </select>
          </div>

          <div style={sectionTitleStyle}>2. Bloc 4 — Géométrie</div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.01 Type géométrie</label>
            <select
              style={inputStyle}
              value={typeGeometrie}
              onChange={(e) =>
                majChamp("U04_01_Type_Geometrie", e.target.value)
              }
            >
              <option value="Point">Point</option>
              <option value="Cercle">Cercle</option>
              <option value="Rectangle">Rectangle</option>
              <option value="Triangle">Triangle</option>
              <option value="Polygone">Polygone</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.02 Mode représentation</label>
            <select
              style={inputStyle}
              value={modeRepresentation}
              onChange={(e) =>
                majChamp("U04_02_Mode_Representation", e.target.value)
              }
            >
              <option value="Centre + rayon">Centre + rayon</option>
              <option value="Longueur + largeur">Longueur + largeur</option>
              <option value="Base + hauteur">Base + hauteur</option>
              <option value="Sommets GPS">Sommets GPS</option>
              <option value="Tracé manuel">Tracé manuel</option>
            <option value="Import GeoJSON">Import GeoJSON</option>
            </select>
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.03 Nombre sommets</label>
            <input
              style={inputStyle}
              value={nombreSommets}
              onChange={(e) =>
                majChamp("U04_03_Nombre_Sommets", e.target.value)
              }
            />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.04 Coordonnées géométriques</label>
            <textarea
              style={{ ...inputStyle, minHeight: "80px" }}
              value={coordonneesGeometriques}
              onChange={(e) =>
                majChamp("U04_04_Coordonnees_Geometriques", e.target.value)
              }
            />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>Latitude centre</label>
            <input style={inputStyle} value={latitudeCentre} readOnly />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>Longitude centre</label>
            <input style={inputStyle} value={longitudeCentre} readOnly />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.05 Rayon (m)</label>
            <input
              style={inputStyle}
              value={rayonM}
              onChange={(e) => majChamp("U04_05_Rayon_m", e.target.value)}
            />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.06 Largeur bande centrale (m)</label>
            <input
              style={inputStyle}
              value={largeurBandeCentrale}
              onChange={(e) =>
                majChamp("U04_06_Largeur_Bande_Centrale_m", e.target.value)
              }
            />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.07 Longueur bande centrale (m)</label>
            <input style={inputStyle} value={longueurBandeCentraleM} readOnly />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.08 Surface bande centrale (ha)</label>
            <input style={inputStyle} value={surfaceBandeCentraleHa} readOnly />
          </div>

          <div style={fieldBlockStyle}>
            <label style={labelStyle}>U04.09 Angle accès (deg)</label>
            <input
              style={inputStyle}
              value={angleAcces}
              onChange={(e) =>
                majChamp("U04_09_Angle_Acces_Deg", e.target.value)
              }
            />
          </div>

          <div style={infoBoxStyle}>
            <strong>Surface géométrique :</strong> {surfaceGeometriqueHa} ha
            <br />
            <strong>Surface totale retenue :</strong> {superficieTotaleHa} ha
            <br />
            <strong>Longueur bande centrale :</strong>{" "}
            {longueurBandeCentraleM} m
            <br />
            <strong>Surface bande centrale :</strong>{" "}
            {surfaceBandeCentraleHa} ha
            <br />
            <strong>Surface exploitable :</strong> {surfaceExploitableHa} ha
          </div>

          <button style={validationButtonStyle} onClick={enregistrerCalculs}>
            ✓ Enregistrer les calculs géométriques
          </button>
        </div>

        <div style={rightStyle}>
          <div style={sectionTitleStyle}>3. Représentation cartographique</div>

          <div style={mapWrapperStyle}>
            {positionValide ? (
              <MapContainer
                key={`${lat}-${lng}-${rayon}-${largeurBande}-${angle}`}
                center={[lat, lng]}
                zoom={16}
                scrollWheelZoom={true}
                style={mapStyle}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                />

                <ScaleControl
                  position="bottomleft"
                  metric={true}
                  imperial={false}
                />

                <Marker position={[lat, lng]}>
                  <Popup>
                    <strong>{nomUniteActif}</strong>
                    <br />
                    Centre : {latitudeCentre}, {longitudeCentre}
                    <br />
                    Rayon : {rayon} m
                    <br />
                    Surface totale retenue : {superficieTotaleHa} ha
                    <br />
                    Surface exploitable : {surfaceExploitableHa} ha
                  </Popup>
                </Marker>

                <Circle
                  center={[lat, lng]}
                  radius={rayon}
                  pathOptions={{ weight: 4, fillOpacity: 0.08 }}
                />

                <Circle
                  center={[lat, lng]}
                  radius={rayonInterieur}
                  pathOptions={{ weight: 2, dashArray: "8 8" }}
                />

                {pointA && pointB && (
                  <Polyline
                    positions={[pointA, [lat, lng], pointB]}
                    pathOptions={{ weight: 5 }}
                  />
                )}
              </MapContainer>
            ) : (
              <div style={errorStyle}>
                Coordonnées ou rayon invalides. Vérifie d’abord la localisation
                de cette unité.
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={sectionTitleStyle}>
        4. Vue générée Bloc 4 — Contrôle avant import Airtable
      </div>

      <div style={previewWrapperStyle}>
        <table style={previewTableStyle}>
          <thead>
            <tr>
              <th style={stickyFirstHeaderStyle}>Nom</th>
              <th style={stickyHeaderStyle}>U04_01_Type_Geometrie</th>
              <th style={stickyHeaderStyle}>U04_02_Mode_Representation</th>
              <th style={stickyHeaderStyle}>U04_03_Nombre_Sommets</th>
              <th style={stickyHeaderStyle}>U04_04_Coordonnees_Geometriques</th>
              <th style={stickyHeaderStyle}>U04_05_Rayon_m</th>
              <th style={stickyHeaderStyle}>U04_06_Largeur_Bande_Centrale_m</th>
              <th style={stickyHeaderStyle}>U04_07_Longueur_Bande_Centrale_m</th>
              <th style={stickyHeaderStyle}>U04_08_Surface_Bande_Centrale_ha</th>
              <th style={stickyHeaderStyle}>U04_09_Angle_Acces_Deg</th>
            </tr>
          </thead>

          <tbody>
            {lignes
              .filter((ligne) => ligne.type === "Parcelle")
              .map((ligne, index) => (
                <tr key={`${ligne.nom}-${index}`}>
                  <td style={{ ...previewTdStyle, ...stickyFirstColStyle }}>{ligne.nom}</td>
                  <td style={previewTdStyle}>
                    {ligne.U04_01_Type_Geometrie || ""}
                  </td>
                  <td style={previewTdStyle}>
                    {ligne.U04_02_Mode_Representation || ""}
                  </td>
                  <td style={previewTdStyle}>
                    {ligne.U04_03_Nombre_Sommets || ""}
                  </td>
                  <td style={previewTdStyle}>
                    {ligne.U04_04_Coordonnees_Geometriques || ""}
                  </td>
                  <td style={previewTdStyle}>{ligne.U04_05_Rayon_m || ""}</td>
                  <td style={previewTdStyle}>
                    {ligne.U04_06_Largeur_Bande_Centrale_m || ""}
                  </td>
                  <td style={previewTdStyle}>
                    {ligne.U04_07_Longueur_Bande_Centrale_m || ""}
                  </td>
                  <td style={previewTdStyle}>
                    {ligne.U04_08_Surface_Bande_Centrale_ha || ""}
                  </td>
                  <td style={previewTdStyle}>
                    {ligne.U04_09_Angle_Acces_Deg || ""}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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
};

const layoutStyle = {
  display: "grid",
  gridTemplateColumns: "34% 66%",
  gap: "18px",
};

const leftStyle = {
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "14px",
  padding: "14px",
};

const rightStyle = {
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "14px",
  padding: "14px",
};

const sectionTitleStyle = {
  marginTop: "8px",
  marginBottom: "10px",
  padding: "8px 10px",
  background: "#EAF5EE",
  borderLeft: "5px solid #0B6B2E",
  borderRadius: "8px",
  color: "#0B6B2E",
  fontWeight: "800",
  fontSize: "15px",
};

const fieldBlockStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "10px",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#0B6B2E",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "10px",
  border: `1px solid ${theme.colors.border}`,
  fontSize: "14px",
};

const infoBoxStyle = {
  background: "#F7F7F7",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "10px",
  padding: "10px",
  marginBottom: "12px",
};

const mapWrapperStyle = {
  height: "1150px",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "14px",
  overflow: "hidden",
};

const mapStyle = {
  height: "1150px",
  width: "100%",
};

const emptyStyle = {
  background: "#FFF7E6",
  border: "1px solid #F0C36D",
  color: "#5F4200",
  borderRadius: "12px",
  padding: "14px",
  fontWeight: "700",
};

const errorStyle = {
  padding: "20px",
  color: "#B00020",
  fontWeight: "700",
};

const validationButtonStyle = {
  background: "#0B6B2E",
  color: "#FFFFFF",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  fontWeight: "800",
  cursor: "pointer",
  width: "100%",
};

const previewWrapperStyle = {
  width: "100%",
  height: "420px",
  overflowX: "auto",
  overflowY: "scroll",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: "12px",
  marginTop: "12px",
  position: "relative",
};

const previewTableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "13px",
  minWidth: "1300px",
};

const previewThStyle = {
  background: "#EAF5EE",
  color: "#0B6B2E",
  fontWeight: "800",
  padding: "10px",
  border: `1px solid ${theme.colors.border}`,
  textAlign: "left",
  whiteSpace: "nowrap",
  position: "sticky",
  top: 0,
  zIndex: 2,
};

const previewFirstThStyle = {
  ...previewThStyle,
  left: 0,
  zIndex: 4,
};

const previewTdStyle = {
  padding: "9px",
  border: `1px solid ${theme.colors.border}`,
  verticalAlign: "top",
  whiteSpace: "nowrap",
  background: "#FFFFFF",
};

const stickyFirstColStyle = {
  position: "sticky",
  left: 0,
  zIndex: 3,
  background: "#FFFFFF",
  fontWeight: "700",
};

const stickyHeaderStyle = {
  ...previewThStyle,
  position: "sticky",
  top: 0,
  zIndex: 4,
  background: "#EAF5EE",
};

const stickyFirstHeaderStyle = {
  ...previewThStyle,
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: 6,
  background: "#EAF5EE",
};


const previewFirstTdStyle = {
  ...previewTdStyle,
  position: "sticky",
  left: 0,
  zIndex: 3,
  fontWeight: "700",
};

export default GeometrieUnites;