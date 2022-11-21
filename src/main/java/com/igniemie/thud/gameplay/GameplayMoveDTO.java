package com.igniemie.thud.gameplay;

import com.igniemie.thud.model.Board;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameplayMoveDTO {

    private String UUID;
    private Board board;

}
