package eth.system.springboot.service.impl;

import eth.system.springboot.dto.PerformanceReviewDto;
import eth.system.springboot.entity.PerformanceReview;
import eth.system.springboot.repository.PerformanceReviewRepository;
import eth.system.springboot.service.PerformanceReviewService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PerformanceReviewServiceImpl implements PerformanceReviewService {

    private PerformanceReviewRepository performanceReviewRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Performance Review
    @Override
    public PerformanceReviewDto createNewPerformanceReview(PerformanceReviewDto performanceReviewDto) {
        PerformanceReview performanceReview = modelMapper.map(performanceReviewDto, PerformanceReview.class);
        PerformanceReview savedPerformanceReview = performanceReviewRepository.save(performanceReview);
        return modelMapper.map(savedPerformanceReview, PerformanceReviewDto.class);
    }

    // REST API - Get Performance Review By ID
    @Override
    public PerformanceReviewDto getPerformanceReviewById(Long pReviewId) {
        PerformanceReview performanceReview = performanceReviewRepository.findAllById(pReviewId)
                .orElseThrow(()-> new RuntimeException("Performance Review doesn't exist with a given Id:" + pReviewId));
        return modelMapper.map(pReviewId, PerformanceReviewDto.class);
    }


    // REST API - Get All Performance Reviews
    @Override
    public List<PerformanceReviewDto> getAllPerformanceReviews() {
       List<PerformanceReview> performanceReviews = performanceReviewRepository.findAll();
       return  performanceReviews.stream().map((performanceReview -> modelMapper.map(performanceReview, PerformanceReviewDto.class)))
               .collect(Collectors.toList());
    }

    // REST API - Update Performance Review
    @Override
    public PerformanceReviewDto updatePerformanceReview(Long pReviewId, PerformanceReviewDto updatePerformanceReview) {
       PerformanceReview performanceReview = performanceReviewRepository.findAllById(pReviewId)
               .orElseThrow(()-> new RuntimeException("Performance Review doesn't exist with a given Id:" + pReviewId));
       performanceReview.setReviewDate(updatePerformanceReview.getReviewDate());
       performanceReview.setComments(updatePerformanceReview.getComments());
       performanceReview.setRating(updatePerformanceReview.getRating());
       performanceReview.setEmployee(updatePerformanceReview.getEmployee());

       PerformanceReview updatePerformanceReviewObj = performanceReviewRepository.save(performanceReview);
       return modelMapper.map(updatePerformanceReviewObj, PerformanceReviewDto.class);
    }

    // REST API - Delete Performance Review
    @Override
    public void deletePerformanceReview(Long pReviewId) {
        PerformanceReview performanceReview = performanceReviewRepository.findAllById(pReviewId)
                .orElseThrow(()-> new RuntimeException("Performance Review doesn't exist with a given Id:" + pReviewId));
        performanceReviewRepository.deleteById(pReviewId);
    }
}
