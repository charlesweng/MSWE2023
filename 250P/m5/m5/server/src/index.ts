import * as express from 'express';
import * as cors from 'cors';
import api from './api';

const app = express();
const port = 8080;
app.use(cors());
app.use("/api", api);

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
})