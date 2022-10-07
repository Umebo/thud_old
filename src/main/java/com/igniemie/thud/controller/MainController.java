package com.igniemie.thud.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/thud")
public class MainController {

    @GetMapping
    public String testGet() {
        return "Success";
    }
}
