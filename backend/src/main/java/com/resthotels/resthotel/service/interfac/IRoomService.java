package com.resthotels.resthotel.service.interfac;

import com.resthotels.resthotel.dto.Response;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IRoomService {

    Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String roomDescription);
    List<String> getAllRoomTypes();
    Response getAllRooms(int page, int size);
    Response deleteRoomById(Long roomId);
    Response updateRoom(Long roomId,String roomDescription, String roomType, BigDecimal roomPrice, MultipartFile photo);
    Response getRoomById(Long roomId);
    Response getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);
    Response getAllAvailableRooms();

}
