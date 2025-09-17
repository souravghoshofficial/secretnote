import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SecretNote – Anonymous Messaging",
    short_name: "SecretNote",
    description:
      "Send and receive anonymous messages safely with SecretNote. Simple, private, and mobile-friendly.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#9333ea", 
    icons: [
      {
        src: "/icons/secretnote-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/secretnote-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
