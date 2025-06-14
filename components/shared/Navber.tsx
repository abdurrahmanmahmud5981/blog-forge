"use client"
import { LucideProps, PlusCircleIcon, } from "lucide-react";

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
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react";
import { ModeSwitch } from "../layout/mode-switch";
import { MenuItem, NavbarProps } from "@/types";




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

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'testimonials') {
      const testimonialSection = document.querySelector('.animate-marquee');
      if (testimonialSection) {
        const yOffset = -100; // Offset to account for the fixed header
        const y = testimonialSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (sectionId === 'cta') {
      const ctaSection = document.querySelector('.button-gradient');
      if (ctaSection) {
        const yOffset = -100;
        const y = ctaSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { name: "Features", href: "#features", onClick: () => scrollToSection('features') },
    { name: "Prices", href: "#pricing", onClick: () => scrollToSection('pricing') },
    { name: "Testimonials", href: "#testimonials", onClick: () => scrollToSection('testimonials') },
  ];


  return (
    <header
      className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${isScrolled
        ? "h-14 bg-background backdrop-blur-xl border border-white/10 scale-95 w-[90%] max-w-2xl"
        : "h-14 bg-background  w-[95%] max-w-3xl"
        }`}
    >
      <div className="mx-auto h-full px-6">
        <nav className="flex items-center justify-between h-full">
          <div className="flex items-center gap-6">

            <Link href={logo.url} className="flex items-center gap-2 ">
              <span>{logo.icon && <logo.icon />}</span>
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>

          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 ">

            <SignedIn>
              {menu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}

                >
                  {item.title}
                </Link>
              ))}
              <Button variant={"secondary"} className="flex items-center justify-center gap-1 cursor-pointer rounded-3xl">
                <PlusCircleIcon />
                <span>Create</span>
              </Button>
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

          {/* Mobile Navigation */}
          <div className="block md:hidden">
            <div className="flex items-center justify-between gap-2">

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
              <Sheet>
                <SheetTrigger asChild className="cursor-pointer">
                  <Button variant="outline" size="icon">
                    <Icons.menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>

                      <ModeSwitch />

                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <SignedIn>

                      {menu.map((item) => (
                        <Link
                          key={item.title}
                          href={item.url}

                        >
                          {item.title}
                        </Link>
                      ))}
                      <Button variant={"outline"} className="flex items-center justify-center gap-1 cursor-pointer rounded-3xl bg-background">
                        <PlusCircleIcon />
                        <span>Create</span>
                      </Button>


                    </SignedIn>

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
        </nav>
      </div>
    </header>
  );
};




export default Navbar;

