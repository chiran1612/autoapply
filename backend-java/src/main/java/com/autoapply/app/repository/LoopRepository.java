package com.autoapply.app.repository;

import com.autoapply.app.model.Loop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LoopRepository extends JpaRepository<Loop, UUID> {
    List<Loop> findByUserId(String userId);
}
