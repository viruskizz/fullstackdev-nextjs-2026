'use client'

import Image from "next/image";
import GithubSignInButton from '@/components/GithubSignInButton'
import { getUser } from "@/libs/authentication";
import { useEffect } from "react";

export default function Home() {
  return (
    <div>
      <div>
        <h1>Welcome to the Home Page</h1>
        <Image
          src="/images/cover.png"
          alt="Next.js Logo"
          width={3840}
          height="2160"
          priority
        />
      </div>
      <GithubSignInButton/>
    </div>
  );
}
