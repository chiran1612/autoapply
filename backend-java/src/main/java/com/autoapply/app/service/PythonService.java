package com.autoapply.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PythonService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${python.service.url:http://localhost:8000}")
    private String pythonServiceUrl;

    /**
     * Triggers a job search in the Python microservice.
     */
    public void triggerJobSearch(UUID loopId, String keywords, String location) {
        String url = pythonServiceUrl + "/api/jobs/search";
        Map<String, Object> request = Map.of(
            "loop_id", loopId.toString(),
            "keywords", keywords,
            "location", location
        );
        
        try {
            restTemplate.postForObject(url, request, String.class);
        } catch (Exception e) {
            System.err.println("Failed to trigger job search: " + e.getMessage());
        }
    }

    /**
     * Calls Python to parse a resume using Gemini.
     */
    public Map<String, Object> parseResume(byte[] fileBytes, String fileName) {
        String url = pythonServiceUrl + "/api/resume/upload";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(fileBytes) {
            @Override
            public String getFilename() {
                return fileName;
            }
        });

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        try {
            return restTemplate.postForObject(url, requestEntity, Map.class);
        } catch (Exception e) {
            return Map.of("status", "error", "message", e.getMessage());
        }
    }

    /**
     * Calls Python to apply for a job using Playwright.
     */
    public Map<String, Object> triggerJobApply(String jobUrl, Map<String, Object> profile) {
        String url = pythonServiceUrl + "/api/jobs/apply";
        Map<String, Object> request = Map.of(
            "job_url", jobUrl,
            "profile", profile
        );
        
        try {
            return restTemplate.postForObject(url, request, Map.class);
        } catch (Exception e) {
            return Map.of("status", "error", "message", e.getMessage());
        }
    }

    /**
     * Fetches interview invitations from Gmail via the Python worker.
     */
    public List<Map<String, Object>> fetchInterviews() {
        String url = pythonServiceUrl + "/api/gmail/scan";
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response != null && "success".equals(response.get("status"))) {
                return (List<Map<String, Object>>) response.get("interviews");
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch interviews: " + e.getMessage());
        }
        return List.of();
    }
}
