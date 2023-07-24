package com.dominikmrozik.ImprovementProposalApp.repository;

import com.dominikmrozik.ImprovementProposalApp.entity.ImprovementProposal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ImprovementProposalRepository extends JpaRepository<ImprovementProposal, Long> {
    Set<ImprovementProposal> findImprovementProposalsByAssignedTo_Id(Long userId);

}
