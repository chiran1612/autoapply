package com.autoapply.app.controller;

import com.autoapply.app.service.ApplicationService;
import com.autoapply.app.service.LoopService;
import com.autoapply.app.service.PythonService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final LoopService loopService;
    private final ApplicationService applicationService;
    private final PythonService pythonService;

    @GetMapping("/stats")
    public Map<String, Object> getStats(@AuthenticationPrincipal Jwt jwt) {
        String userId = (jwt != null) ? jwt.getSubject() : "test-user-id";
        
        long activeLoops = loopService.getAllLoops(userId).stream()
                .filter(l -> "ACTIVE".equals(l.getStatus()))
                .count();
                
        long totalApps = applicationService.getApplicationsByUserId(userId).size();
        int interviews = pythonService.fetchInterviews().size();
        
        return Map.of(
            "activeLoops", activeLoops,
            "totalApplications", totalApps,
            "interviews", interviews,
            "successRate", totalApps > 0 ? (interviews * 100 / totalApps) : 0
        );
    }
}
