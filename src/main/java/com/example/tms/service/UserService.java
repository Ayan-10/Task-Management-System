package com.example.tms.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.example.tms.dto.UserRegistrationDto;
import com.example.tms.model.User;

public interface UserService extends UserDetailsService{
	User save(UserRegistrationDto registrationDto);
}
