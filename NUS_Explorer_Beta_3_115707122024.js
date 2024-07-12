import { create_rectangle, query_position, update_position, 
    update_loop, build_game, input_key_down, create_sprite, update_scale, 
    set_scale, create_text, update_color, pointer_over_gameobject, 
    input_left_mouse_down, gameobjects_overlap, set_dimensions,
    get_game_time, update_text
} from "arcade_2d";

// Create GameObjects outside update_loop(...)
const green_bg = update_scale(
                 create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Green.jpg"), 
                 [20, 20]);

// useful constants
const faraway = -999999;
const length = 1950;
const width = 1600;
let playerA_activation = false;
let playerB_activation = false;
let num_of_coins = 0;
// ----------Initializing elements----------
const time = update_position(update_scale(create_text("Time: 0"), [2, 2]), [100, 50]);
const score = update_position(update_scale(create_text("Score: 0"), [2, 2]), [length - 100, 50]);
const building_1 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/CentalLibrary.png"), [0.12, 0.12]);
const building_2 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/NUS%20Sports%20Center.png"), [0.2, 0.2]);
const road1 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Road_Test.png"), [0.5, 0.5]), [200, 450]);

const test_text = update_color(create_text("This is a test case"), [0, 0, 225, 225]);
const still_obj_01 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Coins_test.png"), [0.05, 0.05]);
const coin1 = update_position(still_obj_01, [400, 600]);

const still_obj_02 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Coins_test.png"), [0.05, 0.05]);
const coin2 = update_position(still_obj_02, [800, 300]);

const the_orange_man = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/nus_stu.png"), [0.25, 0.25]);
const the_space_invader = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/SpaceInvader.PNG"), [1, 1]);

const moving_obj_01 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/NUS_BUS(Final%20one).png"), [0.15, 0.15]);


// const still_obj_01 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Coins_test.png"), [0.05, 0.05]);




const Central_Library = update_position(building_1, [975, 800]);
const University_Sports_Center = update_position(building_2, [1700, 800]);

const playerA = update_position(the_orange_man, [400, 1500]);
const playerB = update_position(the_space_invader, [0, 600]);
const shuttle_bus1 = update_position(moving_obj_01, [0, 400]);
// const background = (green_bg, [600, 600]);
const test_case = update_position(test_text, [200, 900]);



const movement_dist = 15;

const test = update_scale(update_position(create_text("Hello World"), [faraway, faraway]), [5, 5]);


function add_vectors(to, from) {
    to[0] = to[0] + from[0];
    to[1] = to[1] + from[1];
}

// ----------Checks if reaches boundaries or not-------
function boundary_check(v){
    let new_coordinate = v;
    if(v[0] <= 0){
        new_coordinate[0] = length - math_abs(v[0]) % length;
    } else {
        new_coordinate[0] = v[0] % length;
    }
    
    if(v[1] <= 0){
        new_coordinate[1] = width - math_abs(v[1]) % width;
    } else {
        new_coordinate[1] = v[1] % width;
    }
    return new_coordinate;
}
// ----------------------------------------------------

// Test if button is clicked
update_loop(game_state => {
    const new_position1 = boundary_check((query_position(playerA)));
    const new_position2 = query_position(playerB);
    const new_position_test = query_position(test);

    if (input_key_down("w") && playerA_activation) {
        add_vectors(new_position1, [0, -1 * movement_dist]);
    }
    if (input_key_down("a") && playerA_activation) {
        add_vectors(new_position1, [-1 * movement_dist, 0]);
    }
    if (input_key_down("s") && playerA_activation) {
        add_vectors(new_position1, [0, movement_dist]);
    }
    if (input_key_down("d") && playerA_activation) {
        add_vectors(new_position1, [movement_dist, 0]);
    }
    if (input_key_down("i") && playerB_activation) {
        add_vectors(new_position2, [0, -1 * movement_dist]);
    }
    if (input_key_down("j") && playerB_activation) {
        add_vectors(new_position2, [-1 * movement_dist, 0]);
    }
    if (input_key_down("k") && playerB_activation) {
        add_vectors(new_position2, [0, movement_dist]);
    }
    if (input_key_down("l") && playerB_activation) {
        add_vectors(new_position2, [movement_dist, 0]);
    }
    
    
// ----------pop/un-pop information--------------------    
    if(gameobjects_overlap(playerA, test_case)) {
        update_position(test, [300, 600]);
    }
    if(!gameobjects_overlap(playerA, test_case)) {
        update_position(test, [faraway, faraway]);
    }
// ----------------------------------------------------

    if(gameobjects_overlap(playerA, coin1)){
        num_of_coins = num_of_coins + 1;
        update_text(score, "Score: " + stringify(num_of_coins));
        update_position(coin1, [faraway, faraway]);
    }
    
    if(gameobjects_overlap(playerA, coin2)){
        num_of_coins = num_of_coins + 1;
        update_text(score, "Score: " + stringify(num_of_coins));
        update_position(coin2, [faraway, faraway]);
    }

// ----------players activation------------------------
    if (pointer_over_gameobject(playerB) && input_left_mouse_down()) {
        if(playerB_activation){
            playerB_activation = false;
        }
        else{
            playerB_activation = true;
        }
    }
    if (pointer_over_gameobject(playerA) && input_left_mouse_down()) {
        playerA_activation = true;
    }
// ----------------------------------------------------

//----------Update GameObjects within update_loop(...)-
    update_text(time, "Time: " + stringify(math_floor(get_game_time() / 1000)) + "s");
    update_position(playerA, new_position1);
    update_position(playerB, boundary_check([1950 - get_game_time()/3, 1200])); // moving in loops
    update_position(shuttle_bus1, boundary_check([1950 - get_game_time()/1, 400]));
// ----------------------------------------------------
});


// set the width as 500 and height as 400
set_dimensions([1000, 800]);
set_scale(0.5);

build_game();