//NEED:
//Population
//Name
//Predation rate
//Chance of catching each animal
//Food value (how much meat)
//Food value needed to reproduce
//Reproduction rate (each animal has a litter of X). This should also take into account for how many animals die right after birth, etc

var species = [
    {
        "name": "Grass",
        "population": 100,
        "food_needed": 0,
        "food_value": .1,
        "max_predation_count": 0,
        "reproduction_rate": 20,
        "diet": [

        ]
    },
    {
        "name": "Rabbit",
        "population": 10,
        "food_needed": 3,
        "food_value": 3,
        "max_predation_count": 3,
        "reproduction_rate": 2,
        "diet": [
            "Grass"
        ]
    },
    {
        "name": "Wolf",
        "population": 3,
        "food_needed": 8,
        "food_value": 20,
        "max_predation_count": 8,
        "reproduction_rate": 3,
        "diet": [
            "Rabbit"
        ]
    },
    {
        "name": "The Grim Reaper of Death",
        "population": 1,
        "food_needed": 20,
        "food_value": 0,
        "max_predation_count": 5,
        "reproduction_rate": 2,
        "diet": [
            "Wolf"
        ]
    }
];



function AddAnimal(){
    species.push({
        "name": randomName(),
        "population": 1,
        "food_needed": 10,
        "food_value": 2,
        "max_predation_count": 5,
        "reproduction_rate": 3,
        "diet": []
    });
    renderTable();
    console.log("Added animal!");
}


function renderTable(){
    var text = "";
    for(var animal of species){
        text += "<tr>";
        text += "<td><div class=\"ui input\"><input value=\"" + animal.name + "\"></div></td>";
        text += "<td><div class=\"ui input\"><input value=\"" + animal.population + "\"></div></td>";
        text += "<td><div class=\"ui input\"><input value=\"" + animal.food_needed + "\"></div></td>";
        text += "<td><div class=\"ui input\"><input value=\"" + animal.food_value + "\"></div></td>";
        text += "<td><div class=\"ui input\"><input value=\"" + animal.max_predation_count + "\"></div></td>";
        text += "<td><div class=\"ui input\"><input value=\"" + animal.reproduction_rate + "\"></div></td>";
        text += "<td>"
        for(var diet of animal.diet){
            text += "<select class=\"ui dropdown\">"
            for(var a in species){
                var ani = species[a];
                text += "<option " + ((ani.name == diet) ? "selected " : "") + "value=\"" + a + "\">" + ani.name + "</option>"
            }
            text += "</select>"
        }
        text += "<button style=\"float: right;\" class=\"ui icon button\" data-tooltip=\"Add prey\" data-position=\"top right\" data-inverted=\"\"><i class=\"plus icon\"></i></button></td>";
        
        text += "</tr>";
    }
    $("#animaldisp").html(text);
}

function Cycle(){
    console.log("Starting food cycle!");

    for(var i in species){
        var animal = species[i];
        console.log(animal.name + " is now hunting.");


        if(animal.food_needed <= 0){
            console.log(animal.name + " has a food_needed value of 0; Skipping the hunt and simply multiplying for the sake of efficiency.");
            animal.population *= animal.reproduction_rate;
            for(var tempanimal of species){
                console.log("There are now " + tempanimal.population + " " + tempanimal.name + "s.");
            }
            continue;
        }

        var newPop = animal.population;

        for(j = 0; j < animal.population; j++){
            var collected = 0;
            for(var cycleNum = 0; cycleNum < animal.max_predation_count; cycleNum++){
                if(animal.diet.length === 0) break;
                var preyOfTheDay = species.filter(function(obj) {return obj.name == animal.diet[Math.floor(Math.random() * animal.diet.length)];})[0];
                
                
                if(preyOfTheDay.population === 0) continue;

                var catchNum = Math.round(preyOfTheDay.population / 10);
                if(catchNum === 0 && preyOfTheDay.population !== 0) catchNum = 1;
                preyOfTheDay.population -= catchNum;
                console.debug(catchNum + " " + preyOfTheDay.name + "s were caught! There are now " + preyOfTheDay.population + " " + preyOfTheDay.name + "s.");
                collected += catchNum * preyOfTheDay.food_value;
                if(collected >= animal.food_needed) break;
            }
            if(collected >= animal.food_needed){
                newPop += animal.reproduction_rate;
                console.debug(animal.name + j + " collected enough food!");
            }else{
                console.debug(animal.name + j + " did not collect enough food.");
                newPop -= 1;
                if(newPop < 0) newPop = 0;
            }
        }
        animal.population = newPop;
        //console.log("There are now " + animal.population + " " + animal.name + "s.");
        for(var tempanimal of species){
            console.log("There are now " + tempanimal.population + " " + tempanimal.name + "s.");
        }
    }

}


window.onload = function(){
    console.log("Systems ready.");
    renderTable();
}

