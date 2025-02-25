package com.ankit.x_clone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.ankit.x_clone.model.Tweet;
import com.ankit.x_clone.model.User;
import java.util.List;

public interface TweetRepository extends JpaRepository<Tweet, Long> {

    List<Tweet> findAllByIsTweetTrueOrderByCreatedAtDesc();

    List<Tweet> findByReTweetUsersContainsOrUser_idAndIsTweetTrueOrderByCreatedAtDesc(User user, Long userId);

    List<Tweet> findByLikesContainingOrderByCreatedAtDesc(User user);

    @Query("SELECT t FROM Tweet t JOIN t.likes l WHERE l.user.id=:userId")
    List<Tweet> findByLikesUser_id(Long userId);

}