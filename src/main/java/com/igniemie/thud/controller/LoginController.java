package com.igniemie.thud.controller;

import com.igniemie.thud.exception.NicknameValidationException;
import com.igniemie.thud.model.Player;
import com.igniemie.thud.service.ILoginService;
import com.igniemie.thud.session.PlayerSession;
import com.igniemie.thud.validator.NicknameValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.Resource;

@RestController
@RequestMapping(value = "/login")
public class LoginController {

    @Autowired
    private ILoginService loginService;
    @Resource
    PlayerSession playerSession;

    @GetMapping()
    @ResponseBody
    public String get() {
        return "WORKS";
    }
    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    public Player login(@RequestParam String nickname) {
        try {
            NicknameValidator.validateNickname(nickname);
            loginService.login(nickname);
            return playerSession.getPlayer();
        } catch (NicknameValidationException e) {
            System.out.println(e);
        }
        return null;
    }

    @GetMapping(value = "/logout")
    public void logout() {
        this.playerSession.setPlayer(null);
    }
}
