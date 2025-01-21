'use client';

import { useState } from 'react';
import { Users, Settings, Shield, Activity, Menu } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@/lib/auth';
import { Menu as MenuI } from '@/lib/db/schema';
  
  
const HeaderSecundary = ({ navItems }: { navItems: MenuI[] }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);
    const { user, setUser } = useUser();
  
    // const navItems: navItemsInterface[] = [
    //   { href: '/dashboard', icon: Users, label: 'Team' },
    //   {
    //     href: '/dashboard/reports', icon: Menu, label: 'Reports', submenu: [
    //       { href: '/dashboard/reports/sales', label: 'Sales' },
    //       { href: '/dashboard/reports/expenses', label: 'Expenses' },
    //     ]
    //   },
    //   { href: '/dashboard/general', icon: Settings, label: 'General' },
    //   { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
    //   {
    //     href: '', icon: Shield, label: 'Security', submenu: [
    //       { href: '/dashboard/security/users', label: 'Users' },
    //       { href: '/dashboard/security/roles', label: 'Roles' },
    //     ]
    //   },
    // ];
  
    if (!user) return null;
  
    return (
      <header className="overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-around items-center">
          <nav className="flex items-center space-x-4">
            {navItems && navItems?.map((item) => (
              item.submenu ? (
                <DropdownMenu key={item.href + item.label} open={isMenuOpen === item.href} onOpenChange={(open) => setIsMenuOpen(open ? item.href : null)}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='link'
                    >
                      {item.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="ml-4 flex flex-col gap-1">
                    {item.submenu.map((subitem, index) => (
                      <DropdownMenuItem key={index + subitem.href + subitem.label} className="cursor-pointer">
                        <Link href={subitem.href} className="flex w-full items-center" passHref>
                          <span>{subitem.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.href} href={item.href} passHref>
                  <Button
                    variant='link'
                  >
                    {item.label}
                  </Button>
                </Link>
              )
            )
            )}
          </nav>
        </div>
      </header>
    );
  }

  export default HeaderSecundary;