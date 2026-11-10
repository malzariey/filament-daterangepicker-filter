import fs from 'fs';
import {
    buildLocaleNames,
    buildRoundTripFixture,
    LOCALE_NAMES_PATH,
    ROUND_TRIP_FIXTURE_PATH,
    serialize,
} from './locale-names.js';

fs.writeFileSync(LOCALE_NAMES_PATH, serialize(buildLocaleNames()));
fs.writeFileSync(ROUND_TRIP_FIXTURE_PATH, serialize(buildRoundTripFixture()));

console.log(`Wrote ${LOCALE_NAMES_PATH} and ${ROUND_TRIP_FIXTURE_PATH}`);
