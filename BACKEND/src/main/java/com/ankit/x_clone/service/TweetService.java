package com.ankit.x_clone.service;


import java.util.List;

import com.ankit.x_clone.exceptions.TweetException;
import com.ankit.x_clone.exceptions.UserException;
import com.ankit.x_clone.model.Tweet;
import com.ankit.x_clone.model.User;
import com.ankit.x_clone.request.TweetReplyRequest;

public interface TweetService {

    public Tweet createTweet(Tweet request, User user) throws UserException;

    public List<Tweet> findAllTweets();

    public Tweet reTweet(Long tweetId, User user) throws UserException, TweetException;

    public Tweet findById(Long tweetId) throws TweetException;

    public void deleteTweetById(Long tweetId, Long userId) throws TweetException, UserException;

    public Tweet removeFromReTweet(Long tweetId, User user) throws TweetException, UserException;

    public Tweet createReply(TweetReplyRequest request, User user) throws TweetException;

    public List<Tweet> getUserTweet(User user);

    public List<Tweet> findByLikesContainsUser(User user);


}
