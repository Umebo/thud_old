package com.igniemie.thud.socket.messages;

import com.igniemie.thud.movement.dto.MovementDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class MovementMessage {
    private UUID gameID;
    private MovementDTO movement;
    private MessageType messageType;
}
