package com.example.moveout;

import org.springframework.web.bind.annotation.RestController;
import netscape.javascript.JSObject;
import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.json.JSONObject;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;


@RestController
public class AdPostController{
    @PostMapping("/landing/newad")
    public String newAdSubmit(@ModelAttribute AdClass adv){
        System.out.println(adv.getProduct());
        System.out.println(adv.getCategory());
        System.out.println(adv.getCondition());
        System.out.println(adv.getLocation());

        adv.setUser("buyer1");
        // JSONObject response = new JSObject();
        // response.put("product", adv.getProduct());
        // response.put("category", adv.getCategory());
        // response.put("condition", adv.getCondition());
        // response.put("location", adv.getLocation());
        // response.put("user", "buyer1");
        
        String addIntoDBURL = "http://localhost:8082/addAd";
        // URI uri = new URI(addIntoDBURL);
        HttpEntity<AdClass> request = new HttpEntity<>(adv);
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.postForObject(addIntoDBURL, request, String.class);
        
        return result;
    }
}