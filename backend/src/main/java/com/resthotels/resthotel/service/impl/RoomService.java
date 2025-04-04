package com.resthotels.resthotel.service.impl;

import com.resthotels.resthotel.dto.Response;
import com.resthotels.resthotel.dto.RoomDTO;
import com.resthotels.resthotel.entity.Room;
import com.resthotels.resthotel.exception.OurException;
import com.resthotels.resthotel.repository.BookingRepository;
import com.resthotels.resthotel.repository.RoomRepository;
import com.resthotels.resthotel.service.AWSS3Service;
import com.resthotels.resthotel.service.interfac.IRoomService;
import com.resthotels.resthotel.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService implements IRoomService
{
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private AWSS3Service awsS3Service;


    @Override
    public Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String roomDescription) {
        Response response = new Response();

        try {
            String imageUrl = awsS3Service.saveImageToS3(photo);
            Room room = new Room();
            room.setRoomPhotoUrl(imageUrl);
            room.setRoomType(roomType);
            room.setRoomPrice(roomPrice);
            room.setRoomDescription(roomDescription);
            Room savedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setRoom(roomDTO);
        }catch (OurException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error saving a room" + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomType();
    }

//    @Override
//    public Response getAllRooms(int page, int size, String keyword) {
//        Response response = new Response();
//
//        try {
//            Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
//            Page<Room> roomPage;
//
//            if (keyword != null && !keyword.trim().isEmpty()) {
//                roomPage = roomRepository.findByKeyword(keyword.trim(), pageable);
//            } else {
//                roomPage = roomRepository.findAll(pageable);
//            }
//
//            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomPage.getContent());
//
//            response.setStatusCode(200);
//            response.setMessage("Successful");
//            response.setRoomList(roomDTOList);
//            response.setTotalPages(roomPage.getTotalPages());
//            response.setCurrentPage(roomPage.getNumber());
//            response.setTotalElements(roomPage.getTotalElements());
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error getting all rooms: " + e.getMessage());
//        }
//
//        return response;
//    }

    @Override
    public Response getAllRooms(int page, int size ) {
        Response response = new Response();


        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));
            Page<Room> roomPage = roomRepository.findAll(pageable);

            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomPage.getContent());

            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setRoomList(roomDTOList);
            response.setTotalPages(roomPage.getTotalPages());
            response.setCurrentPage(roomPage.getNumber());
            response.setTotalElements(roomPage.getTotalElements());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all rooms: " + e.getMessage());
        }

        return response;
    }

//    @Override
//    public Response getAllRooms() {
//        Response response = new Response();
//
//        try {
//            List<Room> roomList = roomRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
//            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
//            response.setStatusCode(200);
//            response.setMessage("Successful");
//            response.setRoomList(roomDTOList);
//        }catch (OurException e){
//            response.setStatusCode(404);
//            response.setMessage(e.getMessage());
//        }catch (Exception e){
//            response.setStatusCode(500);
//            response.setMessage("Error getting all rooms" + e.getMessage());
//        }
//        return response;
//    }


    @Override
    public Response deleteRoomById(Long roomId) {
        Response response = new Response();

        try {
            roomRepository.findById(roomId).orElseThrow(()-> new OurException("Room not found"));
            roomRepository.deleteById(roomId);
            response.setStatusCode(200);
            response.setMessage("Successful");

        }catch (OurException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error getting all rooms" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateRoom(Long roomId,String roomDescription, String roomType, BigDecimal roomPrice, MultipartFile photo) {
        Response response = new Response();

        try {
            String imageUrl = null;
            if (photo != null && !photo.isEmpty()) {
                imageUrl = awsS3Service.saveImageToS3(photo);
            }
            Room room  = roomRepository.findById(roomId).orElseThrow(()-> new OurException("Room not found"));
            if (roomType != null) room.setRoomType(roomType);
            if (roomDescription != null) room.setRoomDescription(roomDescription);
            if (roomPrice != null) room.setRoomPrice(roomPrice);
            if (imageUrl != null) room.setRoomPhotoUrl(imageUrl);

            Room updatedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(updatedRoom);

            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setRoom(roomDTO);

        }catch (OurException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error updating a room" + e.getMessage());
        }
        return response;
    }


    @Override
    public Response getRoomById(Long roomId) {
        Response response = new Response();

        try {
            Room room = roomRepository.findById(roomId).orElseThrow(()-> new OurException("Room not found"));
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTOPlusBookings(room);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setRoom(roomDTO);
        }catch (OurException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error getting a room by id" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        Response response = new Response();

        try {
            List<Room> availableRooms = roomRepository.findAvailableRoomsByDatesAndTypes(checkInDate, checkOutDate, roomType);
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(availableRooms);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setRoomList(roomDTOList);
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error getting a room available" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllAvailableRooms() {
        Response response = new Response();

        try {
            List<Room> roomList = roomRepository.getAllAvailableRooms();
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
            response.setStatusCode(200);
            response.setMessage("Successful");
            response.setRoomList(roomDTOList);
        }catch (OurException e){
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage("Error getting all available rooms" + e.getMessage());
        }
        return response;
    }
}



