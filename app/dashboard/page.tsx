'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, LogOut, Plus, UserCircle, Users, Crown } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from "@/hooks/use-toast"

interface User {
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
}

interface Tribe {
  id: number;
  name: string;
  created_by: number;
  unsettled_bills: number;
  leader?: User;
}

export default function Dashboard() {
  const [tribes, setTribes] = useState<Tribe[]>([])
  const { isAuthenticated, isLoading, logout, accessToken, userId } = useAuth()

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin')
    } else if (isAuthenticated) {
      fetchTribes()
    }
  }, [isLoading, isAuthenticated, router])

  const fetchUserDetails = async (userId: number): Promise<User> => {
    const response = await fetch(`http://127.0.0.1:8000/users/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    if (!response.ok) {
      throw new Error('Failed to fetch user details')
    }
    return await response.json()
  }

  const fetchTribes = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tribes/users/${userId}/tribes`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      if (response.ok) {
        const data: Tribe[] = await response.json()
        
        // Fetch leader details for each tribe
        const tribesWithLeaders = await Promise.all(data.map(async (tribe) => {
          try {
            const leaderDetails = await fetchUserDetails(tribe.created_by)
            return { ...tribe, leader: leaderDetails }
          } catch (error) {
            console.error(`Failed to fetch leader details for tribe ${tribe.id}:`, error)
            return tribe
          }
        }))

        setTribes(tribesWithLeaders)
      } else {
        throw new Error('Failed to fetch tribes')
      }
    } catch (error) {
      console.error('Error fetching tribes:', error)
      toast({
        title: "Error",
        description: "Failed to load tribes. Please try again later.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span className="text-xl font-bold">TribeApp</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Tribes</h1>
          <div className="space-x-4">
            <Link href="/tribe/create-join">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create or Join Tribe
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tribes.map((tribe) => (
            <Card key={tribe.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  {tribe.name}
                </CardTitle>
                {tribe.unsettled_bills > 0 && (
                  <Bell className="h-4 w-4 text-muted-foreground" />
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-muted-foreground">Tribe Leader:</span>
                  <span className={`
                    text-sm font-medium px-2 py-1 rounded-full
                    ${tribe.created_by === Number(userId) 
                      ? 'bg-amber-100 text-amber-800 flex items-center' 
                      : 'bg-gray-100 text-gray-800'}
                  `}>
                    {tribe.created_by === Number(userId) && (
                      <Crown className="w-3 h-3 mr-1 inline-block" />
                    )}
                    {tribe.leader?.username || 'Unknown'}
                  </span>
                </div>
                {tribe.unsettled_bills > 0 && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {tribe.unsettled_bills} unsettled bill{tribe.unsettled_bills > 1 ? 's' : ''}
                  </p>
                )}
                <Link href={`/tribe/${tribe.id}`}>
                  <Button className="w-full mt-2" variant="secondary">
                    View Tribe
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}