import {
    getSiteSettingsFromDB,
    updateSiteSettingsInDB,
    toggleFeatureInDB
} from "../../repository/admin/siteSettings.repository.js";

export const getSiteSettingsService = async() => {
    return await getSiteSettingsFromDB();
};

export const updateSiteSettingsService = async(data) => {
    return await updateSiteSettingsInDB(data);
};

export const toggleFeatureService = async(feature) => {
    return await toggleFeatureInDB(feature);
};