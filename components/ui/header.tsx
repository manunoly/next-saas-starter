'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HandCoinsIcon, Home, LogOut } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/lib/auth';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';


interface navItemsInterface {
    href: string;
    label: string;
    icon?: React.ElementType;
    submenu?: navItemsInterface[];
  }

  
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);
    const { user, setUser } = useUser();
    const router = useRouter();

    async function handleSignOut() {
        setUser(null);
        await signOut();
        router.push('/');
    }

    return (
        <header className="border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <span className="ml-2 text-xl font-semibold text-orange-500">X-Core</span>
                    <HandCoinsIcon className="h-6 w-6 text-orange-500" />
                </Link>
                <div className="flex items-center space-x-4">
                    <Link
                        href="/pricing"
                        className="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                        Pricing
                    </Link>
                    {user ? (
                        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                            <DropdownMenuTrigger>
                                <Avatar className="cursor-pointer size-9">
                                    <AvatarImage alt={user.name || ''} />
                                    <AvatarFallback>
                                        {user.email
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="flex flex-col gap-1">
                                <DropdownMenuItem className="cursor-pointer">
                                    <Link href="/dashboard" className="flex w-full items-center">
                                        <Home className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                    </Link>
                                </DropdownMenuItem>
                                <form action={handleSignOut} className="w-full">
                                    <button type="submit" className="flex w-full">
                                        <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    </button>
                                </form>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            asChild
                            className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
                        >
                            <Link href="/sign-in">Sign In/Up</Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;