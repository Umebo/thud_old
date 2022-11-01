package com.igniemie.thud.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Player {

    public Player(String nickname) {
        this.nickname = nickname;
    }

    private String nickname;
    private PlayerType type;
}
