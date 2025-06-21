"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const admissionFormSchema = z.object({
  // Student Information
  name: z.string().min(2, "Name must be at least 2 characters."),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  gender: z.enum(["Male", "Female", "Other"]),
  aadhaarNumber: z.string().length(12, "Aadhaar number must be 12 digits.").optional().or(z.literal('')),
  religion: z.string().optional(),
  community: z.string().optional(),
  motherTongue: z.string().optional(),
  nationality: z.string().optional().default("Indian"),
  bloodGroup: z.string().optional(),
  disabilityDetails: z.string().optional(),
  photo: z.any().optional(),

  // Parent/Guardian Information
  fatherName: z.string().min(2, "Father's name is required."),
  fatherOccupation: z.string().optional(),
  fatherAnnualIncome: z.coerce.number().optional(),
  fatherContactNumber: z.string().optional(),
  fatherEmail: z.string().email("Please enter a valid email address.").optional(),
  motherName: z.string().min(2, "Mother's name is required."),
  motherOccupation: z.string().optional(),
  motherAnnualIncome: z.coerce.number().optional(),
  motherContactNumber: z.string().optional(),
  guardianName: z.string().optional(),
  guardianRelationship: z.string().optional(),

  // Address Information
  permanentAddress: z.string().min(10, "Permanent address is required."),
  communicationAddress: z.string().optional(),

  // Facilities
  transportRequired: z.boolean().default(false),
  hostelRequired: z.boolean().default(false),

  // Previous Academic Information
  previousSchoolName: z.string().optional(),
  previousSchoolClass: z.string().optional(),
  transferCertificateNumber: z.string().optional(),

  // Document Uploads
  birthCertificate: z.any().optional(),
  aadhaarCard: z.any().optional(),
  communityCertificate: z.any().optional(),
  transferCertificate: z.any().optional(),
});

type AdmissionFormValues = z.infer<typeof admissionFormSchema>;

// Mock enquiry type
type Enquiry = {
  student_name: string;
  date_of_birth: string;
  gender: "Male" | "Female" | "Other";
  parent_name: string;
  parent_phone: string;
  parent_email: string;
  previous_school: string;
  address: string;
  aadhaar_number: string;
  category: string;
};

export default function StudentAdmissionPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const enquiryId = searchParams.get("enquiryId");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionFormSchema),
    defaultValues: {
      nationality: "Indian",
    },
  });

  useEffect(() => {
    if (enquiryId) {
      setIsLoading(true);
      fetch(`/api/enquiries/${enquiryId}`)
        .then((res) => res.json())
        .then((data: Enquiry) => {
          form.reset({
            name: data.student_name,
            dateOfBirth: data.date_of_birth ? new Date(data.date_of_birth) : undefined,
            gender: data.gender,
            fatherName: data.parent_name,
            fatherContactNumber: data.parent_phone,
            fatherEmail: data.parent_email,
            permanentAddress: data.address,
            aadhaarNumber: data.aadhaar_number,
            community: data.category,
            previousSchoolName: data.previous_school,
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Failed to load enquiry data.",
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [enquiryId, form, toast]);

  async function onSubmit(data: AdmissionFormValues) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, enquiryId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit admission');
      }

      toast({
        title: "Success",
        description: "Student admission completed successfully!",
      });
      // Optionally, redirect to the student list page or dashboard
      // router.push('/students');
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting the admission.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div>Loading enquiry data...</div>;
  }

  return (
    <Form {...form}>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-6 flex flex-row gap-2 w-full justify-between">
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
          <TabsTrigger value="parent">Parent/Guardian</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
                <CardDescription>Enter the student's personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="Full Name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth <span className="text-red-600">*</span></FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                          onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                          max={format(new Date(), 'yyyy-MM-dd')}
                          min="1950-01-01"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="aadhaarNumber" render={({ field }) => (
                    <FormItem><FormLabel>Aadhaar Number</FormLabel><FormControl><Input placeholder="12-digit Aadhaar Number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="religion" render={({ field }) => (
                    <FormItem><FormLabel>Religion</FormLabel><FormControl><Input placeholder="e.g., Hinduism, Islam, Christianity" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="community" render={({ field }) => (
                    <FormItem><FormLabel>Community</FormLabel><FormControl><Input placeholder="e.g., General, OBC, SC, ST" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField control={form.control} name="motherTongue" render={({ field }) => (
                    <FormItem><FormLabel>Mother Tongue</FormLabel><FormControl><Input placeholder="e.g., Tamil, English" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="nationality" render={({ field }) => (
                    <FormItem><FormLabel>Nationality</FormLabel><FormControl><Input placeholder="e.g., Indian" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="bloodGroup" render={({ field }) => (
                    <FormItem><FormLabel>Blood Group</FormLabel><FormControl><Input placeholder="e.g., O+, A-, B+" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="disabilityDetails" render={({ field }) => (
                  <FormItem><FormLabel>Disability Details (if any)</FormLabel><FormControl><Textarea placeholder="Describe any disabilities" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="parent">
            <Card>
              <CardHeader>
                <CardTitle>Parent/Guardian Information</CardTitle>
                <CardDescription>Enter the details of parents or guardians.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-md font-semibold mb-2">Father's Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="fatherName" render={({ field }) => (
                      <FormItem><FormLabel>Father's Name</FormLabel><FormControl><Input placeholder="Father's Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="fatherOccupation" render={({ field }) => (
                      <FormItem><FormLabel>Occupation</FormLabel><FormControl><Input placeholder="Father's Occupation" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="fatherAnnualIncome" render={({ field }) => (
                      <FormItem><FormLabel>Annual Income</FormLabel><FormControl><Input type="number" placeholder="e.g., 500000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="fatherContactNumber" render={({ field }) => (
                        <FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="Father's Phone Number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="fatherEmail" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="Father's Email" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-md font-semibold mb-2">Mother's Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <FormField control={form.control} name="motherName" render={({ field }) => (
                      <FormItem><FormLabel>Mother's Name</FormLabel><FormControl><Input placeholder="Mother's Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="motherOccupation" render={({ field }) => (
                      <FormItem><FormLabel>Occupation</FormLabel><FormControl><Input placeholder="Mother's Occupation" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="motherAnnualIncome" render={({ field }) => (
                      <FormItem><FormLabel>Annual Income</FormLabel><FormControl><Input type="number" placeholder="e.g., 500000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="motherContactNumber" render={({ field }) => (
                        <FormItem><FormLabel>Contact Number</FormLabel><FormControl><Input placeholder="Mother's Phone Number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>
                <Separator />
                 <div>
                  <h4 className="text-md font-semibold mb-2">Guardian's Details (if applicable)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="guardianName" render={({ field }) => (
                        <FormItem><FormLabel>Guardian's Name</FormLabel><FormControl><Input placeholder="Guardian's Name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="guardianRelationship" render={({ field }) => (
                        <FormItem><FormLabel>Relationship to Student</FormLabel><FormControl><Input placeholder="e.g., Uncle, Grandparent" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="address">
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="permanentAddress" render={({ field }) => (
                  <FormItem><FormLabel>Permanent Address</FormLabel><FormControl><Textarea placeholder="Enter permanent address" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="communicationAddress" render={({ field }) => (
                  <FormItem><FormLabel>Communication Address (if different)</FormLabel><FormControl><Textarea placeholder="Enter communication address" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="academics">
            <Card>
              <CardHeader>
                <CardTitle>Previous Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="previousSchoolName" render={({ field }) => (
                  <FormItem><FormLabel>Previous School Name</FormLabel><FormControl><Input placeholder="Name of last school attended" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="previousSchoolClass" render={({ field }) => (
                  <FormItem><FormLabel>Class Completed</FormLabel><FormControl><Input placeholder="e.g., 5th Standard" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="transferCertificateNumber" render={({ field }) => (
                  <FormItem><FormLabel>Transfer Certificate (TC) Number</FormLabel><FormControl><Input placeholder="TC Number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="facilities">
            <Card>
              <CardHeader>
                <CardTitle>Facilities</CardTitle>
                <CardDescription>Select required facilities.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField control={form.control} name="transportRequired" render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Transport</FormLabel>
                      <FormDescription>Do you require school transport facility?</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="hostelRequired" render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Hostel</FormLabel>
                      <FormDescription>Do you require hostel accommodation?</FormDescription>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Document Uploads</CardTitle>
                <CardDescription>Upload necessary documents.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="photo" render={({ field }) => (
                  <FormItem><FormLabel>Student Photo</FormLabel><FormControl><Input type="file" {...field} value={undefined} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="birthCertificate" render={({ field }) => (
                  <FormItem><FormLabel>Birth Certificate</FormLabel><FormControl><Input type="file" {...field} value={undefined} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="aadhaarCard" render={({ field }) => (
                  <FormItem><FormLabel>Aadhaar Card</FormLabel><FormControl><Input type="file" {...field} value={undefined} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="communityCertificate" render={({ field }) => (
                  <FormItem><FormLabel>Community Certificate</FormLabel><FormControl><Input type="file" {...field} value={undefined} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="transferCertificate" render={({ field }) => (
                  <FormItem><FormLabel>Transfer Certificate (TC)</FormLabel><FormControl><Input type="file" {...field} value={undefined} /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>
            <div className="flex justify-end p-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Admission'}
              </Button>
            </div>
          </TabsContent>
        </form>
      </Tabs>
    </Form>
  );
} 