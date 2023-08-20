package com.dominikmrozik.ImprovementProposalApp.controller;

import com.dominikmrozik.ImprovementProposalApp.dto.ImprovementProposalResponseDto;
import com.dominikmrozik.ImprovementProposalApp.entity.ImprovementProposal;
import com.dominikmrozik.ImprovementProposalApp.entity.User;
import com.dominikmrozik.ImprovementProposalApp.service.ImprovementProposalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/improvement-proposals")
public class ImprovementProposalController {

    private final ImprovementProposalService improvementProposalService;

    public ImprovementProposalController(ImprovementProposalService improvementProposalService) {
        this.improvementProposalService = improvementProposalService;
    }

    @PostMapping
    public ResponseEntity<?> createImproveProposal(@RequestBody User user) {
        ImprovementProposal newImprovementProposal = improvementProposalService.createNewImprovementProposal(user);
        return ResponseEntity.ok(newImprovementProposal);
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<?> getImprovementProposalsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(improvementProposalService.findImprovementProposalsByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getImprovementProposalById(@PathVariable Long id) {
        Optional<ImprovementProposal> improvementProposalOptional = improvementProposalService.getImprovementProposalById(id);
        if (improvementProposalOptional.isPresent()) {
            ImprovementProposalResponseDto improvementProposalResponseDto = new ImprovementProposalResponseDto(improvementProposalOptional.orElse(new ImprovementProposal()));
            return ResponseEntity.ok(improvementProposalResponseDto);
        } else return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateImprovementProposal(@PathVariable Long id, @RequestBody ImprovementProposal improvementProposal) {
        ImprovementProposal updatedImprovementProposal = improvementProposalService.save(improvementProposal);
        return ResponseEntity.ok(updatedImprovementProposal);
    }

    @GetMapping("/for-review/{reviewerId}")
    public ResponseEntity<?> getImprovementProposalsForReviewer(@PathVariable Long reviewerId) {
        User reviewer = new User();
        reviewer.setId(reviewerId);
        return ResponseEntity.ok(improvementProposalService.getImprovementProposalsForReviewer(reviewer));
    }
}
