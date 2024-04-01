package com.igniemie.thud.socket;

import com.corundumstudio.socketio.SocketIOClient;
import com.igniemie.thud.gameplay.GameplayService;
import com.igniemie.thud.movement.ClassicThudMovementService;
import com.igniemie.thud.movement.dto.MovementDTO;
import com.igniemie.thud.movement.dto.MovementResultDTO;
import com.igniemie.thud.socket.messages.MessageType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class SocketIOService {

    @Autowired
    private ClassicThudMovementService movementService;

    @Autowired
    private GameplayService gameplayService;

    public void sendMovementResult(UUID gameID, MovementDTO movement, String eventName, SocketIOClient sender) {
        MovementResultDTO movementResult = movementService.makeMove(movement);
        for (SocketIOClient client: sender.getNamespace().getRoomOperations(gameID.toString()).getClients()) {
            client.sendEvent(
                    eventName,
                    MessageType.SERVER,
                    movementResult
            );
        }
    }

    public void sendJoinResult(UUID gameID, String nickname, String eventName, SocketIOClient sender) {
        for (SocketIOClient client: sender.getNamespace().getRoomOperations(gameID.toString()).getClients()) {
            client.sendEvent(
                    eventName,
                    MessageType.SERVER,
                    gameplayService.addPlayerToGame(gameID, nickname)
            );
        }
    }
}
