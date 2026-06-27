"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import supabase from "@/libs/supabase"
import { signInWithGithub, signOut } from "@/libs/authentication"

const routes = [{ name: "Home", href: "/" }]

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M3 20c4-8 11-8 15 0s11 8 15 0"
        stroke="#FF0000"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M3 12c4-8 11-8 15 0s11 8 15 0"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function getDisplayName(user) {
  const meta = user.user_metadata ?? {}
  return (
    meta.full_name ??
    meta.name ??
    meta.user_name ??
    meta.preferred_username ??
    user.email ??
    ""
  )
}

export default function Navbar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const displayName = user ? getDisplayName(user) : ""
  const avatarUrl = user?.user_metadata?.avatar_url

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-[#0F0F0F] px-6 py-3 text-[#AAAAAA]">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-sm font-semibold text-white">next2026</span>
        </Link>
        <ul className="flex items-center gap-1">
          {routes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:text-white"
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt={displayName}
                width={32}
                height={32}
                unoptimized
                className="rounded-full"
              />
            )}
            {displayName && (
              <span className="hidden text-sm font-medium text-white sm:inline">
                {displayName}
              </span>
            )}
            <button
              type="button"
              onClick={() => signOut()}
              className="rounded-full border border-[#3f3f3f] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#262626]"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => signInWithGithub()}
            className="rounded-full border border-[#3f3f3f] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#262626]"
          >
            Sign in with GitHub
          </button>
        )}
      </div>
    </nav>
  )
}
