package com.igniemie.thud.movement;

import com.igniemie.thud.gameplay.GameplaySession;
import com.igniemie.thud.movement.dto.AvailableMovesDTO;
import com.igniemie.thud.movement.dto.MovementDTO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class ClassicThudMovementService implements IMovementService{

    @Resource
    GameplaySession gameplaySession;

    @Override
    public AvailableMovesDTO getAvailableMoves(String position, String pieceType) {
        return gameplaySession.getBoard().getAvailableMoves(position, pieceType);
    }

    @Override
    public void makeMove(MovementDTO movementDTO) {
        gameplaySession.getBoard().makeMove(movementDTO.getFrom(), movementDTO.getTo());
    }
}
