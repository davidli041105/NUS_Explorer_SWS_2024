import { create_rectangle, query_position, update_position, 
    update_loop, build_game, input_key_down, create_sprite, update_scale, 
    set_scale, create_text, update_color, pointer_over_gameobject, 
    input_left_mouse_down, gameobjects_overlap, set_dimensions,
    get_game_time, update_text
} from "arcade_2d";
import { make_sound, play, consecutively } from "sound";

// useful constants
const faraway = -999999;
const length = 1950;
const width = 1600;
let playerA_activation = false;
let playerB_activation = false;
let playerC_activation = false;
let explorer_activation = false;
let num_of_coins = 0;
const green_bg = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Green.jpg"), [20, 20]);
let discovery_on = false;
let game_on = false;
// ----------Constructing upper road------------
const upper_road0 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Road_Test.png"), [0.5, 0.5]), [-125, 450]);
const upper_road1 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Road_Test.png"), [0.5, 0.5]), [200, 450]);
const upper_road2_crossing = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Crossing.png"), [0.5, 0.5]), [525, 450]);
const upper_road3 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Road_Test.png"), [0.5, 0.5]), [850, 450]);
const upper_road4 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Road_Test.png"), [0.5, 0.5]), [1175, 450]);
const upper_road5 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Road_Test.png"), [0.5, 0.5]), [1500, 450]);
const upper_road6 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Road_Test.png"), [0.5, 0.5]), [1825, 450]);


const left_road_1 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Road_vertical.png"), [0.5, 0.5]), [493, 67]);
const left_road_2 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Road_vertical.png"), [0.5, 0.5]), [493, 830]);
const left_road_3 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Road_vertical.png"), [0.5, 0.5]), [493, 1210]);
const left_road_4 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Road_vertical.png"), [0.5, 0.5]), [493, 1590]);

// ----------Constructing School Buildings------
const building_1 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/CentalLibrary.png"), [0.15, 0.15]);
const Central_Library = update_position(building_1, [775, 800]);
const building_2 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/USC_Updated.png"), [0.2, 0.2]);
const University_Sports_Center = update_position(building_2, [360, 250]);
const building_3 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/COM4.png"), [0.2, 0.2]);
const COM4 = update_position(building_3, [1200, 260]);
const building_4 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/NUS_Museum.png"), [0.25, 0.25]);
const Museum = update_position(building_4, [360, 560]);
const building_5 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/NUH.png"), [0.2, 0.2]);
const NUH = update_position(building_5, [1600, 260]);



const test_text = update_color(create_text("This is a test case"), [0, 0, 225, 225]);
const still_obj_01 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Coins_test.png"), [0.05, 0.05]);
const coin1 = update_position(still_obj_01, [400, 700]);

const still_obj_02 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Coins_test.png"), [0.05, 0.05]);
const coin2 = update_position(still_obj_02, [800, 300]);

const the_orange_man = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/nus_stu.png"), [0.2, 0.2]);
const the_space_invader = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/SpaceInvader.PNG"), [1, 1]);
const nus_lion = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/NusMascOri.PNG"), [0.35, 0.35]);
const merlion = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Merlion.PNG"), [0.25, 0.25]);


const moving_obj_01 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/NUS_BUS(Final%20one).png"), [0.125, 0.125]);


const playerA = update_position(the_orange_man, [400, 1500]);
const playerB = update_position(the_space_invader, [0, 600]);
const playerC = update_position(nus_lion, [600, 1500]);
const explorer = update_position(merlion, [1000, 1500]);
const shuttle_bus1 = update_position(moving_obj_01, [0, 420]);
// const background = (green_bg, [600, 600]);
const test_case = update_position(test_text, [200, 900]);



const movement_dist = 15;

const test = update_scale(update_position(create_text("Hello World"), [faraway, faraway]), [5, 5]);

// ----------Initializing top elements----------
const time = update_position(update_scale(create_text("Time: 0"), [2, 2]), [100, 30]);
const score = update_position(update_scale(create_text("Score: 0"), [2, 2]), [length - 100, 30]);
const hearts = update_position(update_scale(create_text("Heart(s): "), [2, 2]), [length/2 - 200, 30]);

const Discovery_Button = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Discover_Button_Updated.png"), [0.5, 0.5]), [200, 1500]);

// ----------Hearts------------------------------------
const heart_1 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/heart.png"), [0.05, 0.05]), [length / 2 - 75, 30]);
const heart_2 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/heart.png"), [0.05, 0.05]), [length / 2 - 25, 30]);
const heart_3 = update_position(update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/heart.png"), [0.05, 0.05]), [length / 2 + 25, 30]);

// ----------movements---------------------------------
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
// ----------Play Coin Sound---------------------------
function coin_sound(){
    const main_ding_sound_wave = t => (math_sin(2 * math_PI * 1046.50 * t) 
            + 0.5 * math_sin(2 * math_PI * 2093.00 * t)) * math_exp(-5 * t);
    const main_ding_sound = make_sound(main_ding_sound_wave, 0.1);
    const high_pitch_end_wave = t =>  (math_sin(2 * math_PI * 1440 * t) * math_exp(-5 * t) 
            + 0.5 * math_sin(2 * math_PI * 2880 * t)) * math_exp(-5 * t); 
    const high_pitch_end = make_sound(high_pitch_end_wave, 0.2);
    const coin_sound = consecutively(list(main_ding_sound, high_pitch_end));
    play(coin_sound);
}
// ----------Check which mode is on--------------------
function check_discovery_mode_is_on() {return discovery_on;}
function check_game_mode_is_on() {return game_on;}

// **********GAME CONTROLS*****************************
update_loop(game_state => {
    const new_position1 = boundary_check((query_position(playerA)));
    const new_position2 = query_position(playerB);
    const new_position3 = boundary_check((query_position(playerC)));
    const new_position4 = boundary_check((query_position(explorer)));
    const new_position_test = query_position(test);

// ----------Control the orange man--------------------
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
// ----------------------------------------------------
// ----------Control the lion--------------------------
    if (input_key_down("i") && playerC_activation) {
        add_vectors(new_position3, [0, -1 * movement_dist]);
    }
    if (input_key_down("j") && playerC_activation) {
        add_vectors(new_position3, [-1 * movement_dist, 0]);
    }
    if (input_key_down("k") && playerC_activation) {
        add_vectors(new_position3, [0, movement_dist]);
    }
    if (input_key_down("l") && playerC_activation) {
        add_vectors(new_position3, [movement_dist, 0]);
    }
// ----------------------------------------------------
// ----------Control the merlion--------------------------
    if (input_key_down("ArrowUp") && explorer_activation) {
        add_vectors(new_position4, [0, -1 * movement_dist]);
    }
    if (input_key_down("ArrowLeft") && explorer_activation) {
        add_vectors(new_position4, [-1 * movement_dist, 0]);
    }
    if (input_key_down("ArrowDown") && explorer_activation) {
        add_vectors(new_position4, [0, movement_dist]);
    }
    if (input_key_down("ArrowRight") && explorer_activation) {
        add_vectors(new_position4, [movement_dist, 0]);
    }
// ----------------------------------------------------

// ----------Clicking Buttons--------------------------
    if(pointer_over_gameobject(Discovery_Button) && input_left_mouse_down()){
        if(discovery_on) {discovery_on = false;}
        else {discovery_on = true;}
    }
    
// ----------pop/un-pop information--------------------    
    if(gameobjects_overlap(playerA, test_case) && check_discovery_mode_is_on()) {
        update_position(test, [300, 600]);
    }
    if(!gameobjects_overlap(playerA, test_case) || !check_discovery_mode_is_on()) {
        update_position(test, [faraway, faraway]);
    }
// ----------------------------------------------------

    if(gameobjects_overlap(playerA, coin1)){
        num_of_coins = num_of_coins + 1;
        coin_sound();
        update_text(score, "Score: " + stringify(num_of_coins));
        update_position(coin1, [faraway, faraway]);
    }
    
    if(gameobjects_overlap(playerA, coin2)){
        num_of_coins = num_of_coins + 1;
        coin_sound();
        update_text(score, "Score: " + stringify(num_of_coins));
        update_position(coin2, [faraway, faraway]);
    }

// ----------players activation------------------------
    if (pointer_over_gameobject(playerC) && input_left_mouse_down()) {
        if(playerC_activation){
            playerC_activation = false;
        }
        else{
            playerC_activation = true;
        }
    }
    if (pointer_over_gameobject(playerA) && input_left_mouse_down()) {
        playerA_activation = true;
    }
    
    if (pointer_over_gameobject(explorer) && input_left_mouse_down() && discovery_on) {
        explorer_activation = true;
    }
// ----------------------------------------------------

//----------Update GameObjects within update_loop(...)-
    update_text(time, "Time: " + stringify(math_floor(get_game_time() / 1000)) + "s");
    update_position(playerA, new_position1);
    update_position(playerB, boundary_check([1950 - get_game_time()/3, 1200])); // moving in loops
    update_position(shuttle_bus1, boundary_check([1950 - get_game_time()/1, 415]));
    update_position(playerC, new_position3);
    update_position(explorer, new_position4);
// ----------------------------------------------------
});


// set the width as 500 and height as 400
set_dimensions([1000, 800]);
set_scale(0.5);

build_game();