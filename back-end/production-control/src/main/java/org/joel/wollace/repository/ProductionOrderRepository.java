package org.joel.wollace.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.joel.wollace.entity.ProductionOrder;

import java.util.List;

@ApplicationScoped
public class ProductionOrderRepository implements PanacheRepository<ProductionOrder> {

    public List<ProductionOrder> findByProductId(Long productId) {
        return list("product.id", productId);
    }

    public List<ProductionOrder> listAllOrderedByDate() {
        return listAll(io.quarkus.panache.common.Sort.descending("orderDate"));
    }


}
