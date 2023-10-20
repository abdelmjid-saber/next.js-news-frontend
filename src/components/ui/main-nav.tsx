'use client'

import Link from "next/link"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    const pathname = usePathname();

    const items = [
        { name: 'Blog', slug: "/blog" },
        { name: 'Tutorials', slug: "/category/tutorials" },
        { name: 'Packages', slug: "/category/packages" },
    ];

    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            {items.map(({ name, slug }, index) => (
                <Link
                    key={index}
                    href={slug}
                    className={pathname == slug ? "text-sm font-medium transition-colors hover:text-primary" : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"}>
                    {name}
                </Link>
            ))}
        </nav>
    )
}