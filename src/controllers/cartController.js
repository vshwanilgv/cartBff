const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const logger = require('../utils/logger');

const BASE_URL = "http://localhost:8082/api/v1/carts";

exports.getAllCarts = async (req, res, next) => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        res.json(response.data);
    } catch (error) {
        logger.error(`Error fetching carts: ${error.message}`);
        next(error);
    }
};

exports.getCartById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        res.json(response.data);
    } catch (error) {
        logger.error(`Error fetching cart by ID: ${id} - ${error.message}`);
        next(error);
    }
};

exports.createCart = async (req, res, next) => {
    try {
        const formData = new FormData();
        formData.append('productId', req.body.productId);
        formData.append('quantity', req.body.quantity);

        const response = await axios.post(`${BASE_URL}`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        res.status(201).json(response.data);
    } catch (error) {
        logger.error(`Error creating cart: ${error.message}`);
        next(error);
    }
};

exports.updateCart = async (req, res, next) => {
    const { id } = req.params;
    try {
        const formData = new FormData();
        formData.append('productId', req.body.productId);
        formData.append('quantity', req.body.quantity);

        const response = await axios.put(`${BASE_URL}/${id}`, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        res.json(response.data);
    } catch (error) {
        logger.error(`Error updating cart by ID: ${id} - ${error.message}`);
        next(error);
    }
};

exports.deleteCart = async (req, res, next) => {
    const { id } = req.params;
    try {
        await axios.delete(`${BASE_URL}/${id}`);
        res.status(204).send();
    } catch (error) {
        logger.error(`Error deleting cart by ID: ${id} - ${error.message}`);
        next(error);
    }
};
