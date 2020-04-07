package com.james.expense.controller;

import com.james.expense.model.Category;
import com.james.expense.repository.CategoryRepository;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    Collection<Category> categories()
    {
        return categoryRepository.findAll();
    }

    @GetMapping("/category/{id}")
    ResponseEntity<?> getCategory(@PathVariable Long id)
    {
        Optional<Category> category= categoryRepository.findById(id);
        return category.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/category")
    ResponseEntity<?> addCategory(@Valid @RequestBody Category category) throws URISyntaxException
    {
        Category result=categoryRepository.save(category);
        return ResponseEntity.created(new URI("/api/category"+result.getId())).body(result);

    }

    @PutMapping("category/")
    ResponseEntity<?> upadteCategory(@RequestBody Category category)
    {
       Category result= categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
    }




}
