'use client';

import { DataTable } from "@/components/DataTable";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { getTheme } from "@/lib/theme-config";
import { Layout } from "@/modules/layout/Layout";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreatePostModal } from "./modules/CreatePostModal";
import { usePosts } from "./post.hooks";

export default function Posts() {
  const theme = getTheme();
  const posts = usePosts();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <Layout>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Posts"
          actions={
            <Button
              size="sm"
              className={`whitespace-nowrap ${theme.colors.primary} ${theme.colors.text} ${theme.colors.hover}`}
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          }
        />
        
        <CreatePostModal 
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
        />

        <Section className="py-6 animate-fade-in" containerSize="full">
          <div className="mt-6 animate-slide-down">
            <DataTable
              headers={["id", "content", "platform", "groupName", "submitted", "underReview"]}
              data={posts.data || []}
              description="posts"
              isLoading={posts.isLoading}
              basePath="/posts]"
            />
          </div>
        </Section>
      </div>
    </Layout>
  );
}