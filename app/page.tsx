// No "use client" here!
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/dashboard");
}
