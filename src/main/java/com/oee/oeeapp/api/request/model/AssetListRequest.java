package com.oee.oeeapp.api.request.model;

public class AssetListRequest {
    private String assetType;
    private String plantCode;

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public String getPlantCode() {
        return plantCode;
    }

    public void setPlantCode(String plantCode) {
        this.plantCode = plantCode;
    }
}
