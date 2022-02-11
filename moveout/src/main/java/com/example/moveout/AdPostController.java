package com.example.moveout;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;


@RestController
public class AdPostController{
    @PostMapping("/newad")
    public String newAdSubmit(@ModelAttribute AdClass adv){
        System.out.println(adv.getProduct());
        System.out.println(adv.getCategory());
        System.out.println(adv.getCondition());
        System.out.println(adv.getLocation());
        
        return "landing";
    }
}