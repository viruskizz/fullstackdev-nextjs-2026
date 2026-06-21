"use server"
import Image from "next/image";
import Card from "@/components/Card"
import Button from "@/components/Button"
import Link from "next/link";
import supabase from "@/libs/supabase";

export default async function Home() {
  let artists = []
  await supabase.from('artists').select('*').then(({data}) => {
    artists = [...data];
  });
  return (
    <div>
      <h2>Artist</h2>
      <pre>
        {JSON.stringify(artists, null, 2)}
      </pre>
    </div>
  );
}
