'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '@/hooks/useAuth'
import axiosInstance from '@/lib/axios'
import axios, { AxiosError } from 'axios'

interface BillData {
  id: number;
  title: string;
  total_amount: string;
  date: string;
}

interface TribeMember {
  id: number;
  username: string;
}

type SplitMethod = 'manual' | 'equal' | 'percentage' | 'share'

export default function BillSplitterPage({ params }: { params: { tribeID: string; billID: string } }) {
  const router = useRouter()
  const [billData, setBillData] = useState<BillData | null>(null)
  const [tribeMembers, setTribeMembers] = useState<TribeMember[]>([])
  const [splitMethod, setSplitMethod] = useState<SplitMethod>('equal')
  const [splits, setSplits] = useState<{ memberId: number; amount: number; percentage: number; shares: number }[]>([])
  const { toast } = useToast()
  const { accessToken, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      console.log('Fetching data...')
      fetchData()
    } else {
      console.log('Not authenticated or no access token')
      setIsLoading(false)
    }
  }, [isAuthenticated, accessToken, params.tribeID, params.billID])

  const fetchData = async () => {
    try {
      const [billResponse, membersResponse] = await Promise.all([
        axiosInstance.get(`/bills/bills/${params.billID}`),
        axiosInstance.get(`/tribes/tribes/${params.tribeID}/members`)
      ])

      console.log('Bill data:', billResponse.data)
      console.log('Tribe members:', membersResponse.data)

      setBillData(billResponse.data)
      setTribeMembers(membersResponse.data)
      
      const initialSplits = membersResponse.data.map((member: TribeMember) => ({
        memberId: member.id,
        amount: 0,
        percentage: 0,
        shares: 1
      }))
      
      console.log('Initial splits before setting state:', initialSplits)
      
      setSplits(initialSplits)

      console.log('Initial splits after setting state:', splits)
    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: "Failed to load bill details or tribe members. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateSplit = (index: number, field: 'amount' | 'percentage' | 'shares', value: number) => {
    console.log('Updating split:', { index, field, value, currentSplit: splits[index] }); // Debug log
    setSplits(prevSplits => {
      const newSplits = [...prevSplits]
      newSplits[index][field] = value
      return newSplits
    })
  }

  const calculateSplits = () => {
    if (!billData) return splits

    const totalAmount = parseFloat(billData.total_amount)
    
    console.log('Splits before calculation:', splits); // Debug log

    let calculatedSplits;
    switch (splitMethod) {
      case 'equal':
        const equalAmount = totalAmount / tribeMembers.length
        calculatedSplits = splits.map(split => ({ ...split, amount: equalAmount }))
        break;
      case 'percentage':
        calculatedSplits = splits.map(split => ({
          ...split,
          amount: (totalAmount * split.percentage) / 100
        }))
        break;
      case 'share':
        const totalShares = splits.reduce((sum, split) => sum + split.shares, 0)
        calculatedSplits = splits.map(split => ({
          ...split,
          amount: (totalAmount * split.shares) / totalShares
        }))
        break;
      default:
        calculatedSplits = splits;
    }

    console.log('Splits after calculation:', calculatedSplits); // Debug log
    return calculatedSplits;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    console.log('Splits before final calculation:', splits); // Debug log
    const calculatedSplits = calculateSplits()
    
    try {
      console.log('Calculated splits:', calculatedSplits) // Debug log

      // Log each split to see why they might be filtered out
      calculatedSplits.forEach((split, index) => {
        console.log(`Split ${index}:`, split)
        console.log(`  memberId defined:`, split.memberId !== undefined)
        console.log(`  amount valid:`, !isNaN(parseFloat(split.amount.toFixed(2))))
      })

      const requests = calculatedSplits
        .filter(split => {
          const isValid = split.memberId !== undefined && !isNaN(parseFloat(split.amount.toFixed(2)))
          if (!isValid) {
            console.log(`Filtered out split:`, split)
          }
          return isValid
        })
        .map(split => ({
          bill_id: parseInt(params.billID),
          user_id: split.memberId,
          amount: parseFloat(split.amount.toFixed(2))
        }))

      console.log('Requests to be sent:', requests) // Debug log

      if (requests.length === 0) {
        throw new Error('No valid splits to send')
      }

      console.log('Sending requests to API...') // Debug log
      const responses = await Promise.all(requests.map(request => {
        console.log('Sending request:', {
          url: '/bills/bill-splits/',
          method: 'POST',
          data: request,
          headers: axiosInstance.defaults.headers
        })
        return axiosInstance.post('/bills/bill-splits/', request)
      }))

      console.log('API responses:', responses.map(r => ({
        status: r.status,
        statusText: r.statusText,
        data: r.data
      }))) // Debug log

      toast({
        title: "Success",
        description: "Bill splits have been saved successfully.",
      })
      router.push(`/tribe/${params.tribeID}/leader-manage-bills`)
    } catch (error: unknown) {
      console.error('Error saving bill splits:', error)
      
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data)
        console.error('Error status:', error.response?.status)
        console.error('Request config:', error.config) // Log the full request config
        toast({
          title: "Error",
          description: error.response?.data?.detail || "Failed to save bill splits. Please check the console for more details.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!billData || tribeMembers.length === 0) {
    return <div>No data available</div>
  }

  return (
    <div className="container mx-auto py-6">
      <header className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bill
        </Button>
        <h1 className="text-2xl font-bold flex-grow text-center">Split Bill</h1>
        <div className="w-[100px]"></div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{billData.title} - ${parseFloat(billData.total_amount).toFixed(2)}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label>Split Method</Label>
              <RadioGroup 
                value={splitMethod} 
                onValueChange={(value: string) => setSplitMethod(value as SplitMethod)}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manual" id="manual" />
                  <Label htmlFor="manual">Manual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="equal" id="equal" />
                  <Label htmlFor="equal">Equal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="percentage" />
                  <Label htmlFor="percentage">Percentage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="share" id="share" />
                  <Label htmlFor="share">Share</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              {tribeMembers.map((member, index) => (
                <div key={`${member.id}-${index}`} className="flex items-center space-x-4">
                  <Label className="w-24">{member.username}</Label>
                  {splitMethod === 'manual' && (
                    <Input
                      type="number"
                      value={splits[index].amount}
                      onChange={(e) => updateSplit(index, 'amount', parseFloat(e.target.value))}
                      placeholder="Amount"
                    />
                  )}
                  {splitMethod === 'percentage' && (
                    <Input
                      type="number"
                      value={splits[index].percentage}
                      onChange={(e) => updateSplit(index, 'percentage', parseFloat(e.target.value))}
                      placeholder="Percentage"
                    />
                  )}
                  {splitMethod === 'share' && (
                    <Input
                      type="number"
                      value={splits[index].shares}
                      onChange={(e) => updateSplit(index, 'shares', parseInt(e.target.value))}
                      placeholder="Shares"
                    />
                  )}
                  {(splitMethod === 'equal' || splitMethod === 'percentage' || splitMethod === 'share') && (
                    <div className="w-24">
                      ${calculateSplits()[index].amount.toFixed(2)}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="text-lg font-semibold">
                Total: ${calculateSplits().reduce((sum, split) => sum + split.amount, 0).toFixed(2)}
              </div>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Split'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
