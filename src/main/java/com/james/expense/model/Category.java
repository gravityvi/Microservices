package com.james.expense.model;


import lombok.*;

import javax.persistence.*;
import java.util.Set;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy =GenerationType.AUTO)
    private Long id;

    @NonNull
    private String name;


}
