package com.dominikmrozik.ImprovementProposalApp.dto;

import com.dominikmrozik.ImprovementProposalApp.entity.Department;
import com.dominikmrozik.ImprovementProposalApp.entity.ImprovementProposal;

public class ImprovementProposalResponseDto {
    private final Department[] departments = Department.values();
    private ImprovementProposal improvementProposal;

    public ImprovementProposalResponseDto(ImprovementProposal improvementProposal) {
        this.improvementProposal = improvementProposal;
    }

    public ImprovementProposal getImprovementProposal() {
        return improvementProposal;
    }

    public void setImprovementProposal(ImprovementProposal improvementProposal) {
        this.improvementProposal = improvementProposal;
    }

    public Department[] getDepartments() {
        return departments;
    }
}
