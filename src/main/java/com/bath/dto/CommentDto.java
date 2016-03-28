package com.bath.dto;


import javax.validation.constraints.NotNull;
import java.util.Calendar;

public class CommentDto {

    @NotNull
    private String text;

    private Long userId;

    private Long bathId;

    private Calendar date;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getBathId() {
        return bathId;
    }

    public void setBathId(Long bathId) {
        this.bathId = bathId;
    }

    public Calendar getDate() {
        return date;
    }

    public void setDate(Calendar date) {
        this.date = date;
    }
}
