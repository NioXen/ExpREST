import * as es from "event-stream";
import * as fs from "fs";
import * as JSONStream from "JSONStream";
import * as path from "path";
import { Category } from "./entity/Achievements/Category";

class WoWAchievementInterpreter {

    public parseAchievementsFromFile() {
        const jsonPath = path.join(__dirname, "..", "..", "resources", "AllAchievements.json");
        const parser = JSONStream.parse(["test", true]);
        const rdStream = fs.createReadStream(jsonPath);
        rdStream
        .pipe(parser)
        .pipe(es.mapSync((data, callback) => {
            const cat = new Category(data);
            callback(null, cat);
        }));
    }
}

const wowachi = new WoWAchievementInterpreter();
// wowachi.parseAchievementsFromFile();
