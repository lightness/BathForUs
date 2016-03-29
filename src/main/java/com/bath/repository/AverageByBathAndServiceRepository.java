package com.bath.repository;

import com.bath.entity.AverageByBathAndService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


@Transactional(readOnly = true)
public interface AverageByBathAndServiceRepository extends JpaRepository<AverageByBathAndService, Long> {
}
