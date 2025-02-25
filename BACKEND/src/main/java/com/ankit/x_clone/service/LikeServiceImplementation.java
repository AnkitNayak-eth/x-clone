package com.ankit.x_clone.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ankit.x_clone.exceptions.TweetException;
import com.ankit.x_clone.exceptions.UserException;
import com.ankit.x_clone.model.Like;
import com.ankit.x_clone.model.Tweet;
import com.ankit.x_clone.model.User;
import com.ankit.x_clone.repository.LikeRepository;
import com.ankit.x_clone.repository.TweetRepository;

import java.util.List;

@Service
public class LikeServiceImplementation implements LikeService{

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private TweetService tweetService;

    @Autowired
    private TweetRepository tweetRepository;

    @Override
    public Like likeTweet(Long tweetId, User user) throws UserException, TweetException {
        Like isLikeExist = likeRepository.isLikeExist(user.getId(), tweetId);

        if (isLikeExist != null) {
            likeRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }
        Tweet tweet = tweetService.findById(tweetId);
        Like like = new Like();
        like.setTweet(tweet);
        like.setUser(user);

        Like savedLike = likeRepository.save(like);
        tweet.getLikes().add(savedLike);
        tweetRepository.save(tweet);

        return savedLike;
    }

    @Override
    public List<Like> getAllLikes(Long tweetId) throws TweetException {

        Tweet tweet = tweetService.findById(tweetId);

        List<Like> likes = likeRepository.findByTweetId(tweetId);
        return likes;
    }
}
