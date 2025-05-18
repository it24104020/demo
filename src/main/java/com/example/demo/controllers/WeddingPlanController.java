package com.example.demo.controllers;

import com.example.demo.model.WeddingPlan;
import com.example.demo.service.WeddingPlanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wedding-plans")
public class WeddingPlanController {

    private final WeddingPlanService weddingPlanService;

    public WeddingPlanController(WeddingPlanService weddingPlanService) {
        this.weddingPlanService = weddingPlanService;
    }

    // Add a wedding plan
    @PostMapping
    public ResponseEntity<WeddingPlan> addWeddingPlan(@RequestBody WeddingPlan plan) {
        WeddingPlan created = weddingPlanService.addPlan(plan);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Get all wedding plans
    @GetMapping
    public ResponseEntity<List<WeddingPlan>> getAllWeddingPlans() {
        List<WeddingPlan> plans = weddingPlanService.getAllPlans();
        return new ResponseEntity<>(plans, HttpStatus.OK);
    }

    // Get a wedding plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<WeddingPlan> getWeddingPlanById(@PathVariable Long id) {
        Optional<WeddingPlan> plan = weddingPlanService.getPlanById(id);
        return plan.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update a wedding plan by ID
    @PutMapping("/{id}")
    public ResponseEntity<WeddingPlan> updateWeddingPlan(@PathVariable Long id, @RequestBody WeddingPlan updatedPlan) {
        Optional<WeddingPlan> updated = weddingPlanService.updatePlan(id, updatedPlan);
        return updated.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Delete a wedding plan by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWeddingPlan(@PathVariable Long id) {
        boolean deleted = weddingPlanService.deletePlan(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
