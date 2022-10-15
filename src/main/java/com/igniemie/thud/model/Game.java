package com.igniemie.thud.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class Game {

    private int gameID;
    private UUID gameUUID;
    private String player1;
    private String player2;
    private GameStatus status;
}
