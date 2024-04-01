package com.igniemie.thud.socket.messages;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class JoinMessage {
    private UUID gameID;
    private String nickname;
    private MessageType messageType;
}
