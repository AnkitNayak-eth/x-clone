package com.ankit.x_clone.util;

import com.ankit.x_clone.model.User;

public class UserUtil {

    public static final boolean isReqUser(User reqUser, User user2) {
        return reqUser.getId().equals(user2.getId());
    }

    public static final boolean isFollowedByReqUser(User reqUser, User user2) {
        return reqUser.getFollowings().contains(user2);
    }
}