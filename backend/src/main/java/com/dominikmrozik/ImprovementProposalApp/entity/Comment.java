package com.dominikmrozik.ImprovementProposalApp.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private ImprovementProposal improvementProposal;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
    private LocalDateTime createdAt;
    @Column(columnDefinition = "TEXT")
    private String text;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ImprovementProposal getImprovementProposal() {
        return improvementProposal;
    }

    public void setImprovementProposal(ImprovementProposal improvementProposal) {
        this.improvementProposal = improvementProposal;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", improvementProposal=" + improvementProposal +
                ", createdBy=" + createdBy +
                ", createdAt=" + createdAt +
                ", text='" + text + '\'' +
                '}';
    }
}
