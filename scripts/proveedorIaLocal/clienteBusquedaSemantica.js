export async function consultarBusquedaSemantica({ urlWebhook, tokenSecreto, cuerpo, cabecerasExtra = {} }) {
  const respuesta = await fetch(urlWebhook, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-token-secreto': tokenSecreto, ...cabecerasExtra },
    body: JSON.stringify(cuerpo),
    signal: AbortSignal.timeout(60000),
  });
  const texto = await respuesta.text();
  let datos;
  try {
    datos = JSON.parse(texto);
  } catch {
    datos = { texto };
  }
  return { codigoHttp: respuesta.status, datos };
}
