package com.example.moveout;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
public class LoginController {

	@RequestMapping("/login")
	public String loginPage(Model model) {
        model.addAttribute("user", new UserClass());
		return "login";
	}

    @PostMapping("/landing")
    public ResponseEntity<?> loginSubmit(@RequestBody UserClass user){
        System.out.println(user.getEmail());
        System.out.println(user.getPassword());
        if(user.getEmail().equals("buyer1@gmail.com") && user.getPassword().equals("123")){
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
    }
}