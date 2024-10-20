'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Upload, X, CheckCircle, Loader2 } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from "@/hooks/use-toast"
import axiosInstance from '@/lib/axios'
import { withAuth } from '@/components/ProtectedRoute'

interface OCRResult {
  items: Array<{ name: string; price: number }>;
  tax: number;
  total: number;
  shop_name: string;
  image_url: string;
}

function BillUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const params = useParams();
  const tribeId = params.tribeID;

  console.log('Tribe ID:', tribeId); // Add this line to check the value

  console.log('Params:', params);

  const { userId, accessToken } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  console.log('Access Token:', accessToken)
  console.log('User ID:', userId)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setOcrResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsProcessing(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axiosInstance.post('/api/ocr/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result: OCRResult = response.data;
      setOcrResult(result)
      setAmount(result.total.toFixed(2))
      toast({
        title: "Success",
        description: "Bill processed successfully!",
      })
    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: "Error",
        description: `Failed to process bill: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRemove = () => {
    setFile(null)
    setOcrResult(null)
    setTitle('')
    setDescription('')
    setAmount('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit called');

    console.log('OCR Result:', ocrResult);
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Amount:', amount);
    console.log('Tribe ID:', tribeId);

    if (!ocrResult) {
      console.log('No OCR result available');
      toast({
        title: "Error",
        description: "No OCR result available. Please process the bill first.",
        variant: "destructive",
      });
      return;
    }

    if (title.trim() === '') {
      console.log('Title is missing');
    }
    if (description.trim() === '') {
      console.log('Description is missing');
    }
    if (!amount) {
      console.log('Amount is missing');
    }
    if (!tribeId) {
      console.log('Tribe ID is missing');
    }

    if (title.trim() === '' || description.trim() === '' || !amount || !tribeId) {
      console.log('Missing required fields');
      toast({
        title: "Error",
        description: "Please provide all required information for the bill.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Preparing to submit bill data');

    const billData = {
      tribe_id: parseInt(tribeId as string, 10),
      title: title.trim(),
      description: description.trim(),
      total_amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
      created_by: Number(userId),
      image_url: ocrResult?.image_url
    };

    console.log('Bill data:', billData);

    try {
      const response = await axiosInstance.post('/bills/', billData);
      console.log('Server response:', response.data);

      toast({
        title: "Success",
        description: "Bill created successfully!",
      });
      router.push(`/tribe/${tribeId}`);
    } catch (error) {
      console.error('Error creating bill:', error);
      toast({
        title: "Error",
        description: `Failed to create bill: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" className="mr-4" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Upload Bill</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Bill Upload</CardTitle>
            <CardDescription>Upload and process your bill image</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!file ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="bill-image-upload"
                    ref={fileInputRef}
                  />
                  <label htmlFor="bill-image-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Bill preview"
                    width={300}
                    height={300}
                    className="mx-auto"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0 m-2"
                    onClick={handleRemove}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {file && (
                <Button
                  onClick={handleUpload}
                  disabled={isProcessing || ocrResult !== null}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : ocrResult ? (
                    <span className="text-green-500 flex items-center">
                      <CheckCircle className="mr-2" /> Processed Successfully
                    </span>
                  ) : 'Process Bill'}
                </Button>
              )}

              {ocrResult && (
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="bill-title">Title</Label>
                    <Input
                      id="bill-title"
                      placeholder="Enter bill title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value)
                        console.log('Title updated:', e.target.value)
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bill-description">Description</Label>
                    <Textarea
                      id="bill-description"
                      placeholder="Enter bill description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value)
                        console.log('Description updated:', e.target.value)
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bill-amount">Amount</Label>
                    <Input
                      id="bill-amount"
                      type="number"
                      step="0.01"
                      placeholder="Enter bill amount"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value)
                        console.log('Amount updated:', e.target.value)
                      }}
                      className="w-full"
                    />
                  </div>
                  <form onSubmit={handleSubmit}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Bill'}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default withAuth(BillUploadPage);
