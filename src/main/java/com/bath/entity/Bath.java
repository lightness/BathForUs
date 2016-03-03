package com.bath.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;


@Entity
@Table
public class Bath extends AbstractPersistable<Long>
{
    @NotNull
    @Column(nullable = false)
    private String title;

    @NotNull
    @Column(nullable = false)
    private String address;

    @NotNull
    @Column(nullable = false)
    private String phone;

    @Column
    private String info;

    @Column
    private Double averageMark;

//    @OneToMany(fetch = FetchType.EAGER, mappedBy = "bath")
//    @JsonIgnore
//    private Set<Mark> marks;


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

    public Double getAverageMark()
    {
        return averageMark;
    }

    public void setAverageMark(Double averageMark)
    {
        this.averageMark = averageMark;
    }

//    public Set<Mark> getMarks()
//    {
//        return marks;
//    }
//
//    public void setMarks(Set<Mark> marks)
//    {
//        this.marks = marks;
//    }

    public void setId(Long id)
    {
        super.setId(id);
    }
}
