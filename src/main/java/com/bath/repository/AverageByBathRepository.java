package com.bath.repository;

import com.bath.entity.AverageByBath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


@Transactional(readOnly = true)
public interface AverageByBathRepository extends JpaRepository<AverageByBath, Long> {
    AverageByBath findByBathId(Long bathId);
}
