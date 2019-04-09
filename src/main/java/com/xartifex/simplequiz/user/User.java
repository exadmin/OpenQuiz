package com.xartifex.simplequiz.user;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "USERS")
public class User implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private long Id;

    @Column(name = "USERNAME")
    @NotNull
    @NotEmpty
    private String username;

    @Column(name = "RUSNAME")
    @NotNull
    private String rusName = "";

    @Column(name = "OFFICE")
    @NotNull
    private String office = "";

    @Column(name = "EMAIL", unique = true)
    @NotNull
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @ManyToMany(cascade= CascadeType.ALL,fetch=FetchType.EAGER)
    //todo add unique constraint on USER_ID ROLE_ID pair
    @JoinTable(name="USERS_ROLES",
            joinColumns = {@JoinColumn(name="USER_ID", referencedColumnName="ID")},
            inverseJoinColumns = {@JoinColumn(name="ROLE_ID", referencedColumnName="ID")}
    )
    @NotNull
    @NotEmpty
    private List<Role> roles;

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public String getRusName() {
        return rusName;
    }

    public void setRusName(String rusName) {
        this.rusName = rusName;
    }

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = office;
    }

    @Override
    public String toString() {
        return "User{" +
                "Id=" + Id +
                ", username='" + username + '\'' +
                ", rusName='" + rusName + '\'' +
                ", office='" + office + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                '}';
    }
}