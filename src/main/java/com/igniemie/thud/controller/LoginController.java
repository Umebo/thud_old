package com.igniemie.thud.controller;

import com.igniemie.thud.exception.NicknameValidationException;
import com.igniemie.thud.service.ILoginService;
import com.igniemie.thud.session.PlayerSession;
import com.igniemie.thud.validator.NicknameValidator;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/login")
public class LoginController {

    private final ILoginService loginService;

    @Resource
    PlayerSession playerSession;

    public LoginController(ILoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping()
    @ResponseBody
    public String get() {
        return "WORKS";
    }
    @PostMapping()
    public void login(@RequestParam String nickname) {
        try {
            NicknameValidator.validateNickname(nickname);
            System.out.println("logged! : " + nickname);
            loginService.login(nickname);
            System.out.println(playerSession.isLogged());
        } catch (NicknameValidationException e) {
            System.out.println(e);
        }
/*
        if(this.playerSession.isLogged()) {
            return "redirect:/game";
        } else {
            return "redirect:/login";
        }*/
    }


    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout() {
        this.playerSession.setPlayer(null);
        return "redirect:/";
    }
}
