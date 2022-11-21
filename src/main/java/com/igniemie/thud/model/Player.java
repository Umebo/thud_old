package com.igniemie.thud.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@NoArgsConstructor
@AllArgsConstructor
public class Player {
    private String nickname;
    private PlayerType type;

    public Player(String nickname) { this.nickname = nickname; }

}
