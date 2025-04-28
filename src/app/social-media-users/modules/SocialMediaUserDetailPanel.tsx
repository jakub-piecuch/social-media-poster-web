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

interface PostDetailPanelProps {
  userId: string | null;
  open: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export function SocialMediaUserDetailPanel({
  userId,
  open,
  onClose,
  onRefresh,
}: PostDetailPanelProps) {
  const [socialMediaUser, setSocialMediaUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    // Reset state when panel is opened with a new postId
    if (open && userId) {
      setLoading(true);
      setEditing(false);
      fetchSocialMediaUserDetails(userId);
    }
  }, [open, userId]);

  const fetchSocialMediaUserDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/social-media-user/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch social-media-user details");
      }
      const data = await response.json();
      setSocialMediaUser(data);
      setEditedContent(data.content);
    } catch (error) {
      console.error("Error fetching social-media-user details:", error);
      toast.error("Failed to load social-media-user details");
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmitPost = async () => {
  //   if (!socialMediaUser?.id) return;
    
  //   setSubmitting(true);
  //   try {
  //     const response = await fetch(`/api/social-media-user/${socialMediaUser.id}/submit`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
      
  //     if (!response.ok) {
  //       throw new Error("Failed to submit post");
  //     }
      
  //     toast.success("Post submitted successfully");
  //     fetchSocialMediaUserDetails(socialMediaUser.id); // Refresh post data
  //     if (onRefresh) onRefresh();
  //   } catch (error) {
  //     console.error("Error submitting post:", error);
  //     toast.error("Failed to submit post");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleUpdateContent = async () => {
    if (!socialMediaUser?.id) return;
    
    // This would need a backend API endpoint to be implemented
    setSubmitting(true);
    try {
      // This is placeholder - you'd need to implement this endpoint
      const response = await fetch(`/api/posts/${socialMediaUser.id}`, {
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
      fetchSocialMediaUserDetails(socialMediaUser.id); // Refresh post data
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
      title={loading ? "Loading Post Details..." : `Post Details: ${socialMediaUser?.id?.substring(0, 8)}...`}
      description={socialMediaUser?.groupName ? `For group: ${socialMediaUser.groupName}` : undefined}
      width="lg"
    >
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : socialMediaUser ? (
        <div className="space-y-6">
          {/* Status badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant={socialMediaUser.platform === PlatformEnum.FACEBOOK ? "default" : "outline"}>
              {socialMediaUser.platform}
            </Badge>
            <Badge variant={socialMediaUser.submitted ? "success" : "default"}>
              {socialMediaUser.submitted ? "Submitted" : "Draft"}
            </Badge>
            {socialMediaUser.underReview && (
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
                  disabled={socialMediaUser.submitted}
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
                      setEditedContent(socialMediaUser.content);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleUpdateContent}
                    disabled={submitting || editedContent === socialMediaUser.content}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-muted p-4 rounded-md whitespace-pre-wrap min-h-[200px] font-mono">
                {socialMediaUser.content}
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
                {new Date(socialMediaUser.createdAt).toLocaleString()}
              </dd>
              <dt className="text-sm font-medium text-muted-foreground">Updated</dt>
              <dd className="text-sm">
                {new Date(socialMediaUser.updatedAt).toLocaleString()}
              </dd>
              <dt className="text-sm font-medium text-muted-foreground">User ID</dt>
              <dd className="text-sm font-mono">{socialMediaUser.userId || "N/A"}</dd>
            </dl>
          </div>

          {/* Action section */}
          <div className="pt-4 border-t">
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {/* {!socialMediaUser.submitted && (
                // <Button 
                //   onClick={handleSubmitPost} 
                //   disabled={submitting}
                //   className="bg-green-600 hover:bg-green-700"
                // >
                //   <Check className="h-4 w-4 mr-2" />
                //   Submit Post
                // </Button>
              )} */}
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