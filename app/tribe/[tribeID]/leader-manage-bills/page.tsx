// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { useAuth } from '@/hooks/useAuth'
// import { useToast } from "@/hooks/use-toast"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
// import axiosInstance from '@/lib/axios'
// import Link from 'next/link'
// import { withAuth } from '@/components/ProtectedRoute'
// import CustomImage from '@/components/CustomImage'

// interface Bill {
//   id: number;
//   title: string;
//   total_amount: string;
//   date: string;
//   status: string;
// }

// interface PaymentHistory {
//   bill_id: number;
//   total_amount: string;
//   members: {
//     user_id: number;
//     username: string;
//     amount_owed: string;
//     payments: {
//       id: number;
//       amount: string;
//       payment_date: string;
//       proof_image_url: string | null;
//       status: string;
//       verified_by: number | null;
//     }[];
//   }[];
// }

// export default withAuth(function LeaderManageBillsPage() {
//   const [bills, setBills] = useState<Bill[]>([])
//   const [selectedBill, setSelectedBill] = useState<number | null>(null)
//   const [paymentHistory, setPaymentHistory] = useState<PaymentHistory | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [openProofs, setOpenProofs] = useState<Record<number, boolean>>({})
//   const [tribeName, setTribeName] = useState<string>("")
//   const { tribeID } = useParams()
//   const { accessToken, isAuthenticated } = useAuth()
//   const { toast } = useToast()
//   const router = useRouter()

//   const fetchTribeDetails = useCallback(async () => {
//     try {
//       const response = await axiosInstance.get(`/tribes/tribes/${tribeID}`);
//       if (response.status === 200) {
//         const data = await response.data;
//         setTribeName(data.name);
//       } else {
//         throw new Error('Failed to fetch tribe details');
//       }
//     } catch (error) {
//       console.error('Error fetching tribe details:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load tribe details. Please try again later.",
//         variant: "destructive",
//       });
//     }
//   }, [tribeID, toast]);

//   const getPresignedUrl = async (originalUrl: string): Promise<string | null> => {
//     if (!originalUrl) {
//       console.error('Original URL is null or empty');
//       return null;
//     }
//     try {
//       const response = await axiosInstance.post(`/bills/generate-presigned-url/?url=${encodeURIComponent(originalUrl)}`);
//       console.log('Presigned URL API response:', response);
//       if (response.status === 200 && response.data.presigned_url) {
//         return response.data.presigned_url;
//       } else {
//         console.error('Failed to fetch presigned URL:', response.status, response.data);
//         return null;
//       }
//     } catch (error) {
//       console.error('Error fetching presigned URL:', error);
//       return null;
//     }
//   };

//   const fetchBills = useCallback(async () => {
//     try {
//       const response = await axiosInstance.get(`/tribes/tribes/${tribeID}/bills`);
//       if (response.status === 200) {
//         const data = await response.data;
//         setBills(data);
//       } else {
//         throw new Error('Failed to fetch bills');
//       }
//     } catch (error) {
//       console.error('Error fetching bills:', error);
//       toast({
//         title: "Error",
//         description: "Failed to load bills. Please try again later.",
//         variant: "destructive",
//       });
//     }
//   }, [tribeID, toast]);

//   useEffect(() => {
//     if (isAuthenticated && accessToken) {
//       setIsLoading(false);
//       fetchTribeDetails();
//       fetchBills();
//     }
//   }, [isAuthenticated, accessToken, fetchTribeDetails, fetchBills]);

//   const fetchPaymentHistory = async (billId: number) => {
//     try {
//       console.log(`Attempting to fetch payment history for bill ${billId}`);

//       const response = await axiosInstance.get(`/bills/bills/${billId}/members-payment-history`);

//       console.log('Response status:', response.status);
//       console.log('Response headers:', Object.fromEntries(Object.entries(response.headers)));

//       if (response.status !== 200) {
//         const errorText = await response.data;
//         console.error('Error response body:', errorText);
//         throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
//       }

//       const data = await response.data;
//       console.log('Received data:', data);
//       setPaymentHistory(data);
//     } catch (error) {
//       console.error('Error in fetchPaymentHistory:', error);
//       if (error instanceof Error) {
//         console.error('Error message:', error.message);
//         console.error('Error stack:', error.stack);
//       }
//       toast({
//         title: "Error",
//         description: "Failed to load payment history. Please try again later.",
//         variant: "destructive",
//       });
//     }
//   };

//   const verifyPayment = async (paymentId: number) => {
//     try {
//       const response = await axiosInstance.post(`bills/payments/${paymentId}/verify`);
//       if (response.status === 200) {
//         toast({
//           title: "Success",
//           description: "Payment verified successfully.",
//         });
//         if (selectedBill) fetchPaymentHistory(selectedBill);
//       } else {
//         throw new Error('Failed to verify payment');
//       }
//     } catch (error) {
//       console.error('Error verifying payment:', error);
//       toast({
//         title: "Error",
//         description: "Failed to verify payment. Please try again later.",
//         variant: "destructive",
//       });
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   const handleBillSelect = (billId: number) => {
//     setSelectedBill(billId)
//     fetchPaymentHistory(billId)
//   }

//   const toggleProof = (paymentId: number) => {
//     setOpenProofs(prev => ({ ...prev, [paymentId]: !prev[paymentId] }))
//   }

//   const renderProofImage = (proofImageUrl: string | null) => {
//     const [presignedUrl, setPresignedUrl] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<boolean>(false);
//     console.log('Fetching presigned URL for:', proofImageUrl); // Log the URL for debugging

//     useEffect(() => {
//       if (proofImageUrl) {
//         setLoading(true);
//         getPresignedUrl(proofImageUrl)
//           .then((url) => {
//             if (url) {
//               setPresignedUrl(url);
//             } else {
//               setError(true);
//             }
//           })
//           .finally(() => setLoading(false));
//       }
//     }, [proofImageUrl]);

  
//     if (loading) return <div>Loading image...</div>;
//     if (error || !presignedUrl) return <div>Failed to load image</div>;
  
//     return (
//       <Dialog>
//         <DialogTrigger asChild>
//           <div className="cursor-pointer">
//             <img
//               src={presignedUrl}
//               alt="Payment Proof"
//               width={300}
//               height={300}
//               className="object-cover rounded-md"
//               loading='lazy'
//             />
//           </div>
//         </DialogTrigger>
//         <DialogContent className="max-w-3xl">
//           <img
//             src={presignedUrl}
//             alt="Payment Proof"
//             width={800}
//             height={800}
//             className="object-contain"
//           />
//         </DialogContent>
//       </Dialog>
//     );
//   };

//   function getPaymentStatusBadge(member: PaymentHistory['members'][0]) {
//     const totalPaid = member.payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
//     const amountOwed = parseFloat(member.amount_owed);
  
//     if (member.payments.length === 0) {
//       return <Badge variant="destructive">No payments yet</Badge>;
//     } else if (totalPaid < amountOwed) {
//       return <Badge variant="secondary">Partially paid</Badge>;
//     } else {
//       return <Badge variant="default">Settled</Badge>;
//     }
//   }

//   return (
//     <div className="container mx-auto py-6">
//       <header className="flex items-center justify-between mb-6">
//         <Button variant="ghost" onClick={() => router.push(`/tribe/${tribeID}`)}>
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Tribe
//         </Button>
//         <h1 className="text-2xl font-bold flex-grow text-center">{tribeName}</h1>
//         <div className="w-[100px]"></div> {/* This empty div balances the header */}
//       </header>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Bills</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Title</TableHead>
//                   <TableHead>Amount</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Status</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {bills.map((bill) => (
//                   <TableRow 
//                     key={bill.id} 
//                     onClick={() => handleBillSelect(bill.id)} 
//                     className={`cursor-pointer ${selectedBill === bill.id ? 'bg-primary/10' : ''}`}
//                   >
//                     <TableCell>{bill.title}</TableCell>
//                     <TableCell>{bill.total_amount}</TableCell>
//                     <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
//                     <TableCell>{bill.status}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex justify-between items-center">
//               <span>Payment History</span>
//               <Link href={`/tribe/${tribeID}/leader-manage-bills/set-splits/${selectedBill}`} passHref>
//                 <Button variant="outline" disabled={!selectedBill}>Manage Splits</Button>
//               </Link>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {paymentHistory ? (
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Total Amount: {paymentHistory.total_amount}</h3>
//                 {paymentHistory.members.map((member) => (
//                   <Card key={member.user_id} className="mb-4 p-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <h4 className="text-md font-semibold">{member.username}</h4>
//                       {getPaymentStatusBadge(member)}
//                     </div>
//                     <p>Amount Owed: {member.amount_owed}</p>
//                     {member.payments.length > 0 ? (
//                       member.payments.map((payment) => (
//                         <Collapsible
//                           key={payment.id}
//                           open={openProofs[payment.id]}
//                           onOpenChange={() => toggleProof(payment.id)}
//                         >
//                           <div className="mt-2 p-2 bg-secondary/10 rounded">
//                             <p>Amount: {payment.amount}</p>
//                             <p>Date: {new Date(payment.payment_date).toLocaleDateString()}</p>
//                             <p>Status: {payment.status}</p>
//                             {payment.proof_image_url && (
//                               <CollapsibleTrigger asChild>
//                                 <Button variant="outline" size="sm" className="mt-2">
//                                   {openProofs[payment.id] ? (
//                                     <>Hide Proof <ChevronUp className="h-4 w-4 ml-2" /></>
//                                   ) : (
//                                     <>View Proof <ChevronDown className="h-4 w-4 ml-2" /></>
//                                   )}
//                                 </Button>
//                               </CollapsibleTrigger>
//                             )}
//                             <CollapsibleContent>
//                               {payment.proof_image_url && renderProofImage(payment.proof_image_url)}
//                             </CollapsibleContent>
//                             {payment.status !== 'VERIFIED' && (
//                               <Button onClick={() => verifyPayment(payment.id)} className="mt-2">Verify Payment</Button>
//                             )}
//                           </div>
//                         </Collapsible>
//                       ))
//                     ) : (
//                       <p className="text-gray-500 italic">No payments made yet</p>
//                     )}
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <p>Select a bill to view payment history</p>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// })



'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import axiosInstance from '@/lib/axios'
import Link from 'next/link'
import { withAuth } from '@/components/ProtectedRoute'

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
      proof_image_url: string | null;
      status: string;
      verified_by: number | null;
    }[];
  }[];
}

const getPresignedUrl = async (originalUrl: string): Promise<string | null> => {
  if (!originalUrl) {
    console.error('Original URL is null or empty');
    return null;
  }
  try {
    const response = await axiosInstance.post(`/bills/generate-presigned-url/?url=${encodeURIComponent(originalUrl)}`);
    console.log('Presigned URL API response:', response);
    if (response.status === 200 && response.data.presigned_url) {
      return response.data.presigned_url;
    } else {
      console.error('Failed to fetch presigned URL:', response.status, response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    return null;
  }
};

function ProofImage({ proofImageUrl }: { proofImageUrl: string | null }) {
  const [presignedUrl, setPresignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (proofImageUrl) {
      setLoading(true);
      getPresignedUrl(proofImageUrl)
        .then((url) => {
          if (url) {
            setPresignedUrl(url);
          } else {
            setError(true);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [proofImageUrl]);

  if (loading) return <div>Loading image...</div>;
  if (error || !presignedUrl) return <div>Failed to load image</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <img
            src={presignedUrl}
            alt="Payment Proof"
            width={300}
            height={300}
            className="object-cover rounded-md"
            loading='lazy'
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <img
          src={presignedUrl}
          alt="Payment Proof"
          width={800}
          height={800}
          className="object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}

function LeaderManageBillsPage() {
  const [bills, setBills] = useState<Bill[]>([])
  const [selectedBill, setSelectedBill] = useState<number | null>(null)
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openProofs, setOpenProofs] = useState<Record<number, boolean>>({})
  const [tribeName, setTribeName] = useState<string>("")
  const { tribeID } = useParams()
  const { accessToken, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const fetchTribeDetails = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/tribes/tribes/${tribeID}`);
      if (response.status === 200) {
        const data = await response.data;
        setTribeName(data.name);
      } else {
        throw new Error('Failed to fetch tribe details');
      }
    } catch (error) {
      console.error('Error fetching tribe details:', error);
      toast({
        title: "Error",
        description: "Failed to load tribe details. Please try again later.",
        variant: "destructive",
      });
    }
  }, [tribeID, toast]);

  const fetchBills = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/tribes/tribes/${tribeID}/bills`);
      if (response.status === 200) {
        const data = await response.data;
        setBills(data);
      } else {
        throw new Error('Failed to fetch bills');
      }
    } catch (error) {
      console.error('Error fetching bills:', error);
      toast({
        title: "Error",
        description: "Failed to load bills. Please try again later.",
        variant: "destructive",
      });
    }
  }, [tribeID, toast]);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      setIsLoading(false);
      fetchTribeDetails();
      fetchBills();
    }
  }, [isAuthenticated, accessToken, fetchTribeDetails, fetchBills]);

  const fetchPaymentHistory = async (billId: number) => {
    try {
      console.log(`Attempting to fetch payment history for bill ${billId}`);
      const response = await axiosInstance.get(`/bills/bills/${billId}/members-payment-history`);
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(Object.entries(response.headers)));
      if (response.status !== 200) {
        const errorText = await response.data;
        console.error('Error response body:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      const data = await response.data;
      console.log('Received data:', data);
      setPaymentHistory(data);
    } catch (error) {
      console.error('Error in fetchPaymentHistory:', error);
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

  const verifyPayment = async (paymentId: number) => {
    try {
      const response = await axiosInstance.post(`bills/payments/${paymentId}/verify`);
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Payment verified successfully.",
        });
        if (selectedBill) fetchPaymentHistory(selectedBill);
      } else {
        throw new Error('Failed to verify payment');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      toast({
        title: "Error",
        description: "Failed to verify payment. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleBillSelect = (billId: number) => {
    setSelectedBill(billId)
    fetchPaymentHistory(billId)
  }

  const toggleProof = (paymentId: number) => {
    setOpenProofs(prev => ({ ...prev, [paymentId]: !prev[paymentId] }))
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <header className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => router.push(`/tribe/${tribeID}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tribe
        </Button>
        <h1 className="text-2xl font-bold flex-grow text-center">{tribeName}</h1>
        <div className="w-[100px]"></div>
      </header>
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
            <CardTitle className="flex justify-between items-center">
              <span>Payment History</span>
              <Link href={`/tribe/${tribeID}/leader-manage-bills/set-splits/${selectedBill}`} passHref>
                <Button variant="outline" disabled={!selectedBill}>Manage Splits</Button>
              </Link>
            </CardTitle>
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
                              {payment.proof_image_url && <ProofImage proofImageUrl={payment.proof_image_url} />}
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

export default withAuth(LeaderManageBillsPage);