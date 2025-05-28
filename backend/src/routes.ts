import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from './models/user';
import { generateToken } from './utils/jwt';
import Order from './models/order';

const router = Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('API is working');
});

// User Registration
router.post('/register', async (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    const token = generateToken({ id: user._id, role: user.role });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// User Login
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken({ id: user._id, role: user.role });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Create Order
router.post('/orders', async (req: Request, res: Response) => {
  const { vendorId, deliveryPartnerId } = req.body;
  try {
    const order = new Order({ vendorId, deliveryPartnerId });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// Update Order
router.put('/orders/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
});

// Get Orders
router.get('/orders', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
});

export { router }; 