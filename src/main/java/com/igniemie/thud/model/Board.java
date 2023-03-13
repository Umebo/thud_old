package com.igniemie.thud.model;

import com.igniemie.thud.movement.dto.AvailableMovesDTO;
import com.igniemie.thud.movement.dto.MovementResultDTO;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
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
            "F15", "G15", "I15", "J15",
            "E14", "K14", "D13", "L13", "C12", "M12", "B11", "N11",
            "A10", "O10", "A9", "O9", "A7", "O7", "A6", "O6",
            "B5", "N5", "C4", "M4", "D3", "L3", "E2", "K2",
            "F1", "G1", "I1", "J1"
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
        return BOARD_SIZE - Integer.parseInt(tileNumber);
    }

    public MovementResultDTO makeMove(String from, String to, String type) {
        Pair<Integer, Integer> coordinatesFrom = mapTileSignatureToBoardCoordinates(from);
        Pair<Integer, Integer> coordinatesTo = mapTileSignatureToBoardCoordinates(to);
        PlayerType movedPieceType = PlayerType.valueOf(type.toUpperCase());
        Set<Pair<Integer, Integer>> takenPieces;

        switch(movedPieceType){
            case DWARF ->
                    takenPieces = checkForTakenTrollPieceAfterHurl(to);
            case TROLL ->
                    takenPieces = checkForTakenDwarfPieceAfterShove(to);
            default ->
                    takenPieces = Collections.emptySet();
        }

        for (Pair<Integer, Integer> tile: takenPieces) {
            this.board[tile.getLeft()][tile.getRight()] = 0;
        }

        int source = this.board[coordinatesFrom.getLeft()][coordinatesFrom.getRight()];

        this.board[coordinatesTo.getLeft()][coordinatesTo.getRight()] = source;
        this.board[coordinatesFrom.getLeft()][coordinatesFrom.getRight()] = 0;


        return new MovementResultDTO(
                from,
                to,
                type,
                takenPieces.stream()
                .map(this::mapBoardCoordinatesToTileSignature)
                .collect(Collectors.toSet())
        );
    }

    public AvailableMovesDTO getAvailableMoves(String currentPosition, String pieceType) {
        switch (pieceType) {
            case "Dwarf" -> {
                return new AvailableMovesDTO(
                        getDwarfAvailableMoves(currentPosition),
                        getDwarfAvailableHurls(currentPosition)
                );
            }
            case "Troll" -> {
                return new AvailableMovesDTO(
                        getTrollAvailableMoves(currentPosition),
                        getTrollAvailableShoves(currentPosition)
                );
            }
            default -> {
                return new AvailableMovesDTO();
            }
        }
    }

    private Set<String> getDwarfAvailableMoves(String currentPosition) {
        List<Pair<Integer, Integer>> possibleMoves = new ArrayList<>();
        Pair<Integer, Integer> coordinates = mapTileSignatureToBoardCoordinates(currentPosition);

        int vertical = coordinates.getRight();
        int horizontal = coordinates.getLeft();

        // Searching in X axis
        for (int y = vertical-1; y >= 0; y--) {
            if (board[horizontal][y] != 0) break;
            possibleMoves.add(Pair.of(horizontal, y));
        }
        for (int y = vertical+1; y < BOARD_SIZE; y++) {
            if (board[horizontal][y] != 0) break;
            possibleMoves.add(Pair.of(horizontal, y));
        }
        // Searching in Y axis
        for (int x = horizontal-1; x >= 0; x--) {
            if (board[x][vertical] != 0) break;
            possibleMoves.add(Pair.of(x, vertical));
        }
        for (int x = horizontal+1; x < BOARD_SIZE; x++) {
            if (board[x][vertical] != 0) break;
            possibleMoves.add(Pair.of(x, vertical));
        }
        // Searching in top-left-to-bottom-right diagonal
        for (int y = vertical-1, x = horizontal-1; x >= 0 && y >= 0; x--, y--) {
            if (board[x][y] != 0) break;
            possibleMoves.add(Pair.of(x, y));
        }
        for (int y = vertical+1, x = horizontal+1; x < BOARD_SIZE && y < BOARD_SIZE; x++, y++) {
            if (board[x][y] != 0) break;
            possibleMoves.add(Pair.of(x, y));
        }
        // Searching in top-right-to-bottom-left diagonal
        for (int y = vertical+1, x = horizontal-1; x >= 0 && y < BOARD_SIZE; x--, y++) {
            if (board[x][y] != 0) break;
            possibleMoves.add(Pair.of(x, y));
        }
        for (int y = vertical-1, x = horizontal+1; x < BOARD_SIZE && y >= 0; x++, y--) {
            if (board[x][y] != 0) break;
            possibleMoves.add(Pair.of(x, y));
        }

        return possibleMoves.stream()
                .map(this::mapBoardCoordinatesToTileSignature)
                .collect(Collectors.toSet());
    }

    public Set<String> getDwarfAvailableHurls(String currentPosition) {
        List<Pair<Integer, Integer>> possibleMoves = new ArrayList<>();
        Pair<Integer, Integer> coordinates = mapTileSignatureToBoardCoordinates(currentPosition);

        int vertical = coordinates.getRight();
        int horizontal = coordinates.getLeft();

        //counting Dwarfs to the left
        for (int y = vertical, i = 0; y >= 0; y--, i++) {
            if(board[horizontal][y] != 1 || y == 0) {
                if(board[horizontal][y] == 1) ++i;
                //searching for trolls to the right
                for (int j = 1; j <= i && vertical +j < BOARD_SIZE; j++) {
                    if(board[horizontal][vertical +j] == 2){
                        possibleMoves.add(Pair.of(horizontal, vertical +j));
                        break;
                    } else if (board[horizontal][vertical +j] != 0) break;
                }
                break;
            }
        }
        //counting Dwarfs to the right
        for (int y = vertical, i = 0; y < BOARD_SIZE; y++, i++) {
            if(board[horizontal][y] != 1 || y == BOARD_SIZE-1) {
                if(board[horizontal][y] == 1) ++i;
                //searching for trolls to the left
                for (int j = 1; j <= i && vertical -j >= 0; j++) {
                    if(board[horizontal][vertical -j] == 2){
                        possibleMoves.add(Pair.of(horizontal, vertical -j));
                        break;
                    } else if (board[horizontal][vertical -j] != 0) break;
                }
                break;
            }
        }
        //counting Dwarfs up
        for (int x = horizontal, i = 0; x >= 0; x--, i++) {
            if(board[x][vertical] != 1 || x == 0) {
                if(board[x][vertical] == 1) ++i;
                //searching for trolls down
                for (int j = 1; j <= i && horizontal +j < BOARD_SIZE; j++) {
                    if(board[horizontal +j][vertical] == 2){
                        possibleMoves.add(Pair.of(horizontal +j, vertical));
                        break;
                    } else if (board[horizontal +j][vertical] != 0) break;
                }
                break;
            }
        }
        //counting Dwarfs down
        for (int x = horizontal, i = 0; x < BOARD_SIZE; x++, i++) {
            if(board[x][vertical] != 1 || x == BOARD_SIZE-1) {
                if(board[x][vertical] == 1) ++i;
                //searching for trolls up
                for (int j = 1; j <= i && horizontal -j >= 0; j++) {
                    if(board[horizontal -j][vertical] == 2){
                        possibleMoves.add(Pair.of(horizontal -j, vertical));
                        break;
                    } else if (board[horizontal -j][vertical] != 0) break;
                }
                break;
            }
        }
        //counting Dwarfs in top-left-to-bottom-right diagonal
        for (int x = horizontal, y =vertical, i=0; x < BOARD_SIZE && y < BOARD_SIZE; x++, y++, i++) {
            if(board[x][y] != 1 || x == BOARD_SIZE-1 || y == BOARD_SIZE-1) {
                if(board[x][y] == 1) ++i;
                //searching for trolls
                for (int j = 1; j <= i && horizontal -j >= 0 && vertical -j >= 0; j++) {
                    if(board[horizontal -j][vertical -j] == 2){
                        possibleMoves.add(Pair.of(horizontal -j, vertical -j));
                        break;
                    } else if (board[horizontal -j][vertical -j] != 0) break;
                }
                break;
            }
        }
        //counting Dwarfs in bottom-right-to-top-left diagonal
        for (int x = horizontal, y =vertical, i=0; x >= 0 && y >= 0; x--, y--, i++) {
            if(board[x][y] != 1 || x == 0 || y == 0) {
                if(board[x][y] == 1) ++i;
                //searching for trolls
                for (int j = 1; j <= i && horizontal +j < BOARD_SIZE && vertical +j < BOARD_SIZE ; j++) {
                    if(board[horizontal +j][vertical +j] == 2){
                        possibleMoves.add(Pair.of(horizontal +j, vertical +j));
                        break;
                    } else if (board[horizontal +j][vertical +j] != 0) break;
                }
                break;
            }
        }
        //counting Dwarfs in top-right-to-bottom-left diagonal
        for (int x = horizontal, y =vertical, i=0; x < BOARD_SIZE && y >= 0; x++, y--, i++) {
            if(board[x][y] != 1 || x == BOARD_SIZE-1 || y == 0) {
                if(board[x][y] == 1) ++i;
                //searching for trolls
                for (int j = 1; j <= i && horizontal -j >= 0 && vertical +j < BOARD_SIZE ; j++) {
                    if(board[horizontal -j][vertical +j] == 2){
                        possibleMoves.add(Pair.of(horizontal -j, vertical +j));
                        break;
                    } else if (board[horizontal -j][vertical +j] != 0) break;
                }
                break;
            }
        }
        //counting Dwarfs in bottom-left-to-top-right diagonal
        for (int x = horizontal, y =vertical, i=0; x >= 0 && y < BOARD_SIZE; x--, y++, i++) {
            if(board[x][y] != 1 || x == 0 || y == BOARD_SIZE-1) {
                if(board[x][y] == 1) ++i;
                //searching for trolls
                for (int j = 1; j <= i && horizontal +j < BOARD_SIZE && vertical -j >= 0 ; j++) {
                    if(board[horizontal +j][vertical -j] == 2){
                        possibleMoves.add(Pair.of(horizontal +j, vertical -j));
                        break;
                    } else if (board[horizontal +j][vertical -j] != 0) break;
                }
                break;
            }
        }

        return possibleMoves.stream()
                .map(this::mapBoardCoordinatesToTileSignature)
                .collect(Collectors.toSet());
    }

    public boolean isAnyDwarfOnAdjacentTiles(String position) {
        Set<Pair<Integer, Integer>> surroundings = getSurroundings(position).stream()
                .filter(tile -> board[tile.getLeft()][tile.getRight()] == 1)
                .collect(Collectors.toSet());

        return !surroundings.isEmpty();
    }

    private Set<String> getTrollAvailableMoves(String position) {

        return getSurroundings(position).stream()
                .filter(tile -> board[tile.getLeft()][tile.getRight()] == 0)
                .map(this::mapBoardCoordinatesToTileSignature)
                .collect(Collectors.toSet());
    }

    public Set<String> getTrollAvailableShoves(String currentPosition) {
        List<Pair<Integer, Integer>> possibleMoves = new ArrayList<>();
        Pair<Integer, Integer> coordinates = mapTileSignatureToBoardCoordinates(currentPosition);

        // Searching Dwarfs in X axis
        for (int x = coordinates.getRight(), y = coordinates.getLeft()-1, i=0; y >= 0; y--, i++) {
            if (board[y][x] != 2) {
                for (int j=1, y2 = coordinates.getLeft(); j <= i+1 && y2+j < BOARD_SIZE; j++) {
                    if (board[y2+j][x] != 0) break;
                    if (isAnyDwarfOnAdjacentTiles(mapBoardCoordinatesToTileSignature(Pair.of(y2+j,x)))) {
                        possibleMoves.add(Pair.of(y2+j, x));
                    }
                }
                break;
            }
        }
        for (int x = coordinates.getRight(), y = coordinates.getLeft()+1, i=0; y < BOARD_SIZE; y++, i++) {
            if (board[y][x] != 2) {
                for (int j=1, y2 = coordinates.getLeft(); j <= i+1 && y2-j >= 0; j++) {
                    if (board[y2-j][x] != 0) break;
                    if (isAnyDwarfOnAdjacentTiles(mapBoardCoordinatesToTileSignature(Pair.of(y2-j,x)))) {
                        possibleMoves.add(Pair.of(y2-j, x));
                    }
                }
                break;
            }
        }
        // Searching Dwarfs in Y axis
        for (int y = coordinates.getLeft(), x = coordinates.getRight()-1, i=0; x >= 0; x--, i++) {
            if (board[y][x] != 2) {
                for (int j=1, x2 = coordinates.getRight(); j <= i+1 && x2+j < BOARD_SIZE; j++) {
                    if (board[y][x2+j] != 0) break;
                    if (isAnyDwarfOnAdjacentTiles(mapBoardCoordinatesToTileSignature(Pair.of(y,x2+j)))) {
                        possibleMoves.add(Pair.of(y, x2+j));
                    }
                }
                break;
            }
        }
        for (int y = coordinates.getLeft(), x = coordinates.getRight()+1, i=0; x < BOARD_SIZE; x++, i++) {
            if (board[y][x] != 2) {
                for (int j=1, x2 = coordinates.getRight(); j <= i+1 && x2-j >- 0 ; j++) {
                    if (board[y][x2-j] != 0) break;
                    if (isAnyDwarfOnAdjacentTiles(mapBoardCoordinatesToTileSignature(Pair.of(y,x2-j)))) {
                        possibleMoves.add(Pair.of(y, x2-j));
                    }
                }
                break;
            }
        }
        // Searching Dwarfs in top-left-to-bottom-right diagonal
        for (int y = coordinates.getLeft()-1, x = coordinates.getRight()-1, i=0; x >= 0 && y >= 0; x--, y--, i++) {
            if (board[y][x] != 2) {
                for (int j=1, y2 = coordinates.getLeft(), x2 = coordinates.getRight(); j <= i+1 && x2+j < BOARD_SIZE && y2+j < BOARD_SIZE; j++) {
                    if (board[y2+j][x2+j] != 0) break;
                    if (isAnyDwarfOnAdjacentTiles(mapBoardCoordinatesToTileSignature(Pair.of(y2+j,x2+j)))) {
                        possibleMoves.add(Pair.of(y2+j, x2+j));
                    }
                }
                break;
            }
        }
        for (int y = coordinates.getLeft()+1, x = coordinates.getRight()+1, i=0; x < BOARD_SIZE && y < BOARD_SIZE; x++, y++, i++) {
            if (board[y][x] != 2) {
                for (int j=1, y2 = coordinates.getLeft(), x2 = coordinates.getRight(); j <= i+1 && x2-j >= 0 && y2-j >= 0; j++) {
                    if (board[y2-j][x2-j] != 0) break;
                    if (isAnyDwarfOnAdjacentTiles(mapBoardCoordinatesToTileSignature(Pair.of(y2-j,x2-j)))) {
                        possibleMoves.add(Pair.of(y2-j, x2-j));
                    }
                }
                break;
            }
        }
        // Searching Dwarfs in top-right-to-bottom-left diagonal
        for (int y = coordinates.getLeft()+1, x = coordinates.getRight()-1, i=0; x >= 0 && y < BOARD_SIZE; x--, y++, i++) {
            if (board[y][x] != 2) {
                for (int j=1, y2 = coordinates.getLeft(), x2 = coordinates.getRight(); j <= i+1 && x2+j < BOARD_SIZE && y2-j >= 0 ; j++) {
                    if (board[y2-j][x2+j] != 0) break;
                    if (isAnyDwarfOnAdjacentTiles(mapBoardCoordinatesToTileSignature(Pair.of(y2-j,x2+j)))) {
                        possibleMoves.add(Pair.of(y2-j, x2+j));
                    }
                }
                break;
            }
        }
        for (int y = coordinates.getLeft()-1, x = coordinates.getRight()+1, i=0; x < BOARD_SIZE && y >= 0; x++, y--, i++) {
            if (board[y][x] != 2) {
                for (int j=1, y2 = coordinates.getLeft(), x2 = coordinates.getRight(); j <= i+1 && x2-j >= 0 && y2+j < BOARD_SIZE; j++) {
                    if (board[y2+j][x2-j] != 0) break;
                    if (isAnyDwarfOnAdjacentTiles(mapBoardCoordinatesToTileSignature(Pair.of(y2+j,x2-j)))) {
                        possibleMoves.add(Pair.of(y2+j, x2-j));
                    }
                }
                break;
            }
        }

        return possibleMoves.stream()
                .map(this::mapBoardCoordinatesToTileSignature)
                .collect(Collectors.toSet());
    }

    public Set<Pair<Integer, Integer>> checkForTakenTrollPieceAfterHurl(String to) {
        Pair<Integer, Integer> coordinatesTo = mapTileSignatureToBoardCoordinates(to);

        if(this.board[coordinatesTo.getLeft()][coordinatesTo.getRight()] == 2) {
            return Set.of(coordinatesTo);
        } else return Collections.emptySet();
    }
    public Set<Pair<Integer, Integer>> checkForTakenDwarfPieceAfterShove(String to) {

        return getSurroundings(to).stream()
                .filter(tile -> board[tile.getLeft()][tile.getRight()] == 1)
                .collect(Collectors.toSet());
    }

    private Set<Pair<Integer, Integer>> getSurroundings(String tile) {
        Set<Pair<Integer, Integer>> surroundings = new HashSet<>();
        Pair<Integer, Integer> coordinates = mapTileSignatureToBoardCoordinates(tile);

        int topBorder = -1;
        int bottomBorder = 1;
        int leftBorder = -1;
        int rightBorder = 1;

        if (coordinates.getLeft() == 0) {
            topBorder = 0;
        } else if (coordinates.getLeft() == 14) {
            bottomBorder = 0;
        } else if (coordinates.getRight() == 0) {
            leftBorder = 0;
        } else if (coordinates.getRight() == 14) {
            rightBorder = 0;
        }

        for (int i = coordinates.getLeft() + topBorder; i <= coordinates.getLeft() + bottomBorder; i++) {
            for (int j = coordinates.getRight() + leftBorder; j <= coordinates.getRight() + rightBorder; j++) {
                if (board[i][j] != -1) {
                    surroundings.add(Pair.of(i, j));
                }
            }
        }

        return surroundings;
    }

}
