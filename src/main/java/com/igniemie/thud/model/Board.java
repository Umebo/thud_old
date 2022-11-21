package com.igniemie.thud.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.context.annotation.SessionScope;

@Getter
@Setter
@SessionScope
public class Board {

    private final int BOARD_SIZE = 15;
    private int[][] board;

    public Board() {
        this.board = new int[BOARD_SIZE][BOARD_SIZE];
    }

}
