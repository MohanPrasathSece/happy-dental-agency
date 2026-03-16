// Invoice Management API Endpoints

const express = require('express');
const router = express.Router();

// Sample data for invoices
let invoices = [];

// GET /api/invoices - Retrieve all invoices
router.get('/api/invoices', (req, res) => {
    return res.json(invoices);
});

// GET /api/invoices/:id - Retrieve a specific invoice by ID
router.get('/api/invoices/:id', (req, res) => {
    const invoice = invoices.find(inv => inv.id === parseInt(req.params.id));
    if (!invoice) return res.status(404).send('Invoice not found');
    return res.json(invoice);
});

// POST /api/invoices/:id/edit - Edit an invoice by ID
router.post('/api/invoices/:id/edit', (req, res) => {
    const invoice = invoices.find(inv => inv.id === parseInt(req.params.id));
    if (!invoice) return res.status(404).send('Invoice not found');

    const { providerDetails, lineItems, date, status, notes } = req.body;
    // Update invoice details
    invoice.providerDetails = providerDetails || invoice.providerDetails;
    invoice.lineItems = lineItems || invoice.lineItems;
    invoice.date = date || invoice.date;
    invoice.status = status || invoice.status;
    invoice.notes = notes || invoice.notes;

    return res.json(invoice);
});

// DELETE /api/invoices/:id - Delete an invoice by ID
router.delete('/api/invoices/:id', (req, res) => {
    const invoiceIndex = invoices.findIndex(inv => inv.id === parseInt(req.params.id));
    if (invoiceIndex === -1) return res.status(404).send('Invoice not found');
    // Remove invoice from the array
    invoices.splice(invoiceIndex, 1);
    return res.status(204).send();
});

module.exports = router;