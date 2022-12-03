package com.igniemie.thud.model;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Component
public class Board {
    private final int BOARD_SIZE = 15;
    private final List<Integer> VERTICAL_AXIS = Arrays.asList(
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
    );

    private final String[] DWARF_STARTING_TILES = {
            "F15", "G15", "H15", "I15", "J15",
            "E14", "K14", "D13", "L13", "C12", "M12", "B11", "N11",
            "A10", "O10", "A9", "O9", "A8", "O8", "A7", "O7", "A6", "O6",
            "B5", "N5", "C4", "M4", "D3", "L3", "E2", "K2",
            "F1", "G1", "H1", "I1", "J1"
    };
    private final String[] TROLL_STARTING_TILES = { "G9", "H9", "I9", "G8", "I8", "G7", "H7", "I7" };
    private final String[] OUTSIDE_TILES = {
            "A15", "B15", "C15", "D15", "E15", "K15", "L15", "M15", "N15", "O15",
            "A14", "B14", "C14", "D14", "L14", "M14", "N14", "O14",
            "A13", "B13", "C13", "M13", "N13", "O13",
            "A12", "B12", "N12", "O12",
            "A11", "O11",
            "H8",
            "A5", "O5",
            "A4", "B4", "N4", "O4",
            "A3", "B3", "C3", "M3", "N3", "O3",
            "A2", "B2", "C2", "D2", "L2", "M2", "N2", "O2",
            "A1", "B1", "C1", "D1", "E1", "K1", "L1", "M1", "N1", "O1"
    };
    private int[][] board;

    public Board() {
        this.board = new int[BOARD_SIZE][BOARD_SIZE];
        initializeNewGame();
    }

    public void initializeNewGame() {
        for (String signature: DWARF_STARTING_TILES) {
            int dimX = mapTileSignatureToBoardCoordinates(signature).getLeft();
            int dimY = mapTileSignatureToBoardCoordinates(signature).getRight();
            this.board[dimX][dimY] = PlayerType.DWARF.getValue();
        }
        for (String signature: TROLL_STARTING_TILES) {
            int dimX = mapTileSignatureToBoardCoordinates(signature).getLeft();
            int dimY = mapTileSignatureToBoardCoordinates(signature).getRight();
            this.board[dimX][dimY] = PlayerType.TROLL.getValue();
        }
        for (String signature: OUTSIDE_TILES) {
            int dimX = mapTileSignatureToBoardCoordinates(signature).getLeft();
            int dimY = mapTileSignatureToBoardCoordinates(signature).getRight();
            this.board[dimX][dimY] = -1;
        }
    }

    private Pair<Integer, Integer> mapTileSignatureToBoardCoordinates(String tileSignature) {
        String[] splittedSignature = tileSignature.split("(?<=[A-O])");
        return Pair.of(
                VERTICAL_AXIS.get(intFromTileNumber(splittedSignature[1])) - 1,
                intFromCapitalLetter(splittedSignature[0])
        );
    }

    private String mapBoardCoordinatesToTileSignature(Pair<Integer, Integer> boardCoordinates) {
        return ((char) (boardCoordinates.getRight() + 65)) +
                (VERTICAL_AXIS.get(14 - boardCoordinates.getLeft())).toString();
    }
    private int intFromCapitalLetter(String letter) {
        return letter.charAt(0) - 65;
    }
    private int intFromTileNumber(String tileNumber) {
        return 15 - Integer.parseInt(tileNumber);
    }

    public void makeMove(String from, String to) {
        Pair<Integer, Integer> coordinatesFrom = mapTileSignatureToBoardCoordinates(from);
        Pair<Integer, Integer> coordinatesTo = mapTileSignatureToBoardCoordinates(to);

        int source = this.board[coordinatesFrom.getLeft()][coordinatesFrom.getRight()];
        int destination = this.board[coordinatesTo.getLeft()][coordinatesTo.getRight()];

        this.board[coordinatesTo.getLeft()][coordinatesTo.getRight()] = source;
        this.board[coordinatesFrom.getLeft()][coordinatesFrom.getRight()] = destination;
    }

    public Set<String> getAvailableMoves(String currentPosition) {
        List<Pair<Integer, Integer>> possibleMoves = new ArrayList<>();
        Pair<Integer, Integer> coordinates = mapTileSignatureToBoardCoordinates(currentPosition);

        // Searching in X axis
        for (int x = coordinates.getRight(), y = coordinates.getLeft()-1; y >= 0; y--) {
            if (board[y][x] != 0) break;
            possibleMoves.add(Pair.of(y, x));
        }
        for (int x = coordinates.getRight(), y = coordinates.getLeft()+1; y < BOARD_SIZE; y++) {
            if (board[y][x] != 0) break;
            possibleMoves.add(Pair.of(y, x));
        }
        // Searching in Y axis
        for (int y = coordinates.getLeft(), x = coordinates.getRight()-1; x >= 0; x--) {
            if (board[y][x] != 0) break;
            possibleMoves.add(Pair.of(y, x));
        }
        for (int y = coordinates.getLeft(), x = coordinates.getRight()+1; x < BOARD_SIZE; x++) {
            if (board[y][x] != 0) break;
            possibleMoves.add(Pair.of(y, x));
        }
        // Searching in top-left-to-bottom-right diagonal
        for (int y = coordinates.getLeft()-1, x = coordinates.getRight()-1; x >= 0 && y >= 0; x--, y--) {
            if (board[y][x] != 0) break;
            possibleMoves.add(Pair.of(y, x));
        }
        for (int y = coordinates.getLeft()+1, x = coordinates.getRight()+1; x < BOARD_SIZE && y < BOARD_SIZE; x++, y++) {
            if (board[y][x] != 0) break;
            possibleMoves.add(Pair.of(y, x));
        }
        // Searching in top-right-to-bottom-left diagonal
        for (int y = coordinates.getLeft()+1, x = coordinates.getRight()-1; x >= 0 && y < BOARD_SIZE; x--, y++) {
            if (board[y][x] != 0) break;
            possibleMoves.add(Pair.of(y, x));
        }
        for (int y = coordinates.getLeft()-1, x = coordinates.getRight()+1; x < BOARD_SIZE && y >= 0; x++, y--) {
            if (board[y][x] != 0) break;
            possibleMoves.add(Pair.of(y, x));
        }

        return possibleMoves.stream()
                .map(this::mapBoardCoordinatesToTileSignature)
                .collect(Collectors.toSet());
    }

}
