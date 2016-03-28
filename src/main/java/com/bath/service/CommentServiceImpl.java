package com.bath.service;

import com.bath.entity.Comment;
import com.bath.entity.User;
import com.bath.repository.BathRepository;
import com.bath.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
public class CommentServiceImpl  implements CommentService{

    @Autowired
    UserService userService;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    BathRepository bathRepository;

    @Override
    public Comment putComment(Long bathId, String text){
        User currentUser = userService.getCurrentUser();

        Comment comment = new Comment();
        comment.setBath(bathRepository.findOne(bathId));
        comment.setText(text);
        comment.setUser(currentUser);
        comment.setDate(Calendar.getInstance());

        return commentRepository.save(comment);

    }
}
