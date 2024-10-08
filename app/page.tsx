import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to TribeApp</h1>
      <div className="space-y-4">
        <Link href="/dashboard">
          <Button className="w-full">Go to Dashboard</Button>
        </Link>
        <Link href="/auth/signin">
          <Button variant="outline" className="w-full">Sign In</Button>
        </Link>
      </div>
    </div>
  )
}