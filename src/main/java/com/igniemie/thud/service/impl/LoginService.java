package com.igniemie.thud.service.impl;

import com.igniemie.thud.model.Player;
import com.igniemie.thud.service.ILoginService;
import com.igniemie.thud.session.PlayerSession;

import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;

@Service
public class LoginService implements ILoginService {

    @Resource
    PlayerSession playerSession;

    @Override
    public void login(String nickname) {

        if(playerSession.isLogged()) {
            return;
        }
        if(nickname.length()<2) {
            return;
        }
        Player player = new Player(nickname);
        this.playerSession.setPlayer(player);
    }
}
