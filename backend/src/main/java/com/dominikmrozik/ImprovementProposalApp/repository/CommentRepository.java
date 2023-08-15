package com.dominikmrozik.ImprovementProposalApp.repository;

import com.dominikmrozik.ImprovementProposalApp.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
