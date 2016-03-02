package com.bath.dto;

import javax.validation.constraints.NotNull;


public class MarkDto
{
    @NotNull
    private Long serviceId;

    @NotNull
    private Long valueId;

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

    public Long getValueId()
    {
        return valueId;
    }

    public void setValueId(Long valueId)
    {
        this.valueId = valueId;
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
