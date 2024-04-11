"use client";

import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status == "unauthenticated") {
      toast({
        title: "Please login to continue !!",
      });
      router.push("/login");
    }
  }, [session.status]);

  return <div>dashboard page</div>;
}
