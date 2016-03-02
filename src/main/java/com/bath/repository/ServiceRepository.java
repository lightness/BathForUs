package com.bath.repository;

import com.bath.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


@Transactional(readOnly = true)
public interface ServiceRepository extends JpaRepository<Service, Long>
{
}
