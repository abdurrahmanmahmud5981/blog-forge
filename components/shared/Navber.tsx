import {  LucideProps, } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Icons } from "../icons";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { ModeSwitch } from "../layout/mode-switch";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    url: string
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    icon: Icons.book,
    url: "/",
    title: "BlogForge",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "My Posts",
      url: "#",

    },

  ],
  auth = {
    login: { title: "Login", url: "/sign-in" },
    signup: { title: "Sign up", url: "/sign-up" },
  },
}: NavbarProps) => {
  return (
    <section className="py-4 border-b bg-background/50 backdrop-blur-md  px-2">
      <div className=" mx-auto container sticky top-0 z-40 ">
        {/* Desktop Menu */}
        <nav className="hidden justify-between md:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <span>{logo.icon && <logo.icon />}</span>
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>

          </div>
          <div className="flex gap-2">
            <div className="flex items-center">

            </div>

            <SignedIn>
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
              <ModeSwitch />
              <UserButton appearance={
                {
                  elements: {
                    avatarBox: "h-10 w-10",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "text-semibold",
                  }
                }

              }
                afterSwitchSessionUrl="/"
                afterSignOutUrl="/"
              />
            </SignedIn>

            <SignedOut >
              <ModeSwitch />
              <SignInButton >
                <Button className="cursor-pointer" variant={"outline"}>

                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>


          </div>

        </nav>


        {/* Mobile Menu */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={logo.url} className="flex items-center gap-2">
              <span>{logo.icon && <logo.icon />}</span>
            </Link>
            <ModeSwitch />
            <Sheet>
              <SheetTrigger asChild className="cursor-pointer">
                <Button variant="outline" size="icon">
                  <Icons.menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      BlogForge
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <div


                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item, i) => <Link key={i} href={item.url} >
                      <Button variant={"ghost"} className="w-full justify-start cursor-pointer">
                        {item.title}
                      </Button>
                    </Link>)}
                  </div>



                  <SignedOut >
                    <SignInButton >
                      <Button className="cursor-pointer" variant={"outline"}>

                        Sign In
                      </Button>
                    </SignInButton>
                  </SignedOut>


                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">

            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};



export default Navbar;
