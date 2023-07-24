package com.dominikmrozik.ImprovementProposalApp.controller;

import com.dominikmrozik.ImprovementProposalApp.service.UserService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


}
