package org.joel.wollace.resource;

import io.quarkus.panache.common.Sort;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.joel.wollace.dto.SuggestionItemDTO;
import org.joel.wollace.dto.SuggestionResponseDTO;
import org.joel.wollace.entity.Product;
import org.joel.wollace.entity.ProductComposition;
import org.joel.wollace.entity.RawMaterial;
import org.joel.wollace.repository.ProductCompositionRepository;
import org.joel.wollace.repository.ProductRepository;
import org.joel.wollace.repository.RawMaterialRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/api/suggestions")
@Produces(MediaType.APPLICATION_JSON)
public class SuggestionResource {

    @Inject
    ProductRepository productRepository;

    @Inject
    RawMaterialRepository materialRepository;

    @Inject
    ProductCompositionRepository compositionRepository;

    @GET
    public SuggestionResponseDTO getSuggestions() {
        SuggestionResponseDTO response = new SuggestionResponseDTO();
        response.suggestions = new ArrayList<>();
        response.grandTotal = 0.0;

        List<Product> products = productRepository.listAll(Sort.descending("price"));

        List<RawMaterial> allMaterials = materialRepository.listAll();
        Map<Long, Integer> virtualStock = new HashMap<>();
        for (RawMaterial rm : allMaterials) {
            virtualStock.put(rm.id, rm.stockQuantity);
        }

        for (Product product : products) {
            List<ProductComposition> recipe = compositionRepository.findByProduct(product.id);

            if (recipe.isEmpty()) {
                continue;
            }

            int maxPossible = Integer.MAX_VALUE;

            for (ProductComposition item : recipe) {
                int currentStock = virtualStock.getOrDefault(item.rawMaterial.id, 0);

                if (item.requiredQuantity > 0) {
                    int possibleWithThisMaterial = currentStock / item.requiredQuantity;
                    if (possibleWithThisMaterial < maxPossible) {
                        maxPossible = possibleWithThisMaterial;
                    }
                }
            }

            if (maxPossible > 0 && maxPossible != Integer.MAX_VALUE) {

                for (ProductComposition item : recipe) {
                    int currentStock = virtualStock.get(item.rawMaterial.id);
                    int amountUsed = maxPossible * item.requiredQuantity;
                    virtualStock.put(item.rawMaterial.id, currentStock - amountUsed);
                }

                SuggestionItemDTO suggestion = new SuggestionItemDTO();
                suggestion.productName = product.name;
                suggestion.productCode = product.code;
                suggestion.quantity = maxPossible;
                suggestion.unitPrice = product.price;
                suggestion.totalValue = maxPossible * product.price;

                response.suggestions.add(suggestion);
                response.grandTotal += suggestion.totalValue;
            }
        }

        return response;
    }
}