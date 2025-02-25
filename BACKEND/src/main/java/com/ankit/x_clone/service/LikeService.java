package com.ankit.x_clone.service;

import java.util.List;

import com.ankit.x_clone.exceptions.TweetException;
import com.ankit.x_clone.exceptions.UserException;
import com.ankit.x_clone.model.Like;
import com.ankit.x_clone.model.User;

public interface LikeService{
    public Like likeTweet(Long tweetId, User user) throws UserException, TweetException;

    public List<Like> getAllLikes(Long tweetId) throws TweetException;
}
