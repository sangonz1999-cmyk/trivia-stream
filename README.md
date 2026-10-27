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
- 51 preguntas en orden aleatorio, distinto para cada persona.
- 3 niveles que cambian el color del borde: fáciles (2 opciones), medias (3),
  difíciles (4). El orden de las preguntas define el nivel.
- 15 segundos por pregunta; más rápido y más nivel = más puntos.
- Bonus por las vidas que quedan al terminar. Una partida por celular.

## Ranking compartido

- Base: **Firebase Realtime Database** (plan gratuito).
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
