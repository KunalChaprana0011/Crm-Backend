import express from "express";
import { Router } from "express";
import { Contact } from "../models/contacts.js";
const router = Router();

// **************************Add new contact******************************
router.post("/", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } =
    req.body;

  // Check for missing required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !company ||
    !jobTitle
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new contact document
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    });
    await newContact.save();
    res
      .status(201)
      .json({ message: "Contact added successfully", contact: newContact });
  } catch (error) {
    res.status(500).json({ message: "Failed to add contact", error });
  }
});

// ***********************************Get all contacts********************************
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//*********************************** */ Update contact************************************
router.put("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ***********************************Delete contact***********************************
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
