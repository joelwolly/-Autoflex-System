package org.joel.wollace.resource;


import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.joel.wollace.entity.Product;
import org.joel.wollace.repository.ProductRepository;

import java.util.List;

@Path("/api/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @Inject
    ProductRepository repository;

    @GET
    public List<Product> list(){
        return repository.listAll();
    }

    @POST
    @Transactional
    public Response create(Product product){
        repository.persist(product);
        return Response.status(Response.Status.CREATED).entity(product).build();
    }
}
