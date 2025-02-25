package com.ankit.x_clone.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ankit.x_clone.exceptions.TweetException;
import com.ankit.x_clone.exceptions.UserException;
import com.ankit.x_clone.model.Tweet;
import com.ankit.x_clone.model.User;
import com.ankit.x_clone.repository.TweetRepository;
import com.ankit.x_clone.request.TweetReplyRequest;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TweetServiceImplementation implements TweetService{

    @Autowired
    private TweetRepository TweetRepository;

    @Override
    public Tweet createTweet(Tweet request, User user) throws UserException {
        Tweet Tweet = new Tweet();
        Tweet.setContent(request.getContent());
        Tweet.setCreatedAt(LocalDateTime.now());
        Tweet.setImage(request.getImage());
        Tweet.setUser(user);
        Tweet.setReply(false);
        Tweet.setTweet(true);
        Tweet.setVideo(request.getVideo());
        return TweetRepository.save(Tweet);
    }

    @Override
    public List<Tweet> findAllTweets() {
        return TweetRepository.findAllByIsTweetTrueOrderByCreatedAtDesc();
    }

    @Override
    public Tweet reTweet(Long TweetId, User user) throws UserException, TweetException {
        Tweet Tweet = findById(TweetId);
        if (Tweet.getReTweetUsers().contains(user)) {
            Tweet.getReTweetUsers().remove(user);
        } else {
            Tweet.getReTweetUsers().add(user);
        }
        return TweetRepository.save(Tweet);
    }

    @Override
    public Tweet findById(Long TweetId) throws TweetException {
        Tweet Tweet = TweetRepository.findById(TweetId)
                .orElseThrow(() -> new TweetException("Tweet not found with id " + TweetId));
        return Tweet;
    }

    @Override
    public void deleteTweetById(Long TweetId, Long userId) throws TweetException, UserException {
        Tweet Tweet = findById(TweetId);
        if (!userId.equals(Tweet.getUser().getId())) {
            throw new UserException("You can't delete another user's Tweets");
        }
        TweetRepository.deleteById(Tweet.getId());
    }

    @Override
    public Tweet removeFromReTweet(Long TweetId, User user) throws TweetException, UserException {
        return null;
    }

    @Override
    public Tweet createReply(TweetReplyRequest request, User user) throws TweetException {
        Tweet replyFor = findById(request.getTweetId());
        Tweet Tweet = new Tweet();
        Tweet.setContent(request.getContent());
        Tweet.setCreatedAt(LocalDateTime.now());
        Tweet.setImage(request.getImage());
        Tweet.setUser(user);
        Tweet.setReply(true);
        Tweet.setTweet(false);
        Tweet.setReplyFor(replyFor);

        Tweet savedReply = TweetRepository.save(Tweet);
        replyFor.getReplyTweets().add(savedReply);
        TweetRepository.save(replyFor);
        return replyFor;
    }

    @Override
    public List<Tweet> getUserTweet(User user) {
        return TweetRepository.findByReTweetUsersContainsOrUser_idAndIsTweetTrueOrderByCreatedAtDesc(user, user.getId());
    }

    @Override
    public List<Tweet> findByLikesContainsUser(User user) {
        return TweetRepository.findByLikesUser_id(user.getId());
    }
}
