package com.akulprojects.firstproj;

import org.springframework.web.bind.annotation.RestController;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GreetingController {
    @RequestMapping("/hello") 
    public String  hello() {
        String jString = "hello";
        JSONObject obj = new JSONObject();
        obj.put("msg", jString);

        return obj.toString();
    }
}
