package com.example.moveout;

import org.springframework.data.repository.CrudRepository;

import com.example.moveout.MoveOutSaleTable;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface AdRepository extends CrudRepository<MoveOutSaleTable, Integer> {

}