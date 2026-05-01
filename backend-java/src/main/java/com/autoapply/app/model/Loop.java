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
@Table(name = "loops")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Loop {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String keywords;

    @Builder.Default
    private String status = "ACTIVE"; // ACTIVE, PAUSED

    @Column(name = "applications_count")
    @Builder.Default
    private Integer applicationsCount = 0;

    @Column(name = "user_id", nullable = false)
    private String userId; // Links to Supabase Auth User ID

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
