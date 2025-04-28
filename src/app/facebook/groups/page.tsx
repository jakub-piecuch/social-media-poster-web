'use client';

import { DataTable } from "@/components/DataTable";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Layout } from "@/modules/layout/Layout";
import { useGroups } from "./group.hooks";
import { CreateGroupModal } from "./modules/CreateGroupModal";
import { Plus } from "lucide-react";
import { useState } from "react";
import { getTheme } from "@/lib/theme-config";
import { Badge } from "@/components/ui/badge";

export default function Groups() {
  const theme = getTheme();
  const groups = useGroups();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Define table headers
  const headers = ["ID", "Name", "URL", "Users"];
  
  // Transform the data to match our headers
  const transformedData = groups.data?.map(group => ({
    ID: group.id,
    Name: group.name,
    URL: group.url,
    Users: group.userIds?.length > 0 ? (
      <Badge variant="outline">{group.userIds.length} connected</Badge>
    ) : (
      <Badge variant="outline">No users</Badge>
    ),
  })) || [];

  return (
    <Layout>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Facebook Groups"
          description="Manage your Facebook groups for automated posting"
          actions={
            <Button
              size="sm"
              className={`whitespace-nowrap ${theme.colors.primary} ${theme.colors.text} ${theme.colors.hover}`}
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Group
            </Button>
          }
        />
        
        {/* Create Group Modal */}
        <CreateGroupModal 
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
        />

        <Section className="py-6 animate-fade-in" containerSize="full">
          <div className="mt-6 animate-slide-down">
            {groups.isLoading ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Loading groups...</p>
              </div>
            ) : groups.error ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-destructive">Error loading groups. Please try again.</p>
              </div>
            ) : (
              <DataTable
                headers={headers}
                data={transformedData}
                description="Facebook groups"
                isLoading={groups.isLoading}
                basePath="/facebook/groups"
                searchField="Name"
                idField="ID"
              />
            )}
          </div>
        </Section>
      </div>
    </Layout>
  );
}