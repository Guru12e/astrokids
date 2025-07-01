import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ChildDetailsComponents from "@/components/ChildDetailsComponent";

export default async function ChildDetailsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/child-details`);
  }

  return <ChildDetailsComponents session={session} />;
}
