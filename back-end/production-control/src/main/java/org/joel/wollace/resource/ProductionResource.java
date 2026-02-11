package org.joel.wollace.resource;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.joel.wollace.entity.Product;
import org.joel.wollace.entity.ProductionOrder;
import org.joel.wollace.repository.ProductionOrderRepository;
import java.util.List;

@Path("/api/production")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductionResource {

    @Inject
    ProductionOrderRepository repository;

    @GET
    public List<ProductionOrder> listAll() {
        return repository.listAllOrderedByDate();
    }

    @POST
    @Transactional
    public Response create(ProductionOrder order) {

        if (order == null || order.product == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Dados insuficientes: O produto é obrigatório.")
                    .build();
        }

        Product p = Product.findById(order.product.id);

        if (p == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("Produto não encontrado no banco de dados.")
                    .build();
        }

        order.product = p;
        repository.persist(order);

        repository.getEntityManager().flush();
        repository.getEntityManager().refresh(order);

        return Response.status(Response.Status.CREATED).entity(order).build();
    }
}