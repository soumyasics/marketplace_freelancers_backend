const WorkRequestModel = require("./workRequestSchema");

const createWorkRequest = async () => {
  try {
    const {title, description, category, budget, userId} = req.body;
  } catch (error) {
    console.log("Error on create request", error);
    return res.status(500).json({ error });
  }
};
