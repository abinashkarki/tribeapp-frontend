'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Copy, Users, UserPlus } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import axiosInstance from '@/lib/axios'

export default function CreateJoinTribePage() {
  const [activeTab, setActiveTab] = useState("create")
  const [tribeName, setTribeName] = useState('')
  const [tribeDescription, setTribeDescription] = useState('')
  const [tribeCode, setTribeCode] = useState('')
  const [createdTribeCode, setCreatedTribeCode] = useState('')
  const { accessToken } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleCreateTribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tribeName.trim()) {
      toast({
        title: "Error",
        description: "Tribe name is required.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await axiosInstance.post('/tribes/', {
        name: tribeName,
        description: tribeDescription,
      });

      const data = response.data;
      setCreatedTribeCode(data.code);
      toast({
        title: "Success",
        description: "Your tribe has been created successfully!",
      });

      // Reset form fields
      setTribeName('');
      setTribeDescription('');

      // Switch to the "join" tab to encourage sharing
      setActiveTab("join");

    } catch (error) {
      console.error('Error creating tribe:', error);
      toast({
        title: "Error",
        description: "Failed to create tribe. Please try again later.",
        variant: "destructive",
      });
    }
  }

  const handleJoinTribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tribeCode.trim()) {
      toast({
        title: "Error",
        description: "Tribe code is required.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await axiosInstance.post('/tribes/join', { code: tribeCode });

      if (response.status === 200) {
        const data = response.data;
        toast({
          title: "Success",
          description: `You've successfully joined the tribe: ${data.name}`,
        });

        // Redirect to the newly joined tribe's page
        router.push(`/tribe/${data.id}`);
      } else {
        throw new Error('Failed to join tribe');
      }
    } catch (error) {
      console.error('Error joining tribe:', error);
      toast({
        title: "Error",
        description: "Failed to join tribe. Please check the code and try again.",
        variant: "destructive",
      });
    }
  }

  const copyTribeCode = () => {
    navigator.clipboard.writeText(createdTribeCode)
    toast({
      title: "Copied!",
      description: "Tribe code copied to clipboard.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Create or Join a Tribe</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Manage Your Tribes</CardTitle>
            <CardDescription>Create a new tribe or join an existing one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">Create a Tribe</TabsTrigger>
                <TabsTrigger value="join">Join a Tribe</TabsTrigger>
              </TabsList>
              <TabsContent value="create">
                <form onSubmit={handleCreateTribe} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="tribe-name">Tribe Name</Label>
                    <Input
                      id="tribe-name"
                      placeholder="Enter tribe name"
                      value={tribeName}
                      onChange={(e) => setTribeName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tribe-description">Description (optional)</Label>
                    <Textarea
                      id="tribe-description"
                      placeholder="Describe your tribe"
                      value={tribeDescription}
                      onChange={(e) => setTribeDescription(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Create Tribe
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="join">
                <form onSubmit={handleJoinTribe} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="tribe-code">Tribe Code</Label>
                    <Input
                      id="tribe-code"
                      placeholder="Enter tribe code"
                      value={tribeCode}
                      onChange={(e) => setTribeCode(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Join Tribe
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {createdTribeCode && (
          <Card className="max-w-2xl mx-auto mt-6">
            <CardHeader>
              <CardTitle>Tribe Created Successfully!</CardTitle>
              <CardDescription>Share this code with others to invite them to your tribe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted rounded-md">
                <span className="text-2xl font-bold">{createdTribeCode}</span>
                <Button variant="outline" size="icon" onClick={copyTribeCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  )
}