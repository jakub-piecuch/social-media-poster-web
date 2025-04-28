import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateGroup } from '@/app/facebook/groups/group.hooks';
import { useSocialMediaUsers } from '../../../social-media-user/s-m-u.hooks';
import { toast } from '@/hooks/useToast';
import { getTheme } from '@/lib/theme-config';

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGroupModal({ open, onOpenChange }: CreateGroupModalProps) {
  const theme = getTheme();
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const { mutate: createGroup, isPending } = useCreateGroup();
  const { data: users, isLoading: isLoadingUsers, error: usersError } = useSocialMediaUsers();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Url is required field.')
      return;
    }
    
    createGroup(
      { 
        url: url, 
        name: name,
        userIds: !selectedUserId ? [selectedUserId] : []
      },
      {
        onSuccess: () => {
          toast.success("Success", {
            description: "Group has been created successfully",
          });
          setUrl('');
          setName('');
          setSelectedUserId('');
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error("Error", {
            description: "Failed to create group",
          });
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Create New Facebook Group</DialogTitle>
          <DialogDescription>
            Add a new Facebook group to your collection.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                Group URL
              </Label>
              <Input
                id="url"
                placeholder="https://www.facebook.com/groups/..."
                className="col-span-3"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                Group Name
              </Label>
              <Input
                id="name"
                placeholder="Group name..."
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user" className="text-right">
                User
              </Label>
              <div className="col-span-3">
                <Select 
                  value={selectedUserId} 
                  onValueChange={setSelectedUserId}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingUsers ? (
                      <SelectItem value="loading">Loading users...</SelectItem>
                    ) : usersError ? (
                      <SelectItem value="error">Error loading users</SelectItem>
                    ) : users && users.length > 0 ? (
                      users.map(user => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.username} ({user.platform})
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-users">No users available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                {usersError && (
                  <p className="text-xs text-destructive mt-1">
                    Error loading users: {usersError instanceof Error ? usersError.message : 'Unknown error'}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending} className={`whitespace-nowrap ${theme.colors.primary} ${theme.colors.text} ${theme.colors.hover}`}>
              {isPending ? 'Creating...' : 'Create Group'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}