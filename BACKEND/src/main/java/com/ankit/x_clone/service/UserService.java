package com.ankit.x_clone.service;

import java.util.List;

import com.ankit.x_clone.exceptions.UserException;
import com.ankit.x_clone.model.User;

public interface UserService {

    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;

    public User updateUser(Long userId, User user) throws UserException;

    public User followUser(Long userId, User user) throws UserException;

    public List<User> searchUser(String query);
}
