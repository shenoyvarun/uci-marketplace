package com.example.moveout;

// public class MoveOutSaleTable {
    
// }


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MoveOutSaleTable {
    private int id;
    private String pname;
    private String pcategory;
    private String pcondition;
    private String plocation;
    // private String catef;

    public MoveOutSaleTable() {
    }

    public MoveOutSaleTable(int id, String name, String category, String condition, String location) {
        this.id = id;
        this.pname = name;
        this.pcategory = category;
        this.pcondition = condition;
        this.plocation = location;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public String getPname(){
        return pname;
    }

    public String getPcategory(){
        return pcategory;
    }

    public String getPlocation(){
        return plocation;
    }

    public String getPcondition(){
        return pcondition;
    }

    public void setId(int id){
        this.id = id;
    }

    public void setPname(String name){
        this.pname = name;
    }

    public void setPcategory(String category){
        this.pcategory = category;
    }

    public void setPcondition(String condition){
        this.pcondition = condition;
    }

    public void setPlocation(String location){
        this.plocation = location;
    }
}