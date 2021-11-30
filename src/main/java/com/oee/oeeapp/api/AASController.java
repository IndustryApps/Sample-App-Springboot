package com.oee.oeeapp.api;

import com.oee.oeeapp.api.request.model.AASRequest;
import com.oee.oeeapp.api.request.model.AssetListRequest;
import com.oee.oeeapp.api.request.model.SubmodelElementRequest;
import com.oee.oeeapp.api.request.model.SubmodelRequest;
import com.oee.oeeapp.service.AASService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/aas")
public class AASController {

    private final AASService aasService;

    @Autowired
    public AASController(AASService aasService) {
        this.aasService = aasService;
    }

    @PostMapping("/list")
    public Object getAASList(@RequestHeader("UserToken") String userToken, @RequestBody AssetListRequest request) {
        return aasService.getAASList(userToken, request);
    }

    @PostMapping("/get")
    public Object getAAS(@RequestHeader("UserToken") String userToken, @RequestBody AASRequest request) {
        return aasService.getAAS(userToken, request);
    }

    @PostMapping("/submodel/list")
    public Object getSubmodelList(@RequestHeader("UserToken") String userToken, @RequestBody AASRequest request) {
        return aasService.getSubmodelList(userToken, request);
    }

    @PostMapping("/submodel/get")
    public Object getSubmodel(@RequestHeader("UserToken") String userToken, @RequestBody SubmodelRequest request) {
        return aasService.getSubmodel(userToken, request);
    }

    @PostMapping("/submodel/elements/list")
    public Object getSubmodelElements(@RequestHeader("UserToken") String userToken, @RequestBody SubmodelRequest request) {
        return aasService.getSubmodelElements(userToken, request);
    }

    @PostMapping("/submodel/element/get")
    public Object getSubmodelElement(@RequestHeader("UserToken") String userToken, @RequestBody SubmodelElementRequest request) {
        return aasService.getSubmodelElement(userToken, request);
    }

    @PostMapping("/submodel/element/value")
    public Object getSubmodelElementValue(@RequestHeader("UserToken") String userToken, @RequestBody SubmodelElementRequest request) {
        return aasService.getSubmodelElementValue(userToken, request);
    }
}
