const links = [...document.querySelectorAll(".top-nav a, .floating-nav a")];
const sections = [...document.querySelectorAll("main section[id], main section:first-of-type")];

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id || "";
      links.forEach(link => {
        const href = link.getAttribute("href") || "";
        const isHome = href === "#" && entry.target.classList.contains("hero-screen");
        const isMatch = id && href === `#${id}`;
        link.classList.toggle("active", isHome || isMatch);
      });
    });
  },
  { threshold: 0.35 }
);

sections.forEach(section => observer.observe(section));
