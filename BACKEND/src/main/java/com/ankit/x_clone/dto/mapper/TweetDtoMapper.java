package com.ankit.x_clone.dto.mapper;

import java.util.ArrayList;
import java.util.List;

import com.ankit.x_clone.dto.TweetDto;
import com.ankit.x_clone.dto.UserDto;
import com.ankit.x_clone.model.Tweet;
import com.ankit.x_clone.model.User;
import com.ankit.x_clone.util.TweetUtil;

public class TweetDtoMapper {

    public static TweetDto toTweetDto(Tweet tweet, User requestUser) {
        UserDto user = UserDtoMapper.toUserDto(tweet.getUser());
        boolean isLiked = TweetUtil.isLikedByRequestUser(requestUser, tweet);
        boolean isRetweeted = TweetUtil.isRetweetedByRequestUser(requestUser, tweet);

        List<Long> retweetUserId = new ArrayList<>();
        for (User user1 : tweet.getReTweetUsers()) {
            retweetUserId.add(user1.getId());
        }
        TweetDto tweetDto = new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setContent(tweet.getContent());
        tweetDto.setCreatedAt(tweet.getCreatedAt());
        tweetDto.setImage(tweet.getImage());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweets().size());
        tweetDto.setTotalRetweets(tweet.getReTweetUsers().size());
        tweetDto.setUser(user);
        tweetDto.setLiked(isLiked);
        tweetDto.setRetweet(isRetweeted);
        tweetDto.setRetweetUsersId(retweetUserId);
        tweetDto.setReplyTweets(toTweetDtos(tweet.getReplyTweets(), requestUser));
        tweetDto.setVideo(tweet.getVideo());

        return tweetDto;
    }

    public static List<TweetDto> toTweetDtos(List<Tweet> tweets, User requestUser) {
        List<TweetDto> tweetDtos = new ArrayList<>();
        for (Tweet tweet : tweets) {
            TweetDto tweetDto = toReplyTweetDto(tweet, requestUser);
            tweetDtos.add(tweetDto);
        }
        return tweetDtos;
    }

    private static TweetDto toReplyTweetDto(Tweet tweet, User requestUser) {
        UserDto user = UserDtoMapper.toUserDto(tweet.getUser());
        boolean isLiked = TweetUtil.isLikedByRequestUser(requestUser, tweet);
        boolean isRetweeted = TweetUtil.isRetweetedByRequestUser(requestUser, tweet);

        List<Long> retweetUserId = new ArrayList<>();
        for (User user1 : tweet.getReTweetUsers()) {
            retweetUserId.add(user1.getId());
        }
        TweetDto tweetDto = new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setContent(tweet.getContent());
        tweetDto.setCreatedAt(tweet.getCreatedAt());
        tweetDto.setImage(tweet.getImage());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweets().size());
        tweetDto.setTotalRetweets(tweet.getReTweetUsers().size());
        tweetDto.setUser(user);
        tweetDto.setLiked(isLiked);
        tweetDto.setRetweet(isRetweeted);
        tweetDto.setRetweetUsersId(retweetUserId);
        tweetDto.setVideo(tweet.getVideo());

        return tweetDto;
    }

    public static TweetDto toPublicTweetDto(Tweet tweet) {
        UserDto user = UserDtoMapper.toUserDto(tweet.getUser());

        List<Long> retweetUserId = new ArrayList<>();
        for (User user1 : tweet.getReTweetUsers()) {
            retweetUserId.add(user1.getId());
        }

        TweetDto tweetDto = new TweetDto();
        tweetDto.setId(tweet.getId());
        tweetDto.setContent(tweet.getContent());
        tweetDto.setCreatedAt(tweet.getCreatedAt());
        tweetDto.setImage(tweet.getImage());
        tweetDto.setTotalLikes(tweet.getLikes().size());
        tweetDto.setTotalReplies(tweet.getReplyTweets().size());
        tweetDto.setTotalRetweets(tweet.getReTweetUsers().size());
        tweetDto.setUser(user);
        tweetDto.setLiked(false); // public users are not authenticated
        tweetDto.setRetweet(false);
        tweetDto.setRetweetUsersId(retweetUserId);
        tweetDto.setReplyTweets(toPublicTweetDtos(tweet.getReplyTweets()));
        tweetDto.setVideo(tweet.getVideo());

        return tweetDto;
    }

    public static List<TweetDto> toPublicTweetDtos(List<Tweet> tweets) {
        List<TweetDto> tweetDtos = new ArrayList<>();
        for (Tweet tweet : tweets) {
            tweetDtos.add(toPublicTweetDto(tweet));
        }
        return tweetDtos;
    }

}