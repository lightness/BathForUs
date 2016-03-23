package com.bath.dto;

import javax.validation.constraints.NotNull;


public class MarkDto
{
    @NotNull
    private Long serviceId;

    @NotNull
    private Long value;


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
}
