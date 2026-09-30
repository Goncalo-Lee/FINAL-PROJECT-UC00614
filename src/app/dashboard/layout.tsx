import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {SiteHeader} from "@/components/site-header";
import {SectionCards} from "@/components/section-cards";
import {ChartAreaInteractive} from "@/components/chart-area-interactive";
import {DataTable} from "@/components/data-table";
import data from "@/app/dashboard/data.json";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div>
                    {children}
                </div>

            </SidebarInset>
        </SidebarProvider>

    )
}