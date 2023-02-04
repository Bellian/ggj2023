import { ISpriteInterface } from "@/stores/mapEditorStore";


export abstract class Entity {

    static sprite: ISpriteInterface;


    toJSON() {
        return {
            class: this.constructor.name,
        }
    }
}