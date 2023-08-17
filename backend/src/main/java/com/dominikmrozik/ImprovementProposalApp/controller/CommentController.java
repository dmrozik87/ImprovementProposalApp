package com.dominikmrozik.ImprovementProposalApp.controller;

import com.dominikmrozik.ImprovementProposalApp.entity.Comment;
import com.dominikmrozik.ImprovementProposalApp.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment newComment = commentService.createComment(comment);
        return ResponseEntity.ok(newComment);
    }

    @PutMapping
    public ResponseEntity<Comment> updateComment(@RequestBody Comment comment) {
        Comment upodatedComment = commentService.updateComment(comment);
        return ResponseEntity.ok(upodatedComment);
    }

    @GetMapping
    public ResponseEntity<Set<Comment>> getCommentsByImprovementProposal(@RequestParam Long improvementProposalId) {
        Set<Comment> comments = commentService.getCommentsByImprovementProposal(improvementProposalId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping
    public ResponseEntity<Comment> deleteComment(@RequestBody Comment comment) {
        commentService.deleteComment(comment);
        return ResponseEntity.ok(null);
    }



}
