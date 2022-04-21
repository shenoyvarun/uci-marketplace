package com.example.moveout;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Controller
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);
    @PostMapping("/loginApi")
    public ResponseEntity<?> loginSubmit(@RequestBody UserClass user){
        logger.info(user.getEmail() + " " + user.getPassword());
        if(user.getEmail().equals("buyer1@gmail.com") && user.getPassword().equals("123")){
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }
}