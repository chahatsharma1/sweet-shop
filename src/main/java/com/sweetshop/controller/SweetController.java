package com.sweetshop.controller;

import com.sweetshop.model.Sweet;
import com.sweetshop.service.SweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sweets")
@RequiredArgsConstructor 
public class SweetController {

    private final SweetService sweetService;

    // Admin only
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> addSweet(@RequestBody Sweet sweet) {
        return ResponseEntity.ok(sweetService.addSweet(sweet));
    }

    @GetMapping
    public ResponseEntity<List<Sweet>> getAllSweets() {
        return ResponseEntity.ok(sweetService.getAllSweets());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Sweet>> searchSweets(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {

        if (name != null) {
            return ResponseEntity.ok(sweetService.searchByName(name));
        }
        if (category != null) {
            return ResponseEntity.ok(sweetService.searchByCategory(category));
        }
        if (minPrice != null && maxPrice != null) {
            return ResponseEntity.ok(sweetService.searchByPriceRange(minPrice, maxPrice));
        }

        return ResponseEntity.badRequest().build();
    }

    // Admin only
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> updateSweet(@PathVariable Long id, @RequestBody Sweet sweet) {
        return ResponseEntity.ok(sweetService.updateSweet(id, sweet));
    }

    // Admin only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteSweet(@PathVariable Long id) {
        sweetService.deleteSweet(id);
        return ResponseEntity.ok("Sweet deleted successfully");
    }

    @PostMapping("/{id}/purchase")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Sweet> purchaseSweet(@PathVariable Long id, @RequestParam int quantity) {
        return ResponseEntity.ok(sweetService.purchaseSweet(id, quantity));
    }

    // Admin only
    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> restockSweet(@PathVariable Long id, @RequestParam int quantity) {
        return ResponseEntity.ok(sweetService.restockSweet(id, quantity));
    }
}