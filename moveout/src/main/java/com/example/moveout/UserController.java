package com.example.moveout;

import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired private UserRepository userRepository;
    @PostMapping("/findUserByEmail")
    public UserTable getSellerDetails(@RequestBody ProductTable product) {
        String sellerEmail = product.getuserid();
        logger.info("Seller Details required for email id: " + sellerEmail);
        UserTable productSeller = userRepository.findByEmail(sellerEmail);
        return productSeller;
    }
}
