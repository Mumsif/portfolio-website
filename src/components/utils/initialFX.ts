import { TextSplitter } from "../../utils/textSplitter";
import gsap from "gsap";
import { lenis } from "../Navbar";

export function initialFX() {
  if (typeof document === "undefined") return;

  document.body.style.overflowY = "auto";
  document.body.style.overflow = "auto";

  if (lenis && typeof lenis.start === "function") {
    lenis.start();
  }

  const mainElement = document.getElementsByTagName("main")[0];
  if (mainElement) {
    mainElement.classList.add("main-active");
  }

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 0.2,
  });

  const selectors = [".landing-info h3", ".landing-intro h2", ".landing-intro h1"];
  const elements = selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)));
  
  if (elements.length > 0) {
    try {
      const landingText = new TextSplitter(elements, {
        type: "chars,lines",
        linesClass: "split-line",
      });
      if (landingText.chars && landingText.chars.length > 0) {
        gsap.fromTo(
          landingText.chars,
          { opacity: 0, y: 80, filter: "blur(5px)" },
          {
            opacity: 1,
            duration: 1.2,
            filter: "blur(0px)",
            ease: "power3.inOut",
            y: 0,
            stagger: 0.025,
            delay: 0.3,
          }
        );
      }
    } catch (e) {
      console.warn("TextSplitter animation fallback:", e);
    }
  }

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  const landingH2Info = document.querySelector(".landing-h2-info");
  if (landingH2Info) {
    try {
      const landingText2 = new TextSplitter(".landing-h2-info", TextProps);
      if (landingText2.chars && landingText2.chars.length > 0) {
        gsap.fromTo(
          landingText2.chars,
          { opacity: 0, y: 80, filter: "blur(5px)" },
          {
            opacity: 1,
            duration: 1.2,
            filter: "blur(0px)",
            ease: "power3.inOut",
            y: 0,
            stagger: 0.025,
            delay: 0.3,
          }
        );
      }
    } catch (e) {}
  }

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.4,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
