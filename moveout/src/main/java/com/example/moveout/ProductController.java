package com.example.moveout;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;


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
        productRepository.save(values);
        return new ResponseEntity<>(product, HttpStatus.OK);
//        else
//            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/getAllProducts")
    public List<ProductTable> list(){
        return productRepository.findAll();
    }

    @PostMapping("/getProductsByName")
    public List<ProductTable> searchSubmit(@RequestBody String product) {
        List<ProductTable> search = productRepository.findByprdname(product.substring(0,  product.length() - 1));
        return search;
    }
}