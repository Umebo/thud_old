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

    public List<GameplayDTO> gameplayListAsDTO() {
        return getGameplayList().stream()
                .map(GameplaySession::toGameplayDTO)
                .toList();
    }

    public GameplayDTO createNewGame(Player player) {
        GameplaySession gameplaySession = new GameplaySession(player);
        gameplayList.add(gameplaySession);
        return gameplaySession.toGameplayDTO();
    }

    public void addPlayerToGame(UUID gameUUID, Player player) {
        this.gameplayList.stream()
                .filter(gs -> gs.getGameUUID().equals(gameUUID))
                .forEach(gs -> gs.joinToGame(player));
    }
}
