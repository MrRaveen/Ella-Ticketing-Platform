package com.example.bookTicket.Controller;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookTicket.Entity.UserAcc;
import com.example.bookTicket.Repository.UserAccRepo;
import com.example.bookTicket.Request.BookTicketRequest;
import com.example.bookTicket.Request.TicketSearchRequest;
import com.example.bookTicket.Request.TrainSearchResponse;
import com.example.bookTicket.Response.GetAllLocationsRes;
import com.example.bookTicket.Service.BookTicketProcess;
import com.example.bookTicket.Service.GetTrainData;

import io.jsonwebtoken.Claims;

@RestController
public class AccessPoint {
	@Autowired
	private BookTicketProcess bookTicketProcess;
	@Autowired
	private UserAccRepo userAccRepo;
	@Autowired
	private GetTrainData data;
	
	private final String merchantId = "YOUR_SANDBOX_MERCHANT_ID"; 
    private final String merchantSecret = "YOUR_SANDBOX_MERCHANT_SECRET"; 
    
	//create a ticket
	@PostMapping("/bookTrain")
	public ResponseEntity<?>bookTrainProcess(@RequestAttribute("claims") Claims claims,@RequestBody BookTicketRequest bookTicketRequest){
		try {
			String email = claims.getSubject();
			Optional<UserAcc> obj = userAccRepo.findByEmail(email);
			int userIDString = obj.get().getAccountId();
			bookTicketRequest.setUserAccId(userIDString);
			System.out.println("ID user: " + userIDString);
			if (bookTicketProcess.bookingProcess(bookTicketRequest)) {
				return ResponseEntity.status(200).body("Data saved");	
			}else {
				return ResponseEntity.status(401).body("Data not saved");		
			}		
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured (AccessPoint : bookTrainProcess) : " + e.toString());
		}
	}
	//get train info
	@PostMapping("/getTrainInfo")
	public ResponseEntity<?>getTrainInfo(@RequestBody TicketSearchRequest requestData){
		try {
			TrainSearchResponse res = data.getProcess(requestData);
			return ResponseEntity.status(200).body(res); 
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured (AccessPoint : bookTrainProcess) : " + e.toString());
		}
	}
	@GetMapping("/getBasicDetails")
	public ResponseEntity<?> getBasicDetails() {
	    try {
	        List<GetAllLocationsRes> res = data.getAllStationNames();
	        if (res.isEmpty()) {
	            return ResponseEntity.status(200).body("No stations found");
	        }
	        return ResponseEntity.status(200).body(res);
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body("Error occurred (AccessPoint : getBasicDetails) : " + e.toString());
	    }
	}

    //Generate Hash for React Frontend
    @PostMapping("/generate-hash")
    public Map<String, String> generateHash(@RequestBody Map<String, Object> bookingData) {
        try {
            // Generate a unique order ID for this train booking
            String orderId = "TRAIN-" + System.currentTimeMillis();
            
            // Extract price from your incoming payload
            double amount = Double.parseDouble(bookingData.get("price").toString());
            String currency = "LKR";
            String amountFormatted = String.format("%.2f", amount);

            // Hash generation logic strictly required by PayHere
            String hash = getMd5(merchantId + orderId + amountFormatted + currency + getMd5(merchantSecret));

            Map<String, String> response = new HashMap<>();
            response.put("merchant_id", merchantId);
            response.put("order_id", orderId);
            response.put("amount", amountFormatted);
            response.put("currency", currency);
            response.put("hash", hash);

            return response;
        } catch (Exception e) {
            throw new RuntimeException("Hash generation failed", e);
        }
    }

    // 2. Webhook to receive background status updates from PayHere
    @PostMapping(value = "/notify", consumes = "application/x-www-form-urlencoded")
    public void handlePayHereNotify(
            @RequestParam("merchant_id") String resMerchantId,
            @RequestParam("order_id") String orderId,
            @RequestParam("payhere_amount") String payhereAmount,
            @RequestParam("payhere_currency") String payhereCurrency,
            @RequestParam("status_code") String statusCode,
            @RequestParam("md5sig") String md5sig) {

        String localMd5sig = getMd5(resMerchantId + orderId + payhereAmount + payhereCurrency + statusCode + getMd5(merchantSecret));

        if (localMd5sig.equals(md5sig) && statusCode.equals("2")) {
            System.out.println("Payment successful for order: " + orderId);
        } else {
            System.out.println("Payment failed or invalid signature for order: " + orderId);
        }
    }

    private String getMd5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(input.getBytes());
            BigInteger no = new BigInteger(1, messageDigest);
            String hashtext = no.toString(16).toUpperCase();
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
	@GetMapping("/test")
	public String teString() {
		return "passed";
	}
}
