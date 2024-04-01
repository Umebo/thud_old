package com.igniemie.thud.socket;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.igniemie.thud.socket.messages.JoinMessage;
import com.igniemie.thud.socket.messages.MovementMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SocketIOModule {

    private final SocketIOServer server;
    private final SocketIOService service;

    public SocketIOModule(SocketIOServer server, SocketIOService service) {
        this.server = server;
        this.service = service;
        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());
        server.addEventListener("movement_message", MovementMessage.class, onMovementMessageReceived());
        server.addEventListener("join_message", JoinMessage.class, onJoinMessageReceived());
    }

    private ConnectListener onConnected() {
        return client -> {
            String room = client.getHandshakeData().getSingleUrlParam("gameID");
            client.joinRoom(room);
            log.info("⚡ Socket ID[{}] - Connected to socket", client.getSessionId().toString());
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            log.info("💀 Client[{}] - Disconnected from socket", client.getSessionId().toString());
        };
    }

    private DataListener<MovementMessage> onMovementMessageReceived() {
        return (client, movementMessage, ackSender) -> {
            service.sendMovementResult(
                    movementMessage.getGameID(),
                    movementMessage.getMovement(),
                    "movement_result",
                    client
            );
            log.info("📨 Client[{}] - Sent a message to room[{}]", client.getSessionId().toString(), movementMessage.getGameID());
        };
    }
    
    private DataListener<JoinMessage> onJoinMessageReceived() {
        return (client, joinMessage, ackRequest) -> {
            service.sendJoinResult(
                    joinMessage.getGameID(),
                    joinMessage.getNickname(),
                    "join_result",
                    client
            );
        };
    }

}
