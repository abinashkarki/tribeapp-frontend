'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Calendar, DollarSign, FileText, Loader2, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '@/hooks/useAuth'
import axiosInstance from '@/lib/axios'
import { withAuth } from '@/components/ProtectedRoute'

interface Payment {
  id: number;
  amount: string;
  payment_date: string;
  proof_image_url: string | null;
  status: string;
  verified_by: number | null;
}

interface MemberPayment {
  user_id: number;
  username: string;
  amount_owed: string;
  payments: Payment[];
}

interface Split {
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
  total_amount: string;
  date: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  user_amount: string;
  status: string;
  previous_payment: string;
  members: MemberPayment[];
  splits: Split[];
}

function ViewBillDetailsPage() {
  const [bill, setBill] = useState<Bill | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { accessToken, userId } = useAuth()
  const params = useParams()
  const router = useRouter()
  const tribeID = params.tribeID
  const billID = params.billID

  const [fullImageUrl, setFullImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (accessToken && billID) {
      fetchBillDetailsAndPaymentHistory()
    }
  }, [billID, accessToken, userId])

  const fetchBillDetailsAndPaymentHistory = async () => {
    setIsLoading(true)
    try {
      const [billResponse, paymentHistoryResponse, splitsResponse] = await Promise.all([
        axiosInstance.get(`/bills/bills/${billID}`),
        axiosInstance.get(`/bills/bills/${billID}/members-payment-history`),
        axiosInstance.get(`/tribes/bills/${billID}/splits`)
      ]);

      const billData = billResponse.data;
      const paymentHistoryData = paymentHistoryResponse.data;
      const splitsData: Split[] = splitsResponse.data;

      const userPayment = paymentHistoryData.members.find((member: MemberPayment) => member.user_id === Number(userId))
      const userSplits = splitsData.filter(split => split.user_id === Number(userId));
      const initialSplit = userSplits[0];
      const updatedSplit = userSplits.length > 1 ? userSplits[1] : null;

      const combinedBillData: Bill = {
        ...billData,
        user_amount: updatedSplit ? updatedSplit.amount : (initialSplit ? initialSplit.amount : '0'),
        status: userPayment
          ? (() => {
              const totalPaid = userPayment.payments.reduce((sum: number, payment: Payment) => sum + parseFloat(payment.amount), 0);
              const amountOwed = parseFloat(updatedSplit ? updatedSplit.amount : (initialSplit ? initialSplit.amount : '0'));
              if (totalPaid >= amountOwed) {
                return 'SETTLED';
              } else if (totalPaid > 0) {
                return 'PARTIALLY_PAID';
              } else {
                return 'PENDING';
              }
            })()
          : 'UNKNOWN',
        previous_payment: userPayment
          ? userPayment.payments.reduce((sum: number, payment: Payment) => sum + parseFloat(payment.amount), 0).toFixed(2)
          : '0',
        members: paymentHistoryData.members,
        splits: userSplits  // Store only the user's splits
      }

      setBill(combinedBillData)
      setFullImageUrl(combinedBillData.image_url ? `${process.env.NEXT_PUBLIC_API_URL}${combinedBillData.image_url}` : null)
    } catch (error) {
      console.error('Error fetching bill details and payment history:', error)
      toast({
        title: "Error",
        description: "Failed to load bill details. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatAmount = (amount: string): string => {
    const parsedAmount = parseFloat(amount)
    return isNaN(parsedAmount) ? 'Invalid Amount' : parsedAmount.toFixed(2)
  }

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

  const paymentProgress = (parseFloat(bill.previous_payment) / parseFloat(bill.user_amount)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <header className="bg-background/50 backdrop-blur-sm sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" className="mr-4" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Bill Details</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <div className="relative h-64 md:h-80 bg-primary/10">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-background/90" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h2 className="text-4xl font-bold text-foreground mb-2">{bill.title}</h2>
              <p className="text-foreground/80">{bill.description}</p>
            </div>
          </div>
          <CardContent className="p-6 pt-10 relative">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="absolute -top-8 right-6 bg-background rounded-full shadow-lg">
                  <Receipt className="h-4 w-4 mr-2" />
                  View Receipt
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Bill Receipt</DialogTitle>
                  <DialogDescription>Full image of the receipt for {bill.title}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  {fullImageUrl ? (
                    <Image
                      src={fullImageUrl}
                      alt={`Receipt for ${bill.title}`}
                      width={800}
                      height={800}
                      className="object-contain"
                    />
                  ) : (
                    <p>No receipt image available</p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <p className="text-2xl font-semibold">${formatAmount(bill.total_amount)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <p>{new Date(bill.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">Bill ID: {bill.id}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Your Share</h3>
                <div className="flex items-center justify-between">
                  {bill.splits.length > 1 ? (
                    <div>
                      <p className="text-3xl font-bold text-primary line-through">${formatAmount(bill.splits[0].amount)}</p>
                      <p className="text-3xl font-bold text-primary">${formatAmount(bill.splits[1].amount)}</p>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-primary">${formatAmount(bill.user_amount)}</p>
                  )}
                  <Badge variant={bill.status === 'PENDING' ? 'destructive' : 'default'} className="text-sm">
                    {bill.status}
                  </Badge>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">Payment Progress</p>
                    {parseFloat(bill.previous_payment) > 0 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-sm text-muted-foreground">
                              Previous Payment: ${formatAmount(bill.previous_payment)}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total payments made so far</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  <Progress value={paymentProgress} className="w-full" />
                </div>
              </div>
            </div>
            {bill.status !== 'PAID' && (
              <Button className="w-full mt-6" onClick={() => router.push(`/payments/confirmation/${bill.id}`)}>
                Settle ${formatAmount((parseFloat(bill.user_amount) - parseFloat(bill.previous_payment)).toString())}
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default withAuth(ViewBillDetailsPage);
