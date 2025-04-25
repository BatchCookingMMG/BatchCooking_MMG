package com.example.batchCooking.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @GetMapping("/user")
    public String getUser() {
        return "Welcome user";
    }

    @GetMapping("/admin")
    public String getAdmin() {
        return "Welcome admin";
    }
}
