package com.example.moveout;

import org.apache.tomcat.jni.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;


@Controller
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);
    @Autowired
    private UserRepository UserRepository;
    @PostMapping("/loginApi")
    public ResponseEntity<?> loginSubmit(@RequestBody UserClass user) throws NoSuchAlgorithmException {
        String password = user.getPassword();
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(password.getBytes());
        byte[] digest = md.digest();
        String encryptedPassword = DatatypeConverter.printHexBinary(digest).toUpperCase();
        logger.info(user.getEmail() + " " + user.getPassword() + " " + encryptedPassword);
        UserTable userInfo = UserRepository.findByEmailAndPassword(user.getEmail(), encryptedPassword);
        logger.info(String.valueOf(userInfo));
        if(userInfo != null){
            logger.info(userInfo.getEmail());
            return new ResponseEntity<>(userInfo, HttpStatus.OK);
        } else {
            logger.info("Fail");
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
//        if(user.getEmail().equals("buyer1@gmail.com") && user.getPassword().equals("123")){
//            return new ResponseEntity<>("Success", HttpStatus.OK);
//        }
//        else{
//            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
//        }
    }
}