package com.bath.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Set;


@Entity
@Table
public class Value extends AbstractPersistable<Long>
{
    @NotNull
    @Column
    private String title;

    @NotNull
    @Column
    private String code;

    @NotNull
    @Column
    private Long value;

    @OneToMany(mappedBy = "value")
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

    public Long getValue()
    {
        return value;
    }

    public void setValue(Long value)
    {
        this.value = value;
    }

    public Set<Mark> getMark()
    {
        return mark;
    }

    public void setMark(Set<Mark> mark)
    {
        this.mark = mark;
    }
}
