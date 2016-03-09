package com.bath.controller;

import com.bath.entity.Bath;
import com.bath.repository.BathRepository;
import com.bath.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping(value = "/bathes")
public class BathController
{
    @Autowired
    private BathRepository bathRepository;


    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody Iterable<Bath> findAll(Pageable pageable)
    {
        return bathRepository.findAll(pageable);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public @ResponseBody Bath findOne(
            @PathVariable Long id)
    {
        return bathRepository.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody Bath save(
            @RequestBody Bath bath) {
        return bathRepository.save(bath);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(
            @PathVariable Long id)
    {
        bathRepository.delete(id);
    }
}
