package com.igniemie.thud.controller;

import com.igniemie.thud.exception.NicknameValidationException;
import com.igniemie.thud.service.ILoginService;
import com.igniemie.thud.session.PlayerSession;
import com.igniemie.thud.validator.NicknameValidator;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping
    public String loginForm(Model model) {
        model.addAttribute("logged", this.playerSession.isLogged());
        return "login";
    }

    @PostMapping
    public void login(HttpServletResponse response, @RequestParam String nickname) {
        try {
            NicknameValidator.validateNickname(nickname);
        } catch (NicknameValidationException e) {
            response.setHeader("Location", "localhost:3000/");
        }
/*
        this.loginService.login(nickname);

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
