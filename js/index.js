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

        ],
        "pop_hist": []
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
        ],
        "pop_hist": []
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
        ],
        "pop_hist": []
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
        ],
        "pop_hist": []
    }
];
var resetMode = false;
var oldSpecies = species;

function AddAnimal(){
    species.push({
        "name": randomName(),
        "population": 1,
        "food_needed": 10,
        "food_value": 2,
        "max_predation_count": 5,
        "reproduction_rate": 3,
        "diet": [],
        "pop_hist": []
    });
    renderTable();
    console.log("Added animal!");
}

function changeData(idx){
    console.log("changing data of species[" + idx + "]");
    var newname = document.getElementById("name-" + idx).value;
    if(species[idx].name != newname){
        console.debug("Name has changed. Updating name.");
        for(var anidx in species){
            var ani = species[anidx];
            for(var preyidx in ani.diet){
                var prey = ani.diet[preyidx];
                if(prey == species[idx].name){
                    console.debug("Found name " + prey + " in " + ani.name + ". Changing.");
                    species[anidx].diet[preyidx] = newname;
                }
            }
        }
        species[idx].name = newname;
    }
    species[idx].population = document.getElementById("population-" + idx).value;
    species[idx].food_needed = document.getElementById("food_needed-" + idx).value;
    species[idx].food_value = document.getElementById("food_value-" + idx).value;
    species[idx].max_predation_count = document.getElementById("max_predation_count-" + idx).value;
    species[idx].reproduction_rate = document.getElementById("reproduction_rate-" + idx).value;

    for(var i in species[idx].diet){
        species[idx].diet[i] = document.getElementById("diet-" + idx + "-" + i).value;
    }

    renderTable();
}

function Delete(idx){
    species.splice(idx, 1);
    console.log("Deleted " + idx);
    renderTable();
}

function renderTable(){
    var text = "";
    for(var aniidx in species){
        var animal = species[aniidx];
        text += "<tr>";
        text += "<td><div class=\"ui input\"><input onchange=\"changeData(" + aniidx + ")\" value=\"" + animal.name + "\" id=\"name-" + aniidx + "\"></div><button class=\"ui button negative icon\" style=\"float: right;\" onclick=\"Delete(" + aniidx + ")\"><i class=\"trash icon\"></i></button></td>";
        text += "<td class=\"" + (animal.population === 0 ? "warning" : "") + "\"><div class=\"ui input\"><input onchange=\"changeData(" + aniidx + ")\" value=\"" + animal.population + "\" id=\"population-" + aniidx + "\"></div></td>";
        text += "<td><div class=\"ui input\"><input onchange=\"changeData(" + aniidx + ")\" value=\"" + animal.food_needed + "\" id=\"food_needed-" + aniidx + "\"></div></td>";
        text += "<td><div class=\"ui input\"><input onchange=\"changeData(" + aniidx + ")\" value=\"" + animal.food_value + "\" id=\"food_value-" + aniidx + "\"></div></td>";
        text += "<td><div class=\"ui input\"><input onchange=\"changeData(" + aniidx + ")\" value=\"" + animal.max_predation_count + "\" id=\"max_predation_count-" + aniidx + "\"></div></td>";
        text += "<td><div class=\"ui input\"><input onchange=\"changeData(" + aniidx + ")\" value=\"" + animal.reproduction_rate + "\" id=\"reproduction_rate-" + aniidx + "\"></div></td>";
        text += "<td>"
        for(var d in animal.diet){
            var diet = animal.diet[d];
            text += "<select class=\"ui dropdown\" onchange=\"changeData(" + aniidx + ")\" id=\"diet-" + aniidx + "-" + d + "\">";
            for(var a in species){
                var ani = species[a];
                text += "<option " + ((ani.name == diet) ? "selected " : "") + "value=\"" + ani.name + "\">" + ani.name + "</option>";
            }
            text += "</select>"
        }
        text += "<button style=\"float: right;\" onclick=\"AddPrey(" + aniidx + ")\" class=\"ui icon button\" data-tooltip=\"Add prey\" data-position=\"top right\" data-inverted=\"\"><i class=\"plus icon\"></i></button></td>";
        
        text += "</tr>";
    }
    $("#animaldisp").html(text);
}

var colors = [
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "black",
    "yellow",
    "grey",
    "lightblue",
    "darkgoldenrod",
    "cornflowerblue",
    "crimson"
];

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var cycles = 0;

function renderChart(){
    var ctx = document.getElementById("chart").getContext('2d');
    var data = [{
        x: 10,
        y: 20
    }, {
        x: 15,
        y: 10
    }];



    var datasets = [];

    var dataLabels = [];

    for(var i = 1; i <= cycles; i++){
        dataLabels.push(i);
    }

    for(var anidx in species){
        var animal = species[anidx];
        var color = "black";
        if(anidx >= colors.length){
            color = getRandomColor();
        }else{
            color = colors[anidx];
        }

        datasets.push(
            {
                label: animal.name,
                backgroundColor: color,
                borderColor: color,
                data: animal.pop_hist,
                fill: false
            }
        );

    }

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataLabels,
            datasets: datasets
        },
        options: {
            responsive: true,
            title:{
                display:true,
                text:'Population Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Cycle'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Population'
                    }
                }]
            }
        }
    });



}

function Reset(){
    if(resetMode == false) return;
    resetMode = false;
    species = oldSpecies;
    cycles = 0;
    $("#resetbtn").hide();
    $("#body").css("background-color", "#FFFFFF");

    for(var animal of species){
        animal.pop_hist = [];
    }

    renderTable();
}
function AddPrey(idx){
    species[idx].diet.push(species[idx].name); //cannibalism?
    renderTable();
}

function Cycle(){
    if(resetMode == false){
        //oldSpecies = species;
        oldSpecies = JSON.parse(JSON.stringify(species));
        //$("#body").css("background-color", "#FFAAAA");
        //ARARAGHGHGHAHRHARHAHRHGHG DEREFERENCING. THIS IS ABSOLUTELY GROSE AND INEFFICIENT but you gotta do what you gotta do
        
        $("#resetbtn").show();
        console.log("setting oldSpecies");
    }
    resetMode = true;
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
                
                console.log("looking for " + animal.diet[Math.floor(Math.random() * animal.diet.length)]);
                if(preyOfTheDay.population === 0) continue;

                var catchNum = Math.round(preyOfTheDay.population / 10);
                if(catchNum === 0 && preyOfTheDay.population !== 0) catchNum = 1;
                preyOfTheDay.population -= catchNum;
                if(preyOfTheDay.population < 0) preyOfTheDay.population = 0;
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
    cycles++;

    for(var animal of species){
        animal.pop_hist.push(animal.population);
    }

    renderTable();
    renderChart();
}


window.onload = function(){
    console.log("Systems ready.");
    renderTable();
}

