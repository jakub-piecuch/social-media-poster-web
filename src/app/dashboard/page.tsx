import { PageHeader } from "@/components/PageHeader"
import { Section } from "@/components/layout/Section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"
import { getTheme } from "@/lib/theme-config"
import { Layout } from "@/modules/layout/Layout"


export default function Dashboard() {
  const theme = getTheme('green')

  return (
    <Layout>
      <div className="p-6 sm:p-6 space-y-6">
        <PageHeader
          title="Dashboard"
          actions={
            <>
              <Button
                variant="lightGray"
                size="sm"
                className={`whitespace-nowrap ${theme.colors.light}`}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button
                size="sm"
                className={`whitespace-nowrap ${theme.colors.primary} ${theme.colors.text} ${theme.colors.hover}`}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Report
              </Button>
            </>
          }
        />

        <Section className="py-6" containerSize="full">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Example stat cards */}
            <Card className="animate-fade-in animation-delay-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-muted-foreground">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in animation-delay-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-muted-foreground">
                  Deals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in animation-delay-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-muted-foreground">
                  Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="animate-fade-in animation-delay-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-muted-foreground">
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </Section>
      </div>
    </Layout>
  )
}