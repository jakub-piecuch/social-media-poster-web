import { redirect } from "next/navigation";

export default function Home() {
  // Przekierowanie ze strony głównej do dashboardu
  redirect("/dashboard");
}