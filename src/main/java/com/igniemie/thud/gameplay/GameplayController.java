package com.igniemie.thud.gameplay;

import com.igniemie.thud.model.Player;
import com.igniemie.thud.session.PlayerSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.UUID;

@RestController
@RequestMapping(value = "/gameplay")
public class GameplayController {

    @Autowired
    SimpMessagingTemplate template;
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

    @PostMapping("/new")
    Player newGame() {
        System.out.println("CREATED");
        gameplayService.createNewGame(playerSession.getPlayer());
        return gameplaySession.getPlayer1();
    }

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody String message) {
        template.convertAndSend("/topic/app", message);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @MessageMapping()
    public void receiveMessage(@Payload String message) {

    }

    @SendTo("/topic/app")
    public String send(@Payload String message){
        return message;
    }

}
