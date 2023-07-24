package com.dominikmrozik.ImprovementProposalApp.controller;

import com.dominikmrozik.ImprovementProposalApp.dto.AuthCredentialsRequest;
import com.dominikmrozik.ImprovementProposalApp.entity.User;
import com.dominikmrozik.ImprovementProposalApp.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class LoginController {


    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("login")
    public User login(@RequestBody AuthCredentialsRequest request) {
        User user = userService.getUserByUserName(request.getUsername());
        if (user != null && user.getPassword().equals(request.getPassword())) {
            user.setPassword("");
            return user;
        }
        return new User();
    }
}
