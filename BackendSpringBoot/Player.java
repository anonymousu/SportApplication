package com.example.SportApplication.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Table(name = "players")
//even if u do not set any UI fields here, no error will be received, else json parse exception
@JsonInclude(value=Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Player implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private long id;
	private String userName;
	private String firstName;
	private String lastName;
	private String address;
	private String phoneNo;
	private String email;
	
	//@JsonSerialize(using = BytesSerializer.class)
	//@JsonDeserialize(using = StringtoByteArray.class)
	//@Lob
	private String photo;
	
	private double rating;
	private int noOfMatchesPlayed;
	private int matchesLost;
	private int matchesWon;
	private int matchesDrawn;
	private String fileName;
    private String fileType;
    private boolean addPhoto;
	
	public Player() {
		
	}
	

	public Player(long id, String userName, String firstName, String lastName, String address, String phoneNo,
			String email, String photo, double rating, int noOfMatchesPlayed, int matchesLost, int matchesWon,
			int matchesDrawn, String fileName,String fileType, boolean addPhoto ) {
		super();
		this.id = id;
		this.userName = userName;
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.phoneNo = phoneNo;
		this.email = email;
		this.photo = photo;
		this.rating = rating;
		this.noOfMatchesPlayed = noOfMatchesPlayed;
		this.matchesLost = matchesLost;
		this.matchesWon = matchesWon;
		this.matchesDrawn = matchesDrawn;
		this.fileName = fileName;
		this.fileType = fileType;
		this.addPhoto = addPhoto;
	}
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	@Column(name = "user_name",nullable = false,unique = true)
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	@Column(name = "first_name",nullable = false)
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	@Column(name = "last_name",nullable = false)
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	@Column(nullable = false)
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	@Column(name = "phone_no",nullable = false)
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	@Column(nullable = false)
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	//@Lob
   //@JsonDeserialize(using = StringtoByteArray.class)
	//@JsonSerialize(using = BytesSerializer.class)
	//@JsonDeserialize(using = BytesDeserializer.class)
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	/* public void setPhoto(String photo) {
		if(photo != null && photo != "" && !photo.isEmpty()) {
			this.photo = photo.getBytes();
		}
		else {
			//this.photo = null;
		}
	} */
	//@Column(nullable = false)
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	//@Column(name = "no_of_matches_played",nullable = false)
	public int getNoOfMatchesPlayed() {
		return noOfMatchesPlayed;
	}
	public void setNoOfMatchesPlayed(int noOfMatchesPlayed) {
		this.noOfMatchesPlayed = noOfMatchesPlayed;
	}
	//@Column(name = "matches_lost",nullable = false)
	public int getMatchesLost() {
		return matchesLost;
	}
	public void setMatchesLost(int matchesLost) {
		this.matchesLost = matchesLost;
	}
	//@Column(name = "matches_won",nullable = false)
	public int getMatchesWon() {
		return matchesWon;
	}
	public void setMatchesWon(int matchesWon) {
		this.matchesWon = matchesWon;
	}
	//@Column(name = "matches_drawn",nullable = false)
	public int getMatchesDrawn() {
		return matchesDrawn;
	}
	public void setMatchesDrawn(int matchesDrawn) {
		this.matchesDrawn = matchesDrawn;
	}


	public String getFileName() {
		return fileName;
	}


	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public boolean isAddPhoto() {
		return addPhoto;
	}

	public void setAddPhoto(boolean addPhoto) {
		this.addPhoto = addPhoto;
	}
	
	

}
