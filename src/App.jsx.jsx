import { useState } from "react";
import AgroIndustrieApp from "./AgroIndustrieApp.jsx";

import Header from "./components/portail/Header";
import Hero from "./components/portail/Hero";
import TrustBar from "./components/portail/TrustBar";
import Footer from "./components/portail/Footer";
import NotreHistoire from "./components/portail/NotreHistoire";
import NosSolutions from "./components/portail/NosSolutions";
import NosPrestations from "./components/portail/NosPrestations";
import Documentation from "./components/portail/Documentation";
import Contact from "./components/portail/Contact";

export default function App() {
  const [vueActive, setVueActive] = useState("portail");

  if (vueActive === "agro") {
    return (
      <>
        <button
          style={backButtonStyle}
          onClick={() => setVueActive("portail")}
        >
          ← Retour au portail
        </button>

        <AgroIndustrieApp />
      </>
    );
  }

  if (vueActive === "histoire") {
    return (
      <>
        <Header onNavigate={setVueActive} />
        <NotreHistoire />
        <Footer />
      </>
    );
  }

  if (vueActive === "solutions") {
  return (
    <>
      <Header onNavigate={setVueActive} />
      <NosSolutions />
      <Footer />
    </>
  );
}

if (vueActive === "prestations") {
  return (
    <>
      <Header onNavigate={setVueActive} />
      <NosPrestations />
      <Footer />
    </>
  );
}

if (vueActive === "documentation") {
  return (
    <>
      <Header onNavigate={setVueActive} />
      <Documentation />
      <Footer />
    </>
  );
}

if (vueActive === "contact") {
  return (
    <>
      <Header onNavigate={setVueActive} />
      <Contact />
      <Footer />
    </>
  );
}

  return (
    <div>
      <Header onNavigate={setVueActive} />

      <main>
        <Hero onNavigate={setVueActive} />
        <TrustBar />
      </main>

      <Footer />
    </div>
  );
}

const backButtonStyle = {
  position: "fixed",
  top: "14px",
  left: "14px",
  zIndex: 9999,
  background: "#082F63",
  color: "#FFFFFF",
  border: "none",
  borderRadius: "10px",
  padding: "10px 16px",
  fontWeight: "800",
};