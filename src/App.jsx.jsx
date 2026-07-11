import { useEffect, useState } from "react";
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
import EssayerStranalyx from "./components/portail/EssayerStranalyx";

const getVueDepuisUrl = () => {
  const vue = window.location.hash.replace("#", "");

  return vue || "portail";
};

export default function App() {
  const [vueActive, setVueActive] = useState(getVueDepuisUrl);

  useEffect(() => {
    const handleHashChange = () => {
      setVueActive(getVueDepuisUrl());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigate = (page) => {
    if (page === "portail") {
      window.history.pushState(
        null,
        "",
        window.location.pathname + window.location.search
      );

      setVueActive("portail");
      return;
    }

    window.location.hash = page;
    setVueActive(page);
  };

  if (vueActive === "agro") {
    return (
      <>
        <button
          style={backButtonStyle}
          onClick={() => navigate("essayer")}
        >
          ← Retour aux solutions
        </button>

        <AgroIndustrieApp />
      </>
    );
  }

  if (vueActive === "histoire") {
    return (
      <>
        <Header onNavigate={navigate} />
        <NotreHistoire />
        <Footer />
      </>
    );
  }

  if (vueActive === "solutions") {
    return (
      <>
        <Header onNavigate={navigate} />
        <NosSolutions />
        <Footer />
      </>
    );
  }

  if (vueActive === "prestations") {
    return (
      <>
        <Header onNavigate={navigate} />
        <NosPrestations />
        <Footer />
      </>
    );
  }

  if (vueActive === "documentation") {
    return (
      <>
        <Header onNavigate={navigate} />
        <Documentation />
        <Footer />
      </>
    );
  }

  if (vueActive === "essayer") {
    return (
      <>
        <Header onNavigate={navigate} />
        <EssayerStranalyx onNavigate={navigate} />
        <Footer />
      </>
    );
  }

  if (vueActive === "contact") {
    return (
      <>
        <Header onNavigate={navigate} />
        <Contact />
        <Footer />
      </>
    );
  }

  return (
    <div>
      <Header onNavigate={navigate} />

      <main>
        <Hero onNavigate={navigate} />
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
  cursor: "pointer",
};