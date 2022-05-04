package com.example.moveout;

// public class MoveOutSaleTable {
    
// }


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProductTable {
    private int id;
    private String prd_name;
    private String prd_price;
    private String prd_type;
    private String prd_condition;
    private String prd_dec;

    public ProductTable() {
    }

    public ProductTable(int id, String prd_name, String prd_price, String prd_type, String prd_condition, String prd_dec) {
        this.id = id;
        this.prd_name = prd_name;
        this.prd_price = prd_price;
        this.prd_type = prd_type;
        this.prd_condition = prd_condition;
        this.prd_dec = prd_dec;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPrd_name() {
        return prd_name;
    }

    public void setPrd_name(String prd_name) {
        this.prd_name = prd_name;
    }

    public String getPrd_price() {
        return prd_price;
    }

    public void setPrd_price(String prd_price) {
        this.prd_price = prd_price;
    }

    public String getPrd_type() {
        return prd_type;
    }

    public void setPrd_type(String prd_type) {
        this.prd_type = prd_type;
    }

    public String getPrd_condition() {
        return prd_condition;
    }

    public void setPrd_condition(String prd_condition) {
        this.prd_condition = prd_condition;
    }

    public String getPrd_dec() {
        return prd_dec;
    }

    public void setPrd_dec(String prd_dec) {
        this.prd_dec = prd_dec;
    }
}