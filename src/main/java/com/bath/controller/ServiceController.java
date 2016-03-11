package com.bath.controller;

import com.bath.entity.Service;
import com.bath.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping(value = "/services")
public class ServiceController
{
    @Autowired
    private ServiceRepository serviceRepository;


    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody Iterable<Service> findAll(Pageable pageable)
    {
        return serviceRepository.findAll(pageable);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public @ResponseBody Service findOne(
            @PathVariable Long id)
    {
        return serviceRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody Service save(
            @RequestBody Service service)
    {
        return serviceRepository.save(service);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public @ResponseBody String delete(
            @PathVariable Long id)
    {
        serviceRepository.delete(id);
        return "";
    }
}
