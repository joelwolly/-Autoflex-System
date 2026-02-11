package org.joel.wollace.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;

@Entity
public class ProductionOrder extends PanacheEntity {


    @ManyToOne
    @JoinColumn(name = "product_id")
    public Product product;

    public Integer quantity;
    public LocalDateTime orderDate = LocalDateTime.now();

}
