import python from '../assets/tech/python-original.svg';
import javascript from '../assets/tech/javascript-original.svg';
import html from '../assets/tech/html5-original.svg';
import css from '../assets/tech/css3-original.svg';
import rust from '../assets/tech/rust-original.svg';
import react from '../assets/tech/react-original.svg';
import ember from '../assets/tech/ember-original-wordmark.svg';
import node from '../assets/tech/nodejs-original.svg';
import express from '../assets/tech/express-original.svg';
import flutter from '../assets/tech/flutter-original.svg';
import sqlserver from '../assets/tech/microsoftsqlserver-plain.svg';
import postgresql from '../assets/tech/postgresql-original.svg';
import mysql from '../assets/tech/mysql-original.svg';
import git from '../assets/tech/git-original.svg';
import docker from '../assets/tech/docker-original.svg';

export const skillGroups = [
  {
    title: 'Lenguajes',
    items: [
      { name: 'Python', logo: python.src },
      { name: 'JavaScript', logo: javascript.src },
      { name: 'HTML', logo: html.src },
      { name: 'CSS', logo: css.src },
      // Los logos negros se invierten para que se vean sobre el fondo oscuro.
      { name: 'Rust', logo: rust.src, invert: true },
    ],
  },
  {
    title: 'Frameworks',
    items: [
      { name: 'React', logo: react.src },
      { name: 'Ember', logo: ember.src },
      { name: 'Node.js', logo: node.src },
      { name: 'Express', logo: express.src, invert: true },
      { name: 'Flutter', logo: flutter.src },
    ],
  },
  {
    title: 'Bases de datos',
    items: [
      { name: 'SQL Server', logo: sqlserver.src, invert: true },
      { name: 'PostgreSQL', logo: postgresql.src },
      { name: 'MySQL', logo: mysql.src },
    ],
  },
  {
    title: 'Herramientas',
    items: [
      { name: 'Git', logo: git.src },
      { name: 'Docker', logo: docker.src },
    ],
  },
];
