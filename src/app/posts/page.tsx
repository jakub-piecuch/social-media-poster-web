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
import { Badge } from "@/components/ui/badge";

export default function Posts() {
  const theme = getTheme();
  const posts = usePosts();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Define table headers
  const headers = ["ID", "Content", "Platform", "Group", "Status", "Review"];
  
  // Transform the data to match our headers
  const transformedData = posts.data?.map(post => ({
    ID: post.id,
    Content: post.content,
    Platform: post.platform,
    Group: post.groupName || "-",
    Status: post.submitted ? 
      <Badge variant="success">Submitted</Badge> : 
      <Badge variant="default">Draft</Badge>,
    Review: post.underReview ? 
      <Badge variant="destructive">Under Review</Badge> : 
      <Badge variant="outline">Not Reviewed</Badge>,
  })) || [];

  return (
    <Layout>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Posts"
          description="Create and manage your social media posts"
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
            {posts.isLoading ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : posts.error ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-destructive">Error loading posts. Please try again.</p>
              </div>
            ) : (
              <DataTable
                headers={headers}
                data={transformedData}
                description="posts"
                isLoading={posts.isLoading}
                basePath="/posts"
                searchField="Content"
                idField="ID"
              />
            )}
          </div>
        </Section>
      </div>
    </Layout>
  );
}