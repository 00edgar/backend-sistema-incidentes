export const DIMENSIONES_EMBEDDING = 4096;

const PALABRAS_VACIAS = new Set([
  'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para', 'con', 'no',
  'una', 'su', 'al', 'lo', 'como', 'mas', 'pero', 'sus', 'le', 'ya', 'o', 'este', 'si', 'porque', 'esta',
  'entre', 'cuando', 'muy', 'sin', 'sobre', 'tambien', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde',
  'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos',
  'e', 'esto', 'mi', 'antes', 'algunos', 'unos', 'yo', 'otro', 'otras', 'otra', 'tanto', 'esa', 'estos',
  'mucho', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'tengo', 'tiene',
  'tienen', 'hacer', 'puedo', 'quiero', 'mis', 'tu', 'tus', 'te', 'ha', 'han', 'fue', 'son', 'ser', 'es',
  'cada', 'hace', 'pocos', 'solicito', 'solicitar', 'despues', 'luego', 'aunque', 'ademas', 'segun',
]);

const PESO_PALABRA = 1;
const PESO_PREFIJO = 0.6;
const PESO_FRAGMENTO = 0.3;
const LONGITUD_PREFIJO = 5;
const LONGITUD_FRAGMENTO = 4;

export function normalizarTexto(texto) {
  return String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function extraerPalabras(texto) {
  return normalizarTexto(texto)
    .split(' ')
    .filter((palabra) => palabra.length >= 2 && !PALABRAS_VACIAS.has(palabra));
}

function calcularHash(texto, semilla) {
  let hash = (2166136261 ^ semilla) >>> 0;
  for (let posicion = 0; posicion < texto.length; posicion += 1) {
    hash ^= texto.charCodeAt(posicion);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash;
}

function acumularCaracteristica(vector, caracteristica, peso) {
  const posicion = calcularHash(caracteristica, 0) % vector.length;
  const signo = calcularHash(caracteristica, 7919) % 2 === 0 ? 1 : -1;
  vector[posicion] += signo * peso;
}

export function generarEmbeddingLexico(texto, dimensiones = DIMENSIONES_EMBEDDING) {
  const palabras = extraerPalabras(texto);
  if (palabras.length === 0) {
    return null;
  }
  const frecuencias = new Map();
  for (const palabra of palabras) {
    frecuencias.set(palabra, (frecuencias.get(palabra) ?? 0) + 1);
  }
  const vector = new Array(dimensiones).fill(0);
  for (const [palabra, frecuencia] of frecuencias) {
    const factorFrecuencia = 1 + Math.log(frecuencia);
    acumularCaracteristica(vector, `p:${palabra}`, PESO_PALABRA * factorFrecuencia);
    if (palabra.length > LONGITUD_PREFIJO) {
      acumularCaracteristica(vector, `r:${palabra.slice(0, LONGITUD_PREFIJO)}`, PESO_PREFIJO * factorFrecuencia);
    }
    for (let inicio = 0; inicio + LONGITUD_FRAGMENTO <= palabra.length; inicio += 1) {
      acumularCaracteristica(
        vector,
        `f:${palabra.slice(inicio, inicio + LONGITUD_FRAGMENTO)}`,
        PESO_FRAGMENTO * factorFrecuencia,
      );
    }
  }
  const norma = Math.sqrt(vector.reduce((suma, valor) => suma + valor * valor, 0));
  return vector.map((valor) => valor / norma);
}

export function calcularSimilitudCoseno(vectorA, vectorB) {
  let producto = 0;
  for (let posicion = 0; posicion < vectorA.length; posicion += 1) {
    producto += vectorA[posicion] * vectorB[posicion];
  }
  return producto;
}
