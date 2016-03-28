package com.bath.entity;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Immutable
@Table(name = "average_by_bath_and_user")
public class AverageByBathAndUser {

    @Id
    @Column(name = "bath_id")
    private Long bathId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "avg_value")
    private Double avgValue;


    public Long getBathId() {
        return bathId;
    }

    public void setBathId(Long bathId) {
        this.bathId = bathId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getAvgValue() {
        return avgValue;
    }

    public void setAvgValue(Double avgValue) {
        this.avgValue = avgValue;
    }
}
