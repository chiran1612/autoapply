package com.autoapply.app.service;

import com.autoapply.app.model.Loop;
import com.autoapply.app.repository.LoopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LoopService {

    private final LoopRepository loopRepository;
    private final PythonService pythonService;

    public List<Loop> getAllLoops(String userId) {
        return loopRepository.findByUserId(userId);
    }

    public Loop createLoop(Loop loop, String userId) {
        loop.setUserId(userId);
        Loop savedLoop = loopRepository.save(loop);
        
        // Trigger the Python bot to start searching for this new loop
        pythonService.triggerJobSearch(
            savedLoop.getId(), 
            savedLoop.getKeywords(), 
            savedLoop.getLocation()
        );
        
        return savedLoop;
    }

    public void deleteLoop(UUID id) {
        loopRepository.deleteById(id);
    }
}
