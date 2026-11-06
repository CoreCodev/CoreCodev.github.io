import type { ImageMetadata } from 'astro';
import clima from '../assets/projects/la-chica-del-clima.jpg';
import kiosko from '../assets/projects/kiosko.jpg';
import filmteca from '../assets/projects/filmteca.png';
import coretune from '../assets/projects/coretune.png';
import limapay from '../assets/projects/limapay.png';
import asistencia from '../assets/projects/asistencia.png';

export interface Project {
  name: string;
  summary: string;
  stack: string[];
  code: string;
  demo?: string;
  note?: string;
  image: ImageMetadata;
  alt: string;
}

export const projects: Project[] = [
  {
    name: 'La Chica del Clima',
    summary:
      'Dashboard de calidad del aire y riesgo por zona, con recomendaciones para cada persona. Hecho para el NASA Space Apps Challenge 2025.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Python', 'FastAPI'],
    code: 'https://github.com/CoreCodev618/nasa-space-challenge',
    demo: 'https://nasa-space-challenge.onrender.com',
    note: 'La demo puede tardar un momento en abrir.',
    image: clima,
    alt: 'Portada de La Chica del Clima para el NASA Space Apps Challenge 2025',
  },
  {
    name: 'Kiosko Autoservice',
    summary:
      'Sistema de autoservicio para restaurantes: el cliente personaliza su pedido, elige cómo pagar y recibe su voucher.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Python', 'FastAPI', 'MySQL'],
    code: 'https://github.com/CoreCodev618/kiosko-autoservice',
    demo: 'https://proyecto-auto-service.vercel.app/',
    image: kiosko,
    alt: 'Portada de Kiosko Autoservice con hamburguesa, pizza, café y resumen del pedido',
  },
  {
    name: 'Filmteca',
    summary: 'Buscador de películas y series con tendencias, filtros, favoritos y tráileres, usando los datos de TMDB.',
    stack: ['HTML', 'CSS', 'JavaScript', 'API de TMDB'],
    code: 'https://github.com/CoreCodev618/buscador-peliculas-series',
    demo: 'https://corecodev618.github.io/buscador-peliculas-series/',
    image: filmteca,
    alt: 'Portada de Filmteca con el buscador y las películas en tendencia de la semana',
  },
  {
    name: 'CoreTune',
    summary: 'App de música con inicio personalizado, buscador y reproductor. Por ahora funciona con datos de prueba.',
    stack: ['Flutter', 'Riverpod'],
    code: 'https://github.com/CoreCodev618/CoreMusic',
    image: coretune,
    alt: 'Ilustración de CoreTune con un celular que muestra música recomendada',
  },
  {
    name: 'LimaPay',
    summary: 'App para pagar el transporte con QR: el pasajero recarga saldo, escanea y revisa su historial.',
    stack: ['Python', 'Flet', 'PostgreSQL'],
    code: 'https://github.com/CoreCodev618/LimaPay',
    image: limapay,
    alt: 'Ilustración de LimaPay con un celular que muestra el saldo y un código QR',
  },
  {
    name: 'Asistencia QR UNAC',
    summary: 'Un QR fijo por aula que comprueba horario, matrícula y ubicación del alumno, con asistencias en vivo.',
    stack: ['Ember.js', 'Node.js', 'Express'],
    code: 'https://github.com/CoreCodev618/asistencia-qr-unac',
    image: asistencia,
    alt: 'Ilustración de Asistencia QR con el código de un aula y la lista de asistencias en vivo',
  },
];
