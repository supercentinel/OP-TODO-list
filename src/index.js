import { Projects } from './modules/projects.js';

import './styles.css';

const header = document.createElement('header');
const h1 = document.createElement('h1');
h1.textContent = 'TODO LIST';
header.appendChild(h1);


document.body.appendChild(header);
document.body.appendChild(Projects);
