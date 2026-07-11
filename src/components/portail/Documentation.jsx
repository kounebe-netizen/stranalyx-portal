import { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  Database,
  Ruler,
  FileText,
  GraduationCap,
  History,
  Download,
  FolderOpen,
} from "lucide-react";

import useBreakpoint from "../../hooks/useBreakpoint";

const resources = [
  {
    category: "Documentation des applications",
    icon: BookOpen,
    items: [
      "Agro-industrie",
      "Production de granulats",
      "Viticulture",
      "Institutions, Associations & ONG",
      "B2B Explorer",
    ],
  },
  {
    category: "Référentiels techniques",
    icon: Database,
    items: [
      "00A - Référentiel Organisations",
      "00B - Référentiel Sites",
      "Table 0 - Codification des unités physiques",
      "Architecture React",
      "Architecture FastAPI",
      "Architecture Airtable",
    ],
  },
  {
    category: "Guides méthodologiques",
    icon: Ruler,
    items: [
      "Projection des activités",
      "Planification stratégique",
      "Budgétisation",
      "Suivi-évaluation",
      "Gestion des indicateurs",
      "Gestion des risques",
    ],
  },
  {
    category: "Études de cas",
    icon: FolderOpen,
    items: [
      "Production de sucre",
      "Riz pluvial et de contre-saison",
      "Production et exportation de sésame",
      "Production de granulats",
      "Production et transformation viticole",
      "Projet triennal du SECADEV",
      "Programme DDR",
      "Projet MSF - Cité Soleil",
    ],
  },
  {
    category: "Modèles & outils",
    icon: FileText,
    items: [
      "Modèles Word",
      "Tableaux Excel",
      "Plans d’action",
      "Budgets prévisionnels",
      "Fiches d’indicateurs",
      "Tableaux de bord",
    ],
  },
  {
    category: "Académie Stranalyx",
    icon: GraduationCap,
    items: [
      "Tutoriels pas à pas",
      "Démonstrations",
      "Exercices pratiques",
      "Parcours de formation",
    ],
  },
  {
    category: "Journal des versions",
    icon: History,
    items: [
      "Version 1.0",
      "Évolutions fonctionnelles",
      "Corrections",
      "Nouveaux modules",
    ],
  },
];

export default function Documentation() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isMobileOrTablet } = useBreakpoint();

  const filteredResources = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();

    if (!value) return resources;

    return resources
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.toLowerCase().includes(value)
        ),
      }))
      .filter(
        (section) =>
          section.category.toLowerCase().includes(value) ||
          section.items.length > 0
      );
  }, [searchTerm]);

  return (
    <main
      style={{
        background: "#FFFFFF",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <section
        style={{
          ...pageStyle,
          padding: isMobileOrTablet
            ? "32px 20px 20px"
            : "46px 40px 24px",
        }}
      >
        {isMobileOrTablet ? (
          <div
            style={{
              ...heroStyle,
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              alignItems: "start",
              marginBottom: "30px",
            }}
          >
            <div>
              <p style={eyebrowStyle}>DOCUMENTATION</p>

              <h1
                style={{
                  ...heroTitleStyle,
                  fontSize: "34px",
                  lineHeight: "1.08",
                  marginBottom: 0,
                }}
              >
                Centre de documentation Stranalyx
              </h1>
            </div>

            <div
              style={{
                ...heroPanelStyle,
                minHeight: "220px",
                padding: "20px",
                fontSize: "16px",
              }}
            >
              <BookOpen size={42} />
              <span>
                Une bibliothèque structurée pour apprendre, utiliser et
                administrer Stranalyx
              </span>
            </div>

            <p
              style={{
                ...heroTextStyle,
                gridColumn: "1 / -1",
                textAlign: "center",
              }}
            >
              Retrouvez la documentation fonctionnelle, technique et
              méthodologique de la plateforme, ainsi que les études de cas,
              modèles, tutoriels et historiques de versions.
            </p>
          </div>
        ) : (
          <div style={heroStyle}>
            <div>
              <p style={eyebrowStyle}>DOCUMENTATION</p>

              <h1 style={heroTitleStyle}>
                Centre de documentation Stranalyx
              </h1>

              <p style={heroTextStyle}>
                Retrouvez la documentation fonctionnelle, technique et
                méthodologique de la plateforme, ainsi que les études de cas,
                modèles, tutoriels et historiques de versions.
              </p>
            </div>

            <div style={heroPanelStyle}>
              <BookOpen size={44} />
              <span>
                Une bibliothèque structurée pour apprendre, utiliser et
                administrer Stranalyx
              </span>
            </div>
          </div>
        )}

        <div
          style={{
            ...searchBoxStyle,
            padding: isMobileOrTablet ? "14px 16px" : "16px 20px",
          }}
        >
          <Search size={22} color="#0B57D0" />

          <input
            type="text"
            placeholder="Rechercher un document, un guide, une table ou un tutoriel..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            style={{
              ...searchInputStyle,
              fontSize: isMobileOrTablet ? "15px" : "16px",
              minWidth: 0,
            }}
          />
        </div>

        <div
          style={{
            ...gridStyle,
            gridTemplateColumns: isMobileOrTablet ? "1fr" : "repeat(2, 1fr)",
          }}
        >
          {filteredResources.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.category}
                style={{
                  ...cardStyle,
                  padding: isMobileOrTablet ? "24px 18px" : "28px",
                  minWidth: 0,
                }}
              >
                <div style={cardHeaderStyle}>
                  <div style={iconBoxStyle}>
                    <Icon size={27} />
                  </div>

                  <h2
                    style={{
                      ...cardTitleStyle,
                      fontSize: isMobileOrTablet ? "20px" : "22px",
                    }}
                  >
                    {section.category}
                  </h2>
                </div>

                <div style={itemsStyle}>
                  {section.items.map((item) => (
                    <button key={item} type="button" style={itemStyle}>
                      <span style={{ minWidth: 0 }}>{item}</span>
                      <Download
                        size={17}
                        style={{ flexShrink: 0 }}
                      />
                    </button>
                  ))}
                </div>

                {section.items.length === 0 && (
                  <p style={emptyStyle}>Aucun document trouvé.</p>
                )}
              </article>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div style={globalEmptyStyle}>
            Aucun résultat ne correspond à votre recherche.
          </div>
        )}
      </section>
    </main>
  );
}

const pageStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "46px 40px 80px",
  boxSizing: "border-box",
};

const heroStyle = {
  display: "grid",
  gridTemplateColumns: "1.25fr 0.75fr",
  gap: "52px",
  alignItems: "center",
  marginBottom: "36px",
};

const eyebrowStyle = {
  margin: "0 0 12px",
  color: "#0B57D0",
  fontSize: "14px",
  fontWeight: "900",
  letterSpacing: "0.12em",
};

const heroTitleStyle = {
  margin: "0 0 22px",
  color: "#082F63",
  fontSize: "46px",
  lineHeight: "1.08",
  fontWeight: "900",
};

const heroTextStyle = {
  margin: 0,
  color: "#324A5F",
  fontSize: "18px",
  lineHeight: "1.8",
};

const heroPanelStyle = {
  minHeight: "210px",
  borderRadius: "30px",
  background: "linear-gradient(135deg,#EAF2FF,#F7FAFF)",
  color: "#0B57D0",
  boxShadow: "0 22px 50px rgba(8,47,99,.12)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "18px",
  lineHeight: "1.5",
  fontWeight: "800",
  padding: "30px",
  boxSizing: "border-box",
};

const searchBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  background: "#FFFFFF",
  border: "1px solid #DCE7F5",
  borderRadius: "20px",
  padding: "16px 20px",
  boxShadow: "0 14px 32px rgba(8,47,99,.08)",
  marginBottom: "34px",
  boxSizing: "border-box",
  minWidth: 0,
};

const searchInputStyle = {
  width: "100%",
  border: "none",
  outline: "none",
  fontSize: "16px",
  color: "#082F63",
  background: "transparent",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "26px",
};

const cardStyle = {
  borderRadius: "28px",
  background: "#FFFFFF",
  border: "1px solid #E5ECF5",
  boxShadow: "0 18px 42px rgba(8,47,99,.09)",
  padding: "28px",
  boxSizing: "border-box",
};

const cardHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "22px",
};

const iconBoxStyle = {
  width: "54px",
  height: "54px",
  minWidth: "54px",
  borderRadius: "18px",
  background: "#EAF2FF",
  color: "#0B57D0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardTitleStyle = {
  margin: 0,
  color: "#082F63",
  fontSize: "22px",
  fontWeight: "900",
};

const itemsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const itemStyle = {
  width: "100%",
  border: "1px solid #E5ECF5",
  borderRadius: "15px",
  background: "#F8FBFF",
  color: "#324A5F",
  padding: "13px 15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "14px",
  textAlign: "left",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
  boxSizing: "border-box",
  minWidth: 0,
};

const emptyStyle = {
  margin: 0,
  color: "#718096",
  fontSize: "15px",
};

const globalEmptyStyle = {
  padding: "40px",
  textAlign: "center",
  color: "#52657A",
  fontSize: "17px",
  fontWeight: "700",
};