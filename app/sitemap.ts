import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://weddingos.com";

  const routes = [
    "",
    "/product",
    "/solutions/couples",
    "/solutions/planners",
    "/solutions/guests",
    "/features/invitations",
    "/features/rsvp",
    "/features/guest-management",
    "/features/events",
    "/features/catering",
    "/features/ai-insights",
    "/features/check-in",
    "/pricing",
    "/about",
    "/contact",
    "/login",
    "/signup",
    "/invite/rahul-priya",
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
