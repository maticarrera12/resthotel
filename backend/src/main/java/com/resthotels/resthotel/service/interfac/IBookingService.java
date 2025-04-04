package com.resthotels.resthotel.service.interfac;

import com.resthotels.resthotel.dto.Response;
import com.resthotels.resthotel.entity.Booking;

public interface IBookingService{

    Response saveBooking(Long roomId, Long UserId, Booking bookingRequest);
    Response findBookingByConfirmationCode(String confirmationCode);
    Response getAllBookings();
    Response cancelBooking(Long bookingId);
}
