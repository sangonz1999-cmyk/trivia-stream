# Trivia del Stream — INPUT_

Trivia online para el stream de INPUT_ sobre streaming y tecnología.
Cada participante juega desde su celular. El ranking es **uno solo, compartido**:
se ve en el juego, en el ranking para OBS y en el panel admin, en vivo.

- **Jugar:** https://sangonz1999-cmyk.github.io/trivia-stream/
- **Ranking para OBS:** https://sangonz1999-cmyk.github.io/trivia-stream/ranking.html
- **Panel admin:** https://sangonz1999-cmyk.github.io/trivia-stream/admin.html

## Archivos

| Archivo | Qué es |
| --- | --- |
| `index.html` | El juego (una página: nombre, partida, top 3 en vivo). |
| `ranking.html` | Overlay para OBS: fondo transparente, top en vivo. |
| `admin.html` | Panel: preguntas, configuración y reinicio del ranking. |
| `fb.js` | Capa de datos: lee y escribe en Firebase (o local si no hay config). |
| `fb-config.js` | Config del proyecto de Firebase (la genera el agente). |
| `questions.js` | Banco de preguntas semilla (51) y respaldo si la base está vacía. |
| `database.rules.json` | Reglas de seguridad de la base. |
| `firebase.json` | Config del CLI de Firebase. |
| `streaming-room-t3.html` | Página del canal Streaming Room T3. |
| `contenido-streaming-room-t3.txt` | Borrador de contenidos de esa página. |
| `cuestionario-trivia-corregido.gdoc` | Acceso directo al cuestionario. |

## Cómo se juega

- 4 vidas; cada error o tiempo agotado saca una.
- 51 preguntas por partida (todo el banco), en orden aleatorio.
- 4 niveles, sin carteles (cambia el color del borde y la cantidad de opciones):
  fácil 6 (2 opciones), medio 5 (3), difícil 5 (4) y **experto** (el resto del
  banco, 6 opciones). El nivel cambia en la pregunta 7, en la 12 y en la 17.
- Con las primeras 16 preguntas ya está el premio. Después se sigue jugando para
  sumar y subir en el ranking (desempate del premio mayor).
- La partida termina al quedarse sin vidas o al responder las 51.
- **Al llegar al nivel experto (pregunta 17) queda 1 sola vida**, sin importar
  cuántas traía.
- **Racha:** cada respuesta seguida sin fallar sube el multiplicador (x1.1, x1.2…
  hasta **x2**). Al perder una vida vuelve a x1.
- Las opciones se mezclan: la correcta puede caer en A, B, C, D, E o F, distinto
  para cada persona y cada partida.
- 15 segundos por pregunta; más rápido y más nivel = más puntos.
- Bonus por las vidas que quedan al terminar. Una partida por celular.
- La cantidad de preguntas por nivel y los segundos se cambian en el panel admin.

## Ranking compartido

- Base: **Firebase Realtime Database** (plan gratuito).
  Proyecto: `trivia-stream-input` · base:
  `https://trivia-stream-input-default-rtdb.firebaseio.com`
- La config pública está en `fb-config.js` (la apiKey de Firebase no es un
  secreto: la seguridad la dan las reglas).
- `scores/<ranking>/<id>` guarda nombre, puntos, nivel y hora de cada jugador.
- El id es un UUID por dispositivo: un celular no puede pisar el puntaje de otro,
  y los puntajes solo pueden subir (no bajar ni borrarse desde el cliente).
- **Reiniciar ranking** no borra: cambia el número de ranking (`cfg/gen`), así que
  la tabla arranca de cero y lo viejo queda archivado.
- Si `fb-config.js` está vacío o no hay internet, todo sigue funcionando con
  ranking local (cada dispositivo ve el suyo).

## Panel admin

Clave: la misma de siempre (7 toques al título en el juego, o directo en
`admin.html`). Permite:

- Ver y reiniciar el ranking.
- Cambiar segundos por pregunta y cuántas preguntas hay de cada nivel.
- Mostrar u ocultar el ranking a los jugadores.
- Editar, agregar, borrar y exportar preguntas (los cambios se ven en vivo).

## Para actualizar la web

```
cd D:\Temp\opencode\trivia-stream
git add -A && git commit -m "cambio" && git push
```
