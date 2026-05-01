package com.autoapply.app.service;

import com.autoapply.app.model.Application;
import com.autoapply.app.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final PythonService pythonService;

    public List<Application> getApplicationsByUserId(String userId) {
        return applicationRepository.findByUserId(userId);
    }

    public List<Application> getApplicationsByLoopId(UUID loopId) {
        return applicationRepository.findByLoopId(loopId);
    }

    public Application updateStatus(UUID id, String status) {
        Application app = applicationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        return applicationRepository.save(app);
    }

    public Map<String, Object> triggerApply(String jobUrl, Map<String, Object> profile) {
        return pythonService.triggerJobApply(jobUrl, profile);
    }
}
