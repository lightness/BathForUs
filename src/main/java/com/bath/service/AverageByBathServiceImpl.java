package com.bath.service;

import com.bath.entity.AverageByBath;
import com.bath.entity.AverageByBathAndUser;
import com.bath.repository.AverageByBathAndUserRepository;
import com.bath.repository.AverageByBathRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AverageByBathServiceImpl implements AverageByBathService {

    @Autowired
    private AverageByBathRepository averageByBathRepository;

    @Autowired
    private AverageByBathAndUserRepository averageByBathAndUserRepository;


    public AverageByBath update(Long bathId) {
        AverageByBath avgByBath = averageByBathRepository.findByBathId(bathId);
        List<AverageByBathAndUser> avgByBathAndUserList = averageByBathAndUserRepository.findByBathId(bathId);
        Double sum = 0D;
        for(AverageByBathAndUser x: avgByBathAndUserList)
        {
            sum += x.getAvgValue();
        }
        avgByBath.setAvgValue(sum / avgByBathAndUserList.size());
        return averageByBathRepository.save(avgByBath);
    }
}
