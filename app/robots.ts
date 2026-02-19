import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://www.limitlessmarketing502.com";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/api/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
