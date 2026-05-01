package com.autoapply.app.controller;

import com.autoapply.app.service.PythonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final PythonService pythonService;

    @PostMapping("/upload")
    public Map<String, Object> uploadResume(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return Map.of("status", "error", "message", "File is empty");
        }

        // Forward to Python AI service
        return pythonService.parseResume(file.getBytes(), file.getOriginalFilename());
    }
}
