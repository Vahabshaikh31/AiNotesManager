const BASE_URL = "https://ainotesmanager.ai";

const seoConfig = {
  home: {
    title: "AI Notes Manager - Smart Note Taking",
    description:
      "Easily manage your notes with AI. Create, edit, and export notes efficiently.",
    keywords: [
      "AI Notes",
      "Smart Notes",
      "Note Management",
      "AI-powered Notes",
    ],
    openGraph: {
      title: "AI Notes Manager - Smart Note Taking",
      description:
        "Easily manage your notes with AI. Create, edit, and export notes efficiently.",
      url: `${BASE_URL}`,
      siteName: "AI Notes Manager",
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "AI Notes Manager",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@ainotesmanager",
      title: "AI Notes Manager - Smart Note Taking",
      description:
        "Easily manage your notes with AI. Create, edit, and export notes efficiently.",
      images: [`${BASE_URL}/og-image.jpg`],
    },
  },

  chat: {
    title: "AI Chat - AI Notes Manager",
    description:
      "Chat with AI to manage your notes efficiently. Get instant responses and edit notes.",
    keywords: ["AI Chat", "Chatbot", "AI-powered Notes", "AI Notes Manager"],
    openGraph: {
      title: "AI Chat - AI Notes Manager",
      description:
        "Chat with AI to manage your notes efficiently. Get instant responses and edit notes.",
      url: `${BASE_URL}/chat`,
      siteName: "AI Notes Manager",
      images: [
        {
          url: `${BASE_URL}/chat-preview.jpg`,
          width: 1200,
          height: 630,
          alt: "AI Chat Interface",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@ainotesmanager",
      title: "AI Chat - AI Notes Manager",
      description:
        "AI-powered chatbot to manage and edit your notes seamlessly.",
      images: [`${BASE_URL}/chat-preview.jpg`],
    },
  },
  layout: {
    title: "AI Notes Manager - AI-Powered Note Management",
    description:
      "AI Notes Manager helps you edit, manage, and organize your notes using AI. Improve productivity with AI-powered note-taking.",
    keywords: [
      "AI Notes",
      "AI Note Manager",
      "AI note-taking",
      "AI-powered notes",
      "manage notes with AI",
    ],
    authors: [{ name: "AI Notes Manager", url: "https://ainotesmanager.ai" }],
    robots: "index, follow",
    openGraph: {
      title: "AI Notes Manager - AI-Powered Note Management",
      description:
        "AI Notes Manager helps you edit, manage, and organize your notes using AI. Improve productivity with AI-powered note-taking.",
      url: "https://ainotesmanager.ai",
      siteName: "AI Notes Manager",
      images: [
        {
          url: "https://ainotesmanager.ai/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "AI Notes Manager - AI-powered note editing and management",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@ainotesmanager",
      title: "AI Notes Manager - AI-Powered Note Management",
      description: "Edit and manage your notes efficiently with AI.",
      images: ["https://ainotesmanager.ai/og-image.jpg"],
    },
  },
  // Add more pages as needed
};

export default seoConfig;
