package com.bath.service;

import com.bath.entity.Bath;
import com.bath.entity.Mark;
import com.bath.repository.BathRepository;
import com.bath.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class BathServiceImpl implements BathService
{
    @Autowired
    private BathRepository bathRepository;

    @Autowired
    private MarkRepository markRepository;


    @Override
    @Transactional
    public Mark addMark(Mark mark)
    {
        markRepository.save(mark);
        List<Mark> bathMarks = markRepository.findByBathId(mark.getBath().getId());
        Double sum = 0D;
        for (Mark m: bathMarks)
        {
            sum += m.getValue().getValue();
        }
        Bath bath = mark.getBath();
        bath.setAverageMark(sum / bathMarks.size());
        bathRepository.save(bath);
        return mark;
    }
}
