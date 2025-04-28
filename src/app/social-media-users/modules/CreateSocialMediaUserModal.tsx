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
import { PlatformEnum } from "@/app/types/GlobalEnum";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExpandableTextarea } from "../../../components/ExpandableTextarea";
import { getTheme } from "@/lib/theme-config";
import { useCreateSocialMediaUser } from "../s-m-u.hooks";
import { Input } from "@/components/ui/input";

interface CreateSocialMediaUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateSocialMediaUserModal({ open, onOpenChange }: CreateSocialMediaUserModalProps
) {
  const theme = getTheme();
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('');
  const { mutate: createPost, isPending } = useCreateSocialMediaUser();
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!platform || !username) {
      toast.error('Please fill in all required fields.');
      return;
    }

    createPost(
      {
        username: username,
        platform: platform as PlatformEnum,
      },
      {
        onSuccess: () => {
          toast.success("Success", {
            description: "Social Media User has been created successfully",
          });
          setUsername('');
          setPlatform('');
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
          <DialogTitle>Create New SocialMediaUser</DialogTitle>
          <DialogDescription>
            Add a new Social Media User.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Username
              </Label>
              <Input
                id="url"
                placeholder="username..."
                className="col-span-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
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