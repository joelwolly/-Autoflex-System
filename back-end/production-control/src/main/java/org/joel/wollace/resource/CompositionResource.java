package org.joel.wollace.resource;


import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.joel.wollace.dto.CompositionDTO;
import org.joel.wollace.entity.ProductComposition;
import org.joel.wollace.repository.ProductCompositionRepository;
import org.joel.wollace.repository.ProductRepository;
import org.joel.wollace.repository.RawMaterialRepository;

import java.util.List;

@Path("/api/compositions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CompositionResource {

    @Inject
    ProductCompositionRepository repository;

    @Inject
    ProductRepository productRepository;

    @Inject
    RawMaterialRepository materialRepository;

    @GET
    public List<ProductComposition> list(){
        return repository.listAll();
    }

    @POST
    @Transactional
    public Response create(CompositionDTO dto) {

        var produtoReal = productRepository.findById(dto.productId);

        var materialReal = materialRepository.findById(dto.materialId);


        if (produtoReal == null || materialReal == null) {
            return Response.status(400).entity("Produto e Matéria Prima são obrigatórios").build();
        }

        ProductComposition composition = new ProductComposition();
        composition.product = produtoReal;
        composition.rawMaterial = materialReal;
        composition.requiredQuantity = dto.quantity;

        repository.persist(composition);

        repository.persist(composition);
        return Response.status(Response.Status.CREATED).entity(composition).build();
    }
}
