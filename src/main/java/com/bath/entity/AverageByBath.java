package com.bath.entity;

import javax.persistence.*;


@Entity
@Table(name = "average_by_bath")
public class AverageByBath extends Identified<Long>
{
    @OneToOne
    private Bath bath;

    @Column(name = "avg_value")
    private Double avgValue;


    public Bath getBath() {
        return bath;
    }

    public void setBath(Bath bath) {
        this.bath = bath;
    }

    public Double getAvgValue() {
        return avgValue;
    }

    public void setAvgValue(Double avgValue) {
        this.avgValue = avgValue;
    }
}
