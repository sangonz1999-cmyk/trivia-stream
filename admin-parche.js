/* ============================================================
   admin-parche.js — "Guardar y aplicar" confiable (Trivia del Stream)
   Se carga en admin.html, justo antes de </body>:
     <script src="admin-parche.js?v=1"></script>

   Qué hace:
   1) Muestra arriba de las preguntas cuántas ven los JUGADORES (lo que hay
      en la base) vs cuántas hay en ESTA pantalla, y si falta aplicar.
   2) Agrega el botón GUARDAR Y APLICAR AL JUEGO.
   3) Al guardar (también al IMPORTAR JSON) avisa el error real si falla
      (antes fallaba en silencio), revisa los límites de largo de las reglas
      y confirma leyendo de vuelta la base.
   ============================================================ */
(function () {
  if (!window.FB || !window.firebase) return;

  var g = function (i) { return document.getElementById(i); };
  var MAXQ = 300, MAXOK = 200;      // límites de database.rules.json
  var origSave = FB.saveQuestions;
  var remoteN = null, remoteErr = "";

  function problems(list) {
    var p = [];
    list.forEach(function (x, i) {
      if (x.q.length > MAXQ) p.push("Pregunta " + (i + 1) + ": el texto tiene " + x.q.length + " caracteres (máximo " + MAXQ + ")");
      if (x.ok.length > MAXOK) p.push("Pregunta " + (i + 1) + ": la respuesta correcta tiene " + x.ok.length + " caracteres (máximo " + MAXOK + ")");
    });
    return p;
  }

  function setBox() {
    var m = g("syncmsg"); if (!m) return;
    var screenN = 0;
    try {
      screenN = collect().filter(function (x) { return x.q && x.ok && x.bad.length; }).length;
    } catch (e) { }
    var seed = (window.SEED || []).length;
    var h;
    if (!FB.shared()) {
      h = '<span class="badge no">MODO LOCAL</span> No hay conexión con la base: lo que guardes <b>NO llega a los jugadores</b>. Recargá la página y revisá bloqueadores.';
    } else if (remoteErr) {
      h = '<span class="badge no">ERROR</span> No pude leer la base: ' + remoteErr;
    } else if (remoteN === null) {
      h = "Comprobando qué ven los jugadores…";
    } else if (remoteN === 0) {
      h = '<span class="badge no">SIN APLICAR</span> La base de preguntas está vacía: los jugadores usan las <b>' + seed + '</b> de respaldo (questions.js). Esta pantalla tiene <b>' + screenN + '</b>.';
    } else if (remoteN === screenN) {
      h = '<span class="badge ok">APLICADO ✓</span> Los jugadores ven <b>' + remoteN + '</b> preguntas (la misma cantidad que esta pantalla).';
    } else {
      h = '<span class="badge no">SIN APLICAR</span> Jugadores: <b>' + remoteN + '</b> · Esta pantalla: <b>' + screenN + '</b>. Tocá <b>GUARDAR Y APLICAR</b> para actualizar el juego.';
    }
    m.innerHTML = h;
  }

  function listen() {
    if (listen.done || !FB.shared()) return;
    listen.done = true;
    firebase.database().ref("questions").on("value",
      function (s) { remoteN = s.numChildren(); remoteErr = ""; setBox(); },
      function (e) { remoteErr = e.message; setBox(); });
  }

  FB.saveQuestions = async function (list) {
    if (!FB.shared()) {
      alert("⚠ El panel está en MODO LOCAL (sin conexión con la base).\n\nEstas preguntas NO llegan a los jugadores. Recargá la página y probá de nuevo.");
      throw new Error("modo local");
    }
    var pr = problems(list);
    if (pr.length) {
      alert("NO se guardó. Corregí esto primero:\n\n" + pr.slice(0, 15).join("\n") + (pr.length > 15 ? "\n… y " + (pr.length - 15) + " más" : ""));
      throw new Error("validación");
    }
    try {
      await origSave(list);
      var s = await firebase.database().ref("questions").once("value");
      if (s.numChildren() !== list.length) {
        throw new Error("La base quedó con " + s.numChildren() + " preguntas en vez de " + list.length);
      }
    } catch (e) {
      var msg = String((e && e.message) || e);
      alert("NO se pudo aplicar al juego.\n\n" + msg +
        (/permission/i.test(msg) ? "\n\nLa base rechazó la escritura: hay que publicar las reglas de database.rules.json (firebase deploy --only database)." : ""));
      throw e;
    }
  };

  function init() {
    var qsDiv = g("qs");
    if (!qsDiv) return;
    var card = qsDiv.parentNode;
    var box = document.createElement("div");
    box.id = "syncbox";
    box.className = "card";
    box.style.borderColor = "var(--yel)";
    box.innerHTML = '<div id="syncmsg" class="small"></div>' +
      '<button class="g" id="applybtn">GUARDAR Y APLICAR AL JUEGO</button>';
    card.insertBefore(box, card.firstChild);
    g("applybtn").onclick = function () { saveQs(); };

    var b = document.querySelector('button[onclick="saveQs()"]');
    if (b) b.textContent = "GUARDAR Y APLICAR";

    setInterval(function () {
      var app = g("app");
      if (app && !app.classList.contains("hide")) { listen(); setBox(); }
    }, 1500);
  }

  init();
})();
