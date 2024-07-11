import { create_rectangle, query_position, update_position, 
    update_loop, build_game, input_key_down, create_sprite, update_scale, 
    set_scale, create_text, update_color, pointer_over_gameobject, 
    input_left_mouse_down, gameobjects_overlap
} from "arcade_2d";

// Create GameObjects outside update_loop(...)
const green_bg = update_scale(
                 create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/Green.jpg"), 
                 [20, 20]);

// useful constants
const faraway = -999999;
let playerA_activation = false;
let playerB_activation = false;

// ----------Initializing elements----------
const building_1 = update_scale(create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/CentalLibrary.png"),
                                    [0.1, 0.1]);
const test_text = update_color(create_text("This is a test case"), [0, 0, 225, 225]);
const the_orange_man = update_scale(
                   create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/nus_stu.png"), 
                   [0.25, 0.25]);
const the_space_invader = update_scale(
                      create_sprite("https://raw.githubusercontent.com/VihaanDU/NUS_Project/main/SpaceInvader.PNG"), 
                      [1, 1]);

const Central_Library = update_position(building_1, [800, 600]);
const playerA = update_position(the_orange_man, [600, 600]);
const playerB = update_position(the_space_invader, [150, 150]);
// const background = (green_bg, [600, 600]);
const test_case = update_position(test_text, [200, 900]);



const movement_dist = 15;

const test = update_scale(update_position(create_text("Hello World"), [faraway, faraway]), [5, 5]);


function add_vectors(to, from) {
to[0] = to[0] + from[0];
to[1] = to[1] + from[1];
}

// Test if button is clicked
update_loop(game_state => {
    const new_position1 = query_position(playerA);
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
        update_position(test, [-100, -100]);
    }
// ----------------------------------------------------

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
    update_position(playerA, new_position1);
    update_position(playerB, new_position2);
// ----------------------------------------------------
});



set_scale(0.5);
build_game();
