package com.bath.repository;

import com.bath.entity.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional(readOnly = true)
public interface MarkRepository extends JpaRepository<Mark, Long>
{
    List<Mark> findByBathId(Long bathId);

    List<Mark> findByBathIdAndUserId(Long bathId, Long userId);

    Mark findOneByBathIdAndServiceId(Long bathId, Long serviceId);

    Mark findOneByBathIdAndServiceIdAndUserId(Long bathId, Long serviceId, Long userId);

    @Query(value = "select AVG_VALUE from average_by_bath where BATH_ID = :bathId", nativeQuery = true)
    Double findAvgByBathId(@Param("bathId") Long bathId);

    @Query(value = "select AVG_VALUE from average_by_bath_and_user where BATH_ID = :bathId and USER_ID = :userId", nativeQuery = true)
    Double findAvgByBathIdAndUserId(@Param("bathId") Long bathId, @Param("userId") Long userId);

    @Query(value = "select AVG(M.value) from mark M where M.bath_id = :bathId and M.service_id = :serviceId group by M.service_id", nativeQuery = true)
    Double findAvgByBathIdAndServiceId(@Param("bathId") Long bathId, @Param("serviceId") Long serviceId);
}
