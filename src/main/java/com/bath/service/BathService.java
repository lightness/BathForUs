package com.bath.service;

import com.bath.dto.BathListItemDto;
import org.springframework.data.domain.Pageable;


public interface BathService {
    Iterable<BathListItemDto> getAllWithPageable(Pageable pageable);
}
