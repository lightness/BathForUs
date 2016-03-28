package com.bath.entity;


import org.hibernate.annotations.Immutable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Immutable
@Table(name = "average_by_bath_and_service")
public class AverageByBathAndService {

    @Id
    @Column(name = "bath_id")
    private Long bathId;

    @Column(name = "service_id")
    private Long serviceId;

    @Column(name = "avg_value")
    private Double avgValue;


    public Long getBathId() {
        return bathId;
    }

    public void setBathId(Long bathId) {
        this.bathId = bathId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public Double getAvgValue() {
        return avgValue;
    }

    public void setAvgValue(Double avgValue) {
        this.avgValue = avgValue;
    }
}
