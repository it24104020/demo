package com.example.demo.service;

import com.example.demo.model.WeddingPlan;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class WeddingPlanService {

    private final File file = new File("weddingPlans.json");
    private final ObjectMapper mapper = new ObjectMapper();

    public List<WeddingPlan> getAllPlans() {
        try {
            if (!file.exists()) return new ArrayList<>();
            return mapper.readValue(file, new TypeReference<List<WeddingPlan>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public WeddingPlan addPlan(WeddingPlan plan) {
        List<WeddingPlan> plans = getAllPlans();

        long nextId = plans.stream()
                .mapToLong(WeddingPlan::getId)
                .max()
                .orElse(0) + 1;

        plan.setId(nextId);
        plans.add(plan);

        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(file, plans);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return plan;
    }

    public Optional<WeddingPlan> getPlanById(Long id) {
        return getAllPlans().stream().filter(p -> p.getId().equals(id)).findFirst();
    }

    public Optional<WeddingPlan> updatePlan(Long id, WeddingPlan updatedPlan) {
        List<WeddingPlan> plans = getAllPlans();
        boolean found = false;

        for (int i = 0; i < plans.size(); i++) {
            if (plans.get(i).getId().equals(id)) {
                updatedPlan.setId(id);
                plans.set(i, updatedPlan);
                found = true;
                break;
            }
        }

        if (found) {
            try {
                mapper.writerWithDefaultPrettyPrinter().writeValue(file, plans);
                return Optional.of(updatedPlan);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return Optional.empty();
    }

    public boolean deletePlan(Long id) {
        List<WeddingPlan> plans = getAllPlans();
        boolean removed = plans.removeIf(p -> p.getId().equals(id));

        if (removed) {
            try {
                mapper.writerWithDefaultPrettyPrinter().writeValue(file, plans);
                return true;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return false;
    }
}
