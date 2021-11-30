package com.oee.oeeapp.service;

import com.oee.oeeapp.api.request.model.AssetListRequest;

public interface AASService {
    Object getAASList(String userToken, AssetListRequest request);
}
