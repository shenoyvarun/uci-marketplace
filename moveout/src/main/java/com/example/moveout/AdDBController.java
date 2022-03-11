package com.example.moveout;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.*;


@RestController
public class AdDBController {
    @PostMapping(value = "/addAd", consumes = "application/json")
    public String pushNewAdIntoDB(@RequestBody JSONObject adData){
        System.out.println("reached here somehow");
        System.out.println(adData.toString(4));
        return "trying to add in DB";
    }
        
}
