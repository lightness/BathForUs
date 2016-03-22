package com.bath.service;

import com.bath.entity.Mark;

public interface MarkService {

    Iterable<Mark> findUserMarksByBathId(Long bathId);

    Double findUserAverageMarkByBathId(Long bathId);
}
