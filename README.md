# Dungeon Crawler Thing

Made with
- ts
- react
- react-three-fiber
- drei
- zustand
- immer

and more.



## Development Notes

### Mobs, Packs & State
I need a data store for mobs. It should not only allow access to all mob data, but also
allow me to lookup mobs by map position.
I also want `mob packs`. A pack forms when multiple mobs end up on the same cell.
They will also have a shared state to allow for all kinds of pack behaviour. 
For instance, a king never moves without his guards.

Packs can form and dissolve dynamically or be part of some mob's Def (e. g.  the
aforementioned king always comes with guards included).  No matter how they are
formed, they will likely not separate as they all want to whack the player.
However, this presents an opportunity for different behaviours, the king ought
to flee sooner than his guards.

The most primitive data structure for a pack is of course, an array of mob ids.

I only want to share gameplay relevant mob data, not rendering data, such as textures.

Mobs have Mob Definitions that define their stats, abilities, etc.
When creating a mob, I'll just copy the mobdef and add the mob's current state.

For now I will use a simple ruleset, so attributes are limited to the bare minimum.
I will give party members and mobs the same attributes until the inevitable feature creep sets in.
Equipment is out of scope for now, as are spells and other abilities.
Different behaviours can be implemented via the strategy pattern, but I will not do that yet.

```ts
type MobDef = {
    name: string;
    hp: number;
    xp: number;
    attack: number;
    defense: number;
    speed: number;
    armor: number;
    baseDamage: number;
    piercingDamage: number;
    critChance: number;
    spread: number;
    isHostile: boolean;
    packSize: number;
}

type MobRenderDef = {
    displayName: string;
    texture: string;
}

type MobState = MobDef & {
    def: ReadOnly<MobDef>
    render: MobRenderData; // mutable
    uuid: string;
    position: Vec2i;
    // ... is also a mutable copy of MobDef
}

type MobPack = {
    /** right now only dynamic packs are supported */
    members: MobState[];
    position: Vec2i;
}
```

The mob store contains a 2d array of `MobState | MobPack | undefined`.
Alternatively all mobs could be wrapped in a MobPack.

### Ruleset & Combat

#### Attributes
I'll use an attribute range from 1 to 100. Higher numbers are better.

#### Attack, Defense & Damage

I use a sigmoid function to calculate the chance to hit.
Damage is oriented around a base damage value, with a random spread.
Armor is subtracted, but piercing damage can ignore some of it.

```ts
chanceToHit = def > 0 ? 1 / (1 + Math.exp(-0.1 * (atk - def))) : 1
reducedArmor = Math.max(0, armor - piercingDamage)
variance = ((0.5 - Math.random()) * spread * 2 * baseDamage)
r = Math.random() 
damage = r < chanceToHit ? baseDamage + random - reducedArmor : 0
crit = r < critChance ? 2 : 1
finalDamage = damage * crit
```

#### Turn order
Right now I use a discrete turn-based system that might be too complex for players, but I'll go with it for now.
There are no fixed turns, an actor can schedule a turn to happen after a certain delay in ingame time, e. g. `1.2`.
The unit does not have a bespoke meaning, but it might be a good idea to treat '1.0' as 1 second.
(Although this analogy breaks down at low and high speed values.)

All actions take the same amount of time (derived from the mob's speed).

```ts
turnDelay = 160 / (speed + 10)
```

speed = 5, turnDelay = 10.7
speed = 10, turnDelay = 8 -- start?
speed = 20, turnDelay = 5.3 -- mid?
speed = 40, turnDelay = 3.2 -- endgame?
speed = 60, turnDelay = 2.3
speed = 80, turnDelay = 1.8

#### Party Member Generation
A party member starts with 16 points that can be distributed like so:
hp: 20 + 2*x
attack: 6 + x
defense: 6 + x;
speed: 6 + x;

#### Level up
The total amount of xp needed for a lvl is: `xp = (1/3)*(lvl+1)**3 + 30*(lvl+1)`
To get the level from xp: `lvl = Math.floor(Math.max(0, (3*(xp - 30))**(1/3)))`
For now all stats increase by 1 on level up, except hp which increases by 2.

### Map Rendering

#### Current capabilities
- render a cell with up to 6 textured faces (cardinals + up/down)
- render a map of cells such that walls between adjacent non-empty cells are not rendered
- use textures from a texture atlas
- render a map from a string array and legend

#### Intended capabilities
- transparency for walls (trivial)

#### Out of scope, oh please God no
- vertex manipulation for slightly irregular cell shapes
    - already implemented, but must be enabled in map format
    - variable height of cells
        - per y-layer minima/maxima 
        - per-cell y-offsets that must be within the layer constraints
    - slanted walls for mountain slopes, roofs etc.
    - procedural rough-hewn walls
- render object/mob standees with offsets attached to cells
- render 3d models attached to cells
- interactive cell/face features (doors, levers, traps, etc)
- lighting/shadow per cell or light objects
- multiple map layers

#### Open questions
Should rendering be done differently for exterior scenes? 
Authoring might be simplified if face normals are flipped so they point outwards.


##### Vertex manipulation
Should the number of vertices stay at 8 per cell? A higher vert count obviously
allows for more complex shapes, but complicates the rendering process.
I will do some testing with blender to see what kind of exterior scenes are possible
with only 8 vertices per cell.

