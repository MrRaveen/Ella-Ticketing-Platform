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
import com.example.bookTicket.Entity.TicketSeats;
import com.example.bookTicket.Entity.TrainSeatClass;
import com.example.bookTicket.Entity.TrainTime;
import com.example.bookTicket.Entity.Trains;
import com.example.bookTicket.Repository.BookedTicketRepo;
import com.example.bookTicket.Repository.PaymentHistoryRepo;
import com.example.bookTicket.Repository.SeatCountRepo;
import com.example.bookTicket.Repository.SeatInfoRepo;
import com.example.bookTicket.Repository.StationsRepo;
import com.example.bookTicket.Repository.TicketSeatsRepo;
import com.example.bookTicket.Repository.TrainSeatClassRepo;
import com.example.bookTicket.Repository.TrainTimeRepo;
import com.example.bookTicket.Repository.TrainsRepo;
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
	@Autowired
	private TrainsRepo trainsRepo;
	@Autowired
	private TicketSeatsRepo ticketSeatsRepo;
	@Transactional
	public boolean bookingProcess(BookTicketRequest bookTicketRequest) throws Exception {
		try {
			Trains trains;
			List<SeatInfo>allSeatInfoIDList = new ArrayList<SeatInfo>();//stores all seat info ID's
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
							SeatInfo savedSeat = seatInfoRepo.save(newSeat);
							allSeatInfoIDList.add(savedSeat);//add the seat info ID to list
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
	                    //get data for new ticket row (BookedTickets)
						double totalTicketPrice = trainSeatClass.get().getPricePerson() * bookTicketRequest.getReservedSeatCount();
						List<Stations> stations = new ArrayList<Stations>();
						if (!bookTicketRequest.getReturn_location().equals("NO RETURN")) {
							stations = stationsRepo.findByStationNameString(bookTicketRequest.getReturn_location());
						}else {
							stations.add(null);
						}
						//get the trains obj
						int trainTimeIDString = bookTicketRequest.getTrainTimeID();
						if (trainTimeIDString == 0) {
						    throw new RuntimeException("Train time ID is null");
						}
						TrainTime trainTime = trainTimeRepo.findById(trainTimeIDString)
						        .orElseThrow(() -> new RuntimeException("Train time cannot be found"));
						Trains train = trainsRepo.findById(trainTime.getTrains().getTrainID())
						        .orElseThrow(() -> new RuntimeException("Associated train cannot be found from train time"));
						Stations firstStation = null;
						if (!stations.isEmpty()) {
						    firstStation = stations.get(0);
						}
						//save ticket
						BookedTickets newTickets = new BookedTickets(
								bookTicketRequest.getReservedSeatCount(),
								totalTicketPrice, 
								true, 
								LocalDate.now(), 
								firstStation, 
								userAccRepo.findById(bookTicketRequest.getUserAccId()).orElseThrow(), 
								train, 
								newHistory,
								trainTime, 
								trainSeatClass.get());
						BookedTickets savedNewTicket = bookedTicketRepo.save(newTickets);
						if(savedNewTicket != null) {
							allSeatInfoIDList.forEach(seatData -> {
								ticketSeatsRepo.save(new TicketSeats(savedNewTicket, seatData));
							});
						}else {
							throw new RuntimeException("The new ticket is not saved");
						}		
					}else {
						throw new RuntimeException("No seats found");
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
