import { AuthProvider } from "@/components/auth-provider";
import "../styles/globals.css";
import { Logo } from "@/components/ui/logo";
import { MainNav } from "@/components/ui/main-nav";
import UserNav from "@/components/ui/user-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Footer } from "@/components/ui/footer";
import { Toaster } from "react-hot-toast";
import { getCurrentUser } from "@/lib/session";
import GoogleAnalytics from "./GoogleAnalytics";

export const metadata = {
    title: {
        template: "%s | Next.js News",
        default: "Next.js News",
    },
    description: "Next.js News is the official blog of Next.js. Every day bringing you the latest news, tutorials, and packages for the framework.",
    other: {
        "google-site-verification": "_IqktHo6oIo2-k8jc95j-_drdPO8K-MK4KHTP4U9VnE"
    }
}

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
    const user = await getCurrentUser();

    return (
        <html lang="en">
            <body>
                <GoogleAnalytics />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <div className="container flex flex-col">
                            <div className="border-b">
                                <div className="flex h-16 items-center px-4">
                                    <Logo />
                                    <MainNav className="hidden md:block mx-6" />
                                    <div className="ml-auto flex items-center space-x-4">
                                        <ModeToggle />
                                        {user && <UserNav user={user} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <main>
                            {children}
                        </main>
                        <Footer />
                    </AuthProvider>
                </ThemeProvider>
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
