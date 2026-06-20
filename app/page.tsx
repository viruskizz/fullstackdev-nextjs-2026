import Image from "next/image";
import Card from "@/components/Card"
import Button from "@/components/Button"
import Link from "next/link";
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
      <div>
        <h2>List</h2>
        <Card
          imgUrl="/images/tidus.webp"
          title="Tidus"
          description="he main protagonist of Final Fantasy X"
        >
          <div className="card-button flex justify-end">
            <Link href="/products">
              <Button title="ZZZ"/>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
