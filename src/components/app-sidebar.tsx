import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconCamera,
  IconFileDescription,
  IconFileAi,
  IconSettings,
  IconHelp,
  IconSearch,
  IconDatabase,
  IconReport,
  IconFileWord,
  IconInnerShadowTop,
  IconQrcode
} from "@tabler/icons-react"
import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import Enable2FA from "@/app/dashboard/Enable2FA";
import {Logout} from "@/components/logout";
import { BadgeMinusIcon, BadgePlusIcon} from "lucide-react";



export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return <p>Not logged in</p>;
  }


  const data = {
    user: {
      name: session.user.name,
      email: session.user.email,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: (
            <IconDashboard
            />
        ),
      },
      {
        title: "Income",
        url: "/dashboard/income",
        icon: (
            <BadgePlusIcon
            />
        ),
      },
      {
        title: "Expenses",
        url: "/dashboard/expenses",
        icon: (
            <BadgeMinusIcon
            />
        ),
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: (
            <IconUsers
            />
        ),
      },
      {


        title: "Another feature...",
        url: "/test",
        icon: (
            <IconSearch
            />
        ),
      }
    ],
    navClouds: [
      {
        title: "Capture",
        icon: (
            <IconCamera
            />
        ),
        isActive: true,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Proposal",
        icon: (
            <IconFileDescription
            />
        ),
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Prompts",
        icon: (
            <IconFileAi
            />
        ),
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "/settings",
        icon: (
            <IconSettings
            />
        ),
      },
      {
        title: "Get Help",
        url: "/help",
        icon: (
            <IconHelp
            />
        ),
      },
      {
        title: "Search",
        url: "#",
        icon: (
            <IconSearch
            />
        ),
      },
    ],
    documents: [
      {
        name: "Data Library",
        url: "#",
        icon: (
            <IconDatabase
            />
        ),
      },
      {
        name: "PDF/Report Generator",
        url: "/report",
        icon: (
            <IconReport
            />
        ),
      },
      {
        name: "Financial Assistant",
        url: "#",
        icon: (
            <IconFileWord
            />
        ),
      },
    ],
  }

  return (

    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/dashboard" />}
            >
              <IconInnerShadowTop className="size-5!" />
              <span className="text-base font-semibold">Fortis Libertas</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>

        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />

      </SidebarContent>
      <SidebarFooter>
        <Enable2FA session={session}/>
        <Logout/>

        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
