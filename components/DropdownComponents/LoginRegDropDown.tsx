import { LogInIcon, User, ChevronDown, LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginRegDropDown({ pathname }: any) {
  const router = useRouter();

  return (
    <div className="block md:hidden mr-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <ChevronDown className="h-4 w-full" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {!(pathname == "/dashboard") ? (
              <div>
                <DropdownMenuItem>
                  <LogInIcon className="mr-2 h-4 w-4" />
                  <span onClick={() => signIn()}>Login</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span onClick={() => router.push("/register")}>Register</span>
                </DropdownMenuItem>
              </div>
            ) : (
              <div>
                <DropdownMenuItem>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span onClick={() => signOut()}>Logout</span>
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
