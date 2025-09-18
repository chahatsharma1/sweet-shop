package com.sweetshop.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sweets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sweet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String category;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer quantity;
}
