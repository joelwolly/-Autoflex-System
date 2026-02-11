package org.joel.wollace.entity;


import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

@Entity
@Table(name = "RAW_MATERIALS")
public class RawMaterial extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;

    @Column(nullable = false)
    public String name;

    @Column(name = "stock_quantity", nullable = false)
    public Integer stockQuantity;

    @Column(nullable = false, unique = true)
    public String sku;

}




