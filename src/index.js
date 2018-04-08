import Finder from './class/Finder';
import data from './data/streets';

const input = document.querySelector('.search__input');
const outputField = document.querySelector('.output');

const finder = new Finder(input, outputField, data);
finder.init();
