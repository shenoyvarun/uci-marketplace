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
    private String prdname;
    private String prdprice;
    private String prdtype;
    private String prdcondition;
    private String prddec;
    private String prdimage;
    private String userid;
    private int status;



    public ProductTable() {
    }

    public ProductTable(int id, String prdname, String prdprice, String prdtype, String prdcondition, String prddec, String prdimage, String userid, int status) {
        this.id = id;
        this.prdname = prdname;
        this.prdprice = prdprice;
        this.prdtype = prdtype;
        this.prdcondition = prdcondition;
        this.prddec = prddec;
        this.prdimage = prdimage;
        this.userid = userid;
        this.status = status;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getprdname() {
        return prdname;
    }

    public void setprdname(String prdname) {
        this.prdname = prdname;
    }

    public String getprdprice() {
        return prdprice;
    }

    public void setprdprice(String prdprice) {
        this.prdprice = prdprice;
    }

    public String getprdtype() {
        return prdtype;
    }

    public void setprdtype(String prdtype) {
        this.prdtype = prdtype;
    }

    public String getprdcondition() {
        return prdcondition;
    }

    public void setprdcondition(String prdcondition) {
        this.prdcondition = prdcondition;
    }

    public String getprddec() {
        return prddec;
    }

    public void setprddec(String prddec) {
        this.prddec = prddec;
    }

    public String getprdimage() {
        return prdimage;
    }

    public void setprdimage(String prdimage) {
        this.prdimage = prdimage;
    }

    public String getuserid() {
        return userid;
    }

    public void setuserid(String userid) {
        this.userid = userid;
    }
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}