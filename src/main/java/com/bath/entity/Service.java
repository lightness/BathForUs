package com.bath.entity;


import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
@Table
public class Service extends Identified<Long>
{
    @NotNull
    @Column(nullable = false)
    private String title;

    @NotNull
    @Column(nullable = false)
    private String code;


    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getCode()
    {
        return code;
    }

    public void setCode(String code)
    {
        this.code = code;
    }

    public void setId(Long id)
    {
        super.setId(id);
    }
}
