package com.james.expense.repository;

import com.james.expense.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepositry extends JpaRepository<Expense,Long> {
}
