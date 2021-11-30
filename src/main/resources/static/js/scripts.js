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
        $("#command-area").html("<h5 class='mt-4'>Request</h5><hr/><pre>GET: https://aasgateway.uat.industryapps.net/aasList?AssetType="
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
        console.log(row);
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
