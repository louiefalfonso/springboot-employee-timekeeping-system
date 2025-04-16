import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { format } from "date-fns";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useGetAllEmployees } from "@/services/services-employee";
import { useDeletePerformanceReview, useGetPerformanceReviewById, useUpdatePerformanceReview } from "@/services/services-performance";
import { UpdatePerformanceReviewForm } from "./performance-update-form";

const UpdatePerformanceReview = () => {

   // get performance review ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch performance review  & employee data
  const { data, isLoading } = useGetPerformanceReviewById(id || "");
  const { mutate } = useUpdatePerformanceReview(id || "");
  const { mutate: deletePerformanceReview } = useDeletePerformanceReview()
  const { data: employees } = useGetAllEmployees();

  // performance review data
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

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  // update performance review 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (employeeId === null) {
      toast.error("Please select an employee");
      return;
    }

    const currentPerformanceReview = {
      id: id || "",
      reviewDate: reviewDate ? format(reviewDate, "MM-dd-yyyy") : undefined,
      rating,
      comments,
      reviewedBy,
      reviewStatus,
      employee: { id: employeeId },
    };

    try {
      mutate(currentPerformanceReview, {
        onSuccess: () => {
          toast.success("Performance Review Updated Successfully");
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

  // delete performance review
  const handleDelete = () => {
    try {
      deletePerformanceReview(id || "", {
        onSuccess: () => {
          toast.success("Performance Review Deleted Successfully");
          navigate("/performance-reviews");
        },
        onError: (error) => {
          console.error("Error Deleting performance Review:", error);
          toast.error("Failed to Delete Performance Review. Please try again.");
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
        <UpdatePerformanceReviewForm
        reviewDate={reviewDate}
        setReviewDate={setReviewDate}
        rating={rating}
        setRating={setRating}
        reviewStatus={reviewStatus}
        setReviewStatus={setReviewStatus}
        comments={comments}
        setComments={setComments}
        reviewedBy={reviewedBy}
        setReviewedBy={setReviewedBy}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        employees={employees}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        pReviewId= {id || ""}
        />
      </div>
    </MainLayout>  
  )
}

export default UpdatePerformanceReview