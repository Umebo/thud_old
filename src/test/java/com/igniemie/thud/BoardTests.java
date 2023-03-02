package com.igniemie.thud;

import com.igniemie.thud.model.Board;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;


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

        assertEquals(
                Set.of(
                        "G15",
                        "H14", "I14", "J14",
                        "E13", "F13", "G13", "H13", "J13", "K13",
                        "H12", "I12",
                        "G11", "I11",
                        "I10"
                ),
                board.getAvailableMoves("I13", "Dwarf").getAvailableNormalMoves());
    }

    @Test
    void shouldReturnProperTrollAvailableMoves() {
        board.makeMove("G15", "E13");
        //TODO: should change to possible moves for troll pawns
        board.makeMove("G9", "G15");

        assertAll(
                () -> assertEquals(
                        Set.of("F14", "G14", "H14", "H15"),
                        board.getAvailableMoves("G15", "Troll").getAvailableNormalMoves()),
                () -> assertEquals(
                        Set.of("G10", "H10", "I10", "G9"),
                        board.getAvailableMoves("H9", "Troll").getAvailableNormalMoves())
        );
    }

    @Test
    void shouldReturnProperDwarfAvailableHurls() {

        assertEquals(
                Collections.emptySet(),
                board.getDwarfAvailableHurls("G1"));

        board.makeMove("F1", "F5");
        board.makeMove("M4", "E4");

        assertEquals(
                Set.of("H7"),
                board.getDwarfAvailableHurls("F5"));

        board.makeMove("G1", "G6");

        assertAll(
                () -> assertEquals(
                        Collections.emptySet(),
                        board.getDwarfAvailableHurls("F5")),
                () -> assertEquals(
                        Set.of("G7", "H7"),
                        board.getDwarfAvailableHurls("G6"))
        );
    }

    @Test
    void shouldReturnFalseIfThereIsNoDwarfOnAdjacentTile() {

        assertFalse(board.isDwarfOnAdjacentTile("I10"));

        board.makeMove("I15", "I11");
        assertTrue(board.isDwarfOnAdjacentTile("I10"));
    }

    @Test
    void shouldReturnProperTrollAvailableShoves() {
        assertEquals(
                Collections.emptySet(),
                board.getTrollAvailableShoves("I7"));

        board.makeMove("J1", "J6");
        Set<String> FirstTrollAvailableShoves = Set.of(
                "J7", "K7", "I6", "I5"
        );
        Set<String> SecondTrollAvailableShoves = Set.of(
                "J7", "K6"
        );

        assertAll(
                () -> assertEquals(
                        FirstTrollAvailableShoves,
                        board.getTrollAvailableShoves("I7")),
                () -> assertEquals(
                        SecondTrollAvailableShoves,
                        board.getTrollAvailableShoves("I8"))
        );

        board.makeMove("F1", "F4");
        Set<String> ThirdTrollAvailableShoves = Set.of(
                "G5", "G4"
        );
        Set<String> FourthTrollAvailableShoves = Set.of(
                "F5", "I6", "J5"
        );

        assertAll(
                () -> assertEquals(
                        ThirdTrollAvailableShoves,
                        board.getTrollAvailableShoves("G7")),
                () -> assertEquals(
                        FourthTrollAvailableShoves,
                        board.getTrollAvailableShoves("H7"))
        );
    }
}
