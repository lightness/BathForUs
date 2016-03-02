package com.bath.repository;

import com.bath.entity.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional(readOnly = true)
public interface MarkRepository extends JpaRepository<Mark, Long>
{
    List<Mark> findByBathId(Long bathId);
}
