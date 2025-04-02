import { useParams, useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useGetAllEmployees } from "@/services/services-employee";
import DeletePerformanceReviewDialog from "./performance-delete";
import { useDeletePerformanceReview, useGetPerformanceReviewById, useUpdatePerformanceReview } from "@/services/service-performance";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeeNumber: string;
}

type PerformanceReview ={
  id: string;
  reviewDate: Date | undefined;
  rating: string;
  comments: string;
  reviewedBy: string;
  reviewStatus: string;
  employee: {
    id: number;
}
}
const UpdatePerformanceReview = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetPerformanceReviewById(id || "");
  const { mutate } = useUpdatePerformanceReview(id || "");
  const { mutate: deletePerformanceReview } = useDeletePerformanceReview()
  const { data: employees } = useGetAllEmployees();

  const [reviewDate, setReviewDate] = useState<Date | undefined>();
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [reviewedBy, setReviewedBy] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const [employeeId, setEmployeeId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setReviewDate(data.reviewDate);
      setRating(data.rating);
      setComments(data.comments);
      setReviewedBy(data.reviewedBy);
      setReviewStatus(data.reviewStatus);
      setEmployeeId(data.employee.id);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (employeeId === null) {
      toast.error("Please select an employee");
      return;
    }

    const currentPerformanceReview: PerformanceReview = {
      id: id || "",
      reviewDate,
      rating,
      comments,
      reviewedBy,
      reviewStatus,
      employee: { id: employeeId },
    };

    try {
      mutate(currentPerformanceReview, {
        onSuccess: () => {
          toast.success("Performance Review updated successfully");
          navigate("/performance-reviews");
        },
        onError: (error) => {
          console.error("Error updating performance review:", error);
          toast.error("Failed to update performance review. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  // delete attendance
  const handleDelete = () => {
    try {
      deletePerformanceReview(id || "", {
        onSuccess: () => {
          toast.success("Performance Review deleted successfully");
          navigate("/performance-reviews");
        },
        onError: (error) => {
          console.error("Error deleting performance review:", error);
          toast.error("Failed to delete performance review. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <MainLayout>
      <Headers Title="Update Attendance" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid auto-rows-min md:grid-cols-3">
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
            <DeletePerformanceReviewDialog pReviewId={id || ""} onDelete={handleDelete} aria-label="Delete Performance Review"/>
            <Link to={`/performance-reviews`}>
              <Button className="bg-gray-500 hover:bg-gray-600">Back</Button>
            </Link>
          </div>
        </form>
      </div>
    </MainLayout>  
  )
}

export default UpdatePerformanceReview