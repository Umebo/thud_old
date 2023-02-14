package com.igniemie.thud.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping(value = "/movement")
public class MovementController {

    @Autowired
    ClassicThudMovementService movementService;

    @GetMapping("/all")
    public Set<String> getAllAvailableMoves(@RequestParam String position, @RequestParam String pieceType) {
        return movementService.getAvailableMoves(position, pieceType);
    }
}
