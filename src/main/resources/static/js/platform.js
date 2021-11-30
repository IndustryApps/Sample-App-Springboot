/**
 * This function returns an object with params auth_token,euser,plant_selected,language_selected
 * @returns {Object} platformContext
 */

function getPlatformContext() {
    const platformContext = Object.fromEntries(document.cookie.split('; ').map(v => v.split('=').map(decodeURIComponent)));
    const localStorageUserData = localStorage.getItem('userData') || '';
    const localStorageUserRoles = localStorage.getItem('roles') || '';
    const userData = localStorageUserData ? JSON.parse(localStorageUserData) : {};
    const userRoles = localStorageUserRoles ? JSON.parse(localStorageUserRoles) : {};
    let plant_list = JSON.parse(platformContext.plant);
    return {
        auth_token: platformContext.token,
        euser: platformContext.euser,
        plant_selected: platformContext.selectedPlant,
        language_selected: platformContext.selectedLanguage || 'en',
        plant_list: plant_list,
        company_code: userData.companyCode || '',
        roles: userRoles
    }
}

/**
 * @typedef {Object} platformContext
 * @property {string} auth_token - Token to be used in the header of every service call
 * @property {string} euser - User code of logged in user
 * @property {string} language_selected - Language code of selected language, default is 'en'
 * @property {string} plant_selected - Id of selected plant
 * @property {list} plant_list - Id of selected plant
 * @property {string} company_code - Selected company code
 * @property {list} roles - Roles available for user
 */
