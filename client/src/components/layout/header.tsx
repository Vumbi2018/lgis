import { Bell, Search, Menu, User, MapPin, ChevronDown } from "lucide-react";
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
import { MOCK_USERS, MOCK_COUNCILS } from "@/lib/mock-data";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function Header() {
  const user = MOCK_USERS[0];
  const [location, setLocation] = useLocation();
  const [currentCouncil, setCurrentCouncil] = useState(MOCK_COUNCILS[0]);

  const handleLogout = () => {
    setLocation("/");
  };

  const handleCouncilSwitch = (council: typeof MOCK_COUNCILS[0]) => {
    setCurrentCouncil(council);
    toast({
      title: "Organization Switched",
      description: `Active context changed to ${council.name}`,
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex flex-col">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto p-0 hover:bg-transparent font-normal flex items-center gap-2">
                <span className="font-bold text-foreground text-lg tracking-tight text-left">{currentCouncil.name}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px]">
              <DropdownMenuLabel>Switch Organization</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {MOCK_COUNCILS.map((council) => (
                <DropdownMenuItem key={council.id} onClick={() => handleCouncilSwitch(council)} className="cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">{council.name}</span>
                    <span className="text-xs text-muted-foreground">{council.district}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <span className="text-xs text-muted-foreground flex items-center mt-0.5">
             <MapPin className="h-3 w-3 mr-1 text-red-600" />
             {currentCouncil.district}, Papua New Guinea
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
