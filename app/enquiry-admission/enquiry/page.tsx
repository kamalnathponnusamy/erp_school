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
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Simplified form schema for enquiry
const formSchema = z.object({
  student_name: z.string()
    .min(2, "Student name must be at least 2 characters.")
    .max(50, "Student name cannot exceed 50 characters.")
    .regex(/^[a-zA-Z\s]+$/, "Student name should only contain letters and spaces."),
  
  class_applying_for: z.string({
    required_error: "Class selection is mandatory.",
  }),
  
  contact_person: z.string()
    .min(2, "Contact person name must be at least 2 characters.")
    .max(50, "Contact person name cannot exceed 50 characters.")
    .regex(/^[a-zA-Z\s]+$/, "Contact person name should only contain letters and spaces."),
  
  contact_phone: z.string()
    .length(10, "Phone number must be exactly 10 digits.")
    .regex(/^[6-9]\d{9}$/, "Phone number should start with 6, 7, 8, or 9 and be 10 digits."),
  
  contact_email: z.string()
    .email("Please enter a valid email address.")
    .min(1, "Email address is mandatory."),
  
  purpose_of_enquiry: z.string()
    .min(10, "Purpose of enquiry must be at least 10 characters.")
    .max(200, "Purpose of enquiry cannot exceed 200 characters."),
  
  enquiry_date: z.date({
    required_error: "Enquiry date is mandatory.",
  }),
  
  status: z.enum(["new", "processing", "converted", "pending", "not_interested"], {
    required_error: "Status selection is mandatory.",
  }),
  
  notes: z.string()
    .max(300, "Notes cannot exceed 300 characters.")
    .optional(),
})

type Enquiry = {
  id: number;
  student_name: string;
  class_applying_for: string;
  contact_person: string;
  contact_phone: string;
  contact_email: string;
  purpose_of_enquiry: string;
  enquiry_date: string;
  status: 'new' | 'processing' | 'converted' | 'pending' | 'not_interested';
  notes?: string;
}

const columns: ColumnDef<Enquiry>[] = [
  {
    accessorKey: "student_name",
    header: "Student Name",
  },
  {
    accessorKey: "class_applying_for",
    header: "Class",
  },
  {
    accessorKey: "contact_person",
    header: "Contact Person",
  },
  {
    accessorKey: "contact_phone",
    header: "Phone",
  },
  {
    accessorKey: "enquiry_date",
    header: "Enquiry Date",
    cell: ({ row }) => {
      const date = row.getValue("enquiry_date")
      return date ? format(new Date(date as string), "PPP") : "N/A"
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusConfig = {
        new: { label: "New", className: "bg-blue-100 text-blue-800" },
        processing: { label: "Processing", className: "bg-yellow-100 text-yellow-800" },
        converted: { label: "Converted", className: "bg-green-100 text-green-800" },
        pending: { label: "Pending", className: "bg-orange-100 text-orange-800" },
        not_interested: { label: "Not Interested", className: "bg-red-100 text-red-800" },
      }
      const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new
      return <Badge className={config.className}>{config.label}</Badge>
    }
  },
]

function EnquiryForm({ onSubmit, isLoading }: { onSubmit: (values: z.infer<typeof formSchema>) => void; isLoading: boolean }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_name: "",
      class_applying_for: "",
      contact_person: "",
      contact_phone: "",
      contact_email: "",
      purpose_of_enquiry: "",
      status: "new",
      notes: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="student_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">* Student Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter student's full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="class_applying_for"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">* Class Applying For</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nursery">Nursery</SelectItem>
                    <SelectItem value="lkg">LKG</SelectItem>
                    <SelectItem value="ukg">UKG</SelectItem>
                    <SelectItem value="1">Class 1</SelectItem>
                    <SelectItem value="2">Class 2</SelectItem>
                    <SelectItem value="3">Class 3</SelectItem>
                    <SelectItem value="4">Class 4</SelectItem>
                    <SelectItem value="5">Class 5</SelectItem>
                    <SelectItem value="6">Class 6</SelectItem>
                    <SelectItem value="7">Class 7</SelectItem>
                    <SelectItem value="8">Class 8</SelectItem>
                    <SelectItem value="9">Class 9</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                    <SelectItem value="11">Class 11</SelectItem>
                    <SelectItem value="12">Class 12</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contact_person"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">* Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact person's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contact_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">* Contact Phone</FormLabel>
                <FormControl>
                  <Input placeholder="10-digit mobile number" maxLength={10} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contact_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">* Contact Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="enquiry_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-red-600">* Enquiry Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-red-600">* Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="not_interested">Not Interested</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="purpose_of_enquiry"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-red-600">* Purpose of Enquiry</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the purpose of enquiry (e.g., seeking admission, information about fees, curriculum, etc.)"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter any additional notes or follow-up actions"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex items-center justify-center">
          <Button type="submit" disabled={isLoading} className="px-8 py-2">
            {isLoading ? "Submitting..." : "Submit Enquiry"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

function EnquiriesTable({ columns, data }: { columns: ColumnDef<Enquiry>[]; data: Enquiry[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default function EnquiryPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function fetchEnquiries() {
    try {
      const response = await fetch("/api/enquiries")
      if (!response.ok) {
        throw new Error("Failed to fetch enquiries")
      }
      const data = await response.json()
      setEnquiries(data)
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to fetch enquiries.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchEnquiries()
  }, [])

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to submit enquiry")
      }
      
      toast({
        title: "Success",
        description: "Enquiry submitted successfully.",
      })
      fetchEnquiries() // Refresh the table
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to submit enquiry.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Student Enquiry</h1>
      <div className="mb-8 p-6 border rounded-lg shadow-sm bg-card">
        <h2 className="text-2xl font-semibold mb-4">Add New Enquiry</h2>
        <EnquiryForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Enquiries</h2>
        <EnquiriesTable columns={columns} data={enquiries} />
      </div>
    </div>
  )
} 