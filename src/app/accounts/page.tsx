import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Konta</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Dodaj konto
        </Button>
      </div>
      
      <p className="text-muted-foreground">
        Zarządzaj swoimi kontami w mediach społecznościowych
      </p>
      
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Połącz konto Facebook</CardTitle>
            <CardDescription>
              Dodaj konto Facebook, aby automatycznie publikować posty
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Połączenie konta Facebook pozwala na publikowanie postów w grupach i na stronach.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Połącz z Facebook
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}