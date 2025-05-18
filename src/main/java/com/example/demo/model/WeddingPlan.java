package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true) // Ignores extra JSON fields if any
public class WeddingPlan {
    private Long id;
    private String title;
    private String description;
    private double price;
    private String servicesIncluded;

    public WeddingPlan() {}  // Needed for JSON deserialization

    public WeddingPlan(Long id, String title, String description, double price, String servicesIncluded) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.servicesIncluded = servicesIncluded;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public String getServicesIncluded() {
        return servicesIncluded;
    }
    public void setServicesIncluded(String servicesIncluded) {
        this.servicesIncluded = servicesIncluded;
    }

    // Optional: equals() and hashCode() for list operations
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof WeddingPlan)) return false;
        WeddingPlan that = (WeddingPlan) o;
        return id != null && id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return id == null ? 0 : id.hashCode();
    }
}
