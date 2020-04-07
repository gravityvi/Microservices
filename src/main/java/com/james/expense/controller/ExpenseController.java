package com.james.expense.controller;

import com.james.expense.model.Expense;
import com.james.expense.repository.ExpenseRepositry;
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
public class ExpenseController {

    @Autowired
    private ExpenseRepositry expenseRepositry;

    @GetMapping("/expenses")
    Collection<Expense> getExpenses()
    {
        return expenseRepositry.findAll();
    }

    @GetMapping("/expense/{id}")
    ResponseEntity<?> getExpense(@PathVariable Long id)
    {
        Optional<Expense> result=expenseRepositry.findById(id);
        return result.map(expense ->  ResponseEntity.ok().body(result)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/expense")
    ResponseEntity<?> addExpense( @RequestBody Expense expense) throws URISyntaxException
    {
        Expense result=expenseRepositry.save(expense);
        return  ResponseEntity.created(new URI("/api/expense"+result.getId())).body(result);

    }

    @DeleteMapping("/expense/{id}")
    ResponseEntity<?> deleteExpense(@PathVariable Long id)
    {
        expenseRepositry.deleteById(id);
        return ResponseEntity.ok().build();
    }



}
