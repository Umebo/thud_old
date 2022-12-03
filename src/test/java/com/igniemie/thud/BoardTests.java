package com.igniemie.thud;

import com.igniemie.thud.model.Board;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;


@ExtendWith(MockitoExtension.class)
public class BoardTests {

    private Board board;

    @BeforeEach
    void setup() {
        board = new Board();
    }

    @Test
    void shouldMakeProperMoves() {
        board.makeMove("G15", "I13");
        board.makeMove("G9", "F10");

        assertAll(
                // Dwarf move
            () -> assertEquals(0, board.getBoard()[0][6]),
            () -> assertEquals(1, board.getBoard()[2][8]),
                //Troll move
            () -> assertEquals(0, board.getBoard()[6][6]),
            () -> assertEquals(2, board.getBoard()[5][5])
        );
    }

    @Test
    void shouldReturnProperAvailableMoves() {
        board.makeMove("G15", "I13");
        board.makeMove("G9", "F10");
        board.makeMove("M12", "J12");
        Set<String> availableMoves = Set.of(
                "G15",
                "H14", "I14", "J14",
                "E13", "F13", "G13", "H13", "J13", "K13",
                "H12", "I12",
                "G11", "I11",
                "I10"
        );

        assertEquals(availableMoves, board.getAvailableMoves("I13"));
    }
}
