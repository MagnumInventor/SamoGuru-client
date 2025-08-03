import { redirect } from "next/navigation";

export default function Home() {
  if (typeof window === "undefined") {
    redirect("/signup");
  }

  return null;
}
