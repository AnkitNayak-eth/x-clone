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
@RequestMapping("/tweets") // Public endpoint
public class PublicTweetController {

    @Autowired
    private TweetService tweetService;

    // Public endpoint to get all tweets without authentication
    @GetMapping("/")
public ResponseEntity<List<TweetDto>> getAllTweetsPublic() {
    List<Tweet> tweets = tweetService.findAllTweets();
    List<TweetDto> tweetDtos = TweetDtoMapper.toPublicTweetDtos(tweets);
    return new ResponseEntity<>(tweetDtos, HttpStatus.OK);
}

}

