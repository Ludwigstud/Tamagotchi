const animal = {
	name: "",
	age: 0,
	health: 100,
	hunger: 100,
	happiness: 100,
	sleep: 100,
	level: 0,
	xp: 0,
	money: 0,
	inventory: {
		Apple: 1,
		Carrot: 1,
		EnergyDrink: 1,
		Hamburger: 1,
		Sprite: 1,
	},
};
const savedAnimal = localStorage.getItem("animal");
const char = document.querySelector(".character");
const btn = document.querySelectorAll(".btn-style");
const inventory = document.querySelector(".inventory-list");
inventory.style.display = "none";
if (savedAnimal) {
	Object.assign(animal, JSON.parse(savedAnimal));
	updateUI();
}

function saveAnimalData() {
	localStorage.setItem("animal", JSON.stringify(animal));
}

function updateUI() {
	document.querySelector(".food").innerHTML = `<i>🍖</i>${animal.hunger}/100`;
	document.querySelector(".health").innerHTML = `<i>💖</i>${animal.health}/100</div>`;
	document.querySelector(".sleep").innerHTML = `<i>🥱</i>${animal.sleep}/100`;
	document.querySelector(".money").innerText = `Money: ${animal.money}$`;
}

setInterval(saveAnimalData, 1100);

function timeManagment() {
	if (animal.health >= 1) {
		const test = setInterval(() => {
			if (animal.hunger > 0) {
				animal.hunger--;
				document.querySelector(".food").innerHTML = `<i>🍖</i>${animal.hunger}/100`;
			} else {
				animal.health--;
				document.querySelector(".health").innerHTML = `<i>💖</i>${animal.health}/100</div>`;
			}

			if (animal.health <= 0) {
				console.log("lil bro just died :(");
				char.innerText = "⚰️";
				document.querySelector(".restart").style.display = "block";
				btn.forEach((e) => {
					e.disabled = true;
				});

				clearInterval(test);
			}
		}, 5500);
	}
	setInterval(() => {
		animal.sleep--;
		document.querySelector(".sleep").innerHTML = `<i>🥱</i>${animal.sleep}/100`;

		if (animal.sleep <= 0) {
			animal.sleep = 100;
		}
	}, 8000);

	const timeSecond = setInterval(() => {
		inventory.innerText = "";
		// KOLLA PÅ DETTA NÄSTA GÅNG DU PÅBÖRJAR ARBETE!!!!!!
		// for (const inv in animal.inventory) {
		// 	const div = document.createElement("div");
		// 	const li = document.createElement("li");
		// 	const button = document.createElement("button");
		// 	li.innerText = `${inv}`;
		// 	button.innerText = "Eat";
		// 	inventory.appendChild(div);
		// 	div.appendChild(li);
		// 	div.appendChild(button);
		// }
	}, 1000);
}

document.querySelector(".work").addEventListener("click", () => {
	char.classList.add("bike");
	char.innerText = "🚴";
	console.log(animal.money);
	setTimeout(() => {
		animal.money += 10;
		document.querySelector(".money").innerText = `Money: ${animal.money}$`;
		char.classList.remove("bike");
		char.innerText = "🧍‍♂️";
	}, 7800);
	btnOff(7800);
});

document.querySelector(".rest").addEventListener("click", () => {
	if (animal.sleep > 100) animal.sleep = 100;
	document.querySelector(".sleep").innerHTML = `<i>🥱</i>${animal.sleep}/100`;
	char.innerText = "🛌";

	for (let i = 1; i <= 4; i++) {
		setTimeout(() => {
			animal.sleep += 4;
			if (animal.sleep > 100) animal.sleep = 100;
			document.querySelector(".sleep").innerHTML = `<i>🥱</i>${animal.sleep}/100`;
		}, i * 1000);
	}
	setTimeout(() => {
		char.innerText = "🧍‍♂️";
	}, 4000);

	btnOff(4000);
});

document.querySelector(".eat").addEventListener("click", () => {
	char.innerText = "🍜😃";
	for (let i = 1; i <= 4; i++) {
		setTimeout(() => {
			animal.hunger += 5;
			if (animal.hunger > 100) animal.hunger = 100;
			document.querySelector(".food").innerHTML = `<i>🍖</i>${animal.hunger}/100`;
		}, i * 1000);
	}
	setTimeout(() => {
		char.innerText = "🧍‍♂️";
	}, 4000);

	btnOff(4000);
});

document.querySelector(".restart").addEventListener("click", () => {
	animal.health = 100;
	document.querySelector(".restart").style.display = "none";
	document.querySelector(".health").innerHTML = `<i>💖</i>${animal.health}/100</div>`;
	btn.forEach((e) => {
		e.disabled = false;
	});
	char.innerText = "🧍‍♂️";
	timeManagment();
});

document.querySelector(".inventory").addEventListener("click", () => {
	if (inventory.style.display == "none") {
		inventory.style.display = "flex";
	} else {
		inventory.style.display = "none";
	}
});

timeManagment();

function btnOff(num) {
	btn.forEach((e) => {
		e.disabled = true;
	});
	setTimeout(() => {
		btn.forEach((e) => {
			e.disabled = false;
		});
	}, num);
}
