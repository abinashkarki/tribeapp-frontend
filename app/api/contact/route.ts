import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(254),
  subject: z.string().min(1, "Please select a subject").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  phone: z.string().max(20).optional(),
});

const subjects = [
  { value: "general", label: "General Inquiry" },
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" },
  { value: "business", label: "Business Partnership" },
  { value: "support", label: "Technical Support" },
];

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || 'unknown';
  return `contact_${ip}`;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(key);

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit (5 requests per 15 minutes)
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + 15 * 60 * 1000, // 15 minutes
    });
    return false;
  }

  if (limit.count >= 5) {
    return true;
  }

  limit.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Check if contact form is enabled
    if (process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED !== 'true') {
      return NextResponse.json(
        { success: false, message: 'Contact form is currently disabled' },
        { status: 503 }
      );
    }

    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Validate subject
    const subjectLabel = subjects.find(s => s.value === validatedData.subject)?.label;
    if (!subjectLabel) {
      return NextResponse.json(
        { success: false, message: 'Invalid subject selected' },
        { status: 400 }
      );
    }

    // Prepare form data for Web3Forms
    const formData = new FormData();
    formData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY || "");
    formData.append("name", validatedData.name);
    formData.append("email", validatedData.email);
    formData.append("subject", `TribeBills Contact: ${subjectLabel}`);
    formData.append("message", validatedData.message);
    if (validatedData.phone) {
      formData.append("phone", validatedData.phone);
    }
    
    // Add metadata
    formData.append("from_name", "TribeBills Contact Form");
    formData.append("replyto", validatedData.email);
    formData.append("_template", "table"); // Use table template for better formatting

    // Submit to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!"
      });
    } else {
      console.error('Web3Forms error:', result);
      return NextResponse.json(
        { success: false, message: result.message || "Failed to send message" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid form data",
          errors: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}
