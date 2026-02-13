const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://github.com/yash-nandvana/project-health";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
