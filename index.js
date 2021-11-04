'use strict'


/**
 * Creates a skill object with the given skill ID and the location of the player.
 *
 * @param skill_id - The skill ID.
 * @param player_location - The location of the player.
 *
 * @return _ A skill object.
 */
function create_skill(skill_id, player_location) {
    return {
        skill: {
            id: skill_id,
            reserved: 0,
            nps: false,
            type: 1,
            huntingZoneId: 0
        },
        w: player_location.w,
        loc: player_location.loc,
        dest: player_location.dest,
        unk: true,
        moving: false,
        continue: false,
        target: 0,
        unk2: false
    }
}


/**
 * Buffs the player after a given amount of delay in milliseconds.
 * @param delay - The delay in milliseconds.
 * @param skill_id - The skill ID.
 * @param player_location - The location of the player.
 * @param mod - The mod.
 * @param job - The job of the player.
 */
function buff(mod, player_location, delay, skill_id, job) {
    if (job === 11) {
        setTimeout(() => {
            mod.send('C_START_KILL', 7, create_skill(skill_id, player_location));
        }, delay);
    }
}


module.exports = function NinjaAutoFocus(mod) {
    let player_location = {};
    let job;
    let model;

    mod.hook('S_LOGIN', 14, (packet) => {
        model = packet.templateId;
        job = (model - 10101) % 100;
    });

    mod.hook('C_PLAYER_LOCATION', 5, (event) => {
        player_location.loc = event.loc;
        player_location.w = event.w;
    });

    mod.hook('C_REVIVE_NOW', 2, (event) => {
        buff(mod, player_location, 1000, 110100, job);
    });
}