'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Settings, Plus, MoreVertical, Send, Trash2, Info } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from "@/hooks/use-toast"
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
import axiosInstance from '@/lib/axios'

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
  date: string;
  total_amount: number;
  created_by: number;
  tribe_id: number;
  created_at: string;
  updated_at: string;
  splits: BillSplit[];
}

interface Tribe {
  id: number;
  name: string;
  code: string;
  created_at: string;
  created_by: number;
  description: string;
  updated_at: string;
}

export default function TribePage() {
  const [bills, setBills] = useState<Bill[]>([])
  const [tribeName, setTribeName] = useState<string>("")
  const [activeTab, setActiveTab] = useState("bills")
  const [newMessage, setNewMessage] = useState("")
  const { isAuthenticated, isLoading, accessToken, userId } = useAuth()
  const { toast } = useToast()
  const params = useParams()
  const tribeID = params.tribeID
  const [tribe, setTribe] = useState<Tribe | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      fetchTribeDetails()
      fetchBills()
    }
  }, [isAuthenticated, isLoading, tribeID])

  const fetchTribeDetails = async () => {
    try {
      const response = await axiosInstance.get(`/tribes/tribes/${tribeID}`);
      const data: Tribe = response.data;
      setTribeName(data.name);
      setTribe(data);
    } catch (error) {
      console.error('Error fetching tribe details:', error);
      toast({
        title: "Error",
        description: "Failed to load tribe details. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const fetchBills = async () => {
    try {
      const response = await axiosInstance.get(`/tribes/tribes/${tribeID}/bills`);
      const data: Bill[] = response.data;
      const billsWithSplits = await Promise.all(data.map(async (bill) => {
        const splitsResponse = await axiosInstance.get(`/tribes/bills/${bill.id}/splits`);
        const splits: BillSplit[] = splitsResponse.data;
        return { ...bill, splits };
      }));
      // Sort bills by created_at in descending order
      const sortedBills = billsWithSplits.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setBills(sortedBills);
    } catch (error) {
      console.error('Error fetching bills:', error);
      toast({
        title: "Error",
        description: "Failed to load bills. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = () => {
    // Logic to send message would go here
    console.log("Sending message:", newMessage)
    setNewMessage("")
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(tribe?.code || '');
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Invitation code copied to clipboard.",
    });

    // Reset the copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  // Add this new function to handle navigation to bill details
  const handleViewDetails = (billId: number) => {
    router.push(`/tribe/${tribeID}/view-bill-details/${billId}`)
  }

  // New function to check if the current user is the tribe leader
  const isUserTribeLeader = () => {
    return tribe?.created_by === Number(userId);
  };

  // New function to handle navigation to the manage bills page
  const handleManageBills = () => {
    router.push(`/tribe/${tribeID}/leader-manage-bills`);
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-6">
      <header className="flex justify-between items-center mb-6">
        <Link href="/dashboard">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Tribe Settings
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tribe Settings</DialogTitle>
              <DialogDescription>Manage your tribe settings here.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Invite to Tribe</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Input 
                    value={tribe?.code || ''} 
                    readOnly 
                    className="flex-grow"
                  />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share this code with others to invite them to your tribe.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button 
                    onClick={handleCopy}
                    disabled={copied}
                    variant={copied ? "outline" : "default"}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                <Button 
                  variant="destructive" 
                  className="mt-2"
                  onClick={() => {
                    // Placeholder for delete functionality
                    toast({
                      title: "Not Implemented",
                      description: "Delete tribe functionality is not yet implemented.",
                      variant: "destructive",
                    });
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Tribe
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>
      <main>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="bills">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{tribeName ? `${tribeName} Bills` : 'Bills'}</h2>
                <div className="flex space-x-2">
                  <Link href={`/tribe/${tribeID}/upload-bill`}>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add New Bill
                    </Button>
                  </Link>
                  {isUserTribeLeader() && (
                    <Button variant="outline" onClick={handleManageBills}>
                      Manage Bills
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid gap-4">
                {bills.map((bill) => {
                  const userSplits = bill.splits ? bill.splits.filter(split => split.user_id === Number(userId)) : [];
                  const initialSplit = userSplits[0];
                  const updatedSplit = userSplits[1];
                  const currentSplit = updatedSplit || initialSplit;
                  console.log(`User splits for bill ${bill.id}:`, userSplits); // Log user splits
                  return (
                    <Card key={bill.id}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {bill.title}
                        </CardTitle>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Date Added</p>
                            <p className="text-sm text-muted-foreground">{new Date(bill.created_at).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Total Amount</p>
                            <p className="text-sm text-muted-foreground">${bill.total_amount}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Your Share</p>
                            {initialSplit ? (
                              updatedSplit ? (
                                <div>
                                  <p className="text-sm text-muted-foreground line-through">${initialSplit.amount}</p>
                                  <p className="text-sm text-muted-foreground">${updatedSplit.amount}</p>
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground">${initialSplit.amount}</p>
                              )
                            ) : (
                              <p className="text-sm text-muted-foreground">N/A</p>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">Status</p>
                            <p className={`text-sm ${initialSplit ? (initialSplit.status === 'PENDING' ? 'text-yellow-500' : 'text-green-500') : 'text-gray-500'}`}>
                              {initialSplit ? initialSplit.status : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button 
                            className="flex-1" 
                            variant="secondary"
                            onClick={() => handleViewDetails(bill.id)}
                          >
                            View Details
                          </Button>
                          {currentSplit && (
                            <Link href={`/payments/confirmation/${bill.id}`} className="flex-1">
                              <Button className="w-full" variant="default">
                                Make Payment
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="chat">
            <div className="flex flex-col h-[calc(100vh-200px)]">
              <div className="flex-grow overflow-y-auto space-y-4 mb-4">
                {/* Chat content remains unchanged */}
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}