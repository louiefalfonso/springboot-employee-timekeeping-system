package eth.system.springboot.service;

import eth.system.springboot.dto.PerformanceReviewDto;

import java.util.List;

public interface PerformanceReviewService {

    PerformanceReviewDto createNewPerformanceReview (PerformanceReviewDto performanceReviewDto);

    PerformanceReviewDto getPerformanceReviewById(Long pReviewId);

    List<PerformanceReviewDto> getAllPerformanceReviews();

    PerformanceReviewDto updatePerformanceReview(Long pReviewId, PerformanceReviewDto updatePerformanceReview);

    void deletePerformanceReview(Long pReviewId);
}
