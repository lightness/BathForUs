package com.bath.entity;

import org.hibernate.annotations.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Immutable
@Table(name = "average_by_bath")
public class AverageByBath {

    @Id
    @Column(name = "bath_id")
    private Long bathId;

    @Column(name = "avg_value")
    private Double avgValue;


    public Long getBathId() {
        return bathId;
    }

    public void setBathId(Long bathId) {
        this.bathId = bathId;
    }

    public Double getAvgValue() {
        return avgValue;
    }

    public void setAvgValue(Double avgValue) {
        this.avgValue = avgValue;
    }
}
