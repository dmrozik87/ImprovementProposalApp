package com.dominikmrozik.ImprovementProposalApp.repository;

import com.dominikmrozik.ImprovementProposalApp.entity.ImprovementProposal;
import com.dominikmrozik.ImprovementProposalApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ImprovementProposalRepository extends JpaRepository<ImprovementProposal, Long> {
    Set<ImprovementProposal> findImprovementProposalsByUserIdOrderById(Long userId);

    Set<ImprovementProposal> findImprovementProposalsByStatusEqualsOrReviewer(String status, User reviewer);

}
