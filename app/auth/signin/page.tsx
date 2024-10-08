'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '@/hooks/useAuth'  // Add this import

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()  // Add this line to use the login function from useAuth

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log('Attempting to sign in with email:', email)
      const response = await fetch('http://127.0.0.1:8000/users/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      })

      console.log('Response status:', response.status)
      const responseData = await response.json()
      console.log('Response data:', responseData)

      if (response.ok) {
        if (responseData.access_token && responseData.refresh_token) {
          console.log('Login successful, tokens received')
          login({
            accessToken: responseData.access_token,
            refreshToken: responseData.refresh_token,
          }, responseData.user_id ? responseData.user_id.toString() : '')
          router.push('/dashboard')
        } else {
          console.error('Login response is missing expected tokens:', responseData)
          toast({
            title: "Login failed",
            description: "The server response was invalid. Please try again.",
            variant: "destructive",
          })
        }
      } else {
        console.error('Login failed with status:', response.status, 'Response:', responseData)
        toast({
          title: "Login failed",
          description: responseData.detail || "Please check your credentials and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign In to TribeApp</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
        <Separator />
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            Sign in with Google
          </Button>
          <Button variant="outline" className="w-full">
            Sign in with Apple
          </Button>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="font-medium underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}