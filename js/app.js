gsap.registerPlugin(TextPlugin);

const outputText = document.getElementById("output");
const btnCopy = document.getElementById("btnCopy");
const titleOne = document.getElementById("title");
const logo = document.getElementById("logo");
const textInput = document.getElementById("input");
const botones = document.getElementById("botones");
const tituloOut = document.getElementById("titulo-output");
const parrafoOut = document.getElementById("parrafo-output");
const footerBy = document.getElementById("footer-by");

/*============= ANIMACIONES GSAP ===============*/
gsap.from("#title", {
	duration: 1.5,
	opacity: 0,
	x: -50,
	ease: "elastic.out",
});

gsap.from("#logo", {
	duration: 1.5,
	opacity: 0,
	x: -90,
	ease: "elastic.out",
});

gsap.to(tituloOut, {
	duration: 1.5,
	text: "Ningún mensaje fue encontrado.",
	ease: "none",
});

gsap.to(parrafoOut, {
	duration: 1.5,
	text: "Por favor, ingrese un mensaje para encriptar.",
	ease: "none",
});

gsap.to(footerBy, {
	duration: 1.5,
	text: "© Code by Leandro Vargas",
	ease: "none",
});

gsap.from("#footer-icons", {
	duration: 1.5,
	opacity: 0,
	x: 50,
	ease: "back.out",
});

/* =============================================== */

/*============= FUNCIONES ===============*/

function limpiarCaja() {
	const input = document.getElementById("input");
	const output = document.getElementById("output");

	input.value = "";
	output.textContent = "";
}

function animarTextoEncriptado(resultadoEncriptado) {
	const outputText = document.getElementById("output");

	// Animar el texto encriptado con GSAP
	gsap.to(outputText, {
		duration: 2,
		text: resultadoEncriptado,
		ease: "none",
	});
}

function limitarTexto() {
	const textarea = document.getElementById("input");
	let contenido = textarea.value;

	// Convertir todo el texto a minúsculas y sin acentos
	contenido = contenido
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");

	// Permitir solo letras y espacios
	const textoFiltrado = contenido.replace(/[^a-z ]/g, "");

	// Actualizar el contenido del textarea
	textarea.value = textoFiltrado;
}

function funcionAlerta(icon, title) {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-start",
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});
	Toast.fire({
		icon: icon,
		title: title,
	});
}

function addClass(elemento, clase) {
	const elementoHTML = document.getElementById(elemento);
	elementoHTML.classList.add(clase);
}

function removeClass(elemento, clase) {
	const elementoHTML = document.getElementById(elemento);
	elementoHTML.classList.remove(clase);
}

function asignarTextoElemento(elemento, texto) {
	const elementoHTML = document.getElementById(elemento);
	elementoHTML.innerHTML = texto;
}

function encriptar() {
	const input = document.getElementById("input");
	const output = input.value;

	//Validar que el texto no esté vacío
	if (output === "") {
		funcionAlerta("error", "Por favor, ingrese un mensaje para encriptar.");
		return;
	}

	// Reemplazar letras según las reglas
	const resultadoEncriptado = output
		.replace(/e/g, "enter")
		.replace(/i/g, "imes")
		.replace(/a/g, "ai")
		.replace(/o/g, "ober")
		.replace(/u/g, "ufat");

	// Agregar clase para mostrar el texto encriptado
	addClass("outputIni", "remove");
	// Remover clase para mostrar el botón de copiar
	removeClass("btnCopy", "remove");

	// Animar el texto encriptado con GSAP
	animarTextoEncriptado(resultadoEncriptado);
	// Cambiar el color del botón de copiar
	btnCopy.style.backgroundColor = "#ffffff";
	// Cambiar el color de la letra del botón de copiar
	btnCopy.style.color = "#0a3871";
	btnCopy.style.border = "1px solid #0a3871";

	// Cambiar el texto del botón de copiar
	btnCopy.textContent = "Copiar";
	// Mostrar alerta
	funcionAlerta("success", "El texto se ha encriptado correctamente");
	// Habilitar el botón de copiar
	btnCopy.removeAttribute("disabled");
}

function desencriptar() {
	const input = document.getElementById("input");
	const output = input.value;

	//Validar que el texto no esté vacío
	if (output === "") {
		funcionAlerta("error", "Por favor, ingrese un mensaje para encriptar.");
		return;
	}

	// Reemplazar letras según las reglas
	const resultadoDesencriptado = output
		.replace(/enter/g, "e")
		.replace(/imes/g, "i")
		.replace(/ai/g, "a")
		.replace(/ober/g, "o")
		.replace(/ufat/g, "u");

	//Agregar clase para mostrar el texto desencriptado
	addClass("outputIni", "remove");
	// Mostrar el texto encriptado
	animarTextoEncriptado(resultadoDesencriptado);
	// Cambiar el color del botón de copiar
	btnCopy.style.backgroundColor = "#ffffff";
	// Cambiar el color de la letra del botón de copiar
	btnCopy.style.color = "#0a3871";
	btnCopy.style.border = "1px solid #0a3871";

	// Cambiar el texto del botón de copiar
	btnCopy.textContent = "Copiar";
	// Mostrar alerta
	funcionAlerta("success", "El texto se ha desencriptado correctamente");
	// Habilitar el botón de copiar
	btnCopy.removeAttribute("disabled");
}

function copiar() {
	navigator.clipboard.writeText(outputText.textContent);
	btnCopy.style.backgroundColor = "#2ecc71";
	btnCopy.style.color = "#ffffff";
	btnCopy.style.border = "none";
	btnCopy.textContent = "Copiado!";
	btnCopy.setAttribute("disabled", true);
	limpiarCaja();
	funcionAlerta("success", "Texto copiado al portapapeles");
}
