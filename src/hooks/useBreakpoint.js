import { useEffect, useState } from "react";
import portalTheme from "../styles/portalTheme";

export default function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tablet = parseInt(portalTheme.breakpoints.tablet, 10);

  return {
    isMobileOrTablet: width <= tablet,
  };
}