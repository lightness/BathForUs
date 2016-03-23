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

    @Query(value = "select avg(AM.AVG_MARK) from ( select avg(M.value) as AVG_MARK from mark M where M.bath_id = :bathId group by M.user_id ) AM", nativeQuery = true)
    Double findAvgByBathId(@Param("bathId") Long bathId);

    @Query(value = "select AVG(M.value) from mark M where M.bath_id = :bathId and M.user_id = :userId group by M.user_id", nativeQuery = true)
    Double findAvgByBathIdAndUserId(@Param("bathId") Long bathId, @Param("userId") Long userId);

    @Query(value = "select AVG(M.value) from mark M where M.bath_id = :bathId and M.service_id = :serviceId group by M.service_id", nativeQuery = true)
    Double findAvgByBathIdAndServiceId(@Param("bathId") Long bathId, @Param("serviceId") Long serviceId);
}
