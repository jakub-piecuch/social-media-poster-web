import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from '@/hooks/useToast';
import { useState, useEffect } from 'react';
import { useGroups } from '../../facebook/groups/group.hooks';
import { useCreatePost } from '../post.hooks';
import { PlatformEnum } from "@/app/types/GlobalEnum";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExpandableTextarea } from "../../../components/ExpandableTextarea";
import { getTheme } from "@/lib/theme-config";

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePostModal({ open, onOpenChange }: CreatePostModalProps) {
  const theme = getTheme();
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const { mutate: createPost, isPending } = useCreatePost();
  const { data: groups, isLoading: isLoadingGroups, error: groupsError } = useGroups();
  
  // Reset selectedGroup when platform changes to something other than Facebook
  useEffect(() => {
    if (platform !== PlatformEnum.FACEBOOK) {
      setSelectedGroup('');
    }
  }, [platform]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!platform || !content) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Validate that a group is selected when platform is Facebook
    if (platform === PlatformEnum.FACEBOOK && !selectedGroup) {
      toast.error('Please select a Facebook group.');
      return;
    }

    createPost(
      {
        content: content,
        platform: platform as PlatformEnum,
        groupName: selectedGroup, // Use a default value for non-Facebook platforms
        userId: '81f166e8-e864-49cd-90d7-905d62f8261d'
      },
      {
        onSuccess: () => {
          toast.success("Success", {
            description: "Post has been created successfully",
          });
          setContent('');
          setPlatform('');
          setSelectedGroup('');
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error("Error", {
            description: "Failed to create post",
          });
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Add a new Post to your social media.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Content
              </Label>
              <div className="col-span-3">
                <ExpandableTextarea
                  id="content"
                  placeholder="Write your post content here..."
                  minRows={3}
                  maxRows={15}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {content.length} characters
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="platform" className="text-right">
                Platform
              </Label>
              <Select
                value={platform}
                onValueChange={setPlatform}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent className="bg-background text-foreground border shadow-md">
                  {Object.values(PlatformEnum).map((value) => (
                    <SelectItem key={value} value={value} className="hover:bg-accent focus:bg-accent">
                      {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Only show group selection when Facebook is selected */}
            {platform === PlatformEnum.FACEBOOK && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="group" className="text-right">
                  Facebook Group
                </Label>
                <div className="col-span-3">
                  <Select
                    value={selectedGroup}
                    onValueChange={setSelectedGroup}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent className="bg-background text-foreground border shadow-md">
                      {isLoadingGroups ? (
                        <SelectItem value="loading">Loading groups...</SelectItem>
                      ) : groupsError ? (
                        <SelectItem value="error">Error loading groups</SelectItem>
                      ) : groups && groups.length > 0 ? (
                        groups.map(group => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-groups">No groups available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {groupsError && (
                    <p className="text-xs text-destructive mt-1">
                      Error loading groups: {groupsError instanceof Error ? groupsError.message : 'Unknown error'}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending} className={`whitespace-nowrap ${theme.colors.primary} ${theme.colors.text} ${theme.colors.hover}`}>
              {isPending ? 'Creating...' : 'Create Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}