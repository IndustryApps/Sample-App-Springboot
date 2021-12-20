package com.oee.oeeapp.feign.client;

import com.oee.oeeapp.feign.config.AASClientConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(value = "demo-app", url = "https://aasgateway.uat.industryapps.net/",
        configuration = AASClientConfig.class)
public interface AASFeignClient {

    @RequestMapping(method = RequestMethod.GET, value = "/aasList")
    Object getAASList(@RequestHeader("UserToken") String userToken,
                      @RequestParam("AssetType") String assetType,
                      @RequestParam("PlantCode") String plantCode);

    @RequestMapping(method = RequestMethod.GET, value = "/aasList/{aasId}")
    Object getAAS(@RequestHeader("UserToken") String userToken, @PathVariable("aasId") String aasId);

    @RequestMapping(method = RequestMethod.GET, value = "/aasList/{aasId}/aas/submodels")
    Object getSubmodels(@RequestHeader("UserToken") String userToken, @PathVariable("aasId") String aasId);

    @RequestMapping(method = RequestMethod.GET, value = "/aasList/{aasId}/aas/submodels/{submodelIdShort}")
    Object getSubmodel(@RequestHeader("UserToken") String userToken, @PathVariable("aasId") String aasId,
                       @PathVariable("submodelIdShort") String submodelIdShort);

    @RequestMapping(method = RequestMethod.GET, value = "/aasList/{aasId}/aas/submodels" +
            "/{submodelIdShort}/submodel/submodelElements")
    Object getSubmodelElements(@RequestHeader("UserToken") String userToken, @PathVariable("aasId") String aasId,
                               @PathVariable("submodelIdShort") String submodelIdShort);

    @RequestMapping(method = RequestMethod.GET, value = "/aasList/{aasId}/aas/submodels" +
            "/{submodelIdShort}/submodel/submodelElements/{submodelElementIdShort}")
    Object getSubmodelElement(@RequestHeader("UserToken") String userToken, @PathVariable("aasId") String aasId,
                              @PathVariable("submodelIdShort") String submodelIdShort,
                              @PathVariable("submodelElementIdShort") String submodelElementIdShort);

    @RequestMapping(method = RequestMethod.GET, value = "/aasList/{aasId}/aas/submodels" +
            "/{submodelIdShort}/submodel/submodelElements/{submodelElementIdShort}/value")
    Object getSubmodelElementValue(@RequestHeader("UserToken") String userToken, @PathVariable("aasId") String aasId,
                                   @PathVariable("submodelIdShort") String submodelIdShort,
                                   @PathVariable("submodelElementIdShort") String submodelElementIdShort);
}
