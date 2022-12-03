package com.igniemie.thud.gameplay;

import com.igniemie.thud.model.Player;
import com.igniemie.thud.session.PlayerSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/gameplay")
public class GameplayController {

    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    SimpMessageSendingOperations so;
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
    public List<GameplayDTO> allGames() {
        return gameplayService.gameplayListAsDTO();
    }

    @PostMapping("/new")
    public GameplayDTO newGame(@RequestBody String nickname) {
        return gameplayService.createNewGame(playerSession.getPlayer());
    }

    /*@PutMapping("/{gameUUID}/join")
    public GameplayDTO jointToExistingGame(@PathVariable String gameUUID, String nickname) {
        return
    }*/

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody String message) {
        template.convertAndSend("/topic/app", message);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @MessageMapping("/{gameUUID}/")
    public void receiveMessage(
            @DestinationVariable String gameUUID,
            @Payload String message,
            SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("game_uuid", gameUUID);
        so.convertAndSend(String.format("game/%s", gameUUID), message);
    }

    @SendTo("/topic/app")
    public String send(@Payload String message){
        return message;
    }

}
