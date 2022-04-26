package com.example.moveout;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserTable, Integer> {
    public UserTable findByEmailAndPassword(String email,String password);
}