import {
    getSiteSettingsService,
    updateSiteSettingsService,
    toggleFeatureService
} from "../../services/admin/siteSettings.service.js";

export const getSiteSettings = async(req, res) => {
    try {
        const settings = await getSiteSettingsService();
        if (!settings) {
            return res.status(404).json({ success: false, message: "Site settings not found" });
        }
        res.status(200).json({ success: true, data: settings });
    } catch (err) {
        console.error("Get Settings Error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateSiteSettings = async(req, res) => {
    try {
        const updated = await updateSiteSettingsService(req.body);
        res.status(200).json({ success: true, data: updated });
    } catch (err) {
        console.error("Update Settings Error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const toggleFeature = async(req, res) => {
    try {
        const { feature } = req.params;
        const updated = await toggleFeatureService(feature);
        res.status(200).json({ success: true, data: updated });
    } catch (err) {
        console.error("Toggle Feature Error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};