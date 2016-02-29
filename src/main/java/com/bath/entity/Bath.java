package com.bath.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;


@Entity
@Table
public class Bath extends AbstractPersistable<Long>
{
    @NotNull
    @Column
    private String title;

    @NotNull
    @Column
    private String address;

    @NotNull
    @Column
    private String phone;

    @Column
    private String info;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "bath")
    private Set<Mark> marks;


    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getAddress()
    {
        return address;
    }

    public void setAddress(String address)
    {
        this.address = address;
    }

    public String getPhone()
    {
        return phone;
    }

    public void setPhone(String phone)
    {
        this.phone = phone;
    }

    public String getInfo()
    {
        return info;
    }

    public void setInfo(String info)
    {
        this.info = info;
    }

    public Set<Mark> getMarks()
    {
        return marks;
    }

    public void setMarks(Set<Mark> marks)
    {
        this.marks = marks;
    }
}
