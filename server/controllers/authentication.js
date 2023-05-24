const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { response } = require('express');

module.exports.register = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const response = {
      success: true,
      data: {
        user_id: user._id,
      },
    };
    res.status(201).json(response);
  } catch (e) {
    const response = {
      success: false,
      error: {
        message: e.message,
      },
    };
    res.status(400).json(response);
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.walletAddress);
    const token = user.generateJwt();

    const response = {
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        token: token,
      },
    };
    res.json(response);
  } catch (e) {
    const response = {
      success: false,
      error: {
        message: e.message,
      },
    };
    res.status(400).json(response);
  }
};

module.exports.verifyToken = (req, res, next) => {
  try {
    const token = req.header('authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'MY_SECRET');
    const user = User.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).json({
      success: false,
      error: {
        message: 'Access Denied.',
      },
    });
  }
};
