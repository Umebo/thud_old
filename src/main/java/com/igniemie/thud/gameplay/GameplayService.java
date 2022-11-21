package com.igniemie.thud.gameplay;

import com.igniemie.thud.model.Player;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class GameplayService {

    @Resource
    GameplaySession gameplaySession;

    public void createNewGame(Player player) {
        gameplaySession.createGame(player);
    }
}
