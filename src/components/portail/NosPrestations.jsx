import {
  Search,
  BarChart3,
  Settings,
  Database,
  Code2,
  GraduationCap,
  Handshake,
  ArrowRight,
} from "lucide-react";

import useBreakpoint from "../../hooks/useBreakpoint";

const serviceGroups = [
  {
    number: "01",
    title: "Conseil & Conception",
    description:
      "Nous analysons votre organisation, vos objectifs et vos méthodes de travail afin de définir une solution adaptée.",
    services: [
      {
        icon: Search,
        title: "Analyse & cadrage",
        items: [
          "Analyse des besoins",
          "Diagnostic organisationnel",
          "Définition des objectifs",
          "Élaboration de la feuille de route",
        ],
      },
      {
        icon: BarChart3,
        title: "Études, planification & aide à la décision",
        items: [
          "Études de faisabilité",
          "Plans stratégiques",
          "Budgets prévisionnels",
          "Tableaux de bord",
          "Suivi-évaluation",
          "Analyses décisionnelles",
        ],
      },
    ],
  },
  {
    number: "02",
    title: "Mise en œuvre",
    description:
      "Nous configurons, intégrons et développons les outils nécessaires à votre activité.",
    services: [
      {
        icon: Settings,
        title: "Paramétrage & personnalisation",
        items: [
          "Configuration de la plateforme",
          "Adaptation aux processus métier",
          "Création des référentiels",
          "Paramétrage des tableaux de bord",
        ],
      },
      {
        icon: Database,
        title: "Migration & intégration des données",
        items: [
          "Reprise des données existantes",
          "Contrôle qualité",
          "Import sécurisé",
          "Interconnexion avec les outils existants",
        ],
      },
      {
        icon: Code2,
        title: "Développements spécifiques",
        items: [
          "Conception de modules métier",
          "Automatisation des processus",
          "Développement de fonctionnalités spécifiques",
          "Intégration à la plateforme Stranalyx",
        ],
      },
    ],
  },
  {
    number: "03",
    title: "Accompagnement",
    description:
      "Nous préparons vos équipes, sécurisons le démarrage et faisons évoluer la solution dans la durée.",
    services: [
      {
        icon: GraduationCap,
        title: "Formation & transfert de compétences",
        items: [
          "Formation des administrateurs",
          "Formation des utilisateurs",
          "Documentation",
          "Accompagnement au changement",
        ],
      },
      {
        icon: Handshake,
        title: "Assistance & amélioration continue",
        items: [
          "Assistance fonctionnelle",
          "Support technique",
          "Maintenance évolutive",
          "Optimisation continue",
        ],
      },
    ],
  },
];

export default function NosPrestations() {
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
              marginBottom: "34px",
            }}
          >
            <div>
              <p style={eyebrowStyle}>NOS PRESTATIONS</p>

              <h1
                style={{
                  ...heroTitleStyle,
                  fontSize: "34px",
                  lineHeight: "1.08",
                  marginBottom: 0,
                }}
              >
                Bien plus qu'un logiciel : un accompagnement complet.
              </h1>
            </div>

            <div
              style={{
                ...heroPanelStyle,
                minHeight: "220px",
                padding: "20px",
                gap: "10px",
                flexDirection: "column",
                flexWrap: "nowrap",
              }}
            >
              <div style={heroPanelLineStyle}>Analyser</div>
              <ArrowRight size={22} />
              <div style={heroPanelLineStyle}>Mettre en œuvre</div>
              <ArrowRight size={22} />
              <div style={heroPanelLineStyle}>Accompagner</div>
            </div>

            <p
              style={{
                ...heroTextStyle,
                gridColumn: "1 / -1",
                textAlign: "center",
              }}
            >
              La réussite d'un projet ne dépend pas uniquement de l'outil
              utilisé. Elle repose aussi sur une bonne compréhension des
              besoins, une mise en œuvre adaptée et un accompagnement dans la
              durée.
            </p>
          </div>
        ) : (
          <div style={heroStyle}>
            <div>
              <p style={eyebrowStyle}>NOS PRESTATIONS</p>

              <h1 style={heroTitleStyle}>
                Bien plus qu'un logiciel : un accompagnement complet.
              </h1>

              <p style={heroTextStyle}>
                La réussite d'un projet ne dépend pas uniquement de l'outil
                utilisé. Elle repose aussi sur une bonne compréhension des
                besoins, une mise en œuvre adaptée et un accompagnement dans la
                durée.
              </p>
            </div>

            <div style={heroPanelStyle}>
              <div style={heroPanelLineStyle}>Analyser</div>
              <ArrowRight size={22} />
              <div style={heroPanelLineStyle}>Mettre en œuvre</div>
              <ArrowRight size={22} />
              <div style={heroPanelLineStyle}>Accompagner</div>
            </div>
          </div>
        )}

        <div style={groupsStyle}>
          {serviceGroups.map((group) => (
            <section
              key={group.number}
              style={{
                ...groupStyle,
                padding: isMobileOrTablet ? "24px 18px" : "32px",
              }}
            >
              <div
                style={{
                  ...groupHeaderStyle,
                  gridTemplateColumns: isMobileOrTablet
                    ? "56px minmax(0, 1fr)"
                    : "64px 1fr",
                  gap: isMobileOrTablet ? "16px" : "20px",
                }}
              >
                <div
                  style={{
                    ...groupNumberStyle,
                    width: isMobileOrTablet ? "56px" : "64px",
                    height: isMobileOrTablet ? "56px" : "64px",
                    fontSize: isMobileOrTablet ? "18px" : "20px",
                  }}
                >
                  {group.number}
                </div>

                <div style={{ minWidth: 0 }}>
                  <h2
                    style={{
                      ...groupTitleStyle,
                      fontSize: isMobileOrTablet ? "24px" : "28px",
                    }}
                  >
                    {group.title}
                  </h2>

                  <p
                    style={{
                      ...groupDescriptionStyle,
                      fontSize: isMobileOrTablet ? "15px" : "16px",
                    }}
                  >
                    {group.description}
                  </p>
                </div>
              </div>

              <div
                style={{
                  ...servicesGridStyle,
                  gridTemplateColumns: isMobileOrTablet
                    ? "1fr"
                    : group.services.length === 3
                    ? "repeat(3, 1fr)"
                    : "repeat(2, 1fr)",
                }}
              >
                {group.services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <article
                      key={service.title}
                      style={{
                        ...serviceCardStyle,
                        padding: isMobileOrTablet ? "22px 18px" : "24px",
                        minWidth: 0,
                      }}
                    >
                      <div style={serviceIconStyle}>
                        <Icon size={27} strokeWidth={2.2} />
                      </div>

                      <h3
                        style={{
                          ...serviceTitleStyle,
                          fontSize: isMobileOrTablet ? "19px" : "20px",
                        }}
                      >
                        {service.title}
                      </h3>

                      <ul style={serviceListStyle}>
                        {service.items.map((item) => (
                          <li key={item} style={serviceListItemStyle}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
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
            Votre projet est unique.
          </h2>

          <p style={ctaTextStyle}>
            Discutons de vos objectifs afin de définir la solution et le niveau
            d'accompagnement les mieux adaptés à votre organisation.
          </p>
        </div>
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
  marginBottom: "46px",
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
  boxShadow: "0 22px 50px rgba(8,47,99,.12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  padding: "30px",
  color: "#0B57D0",
  flexWrap: "wrap",
  boxSizing: "border-box",
};

const heroPanelLineStyle = {
  background: "#FFFFFF",
  borderRadius: "16px",
  padding: "14px 16px",
  color: "#082F63",
  fontSize: "15px",
  fontWeight: "900",
  boxShadow: "0 12px 24px rgba(8,47,99,.10)",
  textAlign: "center",
};

const groupsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "34px",
};

const groupStyle = {
  borderRadius: "30px",
  background: "#FFFFFF",
  border: "1px solid #E5ECF5",
  boxShadow: "0 20px 45px rgba(8,47,99,.09)",
  padding: "32px",
  boxSizing: "border-box",
};

const groupHeaderStyle = {
  display: "grid",
  gridTemplateColumns: "64px 1fr",
  gap: "20px",
  alignItems: "start",
  marginBottom: "28px",
};

const groupNumberStyle = {
  width: "64px",
  height: "64px",
  borderRadius: "20px",
  background: "#0B57D0",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "900",
};

const groupTitleStyle = {
  margin: "0 0 8px",
  color: "#082F63",
  fontSize: "28px",
  fontWeight: "900",
};

const groupDescriptionStyle = {
  margin: 0,
  color: "#52657A",
  fontSize: "16px",
  lineHeight: "1.7",
};

const servicesGridStyle = {
  display: "grid",
  gap: "22px",
};

const serviceCardStyle = {
  borderRadius: "24px",
  background: "#F8FBFF",
  border: "1px solid #E5ECF5",
  padding: "24px",
  boxSizing: "border-box",
};

const serviceIconStyle = {
  width: "54px",
  height: "54px",
  borderRadius: "18px",
  background: "#EAF2FF",
  color: "#0B57D0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "18px",
};

const serviceTitleStyle = {
  margin: "0 0 16px",
  color: "#082F63",
  fontSize: "20px",
  lineHeight: "1.3",
  fontWeight: "900",
};

const serviceListStyle = {
  margin: 0,
  paddingLeft: "20px",
  color: "#52657A",
};

const serviceListItemStyle = {
  marginBottom: "9px",
  lineHeight: "1.55",
  fontSize: "15px",
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
  color: "#42C6FF",
  fontSize: "30px",
  fontWeight: "900",
};

const ctaTextStyle = {
  margin: 0,
  fontSize: "17px",
  lineHeight: "1.7",
};