package com.igniemie.thud.movement;

import com.igniemie.thud.movement.dto.AvailableMovesDTO;
import com.igniemie.thud.movement.dto.MovementDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/movement")
public class MovementController {

    @Autowired
    ClassicThudMovementService movementService;

    @GetMapping("/all")
    public AvailableMovesDTO getAllAvailableMoves(@RequestParam String position, @RequestParam String pieceType) {
        return movementService.getAvailableMoves(position, pieceType);
    }

    @MessageMapping("/message")
    @SendTo("/topic/mss")
    public MovementDTO receiveMessage(@RequestParam MovementDTO movementDTO) {
        movementService.makeMove(movementDTO);
        return movementDTO;
    }
}
