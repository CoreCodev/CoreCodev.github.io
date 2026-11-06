import type { ImageMetadata } from 'astro';
import nasa from '../assets/projects/nasa-air-quality.png';
import kiosko from '../assets/projects/kiosko.png';
import filmteca from '../assets/projects/filmteca.png';
import coretuneLogo from '../assets/projects/coretune-logo.svg';
import limapayLogo from '../assets/projects/limapay-logo.png';
import asistenciaQr from '../assets/projects/asistencia-qr.svg';

export interface Project {
  name: string;
  summary: string;
  stack: string[];
  code: string;
  demo?: string;
  note?: string;
  /** Captura de la demo, o logo si se indica `logoWidth`. */
  image: ImageMetadata;
  /** Muestra `image` centrada a este ancho, como portada de un proyecto sin demo pública. */
  logoWidth?: number;
  alt: string;
}

export const featuredProject: Project = {
  name: 'Air Quality Dashboard (NASA TEMPO)',
  summary:
    'Panel que muestra la calidad del aire, el clima y el riesgo de cada zona, con recomendaciones según a quién quieras proteger. Lo hice para el NASA Space Apps Challenge 2025.',
  stack: ['HTML', 'CSS', 'JavaScript', 'Python', 'FastAPI'],
  code: 'https://github.com/CoreCodev618/nasa-space-challenge',
  demo: 'https://nasa-space-challenge.onrender.com',
  note: 'La demo puede tardar un momento en abrir la primera vez.',
  image: nasa,
  alt: 'Panel de calidad del aire con niveles de NO2 y PM2.5, clima y grupos vulnerables',
};

export const projects: Project[] = [
  {
    name: 'Kiosko Autoservice',
    summary:
      'Sistema de autoservicio para restaurantes: el cliente personaliza su pedido, elige cómo pagar y recibe su voucher.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Python', 'FastAPI', 'MySQL'],
    code: 'https://github.com/CoreCodev618/kiosko-autoservice',
    demo: 'https://proyecto-auto-service.vercel.app/',
    image: kiosko,
    alt: 'Carta del kiosko con hamburguesa, pizza y café, y el resumen del pedido con métodos de pago',
  },
  {
    name: 'Filmteca',
    summary:
      'Buscador de películas y series con tendencias, filtros, favoritos y tráileres, usando los datos de TMDB.',
    stack: ['HTML', 'CSS', 'JavaScript', 'API de TMDB'],
    code: 'https://github.com/CoreCodev618/buscador-peliculas-series',
    demo: 'https://corecodev618.github.io/buscador-peliculas-series/',
    image: filmteca,
    alt: 'Portada de Filmteca con el buscador y las películas en tendencia de la semana',
  },
  {
    name: 'CoreTune',
    summary:
      'App de música con inicio personalizado, buscador, biblioteca y reproductor. La interfaz funciona con datos de prueba; la música real está en desarrollo.',
    stack: ['Flutter', 'Riverpod'],
    code: 'https://github.com/CoreCodev618/CoreMusic',
    image: coretuneLogo,
    logoWidth: 120,
    alt: 'Logo de CoreTune',
  },
  {
    name: 'LimaPay',
    summary:
      'App para pagar el transporte con QR: el pasajero recarga saldo, escanea el código y revisa su historial de viajes.',
    stack: ['Python', 'Flet', 'PostgreSQL'],
    code: 'https://github.com/CoreCodev618/LimaPay',
    image: limapayLogo,
    logoWidth: 95,
    alt: 'Logo de LimaPay',
  },
  {
    name: 'Asistencia QR UNAC',
    summary:
      'Asistencia con un QR fijo por aula. Comprueba el horario, la matrícula y la ubicación del alumno, y muestra las asistencias en vivo.',
    stack: ['Ember.js', 'Node.js', 'Express'],
    code: 'https://github.com/CoreCodev618/asistencia-qr-unac',
    image: asistenciaQr,
    logoWidth: 120,
    alt: 'Código QR que abre el repositorio de Asistencia QR UNAC',
  },
];
