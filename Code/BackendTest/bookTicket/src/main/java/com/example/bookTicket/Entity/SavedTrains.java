package com.example.bookTicket.Entity;
import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "SAVED_TRAINS")
public class SavedTrains {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SAVED_ID")
	private int savedID;
	@Column(name = "DATE_OF_SAVED")
	private LocalDate dateOfSaved;
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TRAIN_ID", referencedColumnName = "TRAIN_ID", nullable = false)
    private Trains trainID;
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNTID", referencedColumnName = "ACCOUNTID", nullable = false)
    private UserAcc userAcc;
	public int getSavedID() {
		return savedID;
	}
	public void setSavedID(int savedID) {
		this.savedID = savedID;
	}
	public LocalDate getDate() {
		return dateOfSaved;
	}
	public void setDate(LocalDate dateOfSaved) {
		this.dateOfSaved = dateOfSaved;
	}
	public Trains getTrainID() {
		return trainID;
	}
	public void setTrainID(Trains trainID) {
		this.trainID = trainID;
	}
	public UserAcc getUserAcc() {
		return userAcc;
	}
	public void setUserAcc(UserAcc userAcc) {
		this.userAcc = userAcc;
	}
	public SavedTrains(LocalDate dateOfSaved, Trains trainID, UserAcc userAcc) {
		super();
		this.dateOfSaved = dateOfSaved;
		this.trainID = trainID;
		this.userAcc = userAcc;
	}
	public SavedTrains() {
		super();
	}
}
