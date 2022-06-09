package com.example.moveout;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;


@RestController
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);
    @Autowired private ProductRepository productRepository;
    @PostMapping("/addProduct")
    public ResponseEntity<?> productSubmit(@RequestBody ProductClass product) {
        logger.info(product.getprdname() + " " + product.getPrdType() + " " + product.getPrdCondition());
        ProductTable values = new ProductTable();
        values.setprdname(product.getprdname());
        values.setprdprice(product.getPrdPrice());
        values.setprdtype(product.getPrdType());
        values.setprdcondition(product.getPrdCondition());
        values.setprddec(product.getPrdDec());
        values.setprdimage(product.getPrdImage());
        values.setuserid(product.getUserId());
        productRepository.save(values);
        return new ResponseEntity<>(product, HttpStatus.OK);
//        else
//            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/getAllProducts")
    public List<ProductTable> list(){
        return productRepository.findAllByStatusEquals(0);
    }

    @PostMapping("/getProductsByName")
    public List<ProductTable> searchSubmit(@RequestBody String product) {
        return productRepository.findByPrdnameContainingOrPrdtypeContainingAndStatusEquals(product.substring(0,  product.length() - 1),product.substring(0,  product.length() - 1), 0 );
    }

    @PostMapping("/getUserProducts")
    public List<ProductTable> productByUser(@RequestBody String product) {
        product = product.replace("%40", "@");
        return productRepository.findByUseridAndStatusEquals(product.substring(0,  product.length() - 1), 0);
    }

    @PostMapping("/getSoldProductsOfUser")
    public List<ProductTable> getSoldProductsOfUser(@RequestBody String product) {
        product = product.replace("%40", "@");
        return productRepository.findByUseridAndStatusEquals(product.substring(0,  product.length() - 1), 1);
    }

    @PostMapping("/deleteProduct")
    public void deleteProduct(@RequestBody String id) {
        id = id.substring(0, id.length() - 1);
        productRepository.deleteById(Integer.parseInt(id));
    }

    @PostMapping("/markAsSold")
    public void markAsSold(@RequestBody String id) {
        id = id.substring(0, id.length() - 1);
        ProductTable product = productRepository.findById(Integer.parseInt(id));
        product.setStatus(1);
        productRepository.save(product);
    }


}