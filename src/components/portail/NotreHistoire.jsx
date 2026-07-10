import {
  Handshake,
  Wheat,
  Landmark,
  HardHat,
  HeartPulse,
  Grape,
} from "lucide-react";

const foundations = [
  {
    icon: Handshake,
    title: "Développement",
    text: "Projets de terrain",
  },
  {
    icon: Wheat,
    title: "Agro-industrie",
    text: "Production & transformation",
  },
  {
    icon: Landmark,
    title: "Fonds publics",
    text: "Programmes & procédures",
  },
  {
    icon: HardHat,
    title: "BTP & Matériaux",
    text: "Roche, granulats, infrastructures",
  },
  {
    icon: HeartPulse,
    title: "Humanitaire",
    text: "Urgence & projets réguliers",
  },
  {
    icon: Grape,
    title: "Agriculture",
    text: "Vigne, vin & jus de fruits",
  },
];

export default function NotreHistoire() {
  return (
    <main style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "38px 40px 70px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "17px",
                lineHeight: "1.85",
                color: "#324A5F",
              }}
            >
              <h2 style={sectionTitleStyle}>Stranalyx est né du terrain</h2>

              <p>
                Stranalyx est l'aboutissement de plus de vingt années
                d'expérience de terrain acquises dans le secteur privé, le
                secteur public, les ONG internationales et les petites
                entreprises agricoles.
              </p>

              <p>
                Au fil de ce parcours, un même constat s'est imposé : les
                organisations disposent de nombreuses informations, mais
                celles-ci restent souvent dispersées, rendant la planification,
                le pilotage et l'évaluation plus complexes qu'ils ne devraient
                l'être.
              </p>

              <h2 style={sectionTitleStyle}>Pourquoi Stranalyx ?</h2>

              <p>
                Le nom Stranalyx associe la stratégie, l'analyse et les
                technologies intelligentes. Il traduit l'ambition de la
                plateforme : aider les organisations à comprendre leurs données,
                décider en confiance et agir avec méthode.
              </p>

              <h2 style={sectionTitleStyle}>De l'expérience à la solution</h2>

              <p>
                Les secteurs d'activité changent, les métiers évoluent, mais les défis
                restent les mêmes : structurer l'information, coordonner les actions,
                mesurer les résultats et décider au bon moment.
              </p>

              <p>
              C'est de cette conviction qu'est née Stranalyx. Plus qu'une plateforme
              logicielle, Stranalyx est la traduction d'une méthode de travail éprouvée
              sur le terrain, conçue pour accompagner les organisations dans leur
              pilotage quotidien, quelles que soient leur taille, leur secteur ou leur
              niveau de maturité.
              </p>

            </div>
          </div>

          <div
            style={{
              height: "650px",
              borderRadius: "32px",
              background:
                "linear-gradient(135deg,#EAF2FF 0%,#D8E9FF 45%,#F7FAFF 100%)",
              boxShadow: "0 25px 60px rgba(8,47,99,.12)",
              padding: "34px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "61px",
                top: "58px",
                bottom: "58px",
                width: "2px",
                background: "linear-gradient(#7DB5FF,#CFE3FF)",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                gap: "22px",
                position: "relative",
                zIndex: 2,
              }}
            >
              {foundations.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "58px 1fr",
                      gap: "18px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "58px",
                        height: "58px",
                        borderRadius: "50%",
                        background: "#FFFFFF",
                        boxShadow: "0 12px 28px rgba(11,87,208,.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0B57D0",
                      }}
                    >
                      <Icon size={28} strokeWidth={2.3} />
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "17px",
                          fontWeight: "800",
                          color: "#082F63",
                          marginBottom: "2px",
                        }}
                      >
                        {item.title}
                      </div>

                      <div
                        style={{
                          fontSize: "14px",
                          color: "#52657A",
                          fontWeight: "600",
                        }}
                      >
                        {item.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const sectionTitleStyle = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#082F63",
  margin: "0 0 14px",
};

const stepPillStyle = {
  flex: 1,
  background: "#EAF2FF",
  color: "#082F63",
  textAlign: "center",
  padding: "13px 10px",
  borderRadius: "14px",
  fontSize: "14px",
  fontWeight: "800",
};

const arrowStyle = {
  color: "#0B57D0",
  fontSize: "24px",
  fontWeight: "800",
};