package com.ankit.x_clone.util;

import com.ankit.x_clone.model.Like;
import com.ankit.x_clone.model.Tweet;
import com.ankit.x_clone.model.User;

public class TweetUtil {

    public final static boolean isLikedByRequestUser(User requestUser, Tweet tweet) {
        for (Like like : tweet.getLikes()) {
            if (like.getUser().getId().equals(requestUser.getId())) {
                return true;
            }
        }
        return false;
    }

    public final static boolean isRetweetedByRequestUser(User requestUser, Tweet tweet) {
        for (User user : tweet.getReTweetUsers()) {
            if (user.getId().equals(requestUser.getId())) {
                return true;
            }
        }
        return false;
    }
}
