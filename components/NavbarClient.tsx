"use client"

import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Session } from "next-auth"

const NavbarClient = ({ session }: { session: Session | null }) => {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="w-full fixed backdrop-blur-lg top-0 left-0 px-4 md:px-16 py-4 border-b flex items-center justify-between">
      <div className="font-bold">SecretNote</div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="text-black block dark:hidden" />
          <Moon className="text-white hidden dark:block" />
        </Button>
        {session?.user ? (
          <Button onClick={() => signOut()} className="cursor-pointer">
            Logout
          </Button>
        ) : (
          <Button className="cursor-pointer">
            <Link href='/login'>Login</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}

export default NavbarClient
