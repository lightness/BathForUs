package com.bath.service;

import com.bath.entity.Mark;
import com.bath.entity.User;
import com.bath.repository.BathRepository;
import com.bath.repository.MarkRepository;
import com.bath.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarkServiceImpl implements MarkService {

    @Autowired
    UserService userService;

    @Autowired
    MarkRepository markRepository;

    @Autowired
    BathRepository bathRepository;

    @Autowired
    ServiceRepository serviceRepository;


    @Override
    public Iterable<Mark> findUserMarksByBathId(Long bathId) {
        return markRepository.findByBathIdAndUserId(bathId, userService.getCurrentUser().getId());
    }

    @Override
    public Double findUserAverageMarkByBathId(Long bathId) {
        return markRepository.findAvgByBathIdAndUserId(bathId, userService.getCurrentUser().getId());
    }

    @Override
    public Mark putMark(Long bathId, Long serviceId, Long value) {
        User currentUser = userService.getCurrentUser();
        Mark mark = markRepository.findOneByBathIdAndServiceIdAndUserId(bathId, serviceId, currentUser.getId());
        if (mark == null) {
            mark = new Mark();
            mark.setBath(bathRepository.findOne(bathId));
            mark.setService(serviceRepository.findOne(serviceId));
            mark.setUser(currentUser);
        }
        mark.setValue(value);
        return markRepository.save(mark);
    }
}
