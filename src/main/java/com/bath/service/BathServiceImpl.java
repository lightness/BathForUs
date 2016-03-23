package com.bath.service;

import com.bath.dto.BathListItemDto;
import com.bath.entity.Bath;
import com.bath.repository.BathRepository;
import com.bath.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BathServiceImpl implements BathService {

    @Autowired
    private BathRepository bathRepository;

    @Autowired
    private MarkRepository markRepository;


    @Override
    public Page<BathListItemDto> getAllWithPageable(Pageable pageable) {
        Page<Bath> bathes = bathRepository.findAll(pageable);
        List<BathListItemDto> dtos = new ArrayList<>();
        for(Bath bath : bathes){
            BathListItemDto dto = new BathListItemDto();
            dto.setId(bath.getId());
            dto.setAddress(bath.getAddress());
            dto.setInfo(bath.getInfo());
            dto.setPhone(bath.getPhone());
            dto.setTitle(bath.getTitle());
            dto.setAverageMark(markRepository.findAvgByBathId(bath.getId()));
            dtos.add(dto);
        }
        return new PageImpl<BathListItemDto>(dtos, pageable, bathes.getTotalElements());
    }
}
