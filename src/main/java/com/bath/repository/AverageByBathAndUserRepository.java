package com.bath.repository;

import com.bath.entity.AverageByBathAndUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional(readOnly = true)
public interface AverageByBathAndUserRepository extends JpaRepository<AverageByBathAndUser, Long> {
    List<AverageByBathAndUser> findByBathId(Long bathId);
}
