package com.bath.dto;

public class BathDto
{
    private String title;
    private String address;
    private String phone;
    private String info;
    private Double averageMark;


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
}
