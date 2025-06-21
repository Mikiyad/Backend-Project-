import { Request, Response } from "express";
import { User } from "../entity/UserEntity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getRepository, Not } from "typeorm";
import { ResetToken } from '../entity/ResetTokenEntity';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false,
        message: 'Email is required.' 
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'If this email exists, a reset link has been sent.' 
      });
    }

    // Delete any existing reset tokens for this user
    await getRepository(ResetToken).delete({ user: { _id: user._id } });

    const token = crypto.randomBytes(20).toString('hex');
    const tokenExpiry = Date.now() + 86400000; // 1 day

    const resetToken = getRepository(ResetToken).create({ 
      token, 
      user, 
      tokenExpiry 
    });
    await getRepository(ResetToken).save(resetToken);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD,
      },
      secure: true,
    });

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    
    const mailOptions = {
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset for your account.</p>
        <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
        <p>This link will expire in 24 hours.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    return res.json({ 
      success: true,
      message: 'If this email exists, a reset link has been sent.' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.'
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Token, new password and confirmation are required.' 
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.',
      });
    }

    const resetToken = await getRepository(ResetToken).findOne({
      where: { token },
      relations: ['user'],
    });

    if (!resetToken) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid or expired token.' 
      });
    }

    if (resetToken.tokenExpiry < Date.now()) {
      await getRepository(ResetToken).delete({ token });
      return res.status(400).json({ 
        success: false,
        message: 'Token has expired.' 
      });
    }

    const user = resetToken.user;
    user.password = await bcrypt.hash(newPassword, 12);
    await getRepository(User).save(user);

    await getRepository(ResetToken).delete({ token });

    return res.json({ 
      success: true,
      message: 'Password has been successfully reset.' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while resetting your password.'
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { phone, password, email, name } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Phone and password are required.'
      });
    }

    const existingUser = await getRepository(User).findOne({ 
      where: [{ phone }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this phone or email already exists.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = getRepository(User).create({
      phone,
      password: hashedPassword,
      email,
      name,
      status: 'active'
    });

    await getRepository(User).save(user);

    // Remove password before sending response
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      success: true,
      message: 'User created successfully.',
      data: userWithoutPassword
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration.'
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Phone and password are required.'
      });
    }

    const user = await getRepository(User).findOne({ 
      where: { phone },
      select: ['_id', 'phone', 'password', 'status', 'email', 'name']
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Your account is inactive. Please contact support.'
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT secret key is not configured');
    }

    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      secretKey,
      { expiresIn: '1d' }
    );

    // Remove password before sending response
    const { password: _, ...userWithoutPassword } = user;

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login.'
    });
  }
};


export async function getCurrentUser(req: Request, res: Response) {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ where: { _id: userId } });
    res.send({
      success: true,
      message: "User Fetched Successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getRepository(User).find({
      select: ['_id', 'phone', 'email', 'name', 'status']
    });

    return res.json({
      success: true,
      data: users
    });

  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching users.'
    });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value.'
      });
    }

    const result = await getRepository(User).update(id, { status });

    if (result.affected === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    return res.json({
      success: true,
      message: 'User status updated successfully.'
    });

  } catch (error) {
    console.error('Update user status error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating user status.'
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const { name, email, phone } = req.body;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated.' 
      });
    }

    const user = await getRepository(User).findOne({ 
      where: { _id: userId } // Changed _id to id
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found.' 
      });
    }

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format.'
        });
      }

      const emailExists = await getRepository(User).findOne({ 
        where: { 
          email, 
          _id: Not(userId) // Changed _id to id and added Not import
        } 
      });
      
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use by another account.'
        });
      }
      user.email = email;
    }

    // Validate phone if provided
    if (phone) {
      const phoneExists = await getRepository(User).findOne({ 
        where: { 
          phone, 
          _id: Not(userId) // Changed to id and using Not
        } 
      });
      
      if (phoneExists) {
        return res.status(400).json({
          success: false,
          message: 'Phone number already in use by another account.'
        });
      }
      user.phone = phone;
    }

    if (name) user.name = name;

    await getRepository(User).save(user);

    // Remove password before sending response
    const { password, ...safeUser } = user;

    return res.json({ 
      success: true, 
      message: 'Profile updated successfully.', 
      user: safeUser 
    });

  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating profile.'
    });
  }
};