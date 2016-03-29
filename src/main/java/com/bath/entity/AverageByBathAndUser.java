package com.bath.entity;

import javax.persistence.*;


@Entity
@Table(name = "average_by_bath_and_user")
public class AverageByBathAndUser extends Identified<Long>
{
    @ManyToOne
    private Bath bath;

    @ManyToOne
    private User user;

    @Column(name = "avg_value")
    private Double avgValue;


    public Bath getBath() {
        return bath;
    }

    public void setBath(Bath bath) {
        this.bath = bath;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getAvgValue() {
        return avgValue;
    }

    public void setAvgValue(Double avgValue) {
        this.avgValue = avgValue;
    }
}
