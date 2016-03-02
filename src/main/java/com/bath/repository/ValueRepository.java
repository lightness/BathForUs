package com.bath.repository;

import com.bath.entity.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;


@Transactional(readOnly = true)
public interface ValueRepository extends JpaRepository<Value, Long>
{
}
