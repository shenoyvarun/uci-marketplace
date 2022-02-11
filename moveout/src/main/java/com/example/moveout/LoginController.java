package com.example.moveout;

import com.example.moveout.AdClass;
import com.example.moveout.UserClass;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

	@RequestMapping("/login")
	public String loginPage(Model model) {
		System.out.println("jgkjgk");
        model.addAttribute("user", new UserClass());
		return "login";
	}

    @PostMapping("/landing")
    public String loginSubmit(@ModelAttribute UserClass user, Model model){
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
        if(user.getUsername().equals("buyer1") && user.getPassword().equals("123")){
            model.addAttribute("user", user);
            model.addAttribute("adv", new AdClass());
            return "landing";
        }
        else{
            return "error";
        }
    }

}