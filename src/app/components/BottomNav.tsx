"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, Users, Inbox, ShoppingBag, Settings as Cog } from "lucide-react";

const tabs = [
  { href: "/", icon: Play, label: "Play" },
  { href: "/agents", icon: Users, label: "Agents" },
  { href: "/inbox", icon: Inbox, label: "Inbox" },
  { href: "/shop", icon: ShoppingBag, label: "Shop" },
  { href: "/settings", icon: Cog, label: "Settings" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <ul className="flex justify-between">
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="flex flex-col items-center py-2 text-xs"
                aria-label={label}
              >
                <Icon
                  className={`h-5 w-5 ${active ? "text-pink-500" : "text-gray-400"}`}
                />
                <span className={active ? "text-pink-500" : "text-gray-400"}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
