package com.oee.oeeapp.service.impl;

import com.oee.oeeapp.api.request.model.AASRequest;
import com.oee.oeeapp.api.request.model.AssetListRequest;
import com.oee.oeeapp.api.request.model.SubmodelElementRequest;
import com.oee.oeeapp.api.request.model.SubmodelRequest;
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
        return feignClient.getAASList(userToken, request.getAssetType(), request.getPlantCode());
    }

    @Override
    public Object getAAS(String userToken, AASRequest request) {
        return feignClient.getAAS(userToken, request.getAasId());
    }

    @Override
    public Object getSubmodelList(String userToken, AASRequest request) {
        return feignClient.getSubmodels(userToken, request.getAasId());
    }

    @Override
    public Object getSubmodel(String userToken, SubmodelRequest request) {
        return feignClient.getSubmodel(userToken, request.getAasId(), request.getSubmodelIdShort());
    }

    @Override
    public Object getSubmodelElements(String userToken, SubmodelRequest request) {
        return feignClient.getSubmodelElements(userToken, request.getAasId(), request.getSubmodelIdShort());
    }

    @Override
    public Object getSubmodelElement(String userToken, SubmodelElementRequest request) {
        return feignClient.getSubmodelElement(userToken, request.getAasId(),
                request.getSubmodelIdShort(), request.getSubmodelElementIdShort());
    }

    @Override
    public Object getSubmodelElementValue(String userToken, SubmodelElementRequest request) {
        return feignClient.getSubmodelElementValue(userToken, request.getAasId(),
                request.getSubmodelIdShort(), request.getSubmodelElementIdShort());
    }
}
