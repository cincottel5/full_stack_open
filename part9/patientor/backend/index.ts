import app from './app';
import { port } from './utils/config';

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});