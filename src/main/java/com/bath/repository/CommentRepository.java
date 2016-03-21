package com.bath.repository;

import com.bath.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional(readOnly = true)
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByBathIdOrderByDateAsc(Long bathId);
}
