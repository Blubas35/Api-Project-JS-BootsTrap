import { createPageMainHeader } from "./header.js";

const pageContent = document.querySelector('#page-content');

pageContent.before(createPageMainHeader())
