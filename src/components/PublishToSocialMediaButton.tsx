import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { getTheme } from "@/lib/theme-config";

interface PublishToFacebookButtonProps {
  groupUrl: string;
  postContent: string;
}

export function PublishToFacebookButton({ groupUrl, postContent }: PublishToFacebookButtonProps) {
  const { toast } = useToast();
  const theme = getTheme();

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(postContent);
      window.open(groupUrl, '_blank', 'noopener,noreferrer');
      toast.success('Copied post content successfully!', {
        description: 'Paste copied content on facebook group.',
      });
    } catch (err) {
      toast.error('Could not copy post content', {
        description: 'Try copying manually.',
      });
    }
  };

  return (
    <Button onClick={handleClick} className={`whitespace-nowrap ${theme.colors.primary} ${theme.colors.text} ${theme.colors.hover}`}>
      Go to Facebook
    </Button>
  );
}
