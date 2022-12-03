package com.igniemie.thud;

import com.igniemie.thud.model.Board;
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
    void shouldReturnProperDwarfAvailableMoves() {
        board.makeMove("G15", "I13");
        board.makeMove("G9", "F10");
        board.makeMove("M12", "J12");
        Set<String> DwarfAvailableMoves = Set.of(
                "G15",
                "H14", "I14", "J14",
                "E13", "F13", "G13", "H13", "J13", "K13",
                "H12", "I12",
                "G11", "I11",
                "I10"
        );

        assertEquals(
                DwarfAvailableMoves,
                board.getDwarfAvailableMoves("I13"));
    }

    @Test
    void shouldReturnProperTrollAvailableMoves() {
        board.makeMove("G15", "E13");
        board.makeMove("G9", "G15");
        Set<String> FirstTrollAvailableMoves = Set.of(
                "F14", "G14", "H14"
        );
        Set<String> SecondTrollAvailableMoves = Set.of(
                "G10", "H10", "I10", "G9"
        );

        assertAll(
                () -> assertEquals(
                        FirstTrollAvailableMoves,
                        board.getTrollAvailableMoves("G15")),
                () -> assertEquals(
                        SecondTrollAvailableMoves,
                        board.getTrollAvailableMoves("H9"))
        );
    }
}
