export type Attributes = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
};

export type Attribute = "Strength" | "Dexterity" | "Constitution" | "Intelligence" | "Wisdom" | "Charisma";

export type Class = "Barbarian" | "Wizard" | "Bard";

export type Skill = "Acrobatics" | "Animal Handling" | "Arcana" | "Athletics" | "Deception"
    | "History" | "Insight" | "Intimidation" | "Investigation" | "Medicine" | "Nature"
    | "Perception" | "Performance" | "Persuasion" | "Religion" | "Sleight of Hand" | "Stealth" | "Survival";

export type AttributeCounter = {
    [K in Attribute]: {
        val: number,
        mod: number
    }
};

export type CharacterItem = {
    attribute: AttributeCounter;
    skills: Record<Skill, number>;
    ordinal: number;
};
