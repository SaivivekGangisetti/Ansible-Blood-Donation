package com.klef.dev.service;

import com.klef.dev.model.Donor;

import java.util.List;

public interface DonorService {

    Donor addDonor(Donor donor);

    Donor updateDonor(Donor donor);

    void deleteDonor(int id);

    Donor getDonorById(int id);

    List<Donor> getAllDonors();
}
