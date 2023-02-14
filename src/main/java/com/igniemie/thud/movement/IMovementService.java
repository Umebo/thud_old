package com.igniemie.thud.movement;

import java.util.Set;

public interface IMovementService {
    Set<String> getAvailableMoves(String position, String pieceType);
}
