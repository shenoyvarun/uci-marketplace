package com.example.moveout;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;


@RestController
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);
    @Autowired private ProductRepository productRepository;
    @PostMapping("/addProduct")
    public ResponseEntity<?> productSubmit(@RequestBody ProductClass product) {
        logger.info(product.getPrdName() + " " + product.getPrdType() + " " + product.getPrdCondition());
        ProductTable values = new ProductTable();
        values.setPrd_name(product.getPrdName());
        values.setPrd_price(product.getPrdPrice());
        values.setPrd_type(product.getPrdType());
        values.setPrd_condition(product.getPrdCondition());
        values.setPrd_dec(product.getPrdDec());
        values.setPrd_image(product.getPrdImage());
        values.setUser_id(product.getUserId());
        productRepository.save(values);
        return new ResponseEntity<>(product, HttpStatus.OK);
//        else
//            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/getAllProducts")
    public List<ProductTable> list(){
        return productRepository.findAll();
    }


}