import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    employeeNumber: string;
};

type PerformanceReview ={
    id?: string;
    reviewDate?: string;
    rating:string;
    comments: string;
    reviewedBy: string;
    reviewStatus: string;
    employee: Employee | null; 
} 

interface PerformanceReviewProps {
    employees : Employee[];
    onSubmit: (performanceReview: PerformanceReview) => void;
}

const AddNewPerformanceReviewForm:React.FC<PerformanceReviewProps> = ({ employees, onSubmit }) => {
  
    const [reviewDate, setReviewDate] = useState<Date | null>(null);
    const [rating, setRating] = useState("");
    const [comments, setComments] = useState("");
    const [reviewedBy, setReviewedBy] = useState("");
    const [reviewStatus, setReviewStatus] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

    const handleEmployeeSelect = useCallback((employeeId: number) => {
        const employee = employees.find((employee) => employee.id === employeeId) || null;
        setSelectedEmployee(employee);
      }, [employees]); 

      
      const newPerformanceReview = useMemo<PerformanceReview>(
        ()=>({
            reviewDate: reviewDate ? format(reviewDate,"MM-dd-yyyy") : undefined,
            rating, comments, reviewedBy, reviewStatus,
            employee: selectedEmployee
        }),
        [reviewDate, rating, comments, reviewedBy, reviewStatus, selectedEmployee]
      );

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedEmployee) {
            toast.error("Please select an employee");
            return;
        }
        onSubmit(newPerformanceReview);
      }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid auto-rows-min md:grid-cols-2">
                <div className="grid w-full items-center gap-4 p-4">
                    <Label htmlFor="employee">Employee:</Label>
                    <Select onValueChange={(value) => handleEmployeeSelect(parseInt(value))}>
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
                    <Input type="date" id="reviewDate" value={reviewDate ? format(reviewDate, "yyyy-MM-dd") : ""}
                        onChange={(e) => {
                        const selectedDate = e.target.value ? new Date(e.target.value) : null;
                        setReviewDate(selectedDate);
                        }}
                    />
                    <Label htmlFor="comments">Comments:</Label>
                    <Textarea id="comments" placeholder="Comments" onChange={(e) => setComments(e.target.value)} maxLength={500}></Textarea>      
                </div>
                <div className="grid w-full items-center gap-4 p-4">
                    <Label htmlFor="rating">Rating:</Label>
                    <Input type="text" id="rating" placeholder="Rating" onChange={(e) => setRating(e.target.value)} />
                    <Label htmlFor="reviewedBy">Reviewed By:</Label>
                    <Input type="text" id="reviewedBy" placeholder="Reviewed By" onChange={(e) => setReviewedBy(e.target.value)} />
                    <Label htmlFor="reviewStatus">Review Status:</Label>
                    <Input type="text" id="reviewStatus" placeholder="Review Status" onChange={(e) => setReviewStatus(e.target.value)} />
                </div>
            </div>
            <div className="flex pl-4 mt-4 ">
                <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
                    Add New Performance Review
                </Button>
                <Link to={`/performance-reviews`}>
                    <Button className="bg-gray-500 hover:bg-gray-600">Back</Button>
                </Link>
            </div>
      </form>
  )
}

export default AddNewPerformanceReviewForm