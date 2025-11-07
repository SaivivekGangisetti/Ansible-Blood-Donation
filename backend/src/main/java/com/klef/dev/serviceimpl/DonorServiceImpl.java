package com.klef.dev.serviceimpl;

import com.klef.dev.model.Donor;
import com.klef.dev.repository.DonorRepository;
import com.klef.dev.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Override
    public Donor addDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    @Override
    public Donor updateDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    @Override
    public void deleteDonor(int id) {
        donorRepository.deleteById(id);
    }

    @Override
    public Donor getDonorById(int id) {
        Optional<Donor> donor = donorRepository.findById(id);
        return donor.orElse(null);
    }

    @Override
    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }
}
