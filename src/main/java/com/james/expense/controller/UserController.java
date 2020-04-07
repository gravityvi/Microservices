package com.james.expense.controller;

import com.james.expense.model.UserDetails;
import com.james.expense.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.james.expense.model.User;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collection;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @LoadBalanced
    private RestTemplate restTemplate;

    @GetMapping("/users")
    Collection<User> Users()
    {
       return userRepository.findAll();
    }

    @PostMapping("/registerusers")
    ResponseEntity<?> registerUser(@RequestBody UserDetails userDetails)
    {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity<UserDetails> entity = new HttpEntity<UserDetails>(userDetails);
       return restTemplate.exchange("http://user-registration-service/registeruser", HttpMethod.POST,entity,String.class);
    }



}
