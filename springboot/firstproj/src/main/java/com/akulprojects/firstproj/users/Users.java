package com.akulprojects.firstproj.users;

import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "u_id")
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    @JdbcType(value = PostgreSQLEnumJdbcType.class)
    private Role role;

    @Column(name = "is_first_login")
    private boolean isFirstLogin;

    public Users() {}

    public Users(String firstName2, String lastName2, String email2, String password2, Role teacher, boolean b) {
        // sort out id generation
        this.setFirstName(firstName2);
        this.setLastName(lastName2);
        this.setEmail(email2);
        this.setPassword(password2);
        this.setRole(teacher);
        this.setFirstLogin(b);
    }
}
