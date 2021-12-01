let aasBaseUrl = "https://aasgateway.uat.industryapps.net";
let euser;
let auth_token;
let language_selected;
let plant_selected;
let company_code;
let plant_list;
let roles;

$(function () {
    const data = getPlatformContext();

    euser = data.euser;
    auth_token = data.auth_token;
    language_selected = data.language_selected;
    plant_selected = data.plant_selected;
    company_code = data.company_code;
    plant_list = JSON.stringify(data.plant_list);
    roles = data.roles.join(", ");
    $("#td-euser").html(euser);
    $("#td-token").html(auth_token);
    $("#td-language").html(language_selected);
    $("#td-plant").html(plant_selected);
    $("#td-companycode").html(company_code);

    let $tdPlantList = $("#td-plant-list");
    let $tdRoles = $("#td-roles");
    $tdPlantList.html(plant_list);
    $tdPlantList.attr("title", plant_list);
    $tdRoles.html(roles);
    $tdRoles.attr("title", roles);

    const companyDomain = euser.split("@")[1];
    const selectedPlant = data.plant_list.filter(function (plant) {
        return plant.plantId == plant_selected;
    });

    $("#company-domain").val(companyDomain);
    $("#plant-code").val(selectedPlant[0].plantCode);

    $('[data-toggle="tooltip"]').tooltip();

    let $btnGetAasList = $("#btn-get-aas-list");
    $btnGetAasList.click(function (e) {
        e.preventDefault();
        enableButton($btnGetAasList, false);

        const assetType = $("#asset-type").val();
        const companyDomain = $("#company-domain").val();
        const plantCode = $("#plant-code").val();

        let requestData = {assetType: assetType, companyDomain: companyDomain, plantCode: plantCode};
        $("#command-area").html("<h5 class='mt-4'>AAS Gateway Request</h5><hr/><pre>GET: https://aasgateway.uat.industryapps.net/aasList?AssetType="
            + assetType + "&CompanyDomain=" + companyDomain + "&PlantCode=" + plantCode + "</pre>")

        executeRequest("/10a43a/aas/list", requestData, function (data) {
            console.log(data);
            enableButton($btnGetAasList, true);
            $('#json-renderer').jsonViewer(data);
            showAASListTable(data);
        }, function (error) {
            console.log(error);
            alert(error);
            enableButton($btnGetAasList, true);
        })
    });

    let $btnGetAas = $("#btn-get-aas");
    $btnGetAas.click(function (e) {
        e.preventDefault();
        enableButton($btnGetAas, false);

        const aasId = $("#aas-id").val();

        let requestData = {aasId: aasId};
        $("#command-area").html("<h5 class='mt-4'>AAS Gateway Request</h5><hr/>" +
            "<pre>GET: https://aasgateway.uat.industryapps.net/aasList/" + aasId + "</pre>")

        executeRequest("/10a43a/aas/get", requestData, function (data) {
            console.log(data);
            enableButton($btnGetAas, true);
            $('#json-renderer').jsonViewer(data);
            showAASListTable([data]);
        }, function (error) {
            console.log(error);
            alert(error);
            enableButton($btnGetAas, true);
        })
    });

    let $btnGetSubmodels = $("#btn-get-submodels");
    $btnGetSubmodels.click(function (e) {
        e.preventDefault();
        enableButton($btnGetSubmodels, false);

        const aasId = $("#aas-id").val();

        let requestData = {aasId: aasId};
        $("#command-area").html("<h5 class='mt-4'>AAS Gateway Request</h5><hr/>" +
            "<pre>GET: https://aasgateway.uat.industryapps.net/aasList/" + aasId + "/aas/submodels</pre>")

        executeRequest("/10a43a/aas/submodel/list", requestData, function (data) {
            console.log(data);
            enableButton($btnGetSubmodels, true);
            $('#json-renderer').jsonViewer(data);
            showSubmodelListTable(data);
        }, function (error) {
            console.log(error);
            alert(error);
            enableButton($btnGetSubmodels, true);
        })
    });

    let $btnGetSubmodel = $("#btn-get-submodel");
    $btnGetSubmodel.click(function (e) {
        e.preventDefault();
        enableButton($btnGetSubmodel, false);

        const aasId = $("#submodel-aas-id").val();
        const submodelIdShort = $("#submodel-id").val();

        let requestData = {aasId: aasId, submodelIdShort: submodelIdShort};
        $("#command-area").html("<h5 class='mt-4'>AAS Gateway Request</h5><hr/>" +
            "<pre>GET: https://aasgateway.uat.industryapps.net/aasList/" + aasId + "/aas/submodels/" + submodelIdShort + "</pre>")

        executeRequest("/10a43a/aas/submodel/get", requestData, function (data) {
            console.log(data);
            enableButton($btnGetSubmodel, true);
            $('#json-renderer').jsonViewer(data);
            showSubmodelListTable([data]);
        }, function (error) {
            console.log(error);
            alert(error);
            enableButton($btnGetSubmodel, true);
        })
    });

    let $btnGetSubmodelElements = $("#btn-get-submodelElements");
    $btnGetSubmodelElements.click(function (e) {
        e.preventDefault();
        enableButton($btnGetSubmodelElements, false);

        const aasId = $("#submodel-aas-id").val();
        const submodelIdShort = $("#submodel-id").val();

        let requestData = {aasId: aasId, submodelIdShort: submodelIdShort};
        $("#command-area").html("<h5 class='mt-4'>AAS Gateway Request</h5><hr/>" +
            "<pre>GET: https://aasgateway.uat.industryapps.net/aasList/" + aasId
            + "/aas/submodels/" + submodelIdShort + "/submodel/submodelElements</pre>")

        executeRequest("/10a43a/aas/submodel/elements/list", requestData, function (data) {
            console.log(data);
            enableButton($btnGetSubmodelElements, true);
            $('#json-renderer').jsonViewer(data);
            showSubmodelElementListTable(data);
        }, function (error) {
            console.log(error);
            alert(error);
            enableButton($btnGetSubmodelElements, true);
        })
    });

    let $btnGetSubmodelElement = $("#btn-get-submodelElement");
    $btnGetSubmodelElement.click(function (e) {
        e.preventDefault();
        enableButton($btnGetSubmodelElement, false);

        const aasId = $("#element-aas-id").val();
        const submodelIdShort = $("#element-submodel-id").val();
        const submodelElementIdShort = $("#element-id").val();

        let requestData = {
            aasId: aasId,
            submodelIdShort: submodelIdShort,
            submodelElementIdShort: submodelElementIdShort
        };
        $("#command-area").html("<h5 class='mt-4'>AAS Gateway Request</h5><hr/>" +
            "<pre>GET: https://aasgateway.uat.industryapps.net/aasList/" + aasId
            + "/aas/submodels/" + submodelIdShort + "/submodel/submodelElements/" + submodelElementIdShort + "</pre>")

        executeRequest("/10a43a/aas/submodel/element/get", requestData, function (data) {
            console.log(data);
            enableButton($btnGetSubmodelElement, true);
            $('#json-renderer').jsonViewer(data);
            showSubmodelElementListTable([data]);
        }, function (error) {
            console.log(error);
            alert(error);
            enableButton($btnGetSubmodelElement, true);
        })
    });

    let $btnGetSubmodelElementValue = $("#btn-get-submodelElementValue");
    $btnGetSubmodelElementValue.click(function (e) {
        e.preventDefault();
        enableButton($btnGetSubmodelElementValue, false);

        const aasId = $("#element-aas-id").val();
        const submodelIdShort = $("#element-submodel-id").val();
        const submodelElementIdShort = $("#element-id").val();

        let requestData = {
            aasId: aasId,
            submodelIdShort: submodelIdShort,
            submodelElementIdShort: submodelElementIdShort
        };
        $("#command-area").html("<h5 class='mt-4'>AAS Gateway Request</h5><hr/>" +
            "<pre>GET: https://aasgateway.uat.industryapps.net/aasList/" + aasId
            + "/aas/submodels/" + submodelIdShort + "/submodel/submodelElements/" + submodelElementIdShort + "/value</pre>")

        executeRequest("/10a43a/aas/submodel/element/value", requestData, function (data) {
            console.log(data);
            enableButton($btnGetSubmodelElementValue, true);
            $('#json-renderer').jsonViewer(data);
            // showAASListTable(data);
        }, function (error) {
            console.log(error);
            alert(error);
            enableButton($btnGetSubmodelElementValue, true);
        })
    });
});

function enableButton($button, enabled) {
    $button.prop('disabled', !enabled);
    if (enabled) {
        $button.find('span').remove();
    } else {
        const loadingSpan = "<span class=\"spinner-grow spinner-grow-sm\" role=\"status\" aria-hidden=\"true\"></span>";
        $button.append(loadingSpan);
    }
}

function executeRequest(url, data, successCallback, failCallback) {
    $.ajax({
        method: "POST",
        url: url,
        headers: {"UserToken": "Bearer " + auth_token},
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
    }).done(successCallback)
        .fail(failCallback);
}

function showAASListTable(data) {
    const header = "<thead>" +
        "<th>idShort</th>" +
        "<th>identifier</th>" +
        "<th>AAS Request URL</th>" +
        "<th>Submodels Request URL</th>" +
        "</thead>" +
        "<tbody></tbody>";
    $("#table-renderer").html(header);

    for (const i in data) {
        let row = data[i];
        let idShort = row["idShort"];
        let identifier = row["identification"]["id"];
        let aasUrl = aasBaseUrl + "/aasList/" + identifier.replace("#", "%23");
        let submodelsUrl = aasBaseUrl + "/aasList/" + identifier.replace("#", "%23") + "/aas/submodels";
        let rowTxt = "<tr>" +
            "<td class=\"text-truncate\" data-placement=\"top\" data-toggle=\"tooltip\" " +
            "                            title=\"" + idShort + "\">" + idShort + "</td>" +
            "<td class=\"text-truncate\" data-placement=\"top\" data-toggle=\"tooltip\" " +
            "                            title=\"" + identifier + "\">" + identifier + "</td>" +
            "<td class=\"text-truncate\" data-placement=\"top\" data-toggle=\"tooltip\" " +
            "                            title=\"" + aasUrl + "\">" + aasUrl + "</td>" +
            "<td class=\"text-truncate\" data-placement=\"top\" data-toggle=\"tooltip\" " +
            "                            title=\"" + submodelsUrl + "\">" + submodelsUrl + "</td>" +
            "</tr>";
        $('#table-renderer > tbody').append(rowTxt);
    }

    $('[data-toggle="tooltip"]').tooltip();
}

function showSubmodelListTable(data) {
    const header = "<thead>" +
        "<th>idShort</th>" +
        "<th>identifier</th>" +
        "<th>Description</th>" +
        "<th>SubmodelElements</th>" +
        "</thead>" +
        "<tbody></tbody>";
    $("#table-renderer").html(header);

    for (const i in data) {
        let row = data[i];
        let idShort = row["idShort"];
        let identifier = row["identification"]["id"];

        let description = row['description'];
        let descHtml = "<ul>";
        if (description !== undefined) {
            for (const j in description) {
                let lang = description[j].language;
                let desc = description[j].description;

                descHtml += "<li>" + lang + ": " + desc + "</li>";
            }
        }
        descHtml += "</ul>";

        let elements = row['submodelElements'];
        let elemHtml = "<ul>";
        if (elements !== undefined) {
            for (const elemId in elements) {
                elemHtml += "<li>" + elements[elemId]["idShort"] + "</li>";
            }
        }
        elemHtml += "</ul>";

        let rowTxt = "<tr>" +
            "<td class=\"text-truncate\" data-placement=\"top\" data-toggle=\"tooltip\" " +
            "                            title=\"" + idShort + "\">" + idShort + "</td>" +
            "<td class=\"text-truncate\" data-placement=\"top\" data-toggle=\"tooltip\" " +
            "                            title=\"" + identifier + "\">" + identifier + "</td>" +
            "<td>" + descHtml + "</td>" +
            "<td>" + elemHtml + "</td>" +
            "</tr>";
        $('#table-renderer > tbody').append(rowTxt);
    }

    $('[data-toggle="tooltip"]').tooltip();
}

function showSubmodelElementListTable(data) {
    const header = "<thead>" +
        "<th>idShort</th>" +
        "<th>semanticId</th>" +
        "<th>modelType</th>" +
        "<th>valueType</th>" +
        "<th>value</th>" +
        "<th>description</th>" +
        "</thead>" +
        "<tbody></tbody>";
    $("#table-renderer").html(header);

    for (const i in data) {
        let row = data[i];
        let idShort = row["idShort"];
        let semanticId = row["semanticId"];
        let semantic = "";
        if (semanticId !== undefined) {
            let keys = semanticId["keys"];
            if (keys !== undefined) {
                for (const k in keys) {
                    semanticId = keys[k];
                    if (semanticId["local"] === true) {
                        semantic = "ConceptDictionary: ";
                    } else {
                        semantic = "EClass: ";
                    }
                    semantic += "<code>" + semanticId["value"] + "</code>";
                }
            }
        }

        let modelType = row["modelType"];
        if (modelType !== undefined) {
            modelType = modelType["name"];
        }

        let valueType = row["valueType"];
        if (valueType !== undefined && valueType["dataObjectType"] !== undefined) {
            valueType = valueType["dataObjectType"]["name"];
        }

        let value = row["value"];
        if (value !== undefined && value instanceof Object) {
            value = JSON.stringify(value);
        }

        let description = row['description'];
        let descHtml = "<ul>";
        if (description !== undefined) {
            for (const j in description) {
                let lang = description[j].language;
                let desc = description[j].description;

                descHtml += "<li>" + lang + ": " + desc + "</li>";
            }
        }
        descHtml += "</ul>";

        let elements = row['submodelElements'];
        let elemHtml = "<ul>";
        if (elements !== undefined) {
            for (const elemId in elements) {
                elemHtml += "<li>" + elemId + "</li>";
            }
        }
        elemHtml += "</ul>";

        let rowTxt = "<tr>" +
            "<td class=\"text-truncate\" data-placement=\"top\" data-toggle=\"tooltip\" " +
            "                            title=\"" + idShort + "\">" + idShort + "</td>" +
            "<td>" + semantic + "</td>" +
            "<td>" + modelType + "</td>" +
            "<td>" + valueType + "</td>" +
            "<td>" + value + "</td>" +
            "<td>" + descHtml + "</td>" +
            "</tr>";
        $('#table-renderer > tbody').append(rowTxt);
    }

    $('[data-toggle="tooltip"]').tooltip();
}
