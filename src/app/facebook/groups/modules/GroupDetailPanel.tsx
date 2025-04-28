// src/components/facebook/groups/GroupDetailPanel.tsx
import { useState, useEffect } from "react";
import { SlidePanel } from "@/components/SlidePanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/useToast";
import { Separator } from "@/components/ui/separator";
import { Edit, RefreshCw, AlertCircle, Users, Link2, ExternalLink } from "lucide-react";
import { Group } from "@/app/facebook/groups/group.types";
import { useSocialMediaUsers } from "@/app/social-media-users/s-m-u.hooks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GroupDetailPanelProps {
  groupId: string | null;
  open: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

export function GroupDetailPanel({
  groupId,
  open,
  onClose,
  onRefresh,
}: GroupDetailPanelProps) {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingFacebookId, setEditingFacebookId] = useState(false);
  const [editedFacebookId, setEditedFacebookId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  
  const { data: users, isLoading: isLoadingUsers } = useSocialMediaUsers();

  useEffect(() => {

    
    // Reset state when panel is opened with a new groupId
    if (open && groupId) {      
      setLoading(true);
      setEditingFacebookId(false);
      fetchGroupDetails(groupId);
    }
  }, [open, groupId]);

  const fetchGroupDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/facebook/groups/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch group details");
      }
      const data = await response.json();
      setGroup(data);
      setEditedFacebookId(data.facebookId);
    } catch (error) {
      console.error("Error fetching group details:", error);
      toast.error("Failed to load group details");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFacebookId = async () => {
    if (!group?.id) return;
    
    setSubmitting(true);
    try {
      const response = await fetch(`/api/facebook/groups/${group.id}/update-facebook-id`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facebookId: editedFacebookId }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update group URL");
      }
      
      toast.success("Group URL updated successfully");
      setEditingFacebookId(false);
      fetchGroupDetails(group.id); // Refresh group data
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Error updating group URL:", error);
      toast.error("Failed to update group URL");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddUser = async () => {
    if (!group?.id || !selectedUserId) return;
    
    setSubmitting(true);
    try {
      const response = await fetch(`/api/facebook/groups/${group.id}/add-userId`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUserId }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to add user to group");
      }
      
      toast.success("User added to group successfully");
      setSelectedUserId("");
      fetchGroupDetails(group.id); // Refresh group data
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Error adding user to group:", error);
      toast.error("Failed to add user to group");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  // Filter out users that are already part of the group
  const availableUsers = users?.filter(
    (user) => !group?.userIds?.includes(user.id)
  );

  return (
    <SlidePanel
      open={open}
      onClose={onClose}
      title={loading ? "Loading Group Details..." : `Group: ${group?.name}`}
      description={group ? `${group.userIds.length} connected users` : undefined}
      width="lg"
    >
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : group ? (
        <div className="space-y-6">
          {/* URL section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center">
                <Link2 className="h-5 w-5 mr-2" />
                Group URL
              </h3>
              {!editingFacebookId && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setEditingFacebookId(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
            
            {editingFacebookId ? (
              <div className="space-y-4">
                <Input
                  value={editedFacebookId}
                  onChange={(e) => setEditedFacebookId(e.target.value)}
                  placeholder="https://www.facebook.com/groups/..."
                  className="w-full"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingFacebookId(false);
                      setEditedFacebookId(group.facebookId);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleUpdateFacebookId}
                    disabled={submitting || editedFacebookId === group.facebookId}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <a 
                  href={`https://www.facebook.com/groups/${group.facebookId}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  {`www.facebook.com/groups/${group.facebookId}`}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            )}
          </div>

          <Separator />

          {/* Connected users section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Connected Users
              </h3>
            </div>
            
            <div className="space-y-4">
              {group.userIds.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {group.userIds.map((userId) => (
                    <div 
                      key={userId} 
                      className="flex items-center justify-between p-2 bg-muted rounded-md"
                    >
                      <span className="font-mono text-sm">{userId}</span>
                      <Badge variant="outline">Connected</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No users connected to this group</p>
              )}

              {/* Add user section */}
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Add User</h4>
                <div className="flex gap-2">
                  <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoadingUsers ? (
                        <SelectItem value="loading" disabled>Loading users...</SelectItem>
                      ) : availableUsers && availableUsers.length > 0 ? (
                        availableUsers.map(user => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.username} ({user.platform})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>No available users</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleAddUser} 
                    disabled={!selectedUserId || submitting}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Metadata section */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Details</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
              <dt className="text-sm font-medium text-muted-foreground">Group ID</dt>
              <dd className="text-sm font-mono">{group.id}</dd>
              <dt className="text-sm font-medium text-muted-foreground">Created</dt>
              <dd className="text-sm">
                {new Date(group.createdAt).toLocaleString()}
              </dd>
              <dt className="text-sm font-medium text-muted-foreground">Updated</dt>
              <dd className="text-sm">
                {new Date(group.updatedAt).toLocaleString()}
              </dd>
            </dl>
          </div>

          {/* Action section */}
          <div className="pt-4 border-t">
            <div className="flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 gap-2">
          <AlertCircle className="w-8 h-8 text-destructive" />
          <p className="text-destructive">Failed to load group details</p>
        </div>
      )}
    </SlidePanel>
  );
}