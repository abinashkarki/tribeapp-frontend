'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '@/hooks/useAuth'
import { ArrowLeft, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

interface BillSplit {
  id: number;
  bill_id: number;
  user_id: number;
  amount: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Bill {
  id: number;
  title: string;
  description: string;
  total_amount: number | string;  // Changed to allow both number and string
  date: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  splits: BillSplit[];
}

export default function ViewBillDetailsPage() {
  const [bill, setBill] = useState<Bill | null>(null)
  const [userSplit, setUserSplit] = useState<BillSplit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { accessToken, userId } = useAuth()
  const params = useParams()
  const router = useRouter()
  const tribeID = params.tribeID
  const billID = params.billID

  useEffect(() => {
    if (accessToken && billID) {
      fetchBillDetailsAndSplits()
    }
  }, [billID, accessToken, userId])

  const fetchBillDetailsAndSplits = async () => {
    setIsLoading(true)
    try {
      const billResponse = await fetch(`http://127.0.0.1:8000/bills/bills/${billID}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })

      if (!billResponse.ok) {
        const errorText = await billResponse.text()
        console.error('Bill response error:', billResponse.status, errorText)
        throw new Error(`Failed to fetch bill details: ${billResponse.status} ${errorText}`)
      }

      const billData: Bill = await billResponse.json()

      // Handle image URL
      if (billData.image_url && !billData.image_url.startsWith('http')) {
        billData.image_url = `http://127.0.0.1:8000${billData.image_url}`;
      }

      const splitsResponse = await fetch(`http://127.0.0.1:8000/bills/bills/${billID}/splits`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })

      if (!splitsResponse.ok) {
        throw new Error('Failed to fetch bill splits')
      }

      const splitsData: BillSplit[] = await splitsResponse.json()
      billData.splits = splitsData

      setBill(billData)
      const userSplitData = splitsData.find(split => split.user_id === Number(userId))
      setUserSplit(userSplitData || null)
    } catch (error) {
      console.error('Error fetching bill details and splits:', error)
      toast({
        title: "Error",
        description: "Failed to load bill details. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatAmount = (amount: any): string => {
    if (typeof amount === 'number') {
      return amount.toFixed(2);
    } else if (typeof amount === 'string') {
      const parsedAmount = parseFloat(amount);
      return isNaN(parsedAmount) ? 'Invalid Amount' : parsedAmount.toFixed(2);
    } else {
      return 'Invalid Amount';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!bill) {
    return <div>No bill found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" className="mr-4" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Bill Details</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>{bill.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p>{bill.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Total Amount</h3>
              <p>${formatAmount(bill.total_amount)}</p>
            </div>
            <div>
              <h3 className="font-semibold">Date</h3>
              <p>{new Date(bill.date).toLocaleDateString()}</p>
            </div>
            {bill.image_url && (
              <div>
                <h3 className="font-semibold">Bill Image</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      <Image
                        src={bill.image_url}
                        alt="Bill"
                        width={300}
                        height={300}
                        className="object-cover rounded-md"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <Image
                      src={bill.image_url}
                      alt="Bill"
                      width={800}
                      height={800}
                      className="object-contain"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            )}
            
            {userSplit && (
              <div>
                <h3 className="font-semibold">Your Share</h3>
                <p>${formatAmount(userSplit.amount)}</p>
                <h3 className="font-semibold mt-2">Status</h3>
                <p className={userSplit.status === 'PENDING' ? 'text-yellow-500' : 'text-green-500'}>
                  {userSplit.status}
                </p>
              </div>
            )}

            {userSplit && userSplit.status === 'PENDING' && (
              <Button 
                onClick={() => router.push(`/payments/confirmation/${userSplit.id}`)}
                className="w-full"
              >
                Make Payment
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}