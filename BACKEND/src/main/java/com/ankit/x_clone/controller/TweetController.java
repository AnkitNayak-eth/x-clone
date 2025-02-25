package com.ankit.x_clone.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ankit.x_clone.dto.TweetDto;
import com.ankit.x_clone.dto.mapper.TweetDtoMapper;
import com.ankit.x_clone.exceptions.TweetException;
import com.ankit.x_clone.exceptions.UserException;
import com.ankit.x_clone.model.Tweet;
import com.ankit.x_clone.model.User;
import com.ankit.x_clone.request.TweetReplyRequest;
import com.ankit.x_clone.response.ApiResponse;
import com.ankit.x_clone.service.TweetService;
import com.ankit.x_clone.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/tweets")
public class TweetController {

    @Autowired
    private TweetService tweetService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<TweetDto> createTweet(@RequestBody Tweet request
            , @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.createTweet(request, user);
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }

    @PostMapping("/reply")
    public ResponseEntity<TweetDto> replyTweet(@RequestBody TweetReplyRequest request
            , @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.createReply(request, user);
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.CREATED);
    }

    @PutMapping("/{tweetId}/retweet")
    public ResponseEntity<TweetDto> retweet(@PathVariable Long tweetId
            , @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.reTweet(tweetId, user);
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    @GetMapping("/{tweetId}")
    public ResponseEntity<TweetDto> findTweetById(@PathVariable Long tweetId
            , @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        Tweet tweet = tweetService.findById(tweetId);
        TweetDto tweetDto = TweetDtoMapper.toTweetDto(tweet, user);
        return new ResponseEntity<>(tweetDto, HttpStatus.OK);
    }

    @DeleteMapping("/{tweetId}")
    public ResponseEntity<ApiResponse> deleteTweet(@PathVariable Long tweetId
            , @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        tweetService.deleteTweetById(tweetId, user.getId());
        ApiResponse response = new ApiResponse();
        response.setMessage("Tweet deleted Successfully");
        response.setStatus(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<TweetDto>> getAllTweets(@RequestHeader("Authorization") String jwt)
            throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Tweet> tweets = tweetService.findAllTweets();
        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TweetDto>> getUsersAllTweets(@PathVariable Long userId,
            @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Tweet> tweets = tweetService.getUserTweet(user);
        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TweetDto>> findTweetByLikesContainesUser(@PathVariable Long userId
            , @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Tweet> tweets = tweetService.findByLikesContainsUser(user);
        List<TweetDto> tweetDtos = TweetDtoMapper.toTweetDtos(tweets, user);
        return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
    }
}
