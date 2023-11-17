import { useState, useEffect } from "react";
import SpellSlotItem from "../SpellSlotItem/SpellSlotItem";

export default function ActorCard({ actor }) {
    const healthPercent = getPercent(actor.hp.value, actor.hp.max);
    const expPercent = getPercent(actor.xp.value, actor.xp.max);
    const localhost = actor.inviteLinks.local

    function getPercent(value, max) {
        const percent = Math.floor((value / max) * 100) || 0;
        return percent > 100 ? 100 : percent;
    }

    return (
        <div className="grid grid-rows-[2fr 1fr 1fr] grid-cols-4 bg-[#9BC4BC] w-1/3 rounded-lg mt-3">
            <div id="avatar-status" className="p-3 row-start-1 row-end-2 col-start-1 col-end-2 flex justify-center items-center relative">
                {actor.status.icon !== '' && <img id="actor-avatar" src={localhost + actor.status.icon} className="rounded-full h-auto w-3/4 z-10 absolute" alt="Actor" />}
                <img id="actor-avatar" src={localhost+ actor.img} className="rounded-full shadow-lg" alt="Actor" />
            </div>
            <div id="actor-info" className="grid grid-rows-[2fr 1fr 1fr]grid-cols-1 items-center row-start-1 row-end-2 col-start-2 col-end-4">
                <div className="row-start-1 row-end-2 text-black text-2xl md:text-2xl lg:text-4xl font-bold truncate">{actor.name} </div>
                <div className="row-start-2 row-end-3 text-black text-md md:text-1xl lg:text-2xl truncate">Lvl. {actor.level} {actor.race} {actor.class}</div>
                <div className="grid grid-cols-2 grid-rows-1">
                    <div className=" bg-gray-200 rounded-full dark:bg-red-950 col-start-1 col-end-2 shadow-md">
                        <div className="aw-progressbar text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{
                            width: `${healthPercent}%`,
                            backgroundColor: `hsl(${healthPercent}, 100%, 36%)`,
                            transition: 'all 1s ease-out',
                        }}>{healthPercent === 0 ? 'UNCONSCIOUS' : `${actor.hp.value}/${actor.hp.max}`}
                        </div>
                    </div>
                    <div className=" bg-gray-200 rounded-full dark:bg-red-950 col-start-2 col-end-3 shadow-md">
                        <div className="aw-progressbar text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{
                            width: `${expPercent}%`,
                            backgroundColor: `hsl(200, ${expPercent}%, 50%)`,
                            transition: 'all 1s ease-out',
                        }}>{expPercent >= 100 ? 'LEVEL UP' : `${actor.xp.value}/${actor.xp.max}`}
                        </div>
                    </div>
                </div>
            </div>
            <div id="actor-ac" className="row-start-1 row-end-2 col-start-4 col-end-5 flex justify-center items-center" >
                <div className="font-bold text-black text-1xl md:text-3xl lg:text-5xl pb-3">{actor.ac}</div>
            </div>
            <div id="actor-abilities" className="flex flex-row justify-around items-center row-start-2 row-end-3 col-start-1 col-end-5">
                <div className="text-black flex flex-col items-center"><span className="text-4xl font-bold">{actor.abilityScores.str.value}</span><span>STR</span></div>
                <div className="text-black flex flex-col items-center"><span className="text-4xl font-bold">{actor.abilityScores.dex.value}</span><span>DEX</span></div>
                <div className="text-black flex flex-col items-center"><span className="text-4xl font-bold">{actor.abilityScores.con.value}</span><span>CON</span></div>
                <div className="text-black flex flex-col items-center"><span className="text-4xl font-bold">{actor.abilityScores.int.value}</span><span>INT</span></div>
                <div className="text-black flex flex-col items-center"><span className="text-4xl font-bold">{actor.abilityScores.wis.value}</span><span>WIS</span></div>
                <div className="text-black flex flex-col items-center"><span className="text-4xl font-bold">{actor.abilityScores.cha.value}</span><span>CHA</span></div>
            </div>
            <div className="grid grid-cols-2 grid-rows-1 row-start-3 row-end-4 col-start-1 col-end-5">
                <div id="actor-items" className="col-start-1 col-end-2 grid grid-cols-3 items-center justify-items-center">
                    <div id='weapon' className="h-5/6 col-start-1 col-end-2 flex justify-center items-center relative">
                        <img src={localhost + actor.weapon.img} alt="weapon" className="h-3/4 rounded-md" />
                        <span className="z-10 absolute font-bold text-white text-sm md:text-md lg:text-2xl">{actor.weapon.name === 'unarmed' ? '' : '+' + actor.weapon.attackBonus}</span>
                    </div>
                    <div id="consumable" className="h-5/6 col-start-2 col-end-3 flex justify-center items-center relative">
                        <img src={localhost + actor.consumable.img} alt="consumable" className="h-3/4 rounded-md" />
                        <span className="z-10 absolute font-bold text-white text-sm md:text-md lg:text-2xl"></span>
                    </div>
                </div>
                <div id="actor-spellslots" className="grid grid-rows-1 items-center" style={{ gridTemplateColumns: `repeat(${actor.spellSlots.length}, 1fr)` }}>
                    {actor.spellSlots.map((spell, index) => (
                        <SpellSlotItem slotName={spell.name} spellSlotsPerc={getPercent(spell.value, spell.max)} spell={spell} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}