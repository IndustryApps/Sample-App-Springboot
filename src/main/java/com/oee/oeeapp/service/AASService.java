package com.oee.oeeapp.service;

import com.oee.oeeapp.api.request.model.AASRequest;
import com.oee.oeeapp.api.request.model.AssetListRequest;
import com.oee.oeeapp.api.request.model.SubmodelElementRequest;
import com.oee.oeeapp.api.request.model.SubmodelRequest;

public interface AASService {
    Object getAASList(String userToken, AssetListRequest request);

    Object getAAS(String userToken, AASRequest request);

    Object getSubmodelList(String userToken, AASRequest request);

    Object getSubmodel(String userToken, SubmodelRequest request);

    Object getSubmodelElements(String userToken, SubmodelRequest request);

    Object getSubmodelElement(String userToken, SubmodelElementRequest request);

    Object getSubmodelElementValue(String userToken, SubmodelElementRequest request);
}
