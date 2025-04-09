import SiteSettings from '../../schemas/siteSettings.model.js';

// ✅ Fix: Just return null if no settings exist
export const getSiteSettingsFromDB = async() => {
    const settings = await SiteSettings.findOne();
    return settings;
};


export const updateSiteSettingsInDB = async(data) => {
    let settings = await getSiteSettingsFromDB();
    if (!settings) {
        settings = new SiteSettings({ siteName: "My Vlog Site" }); // fallback default
    } else {
        Object.assign(settings, data);
    }

    return await settings.save();
};

export const toggleFeatureInDB = async(feature) => {
    const settings = await getSiteSettingsFromDB();
    if (!settings) throw new Error("Settings not found");

    settings[feature] = !settings[feature];
    return await settings.save();
};