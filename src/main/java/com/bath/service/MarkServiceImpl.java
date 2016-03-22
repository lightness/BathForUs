package com.bath.service;

import com.bath.entity.Mark;
import com.bath.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarkServiceImpl implements MarkService {

    @Autowired
    UserService userService;

    @Autowired
    MarkRepository markRepository;


    @Override
    public Iterable<Mark> findUserMarksByBathId(Long bathId) {
        return markRepository.findByBathIdAndUserId(bathId, userService.getCurrentUser().getId());
    }

    @Override
    public Double findUserAverageMarkByBathId(Long bathId) {
        return markRepository.findAvgByBathIdAndUserId(bathId, userService.getCurrentUser().getId());
    }
}
