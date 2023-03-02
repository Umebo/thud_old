package com.igniemie.thud.movement;

import com.igniemie.thud.movement.dto.AvailableMovesDTO;
import com.igniemie.thud.movement.dto.MovementDTO;

public interface IMovementService {
    AvailableMovesDTO getAvailableMoves(String position, String pieceType);
    void makeMove(MovementDTO movementDTO);
}
