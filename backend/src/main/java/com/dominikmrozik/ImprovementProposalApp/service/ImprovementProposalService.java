package com.dominikmrozik.ImprovementProposalApp.service;

import com.dominikmrozik.ImprovementProposalApp.entity.ImprovementProposal;
import com.dominikmrozik.ImprovementProposalApp.entity.User;
import com.dominikmrozik.ImprovementProposalApp.repository.ImprovementProposalRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class ImprovementProposalService {

    private final ImprovementProposalRepository improvementProposalRepository;

    public ImprovementProposalService(ImprovementProposalRepository improvementProposalRepository) {
        this.improvementProposalRepository = improvementProposalRepository;
    }

    public ImprovementProposal createNewImprovementProposal(User user) {
        ImprovementProposal improvementProposal = new ImprovementProposal();
        improvementProposal.setStatus("Pending");
        improvementProposal.setAssignedTo(user);
        return improvementProposalRepository.save(improvementProposal);
    }

    public Set<ImprovementProposal> findImprovementProposalsByUserId(Long userId) {
        return improvementProposalRepository.findImprovementProposalsByAssignedTo_Id(userId);
    }

    public Optional<ImprovementProposal> getImprovementProposalById(Long id) {
        return improvementProposalRepository.findById(id);
    }
}
