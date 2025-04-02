package com.akulprojects.firstproj;

import org.springframework.web.bind.annotation.RestController;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class GreetingController {
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/hello")    
    public String  hello() {
        String jString = "lets gooooooooo";
        JSONObject obj = new JSONObject();
        obj.put("msg", jString);

        return obj.toString();
    }
}
