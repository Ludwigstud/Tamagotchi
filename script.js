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
	highScore: 0,
	inventory: {},
};

const storeItems = {
	Hotdog: 3,
	Watermelon: 12,
	Apple: 5,
	Chocolate: 20,
};

const savedAnimal = localStorage.getItem("animal");
const char = document.querySelector(".character");
const btn = document.querySelectorAll(".btn-style");
const inventory = document.querySelector(".inventory-list");
const store = document.querySelector(".store");
const click = document.querySelector(".click");
inventory.style.display = "none";
store.style.display = "none";
console.log(savedAnimal);
if (savedAnimal) {
	animalParse = JSON.parse(savedAnimal);
	console.log(animalParse);
	if (animal.inventory !== animalParse.inventory) {
		Object.assign(animal, JSON.parse(savedAnimal));
		updateUI();
	}
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

function updateInventoryUI() {
	inventory.innerText = "";
	inventory.innerHTML = "<h2>Inventory</h2>";

	for (const itemName in animal.inventory) {
		const div = document.createElement("div");
		const li = document.createElement("li");
		const button = document.createElement("button");

		li.innerText = `${itemName} (${animal.inventory[itemName]})`;
		button.innerText = "Eat";

		button.addEventListener("click", () => {
			if (animal.inventory[itemName] > 0) {
				animal.hunger = Math.min(animal.hunger + 10, 100);
				document.querySelector(".food").innerHTML = `<i>🍖</i>${animal.hunger}/100`;

				animal.inventory[itemName]--;
				if (animal.inventory[itemName] === 0) {
					delete animal.inventory[itemName];
				}

				saveAnimalData();
				updateInventoryUI();
				updateUI();
			} else {
				// alert("No more of this item left!");
			}
		});

		inventory.appendChild(div);
		div.appendChild(li);
		div.appendChild(button);
	}
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
		}, 5520);
	}
	setInterval(() => {
		animal.sleep--;
		document.querySelector(".sleep").innerHTML = `<i>🥱</i>${animal.sleep}/100`;

		if (animal.sleep <= 0) {
			animal.sleep = 100;
		}
	}, 8000);

	const timeSecond = setInterval(() => {
		updateInventoryUI();
		updateUI();
	}, 1000);
}

document.querySelector(".work").addEventListener("click", () => {
	char.classList.add("bike");
	char.innerText = "🚴";

	setTimeout(() => {
		animal.money += 23;
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

// document.querySelector(".eat").addEventListener("click", () => {
// 	char.innerText = "🍜😃";
// 	for (let i = 1; i <= 4; i++) {
// 		setTimeout(() => {
// 			animal.hunger += 5;
// 			if (animal.hunger > 100) animal.hunger = 100;
// 			document.querySelector(".food").innerHTML = `<i>🍖</i>${animal.hunger}/100`;
// 		}, i * 1000);
// 	}
// 	setTimeout(() => {
// 		char.innerText = "🧍‍♂️";
// 	}, 4000);

// 	btnOff(4000);
// });

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

document.querySelector(".shop").addEventListener("click", () => {
	if (store.style.display == "none") {
		store.style.display = "flex";
	} else {
		store.style.display = "none";
	}
});

document.querySelectorAll(".buy-item").forEach((button, index) => {
	button.addEventListener("click", () => {
		const itemName = Object.keys(storeItems)[index];
		const itemCost = storeItems[itemName];

		if (animal.money >= itemCost) {
			animal.money -= itemCost;
			if (animal.inventory[itemName]) {
				animal.inventory[itemName]++;
			} else {
				animal.inventory[itemName] = 1;
			}

			saveAnimalData();
			updateUI();
			updateInventoryUI();
		} else {
			alert("You don't have enough money to buy this item!");
		}
	});
});

document.querySelector(".play").addEventListener("click", () => {
	playGame();
});

function playGame() {
	btnOff(10000);
	let clicks = 0;
	char.innerText = "";
	const clickButton = document.createElement("button");
	clickButton.classList.add("click");
	clickButton.innerText = "";
	document.querySelector(".section").appendChild(clickButton);

	const highScoreDisplay = document.createElement("div");
	highScoreDisplay.classList.add("high-score-display");
	highScoreDisplay.innerText = `High Score: ${animal.highScore || 0}`;
	highScoreDisplay.style.position = "absolute";
	highScoreDisplay.style.top = "10%";
	highScoreDisplay.style.left = "10%";
	highScoreDisplay.style.fontSize = "34px";

	document.querySelector(".section").appendChild(highScoreDisplay);

	const gamePlay = setInterval(() => {
		let numOne = 20 + Math.floor(Math.random() * 70);
		let numTwo = Math.floor(Math.random() * 70);
		clickButton.style.position = "absolute";
		clickButton.style.top = `${numOne}%`;
		clickButton.style.left = `${numTwo}%`;
	}, 800);

	clickButton.addEventListener("click", () => {
		clicks++;
	});

	setTimeout(() => {
		clearInterval(gamePlay);
		clickButton.remove();

		if (clicks > animal.highScore) {
			animal.highScore = clicks;
			saveAnimalData();
		}
		animal.money += clicks;
		alert(`You scored ${clicks} points.`);
		highScoreDisplay.style.display = "none";
		char.innerText = "🧍‍♂️";

		updateUI();
	}, 10000);
}

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
