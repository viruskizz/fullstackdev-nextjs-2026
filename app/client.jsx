"use client"
import Image from "next/image";
import Card from "@/components/Card"
import Button from "@/components/Button"
import Link from "next/link";
import supabase from "@/libs/supabase";
import { useEffect, useState } from "react";

export default function Home() {
  let [artists, setArtist] = useState()
  useEffect(()=> {
    supabase.from('artists').select('*').then(({data}) => {
      setArtist(data)
    });
  },[])
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log(process.env.ENVIRONMENT) // could use in client side
  return (
    <div>
      <h2>Artist</h2>
      <pre>
        {JSON.stringify(artists, null, 2)}
      </pre>
    </div>
  );
}
