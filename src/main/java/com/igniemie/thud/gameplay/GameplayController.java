package com.igniemie.thud.gameplay;

import com.igniemie.thud.session.PlayerSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(value = "/gameplay")
public class GameplayController {

    @Autowired
    GameplayService gameplayService;
    @Resource
    GameplaySession gameplaySession;
    @Resource
    PlayerSession playerSession;

    @GetMapping("/check")
    public UUID checkGame() {
        return gameplaySession.getGameUUID();
    }

    @GetMapping("/all")
    public Map<String, String> allGames() {
        return gameplayService.gameplayListAsDTO().getGameplayDTOList();
    }

    @PostMapping("/new")
    public GameplayDTO newGame(@RequestParam String nickname) {
        return gameplayService.createNewGame(nickname);
    }

    @PutMapping("/join")
    public GameplayDTO jointToExistingGame(
            @RequestParam String uuid,
            @RequestParam String nickname) {
        return gameplayService.addPlayerToGame(uuid, nickname);
    }

    @MessageMapping("/message")
    @SendTo("/topic/mss")
    public String receiveMessage(String position) {
        return position;
    }

    public String send(@Payload String message){
        return message;
    }

}
