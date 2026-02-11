package org.joel.wollace.repository;


import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.joel.wollace.entity.RawMaterial;

@ApplicationScoped
public class RawMaterialRepository implements PanacheRepository<RawMaterial> {

    public RawMaterial findByNAME(String name){
        return find("name", name).firstResult();
    }
}
