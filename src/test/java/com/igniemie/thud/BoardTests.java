package com.igniemie.thud;

import com.igniemie.thud.model.Board;
import com.igniemie.thud.movement.dto.MovementResultDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
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
    @Disabled
    void shouldReturnProperSurroundings() {

        assertEquals(
                Set.of(),
                board.getTrollAvailableShoves("G7"));
    }

    @Test
    void shouldMakeProperMoves() {
        board.makeMove("G15", "I13", "Dwarf");
        board.makeMove("G9", "F10", "Troll");

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
        board.makeMove("G15", "I13", "Dwarf");
        board.makeMove("G9", "F10", "Troll");
        board.makeMove("M12", "J12", "Dwarf");

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
        board.makeMove("G15", "E13", "Dwarf");
        //TODO: should change to possible moves for troll pawns
        board.makeMove("G9", "G15", "Troll");

        assertAll(
                () -> assertEquals(
                        Set.of("F14", "G14", "H14", "H15", "F15"),
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

        board.makeMove("F1", "F5", "Dwarf");
        board.makeMove("M4", "E4", "Dwarf");

        assertEquals(
                Set.of("H7"),
                board.getDwarfAvailableHurls("F5"));

        board.makeMove("G1", "G6", "Dwarf");

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
    void shouldCheckForDwarfsOnAdjacentTiles() {

        assertFalse(board.isAnyDwarfOnAdjacentTiles("I10"));

        board.makeMove("I15", "I11", "Dwarf");
        assertTrue(board.isAnyDwarfOnAdjacentTiles("I10"));
    }

    @Test
    void shouldReturnProperTrollAvailableShoves() {
        assertEquals(
                Collections.emptySet(),
                board.getTrollAvailableShoves("I7"));

        board.makeMove("J1", "J6", "Dwarf");
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

        board.makeMove("F1", "F4", "Dwarf");
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

    @Test
    void ShouldReturnProperTakenDwarfPositionsAfterShove() {
        board.makeMove("I9", "J9", "Troll");
        board.makeMove("L13", "L12", "Dwarf");
        board.makeMove("N11", "M11", "Dwarf");

        MovementResultDTO shoveResult = board.makeMove("J9", "L11", "Troll");

        assertEquals(
                Set.of("L12", "M12", "M11"),
                shoveResult.getTakenPieces());
    }
}
