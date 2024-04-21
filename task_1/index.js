import { encoded, translations } from './data.js';

console.log("Let's rock");
console.log(encoded, translations);

function decodeFields(encoded, translations) {
    const decoded = encoded.map(item => {
        const decodedItem = { ...item };
        for (const key in item) {
            if (key.endsWith("Id") && key !== "groupId" && !["service", "formatSize", "ca"].includes(key)) {
                const value = translations[item[key]];
                if (value !== undefined) {
                    decodedItem[key] = value;
                }
            }
        }
        return decodedItem;
    });
    return decoded;
}

const decoded = decodeFields(encoded, translations);
console.log(decoded);


function getUniqueIds(encoded) {
    const uniqueIds = new Set();
    encoded.forEach(item => {
        for (const key in item) {
            if (key.endsWith("Id") && key !== "groupId" && item[key] !== null) {
                uniqueIds.add(item[key]);
            }
        }
    });
    return Array.from(uniqueIds);
}


const uniqueIds = getUniqueIds(encoded);
console.log(uniqueIds);
