import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useReveal() {
  const location = useLocation();
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const scanAndObserve = () => {
      const items = document.querySelectorAll<HTMLElement>("[data-reveal], .bottom-to-top");
      if (!items.length) return;

      if (!("IntersectionObserver" in window)) {
        items.forEach((el) => el.classList.add("is-visible"));
        return;
      }

      if (!observer) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer?.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.04,
            rootMargin: "0px 0px 40px 0px",
          },
        );
      }

      const innerH = window.innerHeight;
      items.forEach((item) => {
        if (item.classList.contains("is-visible")) return;
        const rect = item.getBoundingClientRect();
        // If element is already in view or slightly above/below, reveal immediately
        if (rect.top < innerH + 30 && rect.bottom > -40) {
          item.classList.add("is-visible");
        } else {
          observer?.observe(item);
        }
      });
    };

    // Execute immediately and on next frame
    scanAndObserve();
    const rafId = requestAnimationFrame(scanAndObserve);

    // Staggered checks to catch any late hydration or route renders
    const t1 = setTimeout(scanAndObserve, 30);
    const t2 = setTimeout(scanAndObserve, 150);
    const t3 = setTimeout(scanAndObserve, 500);

    // Safety fallback: reveal any remaining above-the-fold elements
    const tSafety = setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal], .bottom-to-top").forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.5) {
          item.classList.add("is-visible");
        }
      });
    }, 1000);

    // Observe DOM mutations for newly added content
    if ("MutationObserver" in window) {
      mutationObserver = new MutationObserver(() => {
        scanAndObserve();
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    const timer = setTimeout(() => {

      // Numerical count-up observer matching Muon Space
      const statTitles = document.querySelectorAll<HTMLElement>("[data-count-target]");
      if (statTitles.length) {
        const numObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute("data-count-target") || "0");
                const suffix = entry.target.getAttribute("data-count-suffix") || "";
                let startTime: number | null = null;
                const duration = 1200;
                const animate = (time: number) => {
                  if (!startTime) startTime = time;
                  const progress = Math.min((time - startTime) / duration, 1);
                  const eased = 1 - Math.pow(1 - progress, 3);
                  const val = Math.round(target * eased);
                  entry.target.textContent = val + suffix;
                  if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                numObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2 }
        );
        statTitles.forEach((st) => numObserver.observe(st));
      }

      // Magnetic button physics matching Muon Space
      const magneticBtns = document.querySelectorAll<HTMLElement>(".btn-magnetic");
      magneticBtns.forEach((btn) => {
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = 0.16 * (e.clientX - rect.left - rect.width / 2);
          const y = 0.16 * (e.clientY - rect.top - rect.height / 2);
          btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        };
        const onLeave = () => {
          btn.style.transform = "";
        };
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
      });
    }, 40);

    // Progressive word highlight scroll handler for .text-reveal
    const handleScrollText = () => {
      const textBlock = document.querySelector<HTMLElement>(".text-reveal");
      if (textBlock) {
        const innerH = window.innerHeight;
        const rect = textBlock.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (0.85 * innerH - rect.top) / (0.55 * innerH)));
        const words = textBlock.querySelectorAll<HTMLElement>(".rw");
        const total = words.length || 1;
        const step = 1.4 / total;
        words.forEach((w, idx) => {
          const wordProg = (progress - idx / total) / step;
          const op = Math.max(0.18, Math.min(1, wordProg));
          w.style.opacity = op.toFixed(3);
        });
      }
    };
    window.addEventListener("scroll", handleScrollText, { passive: true });
    handleScrollText();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tSafety);
      clearTimeout(timer);
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("scroll", handleScrollText);
    };
  }, [location.pathname]);
}
