package com.igniemie.thud.gameplay;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.Resource;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(value = "/gameplay")
public class GameplayController {

    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    GameplayService gameplayService;
    @Resource
    GameplaySession gameplaySession;

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
        GameplayDTO gameplayDTO =  gameplayService.addPlayerToGame(uuid, nickname);
        this.template.convertAndSend("/topic/join", gameplayDTO);
        return gameplayDTO;
    }
}
