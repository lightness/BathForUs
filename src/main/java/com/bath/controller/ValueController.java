package com.bath.controller;

import com.bath.entity.Value;
import com.bath.repository.ValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping(value = "/values")
public class ValueController
{
    @Autowired
    private ValueRepository valueRepository;


    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody
    Iterable<Value> findAll()
    {
        return valueRepository.findAll();
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public @ResponseBody Value findOne(
            @PathVariable Long id)
    {
        return valueRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody Value create(
            @RequestBody Value service)
    {
        return valueRepository.save(service);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public @ResponseBody Value update(
            @PathVariable Long id,
            @RequestBody Value service)
    {
        service.setId(id);
        return valueRepository.save(service);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(
            @PathVariable Long id)
    {
        valueRepository.delete(id);
    }
}
