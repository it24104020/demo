package com.example.demo.model;

public class User {
    private String name;
    private String email;

    public User() {}  // Needed for JSON deserialization

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Getters & setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
