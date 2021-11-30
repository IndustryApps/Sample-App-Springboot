package com.oee.oeeapp.service.impl;

import com.oee.oeeapp.api.request.model.AssetListRequest;
import com.oee.oeeapp.feign.client.AASFeignClient;
import com.oee.oeeapp.service.AASService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AASServiceImpl implements AASService {

    private final AASFeignClient feignClient;

    @Autowired
    public AASServiceImpl(AASFeignClient feignClient) {
        this.feignClient = feignClient;
    }

    @Override
    public Object getAASList(String userToken, AssetListRequest request) {
        return feignClient.getAASList(userToken, request.getAssetType(),
                request.getCompanyDomain(), request.getPlantCode());
    }
}
