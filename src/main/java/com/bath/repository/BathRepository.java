package com.bath.repository;

import com.bath.entity.Bath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional(readOnly = true)
public interface BathRepository extends JpaRepository<Bath, Long>
{

}
