const express = require('express');
require('./src/db/mongoose.db');
const userRouter = require('./src/routes/userRoutes');
const taskRouter = require('./src/routes/taskRoutes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;
const origin = process.env.ORIGIN || 'http://localhost:3000'


app.use(cors({
    origin,
    credentials: false
}));

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.all('*', (req, resp) => {
    return resp.status(404).send("Page not found");
});

app.listen(port, () => {
    console.log('App has started to listening on port' + port);
});
