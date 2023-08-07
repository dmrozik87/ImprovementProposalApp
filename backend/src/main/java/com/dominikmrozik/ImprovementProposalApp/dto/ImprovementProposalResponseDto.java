package com.dominikmrozik.ImprovementProposalApp.dto;

import com.dominikmrozik.ImprovementProposalApp.entity.ImprovementProposal;
import com.dominikmrozik.ImprovementProposalApp.enums.Department;
import com.dominikmrozik.ImprovementProposalApp.enums.Status;

public class ImprovementProposalResponseDto {
    private final Department[] departments = Department.values();
    private final Status[] statuses = Status.values();
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

    public Status[] getStatuses() {
        return statuses;
    }
}
