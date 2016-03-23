package com.bath.controller;

import com.bath.dto.BathListItemDto;
import com.bath.entity.Bath;
import com.bath.repository.BathRepository;
import com.bath.service.BathService;
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

    @Autowired
    private BathService bathService;


    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody Iterable<BathListItemDto> findAll(Pageable pageable)
    {
        return bathService.getAllWithPageable(pageable);
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
    public @ResponseBody String delete(
            @PathVariable Long id)
    {
        bathRepository.delete(id);
        return "";
    }
}
