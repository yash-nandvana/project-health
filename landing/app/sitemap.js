const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://github.com/yash-nandvana/project-health";

export default function sitemap() {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
