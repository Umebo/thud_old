package com.igniemie.thud.controller;

import com.igniemie.thud.exception.NicknameValidationException;
import com.igniemie.thud.service.ILoginService;
import com.igniemie.thud.session.PlayerSession;
import com.igniemie.thud.validator.NicknameValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "/login")
public class LoginController {

    @Autowired
    ILoginService loginService;

    @Resource
    PlayerSession playerSession;

    @GetMapping()
    @ResponseBody
    public String get() {
        return "WORKS";
    }
    @PostMapping()
    public void login(@RequestParam String nickname) {
        try {
            NicknameValidator.validateNickname(nickname);
            loginService.login(nickname);
        } catch (NicknameValidationException e) {
            System.out.println(e);
        }
    }

    @GetMapping(value = "/logout")
    public void logout() {
        this.playerSession.setPlayer(null);
    }
}
