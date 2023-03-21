import express from 'express';
import messageRoutes from './src/routes/messageRutas';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
