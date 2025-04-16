import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeletePerformanceReviewDialog from "./performance-delete"

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    employeeNumber: string;
};

type PerformanceReviewFormProps = {
    reviewDate: Date | undefined;
    setReviewDate: (value: Date | undefined) => void;
    rating: string;
    setRating: (value: string) => void;
    comments: string;
    setComments: (value: string) => void;
    reviewedBy: string;
    setReviewedBy: (value: string) => void;
    reviewStatus: string;
    setReviewStatus: (value: string) => void;
    employeeId: number | null;
    setEmployeeId: (value: number | null) => void;
    employees: Employee[] | undefined;
    handleSubmit: (e: React.FormEvent) => void;
    handleDelete: () => void;
    pReviewId: string;
}

export const UpdatePerformanceReviewForm: React.FC<PerformanceReviewFormProps> = ({
    reviewDate,
    setReviewDate,
    rating,
    setRating,
    comments,
    setComments,
    reviewedBy,
    setReviewedBy,
    reviewStatus,
    setReviewStatus,
    employeeId,setEmployeeId,employees,
    handleSubmit,handleDelete,pReviewId,
}) => {
  return (
    <form onSubmit={handleSubmit}>
        <div className="grid auto-rows-min md:grid-cols-2">
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="employee">Employee:</Label>
              <Select
                value={employeeId ? employeeId.toString() : undefined}
                onValueChange={(value) => {
                  const parsedValue = parseInt(value);
                  if (!isNaN(parsedValue)) {
                    setEmployeeId(parsedValue);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees?.map((employee: Employee) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.firstName} {employee.lastName} - {employee.employeeNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label htmlFor="reviewDate">Review Date:</Label>
              <Input
                type="date"
                id="reviewDate"
                value={reviewDate ? format(reviewDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                  if (selectedDate && selectedDate > new Date()) {
                    toast.error("Date cannot be in the future.");
                    return;
                  }
                  setReviewDate(selectedDate);
                }}
              />
              <Label htmlFor="comments">Comments:</Label>
              <Textarea id="comments" value={comments} onChange={(e) => setComments(e.target.value)} maxLength={500}></Textarea>   
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="rating">Rating:</Label>
                <Input type="text" id="rating" value={rating}  onChange={(e) => setRating(e.target.value)} />
                <Label htmlFor="reviewedBy">Reviewed By:</Label>
                <Input type="text" id="reviewedBy" value={reviewedBy} onChange={(e) => setReviewedBy(e.target.value)} />
                <Label htmlFor="reviewStatus">Review Status:</Label>
                <Input type="text" id="reviewStatus" value={reviewStatus} onChange={(e) => setReviewStatus(e.target.value)} />
            </div>    
        </div>
        <div className="flex pl-4 mt-4">
            <Button type="submit" className="bg-violet-500 hover:bg-violet-600" aria-label="Update Performance Review">Update</Button>
            <DeletePerformanceReviewDialog pReviewId={pReviewId} onDelete={handleDelete} aria-label="Delete Performance Review"/>
            <Link to={`/performance-reviews`}>
              <Button className="bg-gray-500 hover:bg-gray-600">Back</Button>
            </Link>
        </div>
    </form>
  )
}
