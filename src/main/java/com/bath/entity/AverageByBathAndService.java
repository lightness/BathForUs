package com.bath.entity;

import javax.persistence.*;


@Entity
@Table(name = "average_by_bath_and_service")
public class AverageByBathAndService extends Identified<Long>
{
    @ManyToOne
    private Bath bath;

    @ManyToOne
    private Service service;

    @Column(name = "avg_value")
    private Double avgValue;


    public Bath getBath() {
        return bath;
    }

    public void setBath(Bath bath) {
        this.bath = bath;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Double getAvgValue() {
        return avgValue;
    }

    public void setAvgValue(Double avgValue) {
        this.avgValue = avgValue;
    }
}
