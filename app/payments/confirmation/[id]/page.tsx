'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '@/hooks/useAuth'
import { ArrowLeft, Upload, CheckCircle, Clock, HelpCircle, AlertCircle, Loader2 } from 'lucide-react'
import axios from 'axios'
import axiosInstance from '@/lib/axios'
import { withAuth } from '@/components/ProtectedRoute'

interface BillSplit {
  id: number;
  bill_id: number;
  user_id: number;
  amount: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PaymentDetails {
  recipient: string | null;
  payment_amount: number;
  image_url: string | null;
}

interface PaymentHistory {
  id: number;
  bill_split_id: number;
  amount: string;
  payment_date: string;
  proof_image_url: string;
  status: string;
  verified_by: number | null;
  created_at: string;
  updated_at: string;
}

interface ErrorDetail {
    msg: string;
    // Add other potential fields that might exist in the error detail
    loc?: string[];
    type?: string;
  }

function PaymentConfirmationPage() {
  const [userSplit, setUserSplit] = useState<BillSplit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { accessToken, userId } = useAuth()
  const params = useParams()
  const router = useRouter()
  const billId = params.id  // This is now correctly the bill ID
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [confirmationError, setConfirmationError] = useState<string | null>(null)
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([])

  const fetchUserSplit = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(`/bills/bills/${billId}/my-split`);
      const splitData: BillSplit = response.data;
      console.log('Fetching split for bill ID:', billId);
      console.log('Received split data:', splitData);
      setUserSplit(splitData)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: "Failed to load bill split details. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [billId, toast])

  const fetchPaymentHistory = useCallback(async () => {
    if (!userSplit || !accessToken) {
      console.log('fetchPaymentHistory: userSplit or accessToken is null, returning early')
      return
    }

    try {
      console.log(`Fetching payment history for bill split ID: ${userSplit.id}`)
      const response = await axiosInstance.get(`/bills/payments/${userSplit.id}/history`);
      const historyData: PaymentHistory[] = response.data;
      console.log('Received payment history:', historyData)
      setPaymentHistory(historyData)
    } catch (error) {
      console.error('Error in fetchPaymentHistory:', error)
      toast({
        title: "Error",
        description: "Failed to load payment history. Please try again later.",
        variant: "destructive",
      });
    }
  }, [userSplit, accessToken, toast])

  useEffect(() => {
    if (accessToken && userId) {
      fetchUserSplit()
    }
  }, [accessToken, userId, fetchUserSplit])

  useEffect(() => {
    if (userSplit && accessToken) {
      fetchPaymentHistory()
    }
  }, [userSplit, accessToken, fetchPaymentHistory])

  const calculatePreviousPayments = (): number => {
    console.log('Calculating previous payments from:', paymentHistory);
    const total = paymentHistory.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
    console.log('Calculated total:', total);
    return total;
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile || !userSplit) return

    setIsProcessing(true)
    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await axiosInstance.post('/api/payments/ocr/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const result = response.data;
      console.log('OCR Result:', result)

      setPaymentDetails({
        recipient: result.recipient || '',
        payment_amount: result.payment_amount || 0,
        image_url: result.image_url || null
      })

      toast({
        title: "Success",
        description: "Payment proof uploaded and processed successfully.",
      })

    } catch (error) {
      console.error('Error uploading payment proof:', error)
      toast({
        title: "Error",
        description: "Failed to upload payment proof. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleConfirmPayment = async () => {
    console.log('handleConfirmPayment function called');

    if (!paymentDetails || !userSplit) {
      console.error('Missing paymentDetails or userSplit:', { paymentDetails, userSplit });
      return;
    }

    // Validate payment details
    const isValid = validatePaymentDetails(paymentDetails, userSplit);
    console.log('Payment details validation result:', isValid);

    if (!isValid) {
      setConfirmationError('Invalid payment details. Please check the amount and try again.');
      return;
    }

    setIsProcessing(true);
    setConfirmationError(null);

    const payload = {
      bill_split_id: userSplit.id,
      amount: Number(paymentDetails.payment_amount),
      payment_date: new Date().toISOString().split('T')[0], // Today's date
      proof_image_url: paymentDetails.image_url
    };

    console.log('Preparing to send payment confirmation:');
    console.log('User Split:', userSplit);
    console.log('Payment Details:', paymentDetails);
    console.log('Payload:', payload);

    try {
      console.log('Sending POST request to /bills/payments/');
      const response = await axiosInstance.post('/bills/payments/', payload);

      console.log('Payment confirmation response:', response);

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Success",
          description: "Payment confirmed successfully. Refreshing...",
        });

        // Short delay before refreshing to ensure the toast is seen
        setTimeout(() => {
          window.location.reload();
        }, REFRESH_DELAY_MS);
      } else {
        throw new Error('Unexpected response status: ' + response.status);
      }
    } catch (error: unknown) {
      console.error('Error confirming payment:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response?.data);
        console.error('Axios error status:', error.response?.status);
        console.error('Axios error status text:', error.response?.statusText);

        if (error.response?.status === 422) {
          const errorData = error.response.data;
          let errorMessage = 'Invalid data submitted. Please check your input and try again.';
          
          if (errorData.detail && Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map((err: ErrorDetail) => err.msg).join('. ');
          }

          console.error('Validation error message:', errorMessage);
          setConfirmationError(errorMessage);
        } else {
          setConfirmationError('Failed to confirm payment. Please try again.');
        }
      } else {
        setConfirmationError('An unexpected error occurred. Please try again.');
      }

      toast({
        title: "Error",
        description: "Failed to confirm payment. Please check the details and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SETTLED":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />
    }
  }

  const REFRESH_DELAY_MS = 2000; // Constant for refresh delay

  const validatePaymentDetails = (details: PaymentDetails, split: BillSplit): boolean => {
    console.log('Validating payment details:', details, 'against split:', split);
    
    if (!details.payment_amount || typeof details.payment_amount !== 'number' || details.payment_amount <= 0) {
      console.error('Invalid payment amount:', details.payment_amount);
      return false;
    }
    
    const splitAmount = parseFloat(split.amount);
    const previousPayments = calculatePreviousPayments();
    const remainingAmount = splitAmount - previousPayments;
    
    console.log('Split amount:', splitAmount);
    console.log('Previous payments:', previousPayments);
    console.log('Remaining amount:', remainingAmount);
    console.log('Current payment amount:', details.payment_amount);
    
    if (details.payment_amount > remainingAmount) {
      console.error('Payment amount exceeds remaining amount:', details.payment_amount, '>', remainingAmount);
      return false;
    }
    
    if (!details.image_url) {
      console.error('Missing proof image URL');
      return false;
    }
    
    console.log('Payment details are valid');
    return true;
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!userSplit) {
    return <div>No split found for this user</div>
  }

  console.log('Rendering user split:', userSplit);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" className="mr-4" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Payment Confirmation</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Bill Split #{userSplit?.id}</CardTitle>
            <CardDescription>Confirm your payment for this bill</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Your Share:</span>
                <span>${userSplit ? parseFloat(userSplit.amount).toFixed(2) : 'N/A'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Previous Payments:</span>
                <span>${calculatePreviousPayments()}</span>
              </div>
              {/* Log payment history length */}
              <div className="text-sm text-gray-500">
                Payment history entries: {paymentHistory.length}
              </div>
              {userSplit && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Status:</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(userSplit.status)}
                      <span className="text-sm">{userSplit.status}</span>
                    </div>
                  </div>
                  {userSplit.status !== "SETTLED" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="file-upload">Upload Payment Proof</Label>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <HelpCircle className="h-4 w-4 mr-2" />
                              What to upload?
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Payment Proof Guidelines</DialogTitle>
                              <DialogDescription>
                                Please upload a screenshot of your payment that clearly shows:
                                <ul className="list-disc list-inside mt-2">
                                  <li>The transaction amount (${parseFloat(userSplit.amount).toFixed(2)})</li>
                                  <li>The date of the transaction</li>
                                  <li>The recipient&apos;s name or account information</li>
                                </ul>
                                Ensure all sensitive information is redacted before uploading.
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="file-upload"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileSelection}
                          className="hidden"
                          ref={fileInputRef}
                        />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isProcessing}
                          className={selectedFile ? "opacity-50" : ""}
                        >
                          Select File
                        </Button>
                        <Button
                          onClick={handleFileUpload}
                          disabled={!selectedFile || isProcessing}
                          className={selectedFile && !isProcessing ? "shadow-[0_0_10px_rgba(0,255,0,0.1)]" : ""}
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              Upload and Process
                            </>
                          )}
                        </Button>
                      </div>
                      {selectedFile && (
                        <p className="text-sm text-gray-500">
                          Selected file: {selectedFile.name}
                        </p>
                      )}
                      {paymentDetails && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="recipient">Receiver</Label>
                            <Input
                              id="recipient"
                              value={paymentDetails.recipient || ''}
                              onChange={(e) => setPaymentDetails(prev => ({ ...prev!, recipient: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="amount">Sent Amount</Label>
                            <Input
                              id="amount"
                              type="number"
                              value={paymentDetails.payment_amount || ''}
                              onChange={(e) => setPaymentDetails(prev => ({ ...prev!, payment_amount: parseFloat(e.target.value) }))}
                            />
                          </div>
                          <Button 
                            onClick={() => {
                              console.log('Confirm button clicked');
                              handleConfirmPayment();
                            }} 
                            disabled={isProcessing}
                          >
                            {isProcessing ? 'Confirming...' : 'Confirm'}
                          </Button>
                          {confirmationError && (
                            <p className="text-red-500 text-sm">{confirmationError}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default withAuth(PaymentConfirmationPage);
