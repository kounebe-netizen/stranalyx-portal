import {
  Mail,
  Phone,
  MapPin,
  Building2,
  UserRound,
  BriefcaseBusiness,
  MessageSquareText,
  Send,
} from "lucide-react";

export default function Contact() {
  return (
    <main style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      <section style={pageStyle}>
        <div style={heroStyle}>
          <div>
            <p style={eyebrowStyle}>CONTACT</p>

            <h1 style={heroTitleStyle}>Parlons de votre projet.</h1>

            <p style={heroTextStyle}>
              Décrivez-nous votre contexte, vos objectifs et vos contraintes.
              Nous vous aiderons à identifier la solution Stranalyx et le niveau
              d’accompagnement les mieux adaptés.
            </p>
          </div>

          <div style={missionPanelStyle}>
            <h2 style={missionTitleStyle}>Une conviction devenue une mission</h2>

            <p style={missionTextStyle}>
              Plus de vingt années d’expérience de terrain ont nourri une
              conviction devenue une mission : aider les organisations à
              utiliser leurs ressources avec davantage de méthode, d’efficacité
              et de responsabilité, afin de mieux servir l’intérêt général,
              quel que soit leur secteur d’activité.
            </p>
          </div>
        </div>

        <div style={contentGridStyle}>
          <form style={formStyle}>
            <h2 style={sectionTitleStyle}>Votre demande</h2>

            <div style={twoColumnsStyle}>
              <Field icon={UserRound} label="Nom complet">
                <input style={inputStyle} type="text" />
              </Field>

              <Field icon={Building2} label="Organisation">
                <input style={inputStyle} type="text" />
              </Field>

              <Field icon={BriefcaseBusiness} label="Fonction">
                <input style={inputStyle} type="text" />
              </Field>

              <Field icon={Mail} label="Adresse e-mail">
                <input style={inputStyle} type="email" />
              </Field>

              <Field icon={Phone} label="Téléphone">
                <input style={inputStyle} type="tel" />
              </Field>

              <Field icon={Building2} label="Secteur d’activité">
                <select style={inputStyle} defaultValue="">
                  <option value="" disabled>
                    Sélectionner
                  </option>
                  <option>Entreprise privée</option>
                  <option>Institution publique</option>
                  <option>Association</option>
                  <option>ONG</option>
                  <option>Organisation internationale</option>
                  <option>Autre</option>
                </select>
              </Field>
            </div>

            <Field icon={MessageSquareText} label="Objet de votre demande">
              <select style={inputStyle} defaultValue="">
                <option value="" disabled>
                  Sélectionner
                </option>
                <option>Découvrir Stranalyx</option>
                <option>Demander une démonstration</option>
                <option>Demander un devis</option>
                <option>Paramétrage ou personnalisation</option>
                <option>Développement spécifique</option>
                <option>Formation</option>
                <option>Assistance</option>
                <option>Partenariat</option>
                <option>Autre</option>
              </select>
            </Field>

            <Field icon={MessageSquareText} label="Votre message">
              <textarea style={textareaStyle} rows={7} />
            </Field>

            <button type="submit" style={submitButtonStyle}>
              <Send size={19} />
              Envoyer ma demande
            </button>
          </form>

          <aside style={sideColumnStyle}>
            <div style={founderCardStyle}>
              <img
               src="/images/jean-pierre.jpg"
               alt="Jean-Pierre Tonel Doumro"
                style={photoStyle}
              />
              
              <p style={smallLabelStyle}>VOTRE INTERLOCUTEUR</p>

              <h2 style={founderNameStyle}>TONEL DOUMRO Jean-Pierre</h2>

              <p style={founderRoleStyle}>Fondateur de Stranalyx</p>

              <p style={founderTextStyle}>
                Un retour d’expérience construit au fil de plus de vingt années
                de missions auprès d’entreprises, d’institutions publiques,
                d’ONG et d’organisations internationales.
              </p>
            </div>

            <div style={contactCardStyle}>
              <h2 style={sectionTitleStyle}>Coordonnées</h2>

              <ContactLine icon={Mail} text="contact@stranalyx.com" />
              <ContactLine icon={Phone} text="+33 6 41 51 29 62" />
              <ContactLine icon={MapPin} text="Blois, France" />
            </div>

            <div style={stepsCardStyle}>
              <h2 style={sectionTitleStyle}>Ce qui se passe ensuite</h2>

              <Step number="1" text="Nous analysons votre demande." />
              <Step number="2" text="Nous organisons un premier échange." />
              <Step number="3" text="Nous proposons une solution adaptée." />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <label style={fieldStyle}>
      <span style={labelStyle}>
        <Icon size={17} />
        {label}
      </span>
      {children}
    </label>
  );
}

function ContactLine({ icon: Icon, text }) {
  return (
    <div style={contactLineStyle}>
      <div style={contactIconStyle}>
        <Icon size={19} />
      </div>
      <span>{text}</span>
    </div>
  );
}

function Step({ number, text }) {
  return (
    <div style={stepStyle}>
      <div style={stepNumberStyle}>{number}</div>
      <span>{text}</span>
    </div>
  );
}

const pageStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "46px 40px 80px",
};

const heroStyle = {
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "44px",
  alignItems: "stretch",
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
  margin: "0 0 20px",
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

const missionPanelStyle = {
  borderRadius: "28px",
  background: "linear-gradient(135deg,#082F63,#0B57D0)",
  padding: "30px",
  color: "#FFFFFF",
  boxShadow: "0 22px 50px rgba(8,47,99,.16)",
};

const missionTitleStyle = {
  margin: "0 0 14px",
  color: "#42C6FF",
  fontSize: "23px",
  fontWeight: "900",
};

const missionTextStyle = {
  margin: 0,
  fontSize: "16px",
  lineHeight: "1.75",
};

const contentGridStyle = {
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: "28px",
  alignItems: "start",
};

const formStyle = {
  borderRadius: "28px",
  background: "#FFFFFF",
  border: "1px solid #E5ECF5",
  boxShadow: "0 20px 45px rgba(8,47,99,.09)",
  padding: "30px",
};

const sectionTitleStyle = {
  margin: "0 0 22px",
  color: "#082F63",
  fontSize: "24px",
  fontWeight: "900",
};

const twoColumnsStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "18px",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "9px",
  marginBottom: "18px",
};

const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#082F63",
  fontSize: "14px",
  fontWeight: "800",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #DCE7F5",
  borderRadius: "14px",
  background: "#F8FBFF",
  padding: "13px 14px",
  color: "#324A5F",
  fontSize: "15px",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  fontFamily: "inherit",
};

const submitButtonStyle = {
  border: "none",
  borderRadius: "14px",
  background: "#0B57D0",
  color: "#FFFFFF",
  padding: "14px 24px",
  fontSize: "16px",
  fontWeight: "900",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  boxShadow: "0 12px 28px rgba(11,87,208,.22)",
};

const sideColumnStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "22px",
};

const founderCardStyle = {
  borderRadius: "28px",
  background: "linear-gradient(135deg,#EAF2FF,#F8FBFF)",
  border: "1px solid #DCE7F5",
  padding: "28px",
  textAlign: "center",
};

const photoPlaceholderStyle = {
  width: "112px",
  height: "112px",
  borderRadius: "50%",
  margin: "0 auto 20px",
  background: "#FFFFFF",
  color: "#0B57D0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "13px",
  fontWeight: "900",
  boxShadow: "0 14px 30px rgba(8,47,99,.13)",
};

const photoStyle = {
  width: "112px",
  height: "112px",
  borderRadius: "50%",
  objectFit: "cover",
  display: "block",
  margin: "0 auto 20px",
  boxShadow: "0 14px 30px rgba(8,47,99,.13)",
};

const smallLabelStyle = {
  margin: "0 0 8px",
  color: "#0B57D0",
  fontSize: "12px",
  fontWeight: "900",
  letterSpacing: "0.12em",
};

const founderNameStyle = {
  margin: "0 0 6px",
  color: "#082F63",
  fontSize: "23px",
  fontWeight: "900",
};

const founderRoleStyle = {
  margin: "0 0 16px",
  color: "#0B57D0",
  fontWeight: "800",
};

const founderTextStyle = {
  margin: 0,
  color: "#52657A",
  fontSize: "15px",
  lineHeight: "1.7",
};

const contactCardStyle = {
  borderRadius: "24px",
  background: "#FFFFFF",
  border: "1px solid #E5ECF5",
  padding: "24px",
};

const contactLineStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: "#324A5F",
  fontWeight: "700",
  marginBottom: "14px",
};

const contactIconStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "14px",
  background: "#EAF2FF",
  color: "#0B57D0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const stepsCardStyle = {
  borderRadius: "24px",
  background: "#FFFFFF",
  border: "1px solid #E5ECF5",
  padding: "24px",
};

const stepStyle = {
  display: "grid",
  gridTemplateColumns: "38px 1fr",
  gap: "12px",
  alignItems: "center",
  color: "#324A5F",
  fontWeight: "700",
  marginBottom: "14px",
};

const stepNumberStyle = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  background: "#0B57D0",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "900",
};