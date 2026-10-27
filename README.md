# Trivia del Stream — INPUT_

Trivia online para el stream de INPUT_ sobre streaming y tecnología.
Cada participante juega desde su celular: 4 vidas, 51 preguntas en orden
aleatorio (fáciles de 2 opciones, medias de 3 y difíciles de 4), 15 segundos
por pregunta y ranking.

**Jugar:** https://sangonz1999-cmyk.github.io/trivia-stream/

## Archivos

| Archivo | Qué es |
| --- | --- |
| `index.html` | El juego completo (una sola página, HTML+CSS+JS). |
| `streaming-room-t3.html` | Página del canal Streaming Room T3 (no es la home). |
| `contenido-streaming-room-t3.txt` | Borrador de contenidos de la página del canal. |
| `cuestionario-trivia-corregido.gdoc` | Acceso directo al documento con el cuestionario. |

## Estado actual

- Preguntas y puntajes se guardan en el `localStorage` del navegador, así que
  el ranking **no se comparte** entre celulares: cada dispositivo ve el suyo.
- Vistas ocultas para jugadores: ranking para OBS (fondo transparente) y panel
  admin (7 toques al título + clave).
- Próximo paso para que el ranking sea compartido: mover los datos a Firebase
  y separar juego / ranking OBS / panel admin en tres páginas.
