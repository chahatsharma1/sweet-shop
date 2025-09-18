package com.sweetshop.service;

import com.sweetshop.model.Sweet;
import com.sweetshop.repository.SweetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SweetService {

    private final SweetRepository sweetRepository;

    public Sweet addSweet(Sweet sweet) {
        return sweetRepository.save(sweet);
    }

    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }

    public List<Sweet> searchByName(String name) {
        return sweetRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Sweet> searchByCategory(String category) {
        return sweetRepository.findByCategoryIgnoreCase(category);
    }

    public List<Sweet> searchByPriceRange(Double min, Double max) {
        return sweetRepository.findByPriceBetween(min, max);
    }

    public Sweet updateSweet(Long id, Sweet sweetDetails) {
        Sweet sweet = sweetRepository.findById(id).orElseThrow();
        sweet.setName(sweetDetails.getName());
        sweet.setCategory(sweetDetails.getCategory());
        sweet.setPrice(sweetDetails.getPrice());
        sweet.setQuantity(sweetDetails.getQuantity());
        return sweetRepository.save(sweet);
    }

    public void deleteSweet(Long id) {
        sweetRepository.deleteById(id);
    }

    public Sweet purchaseSweet(Long id, int quantity) {
        Sweet sweet = sweetRepository.findById(id).orElseThrow();
        if (sweet.getQuantity() < quantity) {
            throw new RuntimeException("Not enough stock");
        }
        sweet.setQuantity(sweet.getQuantity() - quantity);
        return sweetRepository.save(sweet);
    }

    public Sweet restockSweet(Long id, int quantity) {
        Sweet sweet = sweetRepository.findById(id).orElseThrow();
        sweet.setQuantity(sweet.getQuantity() + quantity);
        return sweetRepository.save(sweet);
    }
}
