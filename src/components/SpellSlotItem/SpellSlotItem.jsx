import ProgressBarUnit from "./ProgressBarUnit";
import "./SpellSlotItem.css";

export default function SpellSlotItem({ slotName, spell }) {
    const {value, max} = spell;
    const slotNum = getSpellSlotNum(slotName);

    return (
        <div className="flex flex-col flex-nowrap justify-end w-1/2 h-3/4 bg-gray-200 rounded-sm overflow-hidden dark:bg-gray-700 relative">
            {Array.from({ length: max }, (_, index) => (
                <ProgressBarUnit key={index} index={index} max={max} value={value} />
            )).reverse()}
            <span id="slotnum" className="flex font-bold text-white absolute">{slotNum}</span>
        </div>
    );
}

function getSpellSlotNum(slotName) {
    if (slotName === 'pact') return slotName;
    slotName = slotName.split('spell');
    return slotName.at(-1);
}