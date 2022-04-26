package com.example.moveout;

import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class RegisterController {
    private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);
    @PostMapping("/registerApi")
    public ResponseEntity<?> loginSubmit(@RequestBody UserClass user){
            logger.info(user.getFirstName() + "" + user.getLastName() + " " + user.getEmail() + " " + user.getPassword());
            return new ResponseEntity<>(user, HttpStatus.OK);
//        else
//            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
