package com.xartifex.simplequiz.user;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "ROLES")
public class Role implements Serializable{

    public Role() {
    }

    public Role(long id, String role) {
        Id = id;
        this.role = role;
    }

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private long Id;

//    @Column(name = "ROLE", unique = true)
    private String role;

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Role role1 = (Role) o;

        if (Id != role1.Id) return false;
        return role.equals(role1.role);
    }

    @Override
    public int hashCode() {
        int result = (int) (Id ^ (Id >>> 32));
        result = 31 * result + role.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Role{" +
                "Id=" + Id +
                ", role='" + role + '\'' +
                '}';
    }
}