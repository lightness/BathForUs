package com.bath.controller;

import com.bath.entity.Comment;
import com.bath.repository.CommentRepository;
import com.bath.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping(value = "/")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentService commentService;

    @RequestMapping(value = "bathes/{bathId}/comments", method = RequestMethod.GET)
    public @ResponseBody Iterable<Comment> findCommentsByBath(
            @PathVariable Long bathId)
    {
        return commentRepository.findByBathIdOrderByDateAsc(bathId);
    }

    @RequestMapping(value = "bathes/{bathId}/comment", method = RequestMethod.POST)
    public @ResponseBody Comment save(
            @PathVariable Long bathId,
            @RequestBody Comment comment)
    {
        return commentService.putComment(bathId, comment.getText());
    }


    @RequestMapping(value="comment/{id}", method = RequestMethod.DELETE)
    public @ResponseBody String delete(
            @PathVariable Long id)
    {
        commentRepository.delete(id);
        return "";
    }
}
