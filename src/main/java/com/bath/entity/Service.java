package com.bath.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;


@Entity
@Table
public class Service extends AbstractPersistable<Long>
{
    @NotNull
    @Column(nullable = false)

    private String title;

    @NotNull
    @Column(nullable = false)
    private String code;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "service")
    private Set<Mark> mark;


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

    public Set<Mark> getMark()
    {
        return mark;
    }

    public void setMark(Set<Mark> mark)
    {
        this.mark = mark;
    }

    public void setId(Long id)
    {
        super.setId(id);
    }
}
