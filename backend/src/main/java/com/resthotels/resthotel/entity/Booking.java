package com.resthotels.resthotel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message= "Check In date is required")
    private LocalDate checkInDate;
    @Future(message= "Check Out date must be in the future")
    private LocalDate checkOutDate;
    @Min(value = 1, message = "Number of adults must not be less than 1")
    private int numOfAdults;
    @Min(value = 0, message = "Number of children must not be less than 0")
    private int numOfChildren;
    private int totalNumOfGuests;
    private String  bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    public void calculateTotalNumberOfGuest(){
        this.totalNumOfGuests = this.numOfAdults + this.numOfChildren;
    }

    public void setNumOfAdults(@Min(value = 1, message = "Number of adults must not be less than 1") Integer numOfAdults) {
        this.numOfAdults = numOfAdults;
    }

    public void setNumOfChildren(@Min(value = 0, message = "Number of children must not be less than 0") Integer numOfChilds) {
        this.numOfChildren = numOfChildren;
        calculateTotalNumberOfGuest();
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", checkInDate=" + checkInDate +
                ", checkOutDate=" + checkOutDate +
                ", numOfAdults=" + numOfAdults +
                ", numOfChildren=" + numOfChildren +
                ", totalNumOfGuests=" + totalNumOfGuests +
                ", bookingConfirmationCode='" + bookingConfirmationCode + '\'' +
                ", user=" + user +
                ", room=" + room +
                '}';
    }
}
