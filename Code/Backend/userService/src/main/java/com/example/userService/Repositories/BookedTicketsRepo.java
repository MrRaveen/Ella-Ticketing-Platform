package com.example.userService.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.userService.Model.BookedTickets;
@Repository
public interface BookedTicketsRepo extends JpaRepository<BookedTickets, Integer> {
	List<BookedTickets> findByUserID_AccountId(Integer accountId);
	List<BookedTickets> findByUserID_AccountIdAndStatusFalse(Integer accountId);
}
