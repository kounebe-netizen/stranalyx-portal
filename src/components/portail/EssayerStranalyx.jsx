import {
  Wheat,
  Landmark,
  Search,
  HardHat,
  ArrowRight,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import useBreakpoint from "../../hooks/useBreakpoint";

const solutions = [
  {
    icon: Wheat,
    title: "Agro-industrie",
    subtitle: "Parcours de découverte disponible",
    description:
      "Découvrez comment Stranalyx structure les sites, les unités physiques et les données techniques avant de préparer le pilotage des activités.",
    points: [
      "Structurer les sites et les unités physiques",
      "Organiser les données techniques et géographiques",
      "Préparer la planification des activités",
      "Construire progressivement le dispositif de pilotage",
    ],
    status: "available",
    buttonLabel: "Découvrir l'application",
    target: "agro",
  },
  {
    icon: Landmark,
    title: "Institutions, Associations & ONG",
    subtitle: "Présentation disponible prochainement",
    description:
      "Une application destinée à la planification, au suivi et à l'évaluation des programmes, projets et interventions.",
    points: [
      "Structurer les programmes et projets",
      "Suivre les activités et les résultats",
      "Organiser les indicateurs",
      "Préparer le suivi-évaluation",
    ],
    status: "coming",
  },
  {
    icon: Search,
    title: "B2B Explorer",
    subtitle: "Présentation disponible prochainement",
    description:
      "Une solution dédiée à la prospection, à l'analyse de marchés et au développement commercial.",
    points: [
      "Prospection B2B",
      "Détection d'opportunités",
      "Recherche de partenaires",
      "Veille et analyse de marchés",
    ],
    status: "coming",
  },
  {
    icon: HardHat,
    title: "BTP & Artisanat",
    subtitle: "En préparation",
    description:
      "Une future application destinée aux acteurs du bâtiment, des travaux publics et des activités artisanales.",
    points: [
      "Organisation des chantiers",
      "Suivi des ressources",
      "Pilotage des coûts",
      "Suivi de l'avancement",
    ],
    status: "coming",
  },
];

export default function EssayerStranalyx({ onNavigate }) {
  const { isMobileOrTablet } = useBreakpoint();

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
            ? "32px 20px 24px"
            : "54px 40px 36px",
        }}
      >
        <div style={introStyle}>
          <p style={eyebrowStyle}>ESSAYER STRANALYX</p>

          <h1
            style={{
              ...titleStyle,
              fontSize: isMobileOrTablet ? "36px" : "48px",
            }}
          >
            Choisissez la solution que vous souhaitez découvrir.
          </h1>

          <p
            style={{
              ...introTextStyle,
              fontSize: isMobileOrTablet ? "17px" : "19px",
            }}
          >
            Explorez les applications Stranalyx et découvrez comment elles
            peuvent accompagner différents métiers, organisations et projets.
          </p>
        </div>

        <div
          style={{
            ...gridStyle,
            gridTemplateColumns: isMobileOrTablet
              ? "1fr"
              : "repeat(2, minmax(0, 1fr))",
          }}
        >
          {solutions.map((solution) => {
            const Icon = solution.icon;
            const isAvailable = solution.status === "available";

            return (
              <article
                key={solution.title}
                style={{
                  ...cardStyle,
                  padding: isMobileOrTablet ? "24px 20px" : "30px",
                }}
              >
                <div style={cardHeaderStyle}>
                  <div style={iconBoxStyle}>
                    <Icon size={30} />
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <h2 style={cardTitleStyle}>{solution.title}</h2>

                    <div
                      style={{
                        ...statusStyle,
                        color: isAvailable ? "#0B8F3A" : "#52657A",
                      }}
                    >
                      {isAvailable ? (
                        <CheckCircle2 size={17} />
                      ) : (
                        <Clock3 size={17} />
                      )}

                      <span>{solution.subtitle}</span>
                    </div>
                  </div>
                </div>

                <p style={descriptionStyle}>{solution.description}</p>

                <div style={pointsStyle}>
                  {solution.points.map((point) => (
                    <div key={point} style={pointStyle}>
                      <CheckCircle2 size={17} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {isAvailable ? (
                  <button
                    type="button"
                    onClick={() => onNavigate?.(solution.target)}
                    style={primaryButtonStyle}
                  >
                    {solution.buttonLabel}
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    style={disabledButtonStyle}
                  >
                    Disponible prochainement
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

const pageStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  boxSizing: "border-box",
};

const introStyle = {
  maxWidth: "820px",
  margin: "0 auto 42px",
  textAlign: "center",
};

const eyebrowStyle = {
  margin: "0 0 12px",
  color: "#0B57D0",
  fontSize: "14px",
  fontWeight: "900",
  letterSpacing: "0.12em",
};

const titleStyle = {
  margin: "0 0 18px",
  color: "#082F63",
  lineHeight: "1.08",
  fontWeight: "900",
};

const introTextStyle = {
  margin: 0,
  color: "#52657A",
  lineHeight: "1.7",
};

const gridStyle = {
  display: "grid",
  gap: "28px",
};

const cardStyle = {
  borderRadius: "30px",
  background: "#FFFFFF",
  border: "1px solid #E5ECF5",
  boxShadow: "0 20px 45px rgba(8,47,99,.10)",
  boxSizing: "border-box",
  minWidth: 0,
};

const cardHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "20px",
};

const iconBoxStyle = {
  width: "62px",
  height: "62px",
  minWidth: "62px",
  borderRadius: "20px",
  background: "#EAF2FF",
  color: "#0B57D0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardTitleStyle = {
  margin: 0,
  color: "#082F63",
  fontSize: "26px",
  fontWeight: "900",
};

const statusStyle = {
  display: "flex",
  alignItems: "center",
  gap: "7px",
  marginTop: "7px",
  fontSize: "14px",
  fontWeight: "800",
};

const descriptionStyle = {
  margin: "0 0 22px",
  color: "#324A5F",
  fontSize: "16px",
  lineHeight: "1.7",
};

const pointsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginBottom: "26px",
};

const pointStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  color: "#52657A",
  fontSize: "15px",
  lineHeight: "1.5",
};

const primaryButtonStyle = {
  width: "100%",
  border: "none",
  borderRadius: "14px",
  background: "#0B57D0",
  color: "#FFFFFF",
  padding: "14px 18px",
  fontSize: "16px",
  fontWeight: "900",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  boxShadow: "0 12px 28px rgba(11,87,208,.22)",
};

const disabledButtonStyle = {
  width: "100%",
  border: "1px solid #DCE7F5",
  borderRadius: "14px",
  background: "#F7FAFF",
  color: "#718096",
  padding: "14px 18px",
  fontSize: "16px",
  fontWeight: "800",
  cursor: "not-allowed",
};