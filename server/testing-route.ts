import express from "express";

const router = express.Router();

router.get("/testing", (req, res) => {
    res.send("Hello World");
});

// Circuit control endpoints
router.post("/circuit/start", (req, res) => {
    try {
        // This will be handled by the frontend JavaScript
        res.json({ success: true, message: "Simulation start command sent" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to start simulation" });
    }
});

router.post("/circuit/stop", (req, res) => {
    try {
        res.json({ success: true, message: "Simulation stop command sent" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to stop simulation" });
    }
});

router.get("/circuit/status", (req, res) => {
    try {
        res.json({ success: true, message: "Status request sent" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to get status" });
    }
});

router.post("/circuit/export", (req, res) => {
    try {
        res.json({ success: true, message: "Export request sent" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to export circuit" });
    }
});

router.post("/circuit/import", (req, res) => {
    try {
        const { circuitData } = req.body;
        if (!circuitData) {
            return res.status(400).json({ success: false, error: "Circuit data required" });
        }
        res.json({ success: true, message: "Import request sent" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to import circuit" });
    }
});

router.post("/circuit/voltage", (req, res) => {
    try {
        const { nodeName, voltage } = req.body;
        if (!nodeName || voltage === undefined) {
            return res.status(400).json({ success: false, error: "Node name and voltage required" });
        }
        res.json({ success: true, message: "Voltage set command sent" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to set voltage" });
    }
});

router.get("/circuit/elements", (req, res) => {
    try {
        res.json({ success: true, message: "Elements request sent" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to get elements" });
    }
});

export default router;