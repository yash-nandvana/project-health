const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://github.com/yash-nandvana/project-health";

export default function manifest() {
  return {
    name: "check-project-health",
    short_name: "project-health",
    description: "Terminal health dashboard for developers. One command for dependencies, git, code quality, environment, tests, and security.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["developer tools", "productivity"],
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
  };
}
