package com.example.moveout;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ProductRepository extends CrudRepository<ProductTable, Integer> {
    List<ProductTable> findAll();
    List<ProductTable> findAllByStatusEquals(int status);

    List<ProductTable> findByPrdnameContainingAndStatusEqualsOrPrdtypeContainingAndStatusEquals(String name, int status1, String type, int status2);


    List<ProductTable> findByUseridAndStatusEquals(String id, int status);

    public void deleteById(int id);

    ProductTable findById(int id);

}