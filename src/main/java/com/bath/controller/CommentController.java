package com.bath.controller;

import com.bath.entity.Comment;
import com.bath.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping(value = "/")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @RequestMapping(value = "bathes/{bathId}/comments", method = RequestMethod.GET)
    public @ResponseBody Iterable<Comment> findCommentsByBath(
            @PathVariable Long bathId)
    {
        return commentRepository.findByBathIdOrderByDateAsc(bathId);
    }

    @RequestMapping(value="comment", method = RequestMethod.POST)
    public @ResponseBody Comment save(
            @RequestBody Comment comment) {
        return commentRepository.save(comment);
    }

    @RequestMapping(value="comment/{id}", method = RequestMethod.DELETE)
    public @ResponseBody String delete(
            @PathVariable Long id)
    {
        commentRepository.delete(id);
        return "";
    }
}
