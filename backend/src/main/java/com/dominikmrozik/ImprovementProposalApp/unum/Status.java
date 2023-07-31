package com.dominikmrozik.ImprovementProposalApp.unum;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Status {
    PENDING_SUBMISSION("Pending Submission", 1),
    SUBMITTED("Submitted", 2),
    IN_REVIEW("In review", 3),
    NEEDS_UPDATE("Needs Update", 4),
    COMPLETED("Completed", 5);

    private final String status;
    private final int step;

    Status(String status, int step) {
        this.status = status;
        this.step = step;
    }

    public String getStatus() {
        return status;
    }

    public int getStep() {
        return step;
    }
}
