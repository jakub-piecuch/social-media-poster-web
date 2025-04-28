import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";

interface PublishToFacebookButtonProps {
  groupUrl: string;
  postContent: string;
}

export function PublishToFacebookButton({ groupUrl, postContent }: PublishToFacebookButtonProps) {
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(postContent);
      window.open(groupUrl, '_blank', 'noopener,noreferrer');
      toast.success('Skopiowano treść posta!', {
        description: 'Teraz wklej treść na Facebooku i opublikuj.',
      });
    } catch (err) {
      toast.error('Nie udało się skopiować treści.', {
        description: 'Spróbuj skopiować ręcznie.',
      });
    }
  };

  return (
    <Button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 text-white">
      Opublikuj na Facebooku
    </Button>
  );
}
