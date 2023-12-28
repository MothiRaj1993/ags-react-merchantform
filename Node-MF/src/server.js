const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3050;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://mothirajm:EnterthePassword@mothiraj.spbyd2f.mongodb.net/MFDatas",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const dataSchema = new mongoose.Schema({
  fname: String,
  mail: String,
  number: String,
  website: String,
  contactName: String,
  contactPhone: String,
  contactMail: String,
  notes: String,
  type: String,
  category: String,
  percentage: String,
  activeFrom: String,
  criticalAccount: String,
  paymentOptions: String,
});

const DataModel = mongoose.model("Data", dataSchema);

app.get("/api/data", async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/data", async (req, res) => {
  try {
    const newData = new DataModel(req.body);
    await newData.save();
    console.log("Data saved successfully:", newData);
    res.status(201).json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/data/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id format" });
  }

  try {
    const updatedData = await DataModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedData) {
      return res.status(404).json({ message: "Data not found for update" });
    }

    console.log("Data updated successfully:", updatedData);
    res.json(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/data/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id format" });
  }

  try {
    const deletedData = await DataModel.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ message: "Data not found for deletion" });
    }

    console.log("Data deleted successfully:", deletedData);
    res.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
