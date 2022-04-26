package com.example.moveout;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.bind.DatatypeConverter;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Controller
public class RegisterController {
    private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);
    @Autowired
    private addUser addUser;
    @PostMapping("/registerApi")
    public ResponseEntity<?> loginSubmit(@RequestBody UserClass user) throws NoSuchAlgorithmException {
        String password = user.getPassword();
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(password.getBytes());
        byte[] digest = md.digest();
        String encryptedPassword = DatatypeConverter.printHexBinary(digest).toUpperCase();
            logger.info(user.getFirstName() + "" + user.getLastName() + " " + user.getEmail() + " " + user.getPassword() + " " + user.getPhoneNumber() + " " +encryptedPassword);
            userTable values = new userTable();
            values.setFirstName(user.getFirstName());
            values.setLastName(user.getLastName());
            values.setPhoneNumber(user.getPhoneNumber());
            values.setEmail(user.getEmail());
            values.setPassword(encryptedPassword);
            addUser.save(values);
            return new ResponseEntity<>(user, HttpStatus.OK);

//        else
//            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
