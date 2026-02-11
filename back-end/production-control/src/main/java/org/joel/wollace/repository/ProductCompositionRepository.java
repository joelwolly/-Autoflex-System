package org.joel.wollace.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.joel.wollace.entity.ProductComposition;

import java.util.List;

import static io.quarkus.hibernate.orm.panache.PanacheEntityBase.list;

@ApplicationScoped
public class ProductCompositionRepository implements PanacheRepository<ProductComposition> {

    public List<ProductComposition> findByProduct(long productId){
        return  list("product.id", productId);
    }


}
