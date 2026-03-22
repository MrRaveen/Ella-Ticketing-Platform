package com.example.adminService.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.adminService.Response.TrainInfoResponse;
import com.example.adminService.Entity.TrainClass;
import com.example.adminService.Entity.TrainInfo;
import com.example.adminService.Repository.TrainClassRepo;
import com.example.adminService.Repository.TrainInfoRepo;

@Service
public class CommonServices {

    @Autowired
    private TrainClassRepo trainClassRepo;
    
    @Autowired
    private TrainInfoRepo trainInfoRepo;

    public List<TrainClass> getAllTrainClasses() throws Exception {
        return trainClassRepo.findAll();
    }
    
    public List<com.example.adminService.Response.TrainInfoResponse> getAllTrainInfo() throws Exception {
        try {
            List<TrainInfo> trains = trainInfoRepo.findAll();
            
            return trains.stream().map(train -> {
                // Safely extract the class name
                String className = (train.getTrainClass() != null) 
                        ? train.getTrainClass().getClassName() 
                        : null;
                        
                return new TrainInfoResponse(
                    train.getTrainId(),
                    train.getName(),
                    train.getReportingNo(),
                    train.getEngineCode(),
                    train.getServiceStartedYear(),
                    train.getManufacturedYear(),
                    train.getAvgSpeed(),
                    train.getTotOperationHours(),
                    train.getAccidentsCount(),
                    train.getTrainSeatsCount(),
                    train.getTrainStatus(),
                    className
                );
            }).collect(Collectors.toList());
            
        } catch (Exception e) {
            throw new Exception("Database error occurred while fetching Train Info: " + e.getMessage());
        }
    }
}