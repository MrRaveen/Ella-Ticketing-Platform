package com.example.bookTicket.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookTicket.Entity.BookedTickets;
import com.example.bookTicket.Entity.PaymentHistory;
import com.example.bookTicket.Entity.SeatCount;
import com.example.bookTicket.Entity.SeatInfo;
import com.example.bookTicket.Entity.Stations;
import com.example.bookTicket.Entity.TrainSeatClass;
import com.example.bookTicket.Entity.TrainTime;
import com.example.bookTicket.Entity.Trains;
import com.example.bookTicket.Repository.BookedTicketRepo;
import com.example.bookTicket.Repository.PaymentHistoryRepo;
import com.example.bookTicket.Repository.SeatCountRepo;
import com.example.bookTicket.Repository.SeatInfoRepo;
import com.example.bookTicket.Repository.StationsRepo;
import com.example.bookTicket.Repository.TrainSeatClassRepo;
import com.example.bookTicket.Repository.TrainTimeRepo;
import com.example.bookTicket.Repository.UserAccRepo;
import com.example.bookTicket.Request.BookTicketRequest;

import jakarta.transaction.Transactional;
@Service
public class BookTicketProcess {
	@Autowired
	private TrainSeatClassRepo trainSeatClassRepo;
	@Autowired
	private SeatCountRepo seatCountRepo;
	@Autowired
	private SeatInfoRepo seatInfoRepo;
	@Autowired
	private TrainTimeRepo trainTimeRepo;
	@Autowired
	private PaymentHistoryRepo paymentHistoryRepo;
	@Autowired
	private BookedTicketRepo bookedTicketRepo;
	@Autowired
	private StationsRepo stationsRepo;
	@Autowired
	private UserAccRepo userAccRepo;
	@Transactional
	public boolean bookingProcess(BookTicketRequest bookTicketRequest) throws Exception {
		try {
			Trains trains;
			//check the class
			Optional<TrainSeatClass> trainSeatClass = trainSeatClassRepo.findById(bookTicketRequest.getClassId());
			//get seat count by train time id and class id
			List<SeatCount> seatCounts = seatCountRepo.findAllByTrainTime_TimeIDAndTrainSeatClass_ClassID(bookTicketRequest.getTrainTimeID(), bookTicketRequest.getClassId());
			if (trainSeatClass.isPresent() && seatCounts.size() == 1) {
				System.out.println("TEST : " + trainSeatClass.get().getClassNameString());
				//runs for only one time --> seatCounts must contain only one set
				seatCounts.forEach(data->{
					if (data.getSeatRemainingCount() > bookTicketRequest.getReservedSeatCount()) {
						List<String> allSeatsReserved = new ArrayList<String>();
						for (int i = 0; i < bookTicketRequest.getReservedSeatCount(); i++) {
							//get max seat value
							SeatInfo seatInfo = seatInfoRepo.findTopByOrderBySeatIDDesc();
							long seatID;
						    if (seatInfo == null) {
						    	seatInfo = new SeatInfo();
								seatInfo.setSeatID((long) 0);
								seatID = seatInfo.getSeatID();
							}else {
								seatID = seatInfo.getSeatID() + 1;
							}
						    //create the code
							String newSeatCode = "T"+data.getTrainTime().getTimeID()+"C"+data.getTrainSeatClass().getClassID()+"S"+seatID;
							allSeatsReserved.add(newSeatCode);
							//get train time
							TrainTime trainTime = trainTimeRepo.findById(bookTicketRequest.getTrainTimeID())
									.orElseThrow();
							//trains = trainTime.getTrains();
							SeatInfo newSeat = new SeatInfo(true, false, newSeatCode, trainSeatClass.get(), trainTime);
							//save seat
							seatInfoRepo.save(newSeat);
						}
						//set the new seat count
						data.setSeatRemainingCount(data.getSeatRemainingCount() - bookTicketRequest.getReservedSeatCount());
						//update
						seatCountRepo.save(data);
						//make payment history
						PaymentHistory newHistory = new PaymentHistory(true,
								bookTicketRequest.getPaymentType(),
								"PAYHERE", 
								LocalDate.now(), 
								bookTicketRequest.getPaymentStatNumString());
						paymentHistoryRepo.save(newHistory);
						double totalTicketPrice = trainSeatClass.get().getPricePerson() * bookTicketRequest.getReservedSeatCount();
						List<Stations> stations;
						if (!bookTicketRequest.getReturn_location().equals("NO RETURN")) {
							stations = stationsRepo.findByStationNameString(bookTicketRequest.getReturn_location());
						}else {
							stations = new ArrayList<Stations>();
						}
						stations.forEach(stationData -> {
							//save ticket
							BookedTickets newTickets = new BookedTickets(
									bookTicketRequest.getReservedSeatCount(),
									totalTicketPrice, 
									true, 
									LocalDate.now(), 
									stationData, 
									userAccRepo.findById(bookTicketRequest.getUserAccId()).orElseThrow(), 
									null, 
									newHistory,
									null, 
									null);
						});
						//TODO: Save bookedTickets and ticketSeats
					}else {
						//return "no seats"
					}
					System.out.println("TEST 2 : " + String.valueOf(data.getSeatRemainingCount()));
				});
				return true;
			}else {
				return false;
			}
		} catch (Exception e) {
			throw new RuntimeException("Error occured (BookTicketProcess : bookingProcess) : " + e.toString());
		}
	}
}
