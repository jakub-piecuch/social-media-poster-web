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
import { CreatePostModal } from "./modules/CreatePostModal";
import { usePosts } from "./post.hooks";
import { Badge } from "@/components/ui/badge";
import { PostDetailPanel } from "./modules/PostalDetailPanel";

export default function Posts() {
  const theme = getTheme();
  const posts = usePosts();
  const [showCreateModal, setShowCreateModal] = useState(false);
  // New state for the detail panel
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);

  // Define table headers
  const headers = ["Content", "Platform", "Group", "Status"];


  const getBadgeForStatus = (submitted: boolean, rejected: boolean) => {
    if (submitted && !rejected) {
      return <Badge variant="success">Submitted</Badge>
    } else if (submitted && rejected || !submitted && rejected) {
      return <Badge variant="destructive">Rejected</Badge>
    } else if (!submitted && !rejected) {
      return <Badge variant="default">Draft</Badge>
    }
  }
  
  // Transform the data to match our headers
  const transformedData = posts.data?.map(post => ({
    ID: post.id,
    Content: post.content.length > 50 ? post.content.substring(0, 49) + '...' : post.content,
    Platform: post.platform,
    Group: post.group?.name || "-",
    Status: getBadgeForStatus(post.submitted, post.rejected)
  })) || [];

  const handleRowClick = (item: any) => {
    setSelectedPostId(item.ID);
    setDetailPanelOpen(true);
  };

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

        {/* Post Detail Panel */}
        <PostDetailPanel
          postId={selectedPostId}
          open={detailPanelOpen}
          onClose={() => {
            setDetailPanelOpen(false);
            setSelectedPostId(null);
          }}
          onRefresh={() => posts.refetch()}
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
                idField="ID"
                searchField="Content"
                onRowClick={handleRowClick} // Use our custom row click handler
              />
            )}
          </div>
        </Section>
      </div>
    </Layout>
  );
}