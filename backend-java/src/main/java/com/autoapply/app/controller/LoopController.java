package com.autoapply.app.controller;

import com.autoapply.app.model.Loop;
import com.autoapply.app.service.LoopService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/loops")
@RequiredArgsConstructor
public class LoopController {

    private final LoopService loopService;

    @GetMapping
    public List<Loop> getAllLoops(@AuthenticationPrincipal Jwt jwt) {
        String userId = (jwt != null) ? jwt.getSubject() : "test-user-id";
        return loopService.getAllLoops(userId);
    }

    @PostMapping
    public Loop createLoop(@RequestBody Loop loop, @AuthenticationPrincipal Jwt jwt) {
        String userId = (jwt != null) ? jwt.getSubject() : "test-user-id";
        return loopService.createLoop(loop, userId);
    }

    @DeleteMapping("/{id}")
    public void deleteLoop(@PathVariable UUID id) {
        loopService.deleteLoop(id);
    }
}
