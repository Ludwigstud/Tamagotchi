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
};

function timeManagment() {
	setInterval(() => {
		if (animal.hunger >= 0) {
			animal.hunger--;
			document.querySelector(".food").innerHTML = `<i>🍖</i>${animal.hunger}/100`;
		} else {
			animal.health--;
			document.querySelector(".health").innerHTML = `<i>💖</i>${animal.health}/100</div>`;
		}

		if (animal.health == 0) {
			console.log("lil bro just died :(");
		}
	}, 1000);

	setInterval(() => {
		animal.sleep--;
		document.querySelector(".sleep").innerHTML = `<i>🥱</i>${animal.sleep}/100`;

		if (animal.sleep <= 0) {
			animal.sleep = 100;
		}
	}, 5000);
}

const money = document.querySelector(".money");

document.querySelector(".work").addEventListener("click", () => {
	animal.money += 10;
	console.log(animal.money);
	money.innerText = `Money: ${animal.money}$`;
});

timeManagment();
