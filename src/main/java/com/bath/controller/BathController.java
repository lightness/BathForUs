package com.bath.controller;

import com.bath.entity.Bath;
import com.bath.repository.BathRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
@RequestMapping(value = "/")
public class BathController
{
    @Autowired
    private BathRepository bathRepository;


    @RequestMapping(value = "bathes", method = RequestMethod.GET)
    public @ResponseBody Iterable<Bath> findAllBathes()
    {
        return bathRepository.findAll();
    }

    @RequestMapping(value = "bathes/{id}", method = RequestMethod.GET)
    public @ResponseBody Bath findBath(
            @PathVariable Long id)
    {
        return bathRepository.findOne(id);
    }
}
