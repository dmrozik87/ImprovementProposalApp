package com.dominikmrozik.ImprovementProposalApp.repository;

import com.dominikmrozik.ImprovementProposalApp.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Set<Comment> findCommentByImprovementProposal_Id(Long improvementProposalId);
}
