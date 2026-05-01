package com.autoapply.app.controller;

import com.autoapply.app.model.Application;
import com.autoapply.app.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping
    public List<Application> getApplications(@AuthenticationPrincipal Jwt jwt) {
        String userId = (jwt != null) ? jwt.getSubject() : "test-user-id";
        return applicationService.getApplicationsByUserId(userId);
    }

    @PatchMapping("/{id}/status")
    public Application updateStatus(
            @PathVariable UUID id, 
            @RequestParam String status) {
        return applicationService.updateStatus(id, status);
    }

    @PostMapping("/apply")
    public Map<String, Object> applyToJob(@RequestBody Map<String, String> request) {
        String jobUrl = request.get("jobUrl");
        // In a real app, we'd fetch the user's profile from the DB
        return applicationService.triggerApply(jobUrl, Map.of());
    }
}
