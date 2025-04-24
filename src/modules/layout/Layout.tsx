"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/modules/sidebar/AppSidebar";
import { useIsMobile } from "@/hooks/useMobile";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const isMobile = useIsMobile();
    
    return (
        <SidebarProvider>
            <div className="min-h-screen flex flex-col w-full bg-background relative">
                {/* Add a subtle dot pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
                
                {/* Conditionally render mobile or desktop layout */}
                {isMobile ? (
                    <>
                        {/* Mobile layout: Top header with menu and main content below */}
                        <AppSidebar isMobileView={true} />
                        <main className="flex-1 overflow-auto">{children}</main>
                    </>
                ) : (
                    /* Desktop layout: Sidebar on left and main content on right */
                    <div className="flex flex-1 flex-row min-h-screen">
                        <AppSidebar />
                        <main className="flex-1 overflow-auto">{children}</main>
                    </div>
                )}
            </div>
        </SidebarProvider>
    );
};