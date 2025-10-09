package com.akulprojects.firstproj.students;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CustomizedStudentsRepoImpl implements CustomizedStudentsRepo {

    private JdbcTemplate template;

    public JdbcTemplate getTemplate() {
        return template;
    }

    @Autowired
    public void setTemplate(JdbcTemplate template) {
        this.template = template;
    }
    
    public int[] saveAll(List<Object[]> students) {
        return template.batchUpdate("INSERT INTO STUDENTS (first_name, last_name, email) VALUES (?, ?, ?)", students);



    }
    
}
