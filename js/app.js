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
const titleColor = document.getElementById("title-color");

function startLoader() {
	let counterElement = document.querySelector(".count p");
	let currentValue = 0;

	function updateCounter() {
		if (currentValue < 100) {
			let increment = Math.floor(Math.random() * 10) + 1;
			currentValue = Math.min(currentValue + increment, 100);
			counterElement.textContent = currentValue;

			let delay = Math.floor(Math.random() * 200) + 25;
			setTimeout(updateCounter, delay);
		}
	}

	updateCounter();
}

startLoader(); // Iniciar el loader

gsap.to(".count", { opacity: 0, delay: 3.5, duration: 0.25 });

let textWrapper = document.querySelector(".ml16");
textWrapper.innerHTML = textWrapper.textContent.replace(
	/\S/g,
	"<span class='letter'>$&</span>"
);

anime
	.timeline({ loop: false })
	.add({
		targets: ".ml16 .letter",
		translateY: [-100, 0],
		easing: "easeOutExpo",
		duration: 1500,
		delay: (el, i) => 30 * i,
	})
	.add({
		targets: ".ml16 .letter",
		translateY: [0, 100],
		easing: "easeOutExpo",
		duration: 3000,
		delay: (el, i) => 2000 + 30 * i,
	});

gsap.to(".count", {
	opacity: 0,
	ease: "power2.inOut",
	duration: 0.5,
	delay: 3.75,
});

gsap.to(".pre-loader", {
	scale: 0.5,
	ease: "power4.inOut",
	duration: 2,
	delay: 3,
});

gsap.to(".loader", {
	height: "0",
	ease: "power4.inOut",
	duration: 1.5,
	delay: 3.75,
});

gsap.to(".loader-bg", {
	height: "0",
	ease: "power4.inOut",
	duration: 1.5,
	delay: 4.2,
	onComplete: function () {
		// Cambiar el z-index de .site-content para que esté encima del loader
		document.querySelector(".site-content").style.zIndex = "1";
	},
});

gsap.to(".loader-2", {
	clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
	ease: "power4.inOut",
	duration: 1.5,
	delay: 4.5,
});

/*============= ANIMACIONES GSAP ===============*/

// gsap.from(".site-content", {
// 	duration: 1.5,
// 	xPercent: 200,
// 	ease: "power4.inOut",
// 	delay: 4.5,
// });

// gsap.to(tituloOut, {
// 	duration: 1.5,
// 	text: "Ningún mensaje fue encontrado.",
// 	ease: "none",
// 	delay: 4.5,
// });

// gsap.to(titleColor, {
// 	duration: 1.5,
// 	text: "ENCRYPTOR",
// 	ease: "none",
// 	delay: 4.5,
// });

// gsap.to(parrafoOut, {
// 	duration: 1.5,
// 	text: "Por favor, ingrese un mensaje para encriptar.",
// 	ease: "none",
// 	delay: 4.5,
// });

gsap.to(footerBy, {
	duration: 1.5,
	text: "© Code by Leandro Vargas",
	ease: "none",
	delay: 4.5,
});

// gsap.from("#footer-icons", {
// 	duration: 1.5,
// 	opacity: 0,
// 	x: 50,
// 	ease: "back.out",
// 	delay: 4.5,
// });

// gsap.to("#logo", {
// 	clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
// 	ease: "power4.inOut",
// 	duration: 1.5,
// 	delay: 4.4,
// 	stagger: 0.25,
// });

function animar(id = String, ease = String) {
	gsap.from(id, {
		duration: 0.5,
		opacity: 0,
		x: -90,
		ease: ease,
	});
}

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
		duration: 1,
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
		background: "#000212",
		color: "#fff",
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
	// Mostrar el output
	removeClass("OutputFin", "remove");
	// Habilitar el botón de copiar
	btnCopy.removeAttribute("disabled");
}

function desencriptar() {
	const input = document.getElementById("input");
	const output = input.value;

	//Validar que el texto no esté vacío
	if (output === "") {
		funcionAlerta(
			"error",
			"Por favor, ingrese un mensaje para desencriptar."
		);
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
	funcionAlerta("success", "El texto se ha desencriptado correctamente");
	// Mostrar el output
	removeClass("OutputFin", "remove");
	// Habilitar el botón de copiar
	btnCopy.removeAttribute("disabled");
}

function copiar() {
	navigator.clipboard.writeText(outputText.textContent);
	btnCopy.setAttribute("disabled", true);
	limpiarCaja();
	addClass("OutputFin", "remove");
	removeClass("outputIni", "remove");
	funcionAlerta("success", "Texto copiado al portapapeles");
	animar("#outputIni", "back.out");
}
