package eth.system.springboot.controller;

import eth.system.springboot.dto.PerformanceReviewDto;
import eth.system.springboot.entity.PerformanceReview;
import eth.system.springboot.repository.PerformanceReviewRepository;
import eth.system.springboot.service.PerformanceReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/performance-reviews")
public class PerformanceReviewController {

    private PerformanceReviewService performanceReviewService;
    private PerformanceReviewRepository performanceReviewRepository;

    //POST - Create New Performance Review REST API
    @PostMapping
    public ResponseEntity<PerformanceReviewDto> createNewPerformanceReview(@RequestBody PerformanceReviewDto performanceReviewDto){
        PerformanceReviewDto savedPerformanceReview = performanceReviewService.createNewPerformanceReview(performanceReviewDto);
        return new ResponseEntity<>(savedPerformanceReview, HttpStatus.CREATED);
    }

    //GET - Get Performance Review By ID REST API
    @GetMapping("{id}")
    public  ResponseEntity<PerformanceReview> getPerformanceReviewById(@PathVariable ("id") Long id){
        PerformanceReview performanceReview = performanceReviewRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Performance Review does not exist with Id:" + id));
        return ResponseEntity.ok(performanceReview);
    }

    //GET - Get All Performance Reviews REST API
    @GetMapping
    public ResponseEntity<List<PerformanceReviewDto>> getAllPerformanceReviews(){
        List<PerformanceReviewDto> performanceReviews = performanceReviewService.getAllPerformanceReviews();
        return ResponseEntity.ok(performanceReviews);
    }


    //UPDATE - Update Performance Review REST API
    @PutMapping("{id}")
    public ResponseEntity<PerformanceReview> updatePerformanceReview(@PathVariable ("id") long id,
                                                                     @RequestBody PerformanceReview pReviewDetails){
        PerformanceReview updatePerformanceReview = performanceReviewRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Performance Review does not exist with id: " + id));

        updatePerformanceReview.setReviewDate(pReviewDetails.getReviewDate());
        updatePerformanceReview.setRating(pReviewDetails.getRating());
        updatePerformanceReview.setComments(pReviewDetails.getComments());
        updatePerformanceReview.setEmployee(pReviewDetails.getEmployee());

        performanceReviewRepository.save(updatePerformanceReview);
        return ResponseEntity.ok(updatePerformanceReview);
    }

    //DELETE - Delete Performance Review REST API
    @DeleteMapping("{id}")
    public  ResponseEntity<String> deletePerformanceReview(@PathVariable ("id") Long pReviewId){
        performanceReviewService.deletePerformanceReview(pReviewId);
        return ResponseEntity.ok("Performance Review Deleted Successfully");
    }
}
