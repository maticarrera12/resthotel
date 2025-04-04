package com.resthotels.resthotel.service.interfac;

import com.resthotels.resthotel.dto.LoginRequest;
import com.resthotels.resthotel.dto.Response;
import com.resthotels.resthotel.entity.User;

public interface IUserService {
    Response register(User user);
    Response login(LoginRequest loginRequest);
    Response getAllUsers();
    Response getUserBookingHistory(String userId);
    Response deleteUser(String userId);
    Response getUserById(String userId);
    Response getMyInfo(String email);
}
