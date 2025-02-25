package com.ankit.x_clone.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.ankit.x_clone.dto.LikeDto;
import com.ankit.x_clone.dto.TweetDto;
import com.ankit.x_clone.dto.UserDto;
import com.ankit.x_clone.model.Like;
import com.ankit.x_clone.model.User;

public class LikeDtoMapper {

    public static LikeDto toLikeDto(Like like, User requestUser) {
        UserDto user = UserDtoMapper.toUserDto(like.getUser());
        UserDto requestUserDto = UserDtoMapper.toUserDto(requestUser);
        TweetDto tweet = TweetDtoMapper.toTweetDto(like.getTweet(), requestUser);

        LikeDto likeDto = new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setTweet(tweet);
        likeDto.setUser(user);
        return likeDto;
    }

    public static List<LikeDto> toLikeDtos(List<Like> likes, User requestUser) {
        List<LikeDto> likeDtos = new ArrayList<>();
        for (Like like : likes) {
            UserDto user = UserDtoMapper.toUserDto(like.getUser());
            TweetDto tweet = TweetDtoMapper.toTweetDto(like.getTweet(), requestUser);
            LikeDto likeDto = new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setTweet(tweet);
            likeDto.setUser(user);
            likeDtos.add(likeDto);
        }
        return likeDtos;
    }
}
