package com.bath.dto;

import javax.validation.constraints.NotNull;


public class MarkDto
{
    @NotNull
    private Long serviceId;

    @NotNull
    private Long value;

    @NotNull
    private String comment;


    public Long getServiceId()
    {
        return serviceId;
    }

    public void setServiceId(Long serviceId)
    {
        this.serviceId = serviceId;
    }

    public Long getValue()
    {
        return value;
    }

    public void setValue(Long value)
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
}
