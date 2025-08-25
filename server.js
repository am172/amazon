const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Delivery = require('./models/Delivery');

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files من مجلد public
app.use(express.static('public'));

// Connect MongoDB (رابط Atlas مباشر)
const mongoURI = 'mongodb+srv://hmnm5485:442004@amr.pl1ea.mongodb.net/arabia-invest?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// API لإنشاء مندوب جديد
app.post('/api/delivery', async (req, res) => {
  try {
    const { name, address, age, gender, location } = req.body;
    const newDelivery = new Delivery({ name, address, age, gender, location });
    await newDelivery.save();
    res.status(200).json({ message: 'تم حفظ البيانات بنجاح!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API لجلب جميع المندوبين
app.get('/api/deliveries', async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
