package com.couriermanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String customerRefId;  // unique user Id for each customer
	
	private String courierRefId;  // unique courier Id for each courier

	private String firstName;

	private String lastName;

	private String emailId;

	@JsonIgnore
	private String password;

	private String phoneNo;

	private String role;  

	@OneToOne
	@JoinColumn(name = "address_id")  // each user had one address
	private Address address;

	@ManyToOne
	@JoinColumn(name = "courier_id")  // many dilevry person can be managed by one courier person
	private User courier;    // for delivery person

	private String status;
	
}
