package com.igniemie.thud.socket;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
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
        server.addEventListener("client_message", SocketMessage.class, onMessageReceived());
    }

    private ConnectListener onConnected() {
        return client -> {
            String room = client.getHandshakeData().getSingleUrlParam("gameID");
            client.joinRoom(room);
            log.info("Socket ID[{}] - Connected to socket", client.getSessionId().toString());
        };
    }

    private DisconnectListener onDisconnected() {
        return client -> {
            log.info("Client[{}] - Disconnected from socket", client.getSessionId().toString());
        };
    }

    private DataListener<SocketMessage> onMessageReceived() {
        return (client, data, ackSender) -> {
            service.sendMessageToRoom(data.getRoom(),"response_message", client, data.getMessage());
            log.info("Client[{}] - Sent a message to room[{}]", client.getSessionId().toString(), data.getRoom());
        };
    }

}
