'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Bill {
  id: number;
  title: string;
  total_amount: string;
  date: string;
  status: string;
}

interface PaymentHistory {
  bill_id: number;
  total_amount: string;
  members: {
    user_id: number;
    username: string;
    amount_owed: string;
    payments: {
      id: number;
      amount: string;
      payment_date: string;
      proof_image_url: string;
      status: string;
      verified_by: number | null;
    }[];
  }[];
}

export default function LeaderManageBillsPage() {
  const [bills, setBills] = useState<Bill[]>([])
  const [selectedBill, setSelectedBill] = useState<number | null>(null)
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openProofs, setOpenProofs] = useState<Record<number, boolean>>({})
  const { tribeID } = useParams()
  const { accessToken, isAuthenticated } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    console.log('LeaderManageBillsPage mounted');
    console.log('tribeID:', tribeID);
    console.log('isAuthenticated:', isAuthenticated);
    console.log('accessToken available:', !!accessToken);

    if (isAuthenticated && accessToken) {
      setIsLoading(false);
      fetchBills();
    }
  }, [isAuthenticated, accessToken]);

  const fetchBills = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tribes/tribes/${tribeID}/bills`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setBills(data)
      } else {
        throw new Error('Failed to fetch bills')
      }
    } catch (error) {
      console.error('Error fetching bills:', error)
      toast({
        title: "Error",
        description: "Failed to load bills. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const fetchPaymentHistory = async (billId: number) => {
    try {
      console.log(`Attempting to fetch payment history for bill ${billId}`);
      console.log('Access Token:', accessToken);

      const response = await fetch(`http://localhost:8000/bills/bills/${billId}/members-payment-history`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      setPaymentHistory(data);
    } catch (error) {
      console.error('Error in fetchPaymentHistory:', error)
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      toast({
        title: "Error",
        description: "Failed to load payment history. Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleBillSelect = (billId: number) => {
    setSelectedBill(billId)
    fetchPaymentHistory(billId)
  }

  const verifyPayment = async (paymentId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/payments/${paymentId}/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      if (response.ok) {
        toast({
          title: "Success",
          description: "Payment verified successfully.",
        })
        if (selectedBill) fetchPaymentHistory(selectedBill)
      } else {
        throw new Error('Failed to verify payment')
      }
    } catch (error) {
      console.error('Error verifying payment:', error)
      toast({
        title: "Error",
        description: "Failed to verify payment. Please try again later.",
        variant: "destructive",
      })
    }
  }

  const toggleProof = (paymentId: number) => {
    setOpenProofs(prev => ({ ...prev, [paymentId]: !prev[paymentId] }))
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Manage Bills</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((bill) => (
                  <TableRow 
                    key={bill.id} 
                    onClick={() => handleBillSelect(bill.id)} 
                    className={`cursor-pointer ${selectedBill === bill.id ? 'bg-primary/10' : ''}`}
                  >
                    <TableCell>{bill.title}</TableCell>
                    <TableCell>{bill.total_amount}</TableCell>
                    <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                    <TableCell>{bill.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {paymentHistory ? (
              <div>
                <h3 className="text-lg font-semibold mb-2">Total Amount: {paymentHistory.total_amount}</h3>
                {paymentHistory.members.map((member) => (
                  <Card key={member.user_id} className="mb-4 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-md font-semibold">{member.username}</h4>
                      {getPaymentStatusBadge(member)}
                    </div>
                    <p>Amount Owed: {member.amount_owed}</p>
                    {member.payments.length > 0 ? (
                      member.payments.map((payment) => (
                        <Collapsible
                          key={payment.id}
                          open={openProofs[payment.id]}
                          onOpenChange={() => toggleProof(payment.id)}
                        >
                          <div className="mt-2 p-2 bg-secondary/10 rounded">
                            <p>Amount: {payment.amount}</p>
                            <p>Date: {new Date(payment.payment_date).toLocaleDateString()}</p>
                            <p>Status: {payment.status}</p>
                            {payment.proof_image_url && (
                              <CollapsibleTrigger asChild>
                                <Button variant="outline" size="sm" className="mt-2">
                                  {openProofs[payment.id] ? (
                                    <>Hide Proof <ChevronUp className="h-4 w-4 ml-2" /></>
                                  ) : (
                                    <>View Proof <ChevronDown className="h-4 w-4 ml-2" /></>
                                  )}
                                </Button>
                              </CollapsibleTrigger>
                            )}
                            <CollapsibleContent>
                              {payment.proof_image_url && (
                                <img src={payment.proof_image_url} alt="Payment Proof" className="mt-2 max-w-xs" />
                              )}
                            </CollapsibleContent>
                            {payment.status !== 'VERIFIED' && (
                              <Button onClick={() => verifyPayment(payment.id)} className="mt-2">Verify Payment</Button>
                            )}
                          </div>
                        </Collapsible>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No payments made yet</p>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <p>Select a bill to view payment history</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function getPaymentStatusBadge(member: PaymentHistory['members'][0]) {
    const totalPaid = member.payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
    const amountOwed = parseFloat(member.amount_owed);
  
    if (member.payments.length === 0) {
      return <Badge variant="destructive">No payments yet</Badge>;
    } else if (totalPaid < amountOwed) {
      return <Badge variant="secondary">Partially paid</Badge>;
    } else {
      return <Badge variant="default">Settled</Badge>;
    }
  }