import { GoogleOAuthProvider } from "@react-oauth/google";
import { NotFoundProvider } from "@/context/NotFoundContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { AuthProvider } from "@/context/AuthContext";
import NavbarWrapper from "@/components/navbar/NavbarWrapper"; // ✅ Import the new NavbarWrapper component
import seoConfig from "@/config/seoConfig";
import "./globals.css";

export const metadata = seoConfig.layout;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LoadingProvider>
            <NotFoundProvider>
              <AuthProvider>
                <NavbarWrapper />{" "}
                {/* ✅ NavbarWrapper is now a separate client component */}
                <GoogleOAuthProvider clientId="88805531313-qi6ucpfi9ha4acucih0kt4e78miu0ine.apps.googleusercontent.com">
                  <main>{children}</main>
                </GoogleOAuthProvider>
              </AuthProvider>
            </NotFoundProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
