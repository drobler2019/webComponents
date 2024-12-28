import { HeaderElement } from './components/header/Header';
import { User } from './shared/models/User';
import './style.css';

const header = new HeaderElement();
const app = document.querySelector<HTMLDivElement>('#app')!;
app.append(header);