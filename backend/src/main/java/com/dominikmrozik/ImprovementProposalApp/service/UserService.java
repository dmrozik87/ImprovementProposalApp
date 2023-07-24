package com.dominikmrozik.ImprovementProposalApp.service;

import com.dominikmrozik.ImprovementProposalApp.entity.User;
import com.dominikmrozik.ImprovementProposalApp.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByUserName(String username) {
        return userRepository.findUserByUsername(username);
    }
}
