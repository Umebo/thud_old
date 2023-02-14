package com.igniemie.thud.movement;

import com.igniemie.thud.gameplay.GameplaySession;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Set;

@Service
public class ClassicThudMovementService implements IMovementService{

    @Resource
    GameplaySession gameplaySession;

    @Override
    public Set<String> getAvailableMoves(String position, String pieceType) {
        return gameplaySession.getBoard().getAvailableMoves(position, pieceType);
    }
}
