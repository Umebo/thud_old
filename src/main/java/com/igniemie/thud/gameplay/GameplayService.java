package com.igniemie.thud.gameplay;

import com.igniemie.thud.model.Player;
import lombok.Getter;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Getter
@Service
public class GameplayService {

    private List<GameplaySession> gameplayList;

    public GameplayService() {
        this.gameplayList = new ArrayList<>();
    }

    public GameplayListDTO gameplayListAsDTO() {
        GameplayListDTO gameplayList = new GameplayListDTO();
        gameplayList.setGameplayDTOList(getGameplayList().stream()
                .map(GameplaySession::toGameplayDTO)
                .toList());

        return gameplayList;
    }

    public GameplayDTO createNewGame(String nickname) {
        Player player1 = new Player(nickname);
        GameplaySession gameplaySession = new GameplaySession(player1);
        GameplayDTO gameplayDTO = gameplaySession.toGameplayDTO();
        gameplayList.add(gameplaySession);
        return gameplayDTO;
    }

    public void addPlayerToGame(UUID gameUUID, Player player) {
        this.gameplayList.stream()
                .filter(gs -> gs.getGameUUID().equals(gameUUID))
                .forEach(gs -> gs.joinToGame(player));
    }
}
