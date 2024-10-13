"use client"

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, Globe, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/components/LanguageProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  const NavLink = ({ href, current, children }: { href: string; current: boolean; children: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        current ? "text-primary" : "text-muted-foreground"
      )}
    >
      {children}
    </Link>
  );

  const NavLinks = () => (
    <>
      <NavLink href="/" current={pathname === "/"}>{t('home')}</NavLink>
      <NavLink href="/post" current={pathname === "/post"}>{t('postItem')}</NavLink>
      <NavLink href="/search" current={pathname === "/search"}>{t('search')}</NavLink>
      <NavLink href="/listings" current={pathname === "/listings"}>{t('myListings')}</NavLink>
      <NavLink href="/profile" current={pathname === "/profile"}>{t('profile')}</NavLink>
    </>
  );

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">FreeStuff</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            <NavLinks />
            <LanguageSelector language={language} setLanguage={setLanguage} languages={languages} />
            <ThemeToggle theme={theme} setTheme={setTheme} />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <NavLinks />
                  <LanguageSelector language={language} setLanguage={setLanguage} languages={languages} />
                  <ThemeToggle theme={theme} setTheme={setTheme} />
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

const LanguageSelector = ({ language, setLanguage, languages }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <Globe className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Switch language</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {languages.map((lang) => (
        <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
          {lang.name}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);

const ThemeToggle = ({ theme, setTheme }) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  >
    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    <span className="sr-only">Toggle theme</span>
  </Button>
);

export default Navbar;