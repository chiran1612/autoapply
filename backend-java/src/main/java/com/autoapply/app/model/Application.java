package com.autoapply.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "applications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String platform; // LinkedIn, Indeed, etc.

    @Builder.Default
    private String status = "APPLIED"; // APPLIED, VIEWED, INTERVIEW, REJECTED, OFFER

    @Column(name = "job_url")
    private String jobUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loop_id")
    private Loop loop;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
