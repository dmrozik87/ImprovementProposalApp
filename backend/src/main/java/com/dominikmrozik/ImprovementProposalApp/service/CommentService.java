package com.dominikmrozik.ImprovementProposalApp.service;

import com.dominikmrozik.ImprovementProposalApp.entity.Comment;
import com.dominikmrozik.ImprovementProposalApp.entity.ImprovementProposal;
import com.dominikmrozik.ImprovementProposalApp.entity.User;
import com.dominikmrozik.ImprovementProposalApp.repository.CommentRepository;
import com.dominikmrozik.ImprovementProposalApp.repository.ImprovementProposalRepository;
import com.dominikmrozik.ImprovementProposalApp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ImprovementProposalRepository improvementProposalRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, ImprovementProposalRepository improvementProposalRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.improvementProposalRepository = improvementProposalRepository;
    }

    public Comment createComment(Comment comment) {
        Comment newComment = new Comment();
        User user = userRepository.findById(comment.getCreatedBy().getId()).get();
        user.setPassword("");
        newComment.setCreatedBy(user);
        ImprovementProposal improvementProposal = improvementProposalRepository.findById(comment.getImprovementProposal().getId()).get();
        newComment.setImprovementProposal(improvementProposal);
        newComment.setText(comment.getText());
        newComment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(newComment);
    }

    public Set<Comment> getCommentsByImprovementProposal(Long improvementProposalId) {
        return commentRepository.findCommentByImprovementProposal_Id(improvementProposalId);
    }
}
