package com.igniemie.thud.gameplay;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public Map<String, String> allGames() {
        return gameplayService.gameplayListAsDTO().getGameplayDTOList();
    }

/*    @GetMapping("/{uuid}/moves")
    public Set*/

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

    @PostMapping("/send")
    public ResponseEntity<Void> sendMessage(@RequestBody String message) {
        template.convertAndSend("/topic/app", message);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @MessageMapping("/{gameUUID}")
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
