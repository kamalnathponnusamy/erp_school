"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowRight } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

// Types
type Enquiry = {
  id: number;
  student_name: string;
  class_applying_for: string;
  contact_person: string;
  contact_phone: string;
  purpose_of_enquiry: string;
}

type FollowUp = {
  id: number;
  follow_up_date: string;
  notes: string;
  next_follow_up_date: string | null;
  status: 'pending' | 'completed' | 'cancelled';
}

// Follow-up form schema
const followUpSchema = z.object({
  follow_up_date: z.date({ required_error: "Follow-up date is required." }),
  notes: z.string().min(10, "Notes must be at least 10 characters.").max(500, "Notes cannot exceed 500 characters."),
  next_follow_up_date: z.date().optional(),
  status: z.enum(['pending', 'completed', 'cancelled'], { required_error: "Status is required." }),
})

// Follow-up form component
function FollowUpForm({ enquiryId, onFollowUpAdded }: { enquiryId: number; onFollowUpAdded: () => void; }) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof followUpSchema>>({
    resolver: zodResolver(followUpSchema),
    defaultValues: { status: "pending", notes: "" },
  })

  async function onSubmit(values: z.infer<typeof followUpSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/follow-ups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enquiry_id: enquiryId, ...values }),
      })
      if (!response.ok) throw new Error("Failed to add follow-up")
      toast({ title: "Success", description: "Follow-up added successfully." })
      onFollowUpAdded()
      form.reset({ status: 'pending', notes: '' });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add follow-up.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="follow_up_date" render={({ field }) => (
          <FormItem><FormLabel>Follow-up Date</FormLabel><br/><Popover><PopoverTrigger asChild><FormControl>
            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
            </Button>
          </FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="notes" render={({ field }) => (
          <FormItem><FormLabel>Notes</FormLabel><FormControl><Textarea placeholder="Enter notes about the follow-up..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="next_follow_up_date" render={({ field }) => (
          <FormItem><FormLabel>Next Follow-up Date (Optional)</FormLabel><br/><Popover><PopoverTrigger asChild><FormControl>
            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
             <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
            </Button>
          </FormControl></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} /></PopoverContent></Popover><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="status" render={({ field }) => (
          <FormItem><FormLabel>Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status"/></SelectTrigger></FormControl><SelectContent>
            <SelectItem value="pending">Pending</SelectItem><SelectItem value="completed">Completed</SelectItem><SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent></Select><FormMessage /></FormItem>
        )} />
        <Button type="submit" disabled={isLoading}>{isLoading ? "Submitting..." : "Add Follow-up"}</Button>
      </form>
    </Form>
  )
}

// Main page component
export default function FollowUpPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [followUps, setFollowUps] = useState<FollowUp[]>([])
  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(true)
  const [isLoadingFollowUps, setIsLoadingFollowUps] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  async function fetchEnquiries() {
    setIsLoadingEnquiries(true)
    try {
      const response = await fetch('/api/enquiries')
      if (!response.ok) throw new Error("Failed to fetch enquiries")
      const data = await response.json()
      setEnquiries(data)
      if (data.length > 0) {
        setSelectedEnquiry(data[0])
      }
    } catch (error) {
      toast({ title: "Error", description: "Could not fetch enquiries.", variant: "destructive" })
    } finally {
      setIsLoadingEnquiries(false)
    }
  }

  async function fetchFollowUps(enquiryId: number) {
    setIsLoadingFollowUps(true)
    try {
      const response = await fetch(`/api/follow-ups?enquiry_id=${enquiryId}`)
      if (!response.ok) throw new Error("Failed to fetch follow-ups")
      setFollowUps(await response.json())
    } catch (error) {
      toast({ title: "Error", description: "Could not fetch follow-ups.", variant: "destructive" })
    } finally {
      setIsLoadingFollowUps(false)
    }
  }

  useEffect(() => {
    fetchEnquiries()
  }, [])

  useEffect(() => {
    if (selectedEnquiry) {
      fetchFollowUps(selectedEnquiry.id)
    } else {
      setFollowUps([])
    }
  }, [selectedEnquiry])

  const handleSelectEnquiry = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry)
  }

  const handleConvertToAdmission = (enquiry: Enquiry) => {
    router.push(`/enquiry-admission/student-admission?enquiryId=${enquiry.id}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Enquiries List */}
      <Card className="md:col-span-1 flex flex-col">
        <CardHeader><CardTitle>Enquiries</CardTitle></CardHeader>
        <CardContent className="flex-grow">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {isLoadingEnquiries ? <p>Loading enquiries...</p> : enquiries.map((enquiry) => (
              <div key={enquiry.id} onClick={() => handleSelectEnquiry(enquiry)} className={cn("p-3 mb-2 rounded-md cursor-pointer hover:bg-muted", selectedEnquiry?.id === enquiry.id && "bg-muted")}>
                <p className="font-semibold">{enquiry.student_name}</p>
                <p className="text-sm text-muted-foreground">Class: {enquiry.class_applying_for}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Follow-up Details */}
      <Card className="md:col-span-2 flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{selectedEnquiry ? `Follow-ups for ${selectedEnquiry.student_name}` : "Select an Enquiry"}</CardTitle>
            {selectedEnquiry && (
              <Button onClick={() => handleConvertToAdmission(selectedEnquiry)}>
                Convert to Admission <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          {selectedEnquiry ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Follow-up Form */}
              <div className="flex flex-col">
                <div className="mb-4 p-4 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{selectedEnquiry.student_name}</h3>
                  <p><strong>Contact:</strong> {selectedEnquiry.contact_person} ({selectedEnquiry.contact_phone})</p>
                  <p><strong>Purpose:</strong> {selectedEnquiry.purpose_of_enquiry}</p>
                </div>
                <Separator />
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Add New Follow-up</h4>
                  <FollowUpForm enquiryId={selectedEnquiry.id} onFollowUpAdded={() => fetchFollowUps(selectedEnquiry.id)} />
                </div>
              </div>

              {/* Follow-up History */}
              <div className="flex flex-col">
                 <h4 className="font-semibold mb-2">History</h4>
                <ScrollArea className="h-[calc(100vh-18rem)] border p-4 rounded-md">
                  {isLoadingFollowUps ? <p>Loading history...</p> : followUps.length > 0 ? followUps.map(f => (
                    <div key={f.id} className="p-3 mb-2 border rounded-md bg-background">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold">{format(new Date(f.follow_up_date), "PPP")}</p>
                        <Badge variant={f.status === 'completed' ? 'default' : f.status === 'cancelled' ? 'destructive' : 'secondary'}>{f.status}</Badge>
                      </div>
                      <p className="text-sm mt-1 text-muted-foreground">{f.notes}</p>
                      {f.next_follow_up_date && <p className="text-xs text-muted-foreground mt-2">Next follow-up: {format(new Date(f.next_follow_up_date), "PPP")}</p>}
                    </div>
                  )) : <p>No follow-ups recorded.</p>}
                </ScrollArea>
              </div>
            </div>
          ) : <p className="text-center text-muted-foreground mt-10">Select an enquiry to view details and add follow-ups.</p>}
        </CardContent>
      </Card>
    </div>
  )
} 