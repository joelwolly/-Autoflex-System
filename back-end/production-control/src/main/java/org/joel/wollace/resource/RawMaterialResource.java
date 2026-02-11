package org.joel.wollace.resource;


import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.joel.wollace.entity.RawMaterial;
import org.joel.wollace.repository.RawMaterialRepository;

import java.util.List;

@Path("/api/materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @Inject
    RawMaterialRepository repository;

    @GET
    public List<RawMaterial> list() {
        return repository.listAll();
    }

    @POST
    @Transactional
    public Response create(RawMaterial material){
        repository.persist(material);
        return Response.status(Response.Status.CREATED).entity(material).build();
    }
}
