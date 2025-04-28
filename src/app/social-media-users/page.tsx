// src/app/posts/page.tsx
'use client';

import { DataTable } from "@/components/DataTable";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { getTheme } from "@/lib/theme-config";
import { Layout } from "@/modules/layout/Layout";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateSocialMediaUserModal } from "./modules/CreateSocialMediaUserModal";
import { SocialMediaUserDetailPanel } from "./modules/SocialMediaUserDetailPanel";
import { useSocialMediaUsers } from "./s-m-u.hooks";

export default function SocialMediaUsers() {
  const theme = getTheme();
  const users = useSocialMediaUsers();
  const [showCreateModal, setShowCreateModal] = useState(false);
  // New state for the detail panel
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);

  // Define table headers
  const headers = ["ID", "Username", "Platform"];
  
  // Transform the data to match our headers
  const transformedData = users.data?.map(user => ({
    ID: user.id,
    Username: user.username,
    Platform: user.platform
  })) || [];

  const handleRowClick = (item: any) => {
    setSelectedUserId(item.ID);
    setDetailPanelOpen(true);
  };

  return (
    <Layout>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Social Media Users"
          actions={
            <Button
              size="sm"
              className={`whitespace-nowrap ${theme.colors.primary} ${theme.colors.text} ${theme.colors.hover}`}
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Social Media User
            </Button>
          }
        />
        
        <CreateSocialMediaUserModal 
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
        />

        {/* Post Detail Panel */}
        <SocialMediaUserDetailPanel
          userId={selectedUserId}
          open={detailPanelOpen}
          onClose={() => {
            setDetailPanelOpen(false);
            setSelectedUserId(null);
          }}
          onRefresh={() => users.refetch()}
        />

        <Section className="py-6 animate-fade-in" containerSize="full">
          <div className="mt-6 animate-slide-down">
            {users.isLoading ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : users.error ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-destructive">Error loading posts. Please try again.</p>
              </div>
            ) : (
              <DataTable
                headers={headers}
                data={transformedData}
                description="posts"
                isLoading={users.isLoading}
                idField="ID"
                searchField="Username"
                onRowClick={handleRowClick} // Use our custom row click handler
              />
            )}
          </div>
        </Section>
      </div>
    </Layout>
  );
}