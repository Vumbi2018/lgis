import { Bell, Search, Menu, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_USERS } from "@/lib/mock-data";
import { useLocation } from "wouter";

export function Header() {
  const user = MOCK_USERS[0];
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    setLocation("/");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex flex-col md:flex-row md:items-center text-sm">
          <span className="font-bold text-foreground text-lg tracking-tight">National Capital District Commission</span>
          <span className="hidden md:inline mx-2 text-muted-foreground">|</span>
          <span className="text-xs md:text-sm text-muted-foreground flex items-center">
             <MapPin className="h-3 w-3 mr-1 text-red-600" />
             Port Moresby, Papua New Guinea
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden w-64 sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search NCDC records..."
            className="w-full bg-secondary/20 pl-9 md:w-[300px] border-none focus-visible:ring-1 focus-visible:ring-yellow-500"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative hover:bg-yellow-50">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600 border border-white" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-black text-white hover:bg-black/80 ring-2 ring-offset-2 ring-transparent focus:ring-yellow-500">
               <span className="font-bold text-xs">{user.avatar}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Officer Profile</DropdownMenuItem>
            <DropdownMenuItem>NCDC Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={handleLogout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
