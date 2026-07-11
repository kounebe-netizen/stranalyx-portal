import {
  Building2,
  Landmark,
  Search,
  Wheat,
  Factory,
  Grape,
  Sprout,
  Handshake,
  HeartPulse,
  Globe2,
  ArrowRight,
} from "lucide-react";

import useBreakpoint from "../../hooks/useBreakpoint";

const privateApps = [
  {
    icon: Wheat,
    text: "Production de sucre à partir de la culture de la canne à sucre",
  },
  {
    icon: Sprout,
    text: "Production de riz pluvial et de contre-saison",
  },
  {
    icon: Sprout,
    text: "Production, collecte et exportation de sésame",
  },
  {
    icon: Factory,
    text: "Production de granulats par abattage, concassage et commercialisation de roche",
  },
  {
    icon: Grape,
    text: "Production et transformation viticole : vin et jus de fruits",
  },
];

const publicApps = [
  {
    icon: Handshake,
    text: "Projet triennal de la Délégation du SECADEV de Bousso",
  },
  {
    icon: Landmark,
    text: "Programme DDR : Désarmement, Démobilisation et Réinsertion",
  },
  {
    icon: HeartPulse,
    text: "Projet MSF – Cité Soleil, Haïti",
  },
];

const b2bApps = [
  "Prospection B2B",
  "Détection d'opportunités d'affaires",
  "Recherche de partenaires stratégiques",
  "Veille concurrentielle",
  "Analyse de marchés",
  "Développement commercial",
];

export default function NosSolutions() {
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
            ? "32px 20px 60px"
            : "46px 40px 80px",
        }}
      >
        {isMobileOrTablet ? (
          <div
            style={{
              ...heroStyle,
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              alignItems: "start",
            }}
          >
            <div>
              <h1
                style={{
                  ...heroTitleStyle,
                  fontSize: "34px",
                  lineHeight: "1.08",
                }}
              >
                Des applications conçues à partir d'expériences réelles
              </h1>
            </div>

            <div
              style={{
                ...heroBadgeStyle,
                minHeight: "220px",
                padding: "20px",
                fontSize: "18px",
              }}
            >
              <Globe2 size={42} />
              <span>Une plateforme unique, plusieurs métiers</span>
            </div>

            <p
              style={{
                ...heroTextStyle,
                gridColumn: "1 / -1",
                textAlign: "center",
              }}
            >
              Stranalyx est une plateforme de projection, de pilotage et
              d'évaluation des activités. Les applications présentées ci-dessous
              sont issues d'expériences opérationnelles réelles et peuvent être
              adaptées à d'autres secteurs d'activité.
            </p>
          </div>
        ) : (
          <div style={heroStyle}>
            <div>
              <h1 style={heroTitleStyle}>
                Des applications conçues à partir d'expériences réelles
              </h1>

              <p style={heroTextStyle}>
                Stranalyx est une plateforme de projection, de pilotage et
                d'évaluation des activités. Les applications présentées
                ci-dessous sont issues d'expériences opérationnelles réelles et
                peuvent être adaptées à d'autres secteurs d'activité.
              </p>
            </div>

            <div style={heroBadgeStyle}>
              <Globe2 size={42} />
              <span>Une plateforme unique, plusieurs métiers</span>
            </div>
          </div>
        )}

        <div
          style={{
            ...cardsGridStyle,
            gridTemplateColumns: isMobileOrTablet ? "1fr" : "1fr 1fr",
          }}
        >
          <SolutionCard
            icon={Building2}
            title="Entreprises privées"
            subtitle="Premières applications disponibles"
            items={privateApps}
            note="Stranalyx peut être configuré pour accompagner toute entreprise privée souhaitant améliorer la projection, le pilotage et l'évaluation de ses activités."
            isMobileOrTablet={isMobileOrTablet}
          />

          <SolutionCard
            icon={Landmark}
            title="Institutions, Associations & ONG"
            subtitle="Premières applications disponibles"
            items={publicApps}
            note="La plateforme s'adapte aux institutions publiques, collectivités territoriales, associations, ONG, organisations internationales et programmes financés par les bailleurs."
            isMobileOrTablet={isMobileOrTablet}
          />

          <B2BCard isMobileOrTablet={isMobileOrTablet} />
        </div>

        <div
          style={{
            ...ctaStyle,
            marginLeft: isMobileOrTablet ? "-20px" : 0,
            marginRight: isMobileOrTablet ? "-20px" : 0,
            borderRadius: isMobileOrTablet ? "0" : "28px",
            padding: isMobileOrTablet ? "30px 24px" : "34px 42px",
          }}
        >
          <h2
            style={{
              ...ctaTitleStyle,
              fontSize: isMobileOrTablet ? "26px" : "30px",
            }}
          >
            Votre activité ne figure pas encore ici ?
          </h2>

          <p style={ctaTextStyle}>
            Stranalyx peut être adapté à votre métier, à vos données et à vos
            méthodes de travail.
          </p>
        </div>
      </section>
    </main>
  );
}

function SolutionCard({
  icon: Icon,
  title,
  subtitle,
  items,
  note,
  isMobileOrTablet,
}) {
  return (
    <article
      style={{
        ...cardStyle,
        padding: isMobileOrTablet ? "24px 18px" : "32px",
        minWidth: 0,
      }}
    >
      <div
        style={{
          ...cardHeaderStyle,
          gap: isMobileOrTablet ? "14px" : "18px",
        }}
      >
        <div style={iconBoxStyle}>
          <Icon size={30} />
        </div>

        <div style={{ minWidth: 0 }}>
          <h2
            style={{
              ...cardTitleStyle,
              fontSize: isMobileOrTablet ? "22px" : "25px",
            }}
          >
            {title}
          </h2>

          <p style={cardSubtitleStyle}>{subtitle}</p>
        </div>
      </div>

      <div style={itemsStyle}>
        {items.map((item) => {
          const ItemIcon = item.icon;

          return (
            <div key={item.text} style={itemStyle}>
              <div style={smallIconStyle}>
                <ItemIcon size={19} />
              </div>
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>

      <p style={noteStyle}>{note}</p>
    </article>
  );
}

function B2BCard({ isMobileOrTablet }) {
  return (
    <article
      style={{
        ...cardStyle,
        gridColumn: "1 / -1",
        padding: isMobileOrTablet ? "24px 18px" : "32px",
        minWidth: 0,
      }}
    >
      <div style={cardHeaderStyle}>
        <div style={iconBoxStyle}>
          <Search size={30} />
        </div>

        <div style={{ minWidth: 0 }}>
          <h2
            style={{
              ...cardTitleStyle,
              fontSize: isMobileOrTablet ? "22px" : "25px",
            }}
          >
            B2B Explorer
          </h2>

          <p style={cardSubtitleStyle}>
            Intelligence commerciale et développement d'affaires
          </p>
        </div>
      </div>

      <div
        style={{
          ...b2bGridStyle,
          gridTemplateColumns: isMobileOrTablet
            ? "1fr"
            : "repeat(3, 1fr)",
        }}
      >
        {b2bApps.map((item) => (
          <div key={item} style={b2bItemStyle}>
            <ArrowRight size={17} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </article>
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
  gridTemplateColumns: "1.3fr 0.7fr",
  gap: "50px",
  alignItems: "center",
  marginBottom: "42px",
};

const heroTitleStyle = {
  fontSize: "46px",
  lineHeight: "1.08",
  fontWeight: "900",
  color: "#082F63",
  margin: "0 0 22px",
};

const heroTextStyle = {
  fontSize: "18px",
  lineHeight: "1.8",
  color: "#324A5F",
  margin: 0,
};

const heroBadgeStyle = {
  minHeight: "190px",
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
  fontSize: "20px",
  fontWeight: "800",
  padding: "28px",
  boxSizing: "border-box",
};

const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "28px",
};

const cardStyle = {
  borderRadius: "30px",
  background: "#FFFFFF",
  border: "1px solid #E5ECF5",
  boxShadow: "0 20px 45px rgba(8,47,99,.10)",
  padding: "32px",
  boxSizing: "border-box",
};

const cardHeaderStyle = {
  display: "flex",
  gap: "18px",
  alignItems: "center",
  marginBottom: "28px",
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
  fontSize: "25px",
  fontWeight: "900",
};

const cardSubtitleStyle = {
  margin: "5px 0 0",
  color: "#0B57D0",
  fontWeight: "800",
  fontSize: "15px",
};

const itemsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  marginBottom: "24px",
};

const itemStyle = {
  display: "grid",
  gridTemplateColumns: "38px minmax(0, 1fr)",
  gap: "12px",
  alignItems: "center",
  color: "#324A5F",
  fontSize: "15.5px",
  lineHeight: "1.5",
  fontWeight: "600",
};

const smallIconStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "14px",
  background: "#F2F7FF",
  color: "#0B57D0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const noteStyle = {
  margin: 0,
  paddingTop: "18px",
  borderTop: "1px solid #E5ECF5",
  color: "#52657A",
  lineHeight: "1.7",
  fontSize: "15px",
};

const b2bGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
};

const b2bItemStyle = {
  background: "#F7FAFF",
  borderRadius: "16px",
  padding: "16px",
  color: "#324A5F",
  fontWeight: "700",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: 0,
};

const ctaStyle = {
  marginTop: "38px",
  borderRadius: "28px",
  background: "linear-gradient(90deg,#082F63,#0B57D0)",
  color: "#FFFFFF",
  padding: "34px 42px",
  textAlign: "center",
  boxSizing: "border-box",
};

const ctaTitleStyle = {
  margin: "0 0 10px",
  fontSize: "30px",
  fontWeight: "900",
  color: "#42C6FF",
};

const ctaTextStyle = {
  margin: 0,
  fontSize: "17px",
  lineHeight: "1.7",
};