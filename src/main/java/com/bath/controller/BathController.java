package com.bath.controller;

import com.bath.entity.Bath;
import com.bath.repository.BathRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
@RequestMapping(value = "/")
public class BathController
{
    @Autowired
    private BathRepository bathRepository;


    @RequestMapping(method = RequestMethod.GET, value = "bathes")
    public @ResponseBody Iterable<Bath> findAllBathes()
    {
        return bathRepository.findAll();
    }
}
