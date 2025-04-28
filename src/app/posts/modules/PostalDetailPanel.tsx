// src/components/posts/PostDetailPanel.tsx
import { useState, useEffect } from "react";
import { SlidePanel } from "@/components/SlidePanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExpandableTextarea } from "@/components/ExpandableTextarea";
import { PlatformEnum } from "@/app/types/GlobalEnum";
import { toast } from "@/hooks/useToast";
import { Separator } from "@/components/ui/separator";
import { Check, AlertCircle, Edit, RefreshCw } from "lucide-react";
import { PublishToFacebookButton } from "@/components/PublishToSocialMediaButton";

interface PostDetailPanelProps {
  postId: string | null;
  open: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export function PostDetailPanel({
  postId,
  open,
  onClose,
  onRefresh,
}: PostDetailPanelProps) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    // Reset state when panel is opened with a new postId
    if (open && postId) {
      setLoading(true);
      setEditing(false);
      fetchPostDetails(postId);
    }
  }, [open, postId]);

  const fetchPostDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post details");
      }
      const data = await response.json();
      setPost(data);
      setEditedContent(data.content);
    } catch (error) {
      console.error("Error fetching post details:", error);
      toast.error("Failed to load post details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async () => {
    if (!post?.id) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${post.id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit post");
      }

      toast.success("Post submitted successfully");
      fetchPostDetails(post.id); // Refresh post data
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error("Failed to submit post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateContent = async () => {
    if (!post?.id) return;

    // This would need a backend API endpoint to be implemented
    setSubmitting(true);
    try {
      // This is placeholder - you'd need to implement this endpoint
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      toast.success("Post updated successfully");
      setEditing(false);
      fetchPostDetails(post.id); // Refresh post data
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={loading ? "Loading Post Details..." : `Post Details: ${post?.id?.substring(0, 8)}...`}
      description={post?.groupName ? `For group: ${post.groupName}` : undefined}
      width="lg"
    >
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : post ? (
        <div className="space-y-6">
          {/* Status badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant={post.platform === PlatformEnum.FACEBOOK ? "default" : "outline"}>
              {post.platform}
            </Badge>
            <Badge variant={post.submitted ? "success" : "default"}>
              {post.submitted ? "Submitted" : "Draft"}
            </Badge>
            {post.underReview && (
              <Badge variant="destructive">Under Review</Badge>
            )}
          </div>

          <Separator />

          {/* Content section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Content</h3>
              {!editing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing(true)}
                  disabled={post.submitted}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <ExpandableTextarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  minRows={5}
                  maxRows={20}
                  className="w-full min-h-[200px] font-mono"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditing(false);
                      setEditedContent(post.content);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateContent}
                    disabled={submitting || editedContent === post.content}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-muted p-4 rounded-md whitespace-pre-wrap min-h-[200px] font-mono">
                {post.content}
              </div>
            )}
          </div>

          <Separator />

          {/* Metadata section */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Details</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              <dt className="text-sm font-medium text-muted-foreground">Created</dt>
              <dd className="text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </dd>
              <dt className="text-sm font-medium text-muted-foreground">Updated</dt>
              <dd className="text-sm">
                {new Date(post.updatedAt).toLocaleString()}
              </dd>
              <dt className="text-sm font-medium text-muted-foreground">User ID</dt>
              <dd className="text-sm font-mono">{post.userId || "N/A"}</dd>
            </dl>
          </div>

          {/* Action section */}
          <div className="pt-4 border-t">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {!post.submitted && (
                <Button
                  onClick={handleSubmitPost}
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Submit Post
                </Button>
              )}

              {!post.groupName && post.content && post.submitted && post.platform == 'facebook' && (
                <PublishToFacebookButton
                  groupUrl={`https://www.facebook.com/groups/${post.group.facebookId}`}
                  postContent={post.content}
                />
              )}

            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 gap-2">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-destructive">Failed to load post details</p>
        </div>
      )}
    </SlidePanel>
  );
}