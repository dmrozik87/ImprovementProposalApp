package com.dominikmrozik.ImprovementProposalApp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Department {
    HR("Human Resources"),
    FINANCE("Finance"),
    SALES("Sales"),
    MARKETING("Marketing"),
    PRODUCTION("Production"),
    ENGINEERING("Engineering"),
    RESEARCH("Research and Development"),
    IT("Information Technology"),
    QUALITY_ASSURANCE("Quality Assurance"),
    PROCUREMENT("Procurement"),
    LEGAL("Legal"),
    ADMINISTRATION("Administration");

    private final String departmentName;

    Department(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDepartmentName() {
        return departmentName;
    }
}
