package com.bath.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;


@Entity
@Table
public class Mark extends AbstractPersistable<Long>
{
    @ManyToOne
    private Bath bath;

    @ManyToOne
    private Service service;

    @ManyToOne
    private Value value;

    @Column
    private String comment;


    public Bath getBath()
    {
        return bath;
    }

    public void setBath(Bath bath)
    {
        this.bath = bath;
    }

    public Service getService()
    {
        return service;
    }

    public void setService(Service service)
    {
        this.service = service;
    }

    public Value getValue()
    {
        return value;
    }

    public void setValue(Value value)
    {
        this.value = value;
    }

    public String getComment()
    {
        return comment;
    }

    public void setComment(String comment)
    {
        this.comment = comment;
    }

    public void setId(Long id)
    {
        super.setId(id);
    }
}
