package com.igniemie.thud.movement;

import com.igniemie.thud.movement.dto.AvailableMovesDTO;
import com.igniemie.thud.movement.dto.MovementDTO;
import com.igniemie.thud.movement.dto.MovementResultDTO;

public interface IMovementService {
    AvailableMovesDTO getAvailableMoves(String position, String pieceType);
    MovementResultDTO makeMove(MovementDTO movementDTO);

}
