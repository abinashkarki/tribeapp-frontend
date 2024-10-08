'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Upload, CheckCircle, Clock, HelpCircle, AlertCircle } from 'lucide-react'

// Sample data for pending payments
const initialPayments = [
  { id: 1, name: "Dinner at Italian Restaurant", amount: 30, dueDate: "2023-07-15", status: "Awaiting Upload" },
  { id: 2, name: "Movie Night Tickets", amount: 15, dueDate: "2023-07-20", status: "Awaiting Verification" },
  { id: 3, name: "Group Gift for Sarah", amount: 25, dueDate: "2023-07-25", status: "Verified" },
]

export default function PaymentConfirmationPage() {
  const [payments, setPayments] = useState(initialPayments)
  const { toast } = useToast()

  const handleFileUpload = (id: number, file: File) => {
    // In a real application, you would handle the file upload here
    console.log(`Uploading file for payment ${id}:`, file.name)

    // Update the payment status
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status: "Awaiting Verification" } : payment
    ))

    toast({
      title: "File uploaded successfully",
      description: "Your payment proof has been submitted for verification.",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Awaiting Verification":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href="/tribe/[id]" as="/tribe/1">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Payment Confirmation</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Pending Payments</CardTitle>
            <CardDescription>Upload payment proof for your share of the bills</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {payments.map((payment) => (
                <AccordionItem key={payment.id} value={`payment-${payment.id}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex justify-between w-full pr-4">
                      <span>{payment.name}</span>
                      <span className="font-normal text-muted-foreground">${payment.amount.toFixed(2)}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Due Date:</span>
                        <span>{payment.dueDate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Status:</span>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(payment.status)}
                          <span className="text-sm">{payment.status}</span>
                        </div>
                      </div>
                      {payment.status !== "Verified" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`file-upload-${payment.id}`}>Upload Payment Proof</Label>
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
                                      <li>The transaction amount (${payment.amount.toFixed(2)})</li>
                                      <li>The date of the transaction</li>
                                      <li>The recipient's name or account information</li>
                                    </ul>
                                    Ensure all sensitive information is redacted before uploading.
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input
                              id={`file-upload-${payment.id}`}
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileUpload(payment.id, file)
                              }}
                              className="flex-grow"
                            />
                            <Button size="sm" onClick={() => document.getElementById(`file-upload-${payment.id}`)?.click()}>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}