package com.bath.controller;

import com.bath.dto.MarkDto;
import com.bath.entity.Mark;
import com.bath.repository.BathRepository;
import com.bath.repository.MarkRepository;
import com.bath.repository.ServiceRepository;
import com.bath.service.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;


@Controller
@RequestMapping(value = "/")
public class MarkController
{
    @Autowired
    private MarkService markService;
    @Autowired
    private MarkRepository markRepository;
    @Autowired
    private BathRepository bathRepository;
    @Autowired
    private ServiceRepository serviceRepository;


    @RequestMapping(value = "marks/{markId}", method = RequestMethod.DELETE)
    public void deleteMark(
            @PathVariable Long markId)
    {
        markRepository.delete(markId);
    }

    @RequestMapping(value = "bathes/{bathId}/marks", method = RequestMethod.PUT)
    public @ResponseBody Mark setMark(
            @PathVariable Long bathId,
            @RequestBody MarkDto markDto)
    {
        Mark mark = new Mark();
        mark.setBath(bathRepository.findOne(bathId));
        mark.setService(serviceRepository.findOne(markDto.getServiceId()));
        mark.setValue(markDto.getValue());
        return markRepository.save(mark);
    }

    @RequestMapping(value = "bathes/{bathId}/marks/average", method = RequestMethod.GET)
    public @ResponseBody Double findAverageMarkByBath(
            @PathVariable Long bathId)
    {
        return markRepository.findAvgByBathId(bathId);
    }

    @RequestMapping(value = "bathes/{bathId}/marks/my", method = RequestMethod.GET)
    public @ResponseBody Iterable<Mark> findUserMarksByBath(
            @PathVariable Long bathId)
    {
        return markService.findUserMarksByBathId(bathId);
    }

    @RequestMapping(value = "bathes/{bathId}/marks/my/average", method = RequestMethod.GET)
    public @ResponseBody Double findUserAverageMarkByBath(
            @PathVariable Long bathId)
    {
        return markService.findUserAverageMarkByBathId(bathId);
    }

    @RequestMapping(value = "bathes/{bathId}/services/{serviceId}/marks/average", method = RequestMethod.GET)
    public @ResponseBody Double findAverageMarkByBathAndService(
            @PathVariable Long bathId,
            @PathVariable Long serviceId)
    {
        return markRepository.findAvgByBathIdAndServiceId(bathId, serviceId);
    }
}
