package com.ankit.x_clone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ankit.x_clone.dto.LikeDto;
import com.ankit.x_clone.dto.mapper.LikeDtoMapper;
import com.ankit.x_clone.exceptions.TweetException;
import com.ankit.x_clone.exceptions.UserException;
import com.ankit.x_clone.model.Like;
import com.ankit.x_clone.model.User;
import com.ankit.x_clone.service.LikeService;
import com.ankit.x_clone.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LikeController {

    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @PostMapping("/{tweetId}/likes")
    public ResponseEntity<LikeDto> likeTweet(@PathVariable Long tweetId
            , @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        Like like = likeService.likeTweet(tweetId, user);
        LikeDto likeDto = LikeDtoMapper.toLikeDto(like, user);
        return new ResponseEntity<LikeDto>(likeDto, HttpStatus.CREATED);
    }

    @PostMapping("/tweet/{tweetId}")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long tweetId
            , @RequestHeader("Authorization") String jwt) throws UserException, TweetException {
        User user = userService.findUserProfileByJwt(jwt);
        List<Like> likes = likeService.getAllLikes(tweetId);
        List<LikeDto> likeDtos = LikeDtoMapper.toLikeDtos(likes, user);
        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }
}
