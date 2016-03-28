package com.bath.service;

import com.bath.entity.Comment;

public interface CommentService {
    Comment putComment(Long bathId, String text);
}
