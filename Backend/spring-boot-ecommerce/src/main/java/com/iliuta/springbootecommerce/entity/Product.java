package com.iliuta.springbootecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.yaml.snakeyaml.events.Event;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;

@Entity
@Table(name = "product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "sku")
    private String sku;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unit_price")
    private BigDecimal unit_price;

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "active")
    private boolean active;

    @Column(name = "units_in_stock")
    private int units_in_stock;

    @Column(name = "date_created")
    private Date date_created;

    @Column(name = "last_updated")
    private Date last_update;

    @ManyToOne
    @JoinColumn(name = "category_id",nullable = false)
    private ProductCategory category;

}