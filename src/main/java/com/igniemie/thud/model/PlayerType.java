package com.igniemie.thud.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PlayerType {
    DWARF(1),
    TROLL(2);

    private final Integer value;
}
