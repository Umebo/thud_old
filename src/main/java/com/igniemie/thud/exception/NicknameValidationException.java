package com.igniemie.thud.exception;

public class NicknameValidationException extends RuntimeException{
    private final String info;

    public NicknameValidationException(String info) {
        this.info = info;
    }

    public String getInfo() {
        return info;
    }
}
