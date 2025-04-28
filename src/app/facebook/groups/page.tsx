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

export default function Groups() {
  const theme = getTheme();
  const groups = useGroups();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <Layout>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Groups"
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
            <DataTable
              headers={["Name", "Url"]}
              data={groups.data || []}
              description="facebook groups"
              isLoading={groups.isLoading}
              basePath="/facebook/groups"
            />
          </div>
        </Section>
      </div>
    </Layout>
  );
}