package com.oee.oeeapp.api;

import com.oee.oeeapp.api.request.model.AssetListRequest;
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
}
