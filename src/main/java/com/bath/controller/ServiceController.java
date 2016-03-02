package com.bath.controller;

import com.bath.entity.Service;
import com.bath.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping(value = "/services")
public class ServiceController
{
    @Autowired
    private ServiceRepository serviceRepository;


    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody Iterable<Service> findAll()
    {
        return serviceRepository.findAll();
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public @ResponseBody Service findOne(
            @PathVariable Long id)
    {
        return serviceRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody Service create(
            @RequestBody Service service)
    {
        return serviceRepository.save(service);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public @ResponseBody Service update(
            @PathVariable Long id,
            @RequestBody Service service)
    {
        service.setId(id);
        return serviceRepository.save(service);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(
            @PathVariable Long id)
    {
        serviceRepository.delete(id);
    }
}
