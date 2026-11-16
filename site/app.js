'use strict';
/* HDV Forever : site personnel d'analyse de l'hôtel des ventes de WoW Forever.
   Les données sont chiffrées (AES-GCM) et déchiffrées ici avec le mot de passe. */

// ------------------------------------------------------------------ textes FR / EN
const T = {
  fr: {
    nav_market: 'Marché', nav_best: 'Bestiaire', nav_farm: 'Farm par niveau', nav_craft: 'Métiers', nav_vendor: 'PNJ → HDV',
    nav_gaps: 'Écarts entre HDV', nav_watch: 'Suivi', nav_settings: 'Réglages',
    search_ph: 'Chercher un objet (FR ou EN)…', lock_text: 'Entre le mot de passe de ton site.', remember: 'Se souvenir de moi sur cet appareil',
    unlock: 'Ouvrir', bad_pw: 'Mot de passe incorrect, ou données pas encore générées.', loading: 'Chargement…',
    no_data: 'Pas encore de données pour cet HDV. Le premier relevé arrive dans l’heure.',
    horde: 'Horde', alliance: 'Alliance', neutral: 'Blackwater (neutre)',
    updated: 'Prix de', next_update: 'prochaine mise à jour vers',
    title_market: "L'hôtel des ventes", sub_market: 'Europe · {rs} · relevés Blizzard toutes les heures',
    k_auctions: 'Annonces en vente', k_value: 'Valeur du marché', k_items: 'Objets différents', k_flow: 'Ventes estimées / jour',
    k_value_s: 'au prix du marché', k_flow_s: 'en or, ventes estimées',
    indexes: 'Indices du marché', index_help: 'Chaque indice part de 100 au premier relevé : 110 = les prix ont monté de 10 %. Clique sur des lignes pour les comparer (5 max).',
    movers: 'Ce qui bouge (24 h)', rising: 'En hausse', falling: 'En baisse', best_sellers: 'Ce qui se vend le mieux',
    best_help: 'Classé par or échangé par jour (ventes estimées × prix). Ce sont les marchés les plus actifs.',
    trade_board: 'Matériaux', factions: 'Horde, Alliance, Blackwater', factions_help: 'Prix du marché du même objet dans les trois HDV de ton groupe.',
    col_item: 'Objet', col_min: 'Le moins cher', col_mkt: 'Prix du marché', col_qty: 'En vente', col_lst: 'Annonces', col_pd: 'Ventes/jour',
    col_d1: '24 h', col_d7: '7 j', col_d30: '30 j', col_lvl: 'Niv.', col_flow: 'Or/jour', col_vendor: 'Vente PNJ', col_buy: 'Achat PNJ',
    col_cost: 'Coût', col_sell: 'Vente nette', col_profit: 'Bénéfice/u', col_margin: 'Marge', col_ppd: 'Bénéfice/jour', col_prof: 'Métier',
    col_house: 'HDV', col_source: 'Source', col_value: 'Valeur', col_index: 'Indice',
    est: 'estimé', unknown: 'pas encore assez de relevés', results: 'résultats', none: 'Rien à afficher.',
    item_houses: 'Dans chaque HDV', item_chart: 'Historique des prix', item_made_by: 'Se fabrique avec', item_used_in: 'Sert à fabriquer',
    item_vendor_sell: 'Le PNJ te le rachète', item_vendor_buy: 'Le PNJ le vend', item_ilvl: 'Niveau d’objet', item_req: 'Niveau requis',
    watch_add: 'Suivre cet objet', watch_on: 'Suivi ✓', series_mkt: 'Prix du marché', series_min: 'Le moins cher', series_qty: 'Quantité',
    p_1d: '24 h', p_3d: '3 j', p_1w: '7 j', p_1m: '30 j', p_all: 'Tout',
    farm_title: 'Farm par niveau', farm_sub: 'Les ressources de ton niveau qui rapportent le plus, par source.',
    farm_help: 'Or/jour = ventes estimées par jour × prix du marché : c’est ce qui se vend le plus ET le mieux. Une ressource avec beaucoup d’annonces en vente veut dire beaucoup de concurrence. Le niveau d’objet d’une ressource correspond en gros au niveau des monstres ou de la zone où on la trouve.',
    my_level: 'Mon niveau', range: 'Écart', focus: 'À privilégier',
    src_mobs_humanoid: 'Monstres humanoïdes (tissu)', src_skinning: 'Dépeçage', src_mining: 'Minage', src_smelt: 'Fonte (minage)',
    src_mobs_beast: 'Bêtes (viande)', src_fishing: 'Pêche', src_herbalism: 'Herboristerie', src_mobs_elemental: 'Élémentaires',
    src_disenchant: 'Désenchantement', src_mobs_misc: 'Monstres (divers)', src_all: 'Toutes les sources',
    vendor_note: 'Vendu à l’HDV moins cher que le PNJ ne le rachète : vends-le plutôt au PNJ.',
    craft_title: 'Craft rentable', craft_sub: 'Coût des composants comparé au prix de vente, taxe de l’HDV ({cut} %) déduite.',
    craft_help: 'Chaque composant est compté au moins cher entre l’HDV et le PNJ (s’il est vendu par un PNJ). Bénéfice/jour = bénéfice par objet × ventes estimées par jour : c’est ce chiffre qui dit si ça vaut le coup.',
    all_profs: 'Tous les métiers', min_sales: 'Ventes/jour min.', incomplete: 'prix manquant', only_profit: 'Seulement rentable',
    vendor_title: 'Acheter au PNJ, revendre à l’HDV', vendor_sub: 'Objets vendus par des PNJ qui partent plus cher à l’HDV.',
    vendor_help: 'Les objets marqués « à vérifier » sont des recettes dont l’API donne un prix d’achat, mais on ne sait pas si un PNJ la vend vraiment. Les recettes en quantité limitée chez les PNJ sont souvent les meilleures affaires.',
    to_check: 'à vérifier', curated: 'vendeur connu',
    gaps_title: 'Écarts entre HDV', gaps_sub: 'Acheter là où c’est moins cher, revendre là où c’est plus cher.',
    gaps_help: 'En Horde, tu as accès à l’HDV Horde et à Blackwater. L’Alliance est affichée seulement si tu coches la case. Le bénéfice tient compte de la taxe de l’HDV de revente.',
    with_alliance: 'Inclure l’Alliance', buy_at: 'Acheter à', sell_at: 'Revendre à',
    watch_title: 'Objets suivis', watch_sub: 'Préviens-moi quand un prix passe sous ou au-dessus d’un seuil.',
    watch_buy: 'Acheter si ≤', watch_sell: 'Vendre si ≥', watch_alert: 'Alerte', remove: 'Retirer', watch_empty: 'Aucun objet suivi. Ouvre un objet et clique sur « Suivre cet objet ».',
    alerts: 'alertes', settings_title: 'Réglages', my_houses: 'Mes HDV', my_houses_help: 'Blizzard publie 5 HDV par faction (un par ensemble de règles), sans dire lequel est lequel. Choisis les tiens, ou utilise l’outil ci-dessous pour les retrouver.',
    find_house: 'Retrouver mon HDV', find_help: 'Choisis un objet courant, regarde en jeu son prix le moins cher, et entre-le : les HDV les plus proches s’affichent.',
    price_seen: 'Prix vu en jeu (en pièces de cuivre, ex. 1 po 2 pa = 10200)', logout: 'Se déconnecter', language: 'Langue',
    gold_w: 'or', silver_w: 'argent', copper_w: 'cuivre', gold_s: 'po', silver_s: 'pa', copper_s: 'pc', ago: 'il y a', min_s: 'min', h_s: 'h',
    cat_ALL: 'Tout le marché', cat_TRADE: 'Artisanat', cat_CONS: 'Consommables', cat_GEAR: 'Équipement', cat_RECIPE: 'Recettes',
    cat_CLOTH: 'Tissu', cat_LEATHER: 'Cuir', cat_ORE: 'Minerai et barres', cat_MEAT: 'Viande et poisson', cat_HERB: 'Herbes',
    cat_ELEM: 'Élémentaire', cat_ENCH: 'Enchantement', cat_POT: 'Potions', cat_ELIX: 'Élixirs', cat_SCROLL: 'Parchemins', cat_FOOD: 'Nourriture', cat_BAND: 'Bandages',
    pr_title: 'Métiers', pr_sub: "Par métier : ce qui rapporte le plus, ce qui monte le métier au moins cher, où apprendre chaque recette. Taxe de l'HDV ({cut} %) déduite.",
    pr_my: 'Mon niveau en', pr_mode_gold: "Gagner de l'or", pr_mode_lvl: 'Monter le métier', pr_onlycan: 'Seulement ce que je peux faire', pr_norec: 'Sans recette à acheter (entraîneur)',
    pr_help_gold: "Bénéfice/jour = bénéfice par objet × ventes estimées par jour : c'est ce qui dit si ça vaut le coup. Chaque composant est compté au moins cher entre l'HDV et le PNJ.",
    pr_help_lvl: "Coût par point = coût des composants (moins la moitié de la revente) ÷ chance de gagner un point. Orange = 100 %, jaune puis vert = de moins en moins, gris = 0.",
    pr_skill: 'Niveau', pr_tiers: 'apprise à {a}, jaune à {b}, vert à {c}, gris à {d}', pr_learn: 'Comment apprendre', pr_trainer: 'Entraîneur', pr_recipe: 'Recette', pr_drop: 'drop', pr_ah: 'HDV :',
    pr_chance: 'Chance de point', pr_ppp: 'Coût par point', pr_pt: 'point', pr_day: 'jour', pr_at: 'à',
    pr_adv_title: 'Conseils pour toi', pr_adv_lvl: 'Pour monter le moins cher', pr_adv_gold: "Pour faire de l'or", pr_adv_nogold: 'Rien de rentable à ton niveau pour le moment.', pr_adv_next: 'Ce qui se débloque bientôt',
    pr_adv_noskill: 'Entre ton niveau en {p} juste au-dessus pour avoir des conseils adaptés.',
    pr_note: "Niveaux et sources des recettes : metabot.gg (données du jeu et de Classic). Revu toutes les deux semaines. Données de Classic : Forever a pu en changer quelques-unes.", pr_free: 'gratuit (rentable)', _x: "",
    pr_craft_title: 'Fabrication', pr_trainer_long: "S'apprend chez l'entraîneur du métier (en ville).", pr_ah_long: "Prix de la recette à l'HDV :", pr_ah_none: "Recette pas en vente à l'HDV en ce moment.",
    tt_sell: 'Prix de vente :', tt_none: 'Pas encore de description (chargée au fil des mises à jour).', item_effect: 'Effet',
    ht_title: "Comment l'obtenir", ht_vendors: 'Vendu par', ht_neutral: 'Neutre', ht_limited: 'stock limité', ht_more_vendors: '+{n} autres vendeurs (les plus proches de chez toi peuvent ne pas être listés).',
    ht_vendor_generic: 'Vendu chez les PNJ marchands (fournitures, cuisine…), par exemple en ville.', ht_mobs: 'Monstres qui le lâchent', ht_mob: 'Monstre', ht_zone: 'Zone', ht_rate: 'Taux de drop',
    ht_nodes: 'Ramassé sur', ht_map: 'Carte', ht_nomap: 'Carte en cours de téléchargement, réessaie après la prochaine mise à jour.',
    ht_map_help: 'Survole un point pour voir le nom, clique pour copier la commande /way. Clique sur la légende pour masquer ou afficher une source.',
    kind_d: 'monstre', kind_o: 'objet', kind_v: 'PNJ', copy_way: 'Copier /way', copied: 'Copié :',
    best_sub: 'Toutes les ressources dont on connaît la source : PNJ, monstres, herbes, minerais, dépeçage, pêche. Clique sur une ligne pour la carte.',
    bk_all: 'Tout', bk_mob: 'Monstres', bk_vendor: 'PNJ', bk_herb: 'Herboristerie', bk_mining: 'Minage', bk_skin: 'Dépeçage', bk_fish: 'Pêche', bk_node: 'Coffres / objets', bk_other: 'Autre',
    col_where: 'Où / comment', col_skill: 'Compétence', where_title: 'Où le trouver',
    sk_herb: 'Herboristerie', sk_mining: 'Minage', sk_skin: 'Dépeçage', sk_fish: 'Pêche', beasts: 'bêtes niv.',
    lvl_s: 'niv.', of_catches: 'des prises', farm_new: 'Nouveau dans Forever : source pas encore connue.',
    my_skills: 'Mes métiers de récolte', too_high: 'trop haut pour toi', farm_src_note: 'Monstres et taux de drop : metabot.gg (données de Classic, Forever a pu en changer). Compétences : valeurs de Classic. Noms des monstres en anglais.',
    sales_note: 'Ventes estimées : une annonce qui disparaît alors qu’il lui restait du temps est comptée comme vendue. C’est une estimation (une annonce annulée disparaît aussi).',
  },
  en: {
    nav_market: 'Market', nav_best: 'Bestiary', nav_farm: 'Farm by level', nav_craft: 'Professions', nav_vendor: 'Vendor → AH',
    nav_gaps: 'House gaps', nav_watch: 'Watchlist', nav_settings: 'Settings',
    search_ph: 'Search an item (EN or FR)…', lock_text: 'Enter your site password.', remember: 'Remember me on this device',
    unlock: 'Open', bad_pw: 'Wrong password, or data not generated yet.', loading: 'Loading…',
    no_data: 'No data for this auction house yet. The first scan arrives within the hour.',
    horde: 'Horde', alliance: 'Alliance', neutral: 'Blackwater (neutral)',
    updated: 'Prices from', next_update: 'next update around',
    title_market: 'The Auction House', sub_market: 'Europe · {rs} · Blizzard snapshots every hour',
    k_auctions: 'Auctions up', k_value: 'Market value', k_items: 'Different items', k_flow: 'Estimated sales / day',
    k_value_s: 'at market price', k_flow_s: 'in gold, estimated sales',
    indexes: 'Market indexes', index_help: 'Every index starts at 100 on the first snapshot: 110 means prices rose 10%. Click rows to compare them (5 max).',
    movers: 'Movers (24h)', rising: 'Rising', falling: 'Falling', best_sellers: 'Best sellers',
    best_help: 'Ranked by gold traded per day (estimated sales × price). These are the busiest markets.',
    trade_board: 'Materials', factions: 'Horde, Alliance, Blackwater', factions_help: 'Market price of the same item in the three houses of your group.',
    col_item: 'Item', col_min: 'Cheapest', col_mkt: 'Market price', col_qty: 'For sale', col_lst: 'Listings', col_pd: 'Sales/day',
    col_d1: '24h', col_d7: '7d', col_d30: '30d', col_lvl: 'Lvl', col_flow: 'Gold/day', col_vendor: 'Vendor sell', col_buy: 'Vendor buy',
    col_cost: 'Cost', col_sell: 'Net sale', col_profit: 'Profit/u', col_margin: 'Margin', col_ppd: 'Profit/day', col_prof: 'Profession',
    col_house: 'House', col_source: 'Source', col_value: 'Value', col_index: 'Index',
    est: 'estimated', unknown: 'not enough snapshots yet', results: 'results', none: 'Nothing to show.',
    item_houses: 'In every house', item_chart: 'Price history', item_made_by: 'Made from', item_used_in: 'Used to craft',
    item_vendor_sell: 'Vendor buys it for', item_vendor_buy: 'Vendor sells it for', item_ilvl: 'Item level', item_req: 'Required level',
    watch_add: 'Watch this item', watch_on: 'Watching ✓', series_mkt: 'Market price', series_min: 'Cheapest', series_qty: 'Quantity',
    p_1d: '24h', p_3d: '3d', p_1w: '7d', p_1m: '30d', p_all: 'All',
    farm_title: 'Farm by level', farm_sub: 'The resources of your level that earn the most, by source.',
    farm_help: 'Gold/day = estimated sales per day × market price: what sells the most AND the best. Many listings means lots of competition. A resource’s item level roughly matches the level of the mobs or zone where it drops.',
    my_level: 'My level', range: 'Range', focus: 'Focus on',
    src_mobs_humanoid: 'Humanoid mobs (cloth)', src_skinning: 'Skinning', src_mining: 'Mining', src_smelt: 'Smelting (mining)',
    src_mobs_beast: 'Beasts (meat)', src_fishing: 'Fishing', src_herbalism: 'Herbalism', src_mobs_elemental: 'Elementals',
    src_disenchant: 'Disenchanting', src_mobs_misc: 'Mobs (misc)', src_all: 'All sources',
    vendor_note: 'Sells on the AH for less than the vendor pays: vendor it instead.',
    craft_title: 'Profitable crafts', craft_sub: 'Reagent cost against sale price, auction house cut ({cut}%) included.',
    craft_help: 'Each reagent is counted at the cheapest of AH and vendor (when a vendor sells it). Profit/day = profit per item × estimated sales per day: that is the number that says if it is worth it.',
    all_profs: 'All professions', min_sales: 'Min sales/day', incomplete: 'missing price', only_profit: 'Profitable only',
    vendor_title: 'Buy from vendors, sell on the AH', vendor_sub: 'Vendor items that sell for more on the auction house.',
    vendor_help: 'Items marked “to check” are recipes the API gives a buy price for, but we do not know if a vendor really sells them. Limited-supply vendor recipes are often the best deals.',
    to_check: 'to check', curated: 'known vendor',
    gaps_title: 'House gaps', gaps_sub: 'Buy where it is cheaper, sell where it is pricier.',
    gaps_help: 'As Horde you can use the Horde house and Blackwater. Alliance is only shown if you tick the box. Profit includes the selling house cut.',
    with_alliance: 'Include Alliance', buy_at: 'Buy at', sell_at: 'Sell at',
    watch_title: 'Watchlist', watch_sub: 'Get flagged when a price goes below or above a threshold.',
    watch_buy: 'Buy if ≤', watch_sell: 'Sell if ≥', watch_alert: 'Alert', remove: 'Remove', watch_empty: 'Nothing watched yet. Open an item and click “Watch this item”.',
    alerts: 'alerts', settings_title: 'Settings', my_houses: 'My auction houses', my_houses_help: 'Blizzard publishes 5 houses per faction (one per ruleset) without saying which is which. Pick yours, or use the tool below to find them.',
    find_house: 'Find my house', find_help: 'Pick a common item, check its cheapest price in game, and enter it: the closest houses are listed.',
    price_seen: 'Price seen in game (in copper, e.g. 1g 2s = 10200)', logout: 'Log out', language: 'Language',
    gold_w: 'gold', silver_w: 'silver', copper_w: 'copper', gold_s: 'g', silver_s: 's', copper_s: 'c', ago: '', min_s: 'min', h_s: 'h',
    cat_ALL: 'Whole market', cat_TRADE: 'Trade goods', cat_CONS: 'Consumables', cat_GEAR: 'Gear', cat_RECIPE: 'Recipes',
    cat_CLOTH: 'Cloth', cat_LEATHER: 'Leather', cat_ORE: 'Ore & bars', cat_MEAT: 'Meat & fish', cat_HERB: 'Herbs',
    cat_ELEM: 'Elemental', cat_ENCH: 'Enchanting', cat_POT: 'Potions', cat_ELIX: 'Elixirs', cat_SCROLL: 'Scrolls', cat_FOOD: 'Food & drink', cat_BAND: 'Bandages',
    pr_title: 'Professions', pr_sub: 'Per profession: what earns the most, what levels it cheapest, where to learn each recipe. AH cut ({cut}%) included.',
    pr_my: 'My skill in', pr_mode_gold: 'Make gold', pr_mode_lvl: 'Level it', pr_onlycan: 'Only what I can make', pr_norec: 'No recipe to buy (trainer)',
    pr_help_gold: 'Profit/day = profit per item × estimated sales per day. Each reagent is counted at the cheaper of AH and vendor.',
    pr_help_lvl: 'Cost per point = reagent cost (minus half the resale) ÷ chance of a skill-up. Orange = 100%, yellow then green = less and less, grey = 0.',
    pr_skill: 'Skill', pr_tiers: 'learn at {a}, yellow {b}, green {c}, grey {d}', pr_learn: 'How to learn', pr_trainer: 'Trainer', pr_recipe: 'Recipe', pr_drop: 'drop', pr_ah: 'AH:',
    pr_chance: 'Skill-up chance', pr_ppp: 'Cost per point', pr_pt: 'point', pr_day: 'day', pr_at: 'at',
    pr_adv_title: 'Advice for you', pr_adv_lvl: 'Cheapest to level', pr_adv_gold: 'To make gold', pr_adv_nogold: 'Nothing profitable at your skill yet.', pr_adv_next: 'Unlocking soon',
    pr_adv_noskill: 'Enter your {p} skill above for tailored advice.',
    pr_note: 'Skill levels and recipe sources: metabot.gg (game and Classic data). Refreshed every two weeks. Classic data: Forever may have changed a few.', pr_free: 'free (profitable)', _x: '',
    pr_craft_title: 'Crafting', pr_trainer_long: 'Learned from the profession trainer (in cities).', pr_ah_long: 'Recipe price on the AH:', pr_ah_none: 'Recipe not on the AH right now.',
    tt_sell: 'Sell price:', tt_none: 'No description yet (loaded over the next updates).', item_effect: 'Effect',
    ht_title: 'How to get it', ht_vendors: 'Sold by', ht_neutral: 'Neutral', ht_limited: 'limited stock', ht_more_vendors: '+{n} more vendors (ones near you may not be listed).',
    ht_vendor_generic: 'Sold by merchant NPCs (trade supplies, cooking…), for example in cities.', ht_mobs: 'Mobs that drop it', ht_mob: 'Mob', ht_zone: 'Zone', ht_rate: 'Drop rate',
    ht_nodes: 'Gathered from', ht_map: 'Map', ht_nomap: 'Map is downloading, try again after the next update.',
    ht_map_help: 'Hover a dot to see the name, click to copy the /way command. Click the legend to hide or show a source.',
    kind_d: 'mob', kind_o: 'object', kind_v: 'NPC', copy_way: 'Copy /way', copied: 'Copied:',
    best_sub: 'Every resource with a known source: NPCs, mobs, herbs, ores, skinning, fishing. Click a row for the map.',
    bk_all: 'All', bk_mob: 'Mobs', bk_vendor: 'NPCs', bk_herb: 'Herbalism', bk_mining: 'Mining', bk_skin: 'Skinning', bk_fish: 'Fishing', bk_node: 'Chests / objects', bk_other: 'Other',
    col_where: 'Where / how', col_skill: 'Skill', where_title: 'Where to get it',
    sk_herb: 'Herbalism', sk_mining: 'Mining', sk_skin: 'Skinning', sk_fish: 'Fishing', beasts: 'beasts lvl',
    lvl_s: 'lvl', of_catches: 'of catches', farm_new: 'New in Forever: source not known yet.',
    my_skills: 'My gathering skills', too_high: 'too high for you', farm_src_note: 'Mobs and drop rates: metabot.gg (Classic data, Forever may differ). Skills: Classic values.',
    sales_note: 'Estimated sales: an auction that disappears while it still had time left is counted as sold. It is an estimate (a cancelled auction disappears too).',
  }
};
const PROF = {
  Alchemy: { fr: 'Alchimie' }, Blacksmithing: { fr: 'Forge' }, Cooking: { fr: 'Cuisine' }, Engineering: { fr: 'Ingénierie' },
  Leatherworking: { fr: 'Travail du cuir' }, Tailoring: { fr: 'Couture' }, 'First Aid': { fr: 'Secourisme' }, Enchanting: { fr: 'Enchantement' },
};

// ------------------------------------------------------------------ état
const S = {
  lang: store('hf_lang') || 'fr',
  key: null, meta: null, items: null, recipes: null, vendor: null,
  cache: new Map(), view: store('hf_view') || 'horde',
  watch: JSON.parse(store('hf_watch') || '[]'),
};
const MIN = 0, MKT = 1, QTY = 2, LST = 3, PD = 4, AVG = 5, C1 = 6, C7 = 7, C30 = 8;

function store(k, v) {
  try {
    if (v === undefined) return localStorage.getItem(k);
    if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v);
  } catch (e) { return null; }
}
const t = (k, vars) => { let s = (T[S.lang] && T[S.lang][k]) || T.fr[k] || k; if (vars) for (const [a, b] of Object.entries(vars)) s = s.replace('{' + a + '}', b); return s; };
const $ = (sel, root = document) => root.querySelector(sel);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ------------------------------------------------------------------ déchiffrement
const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
async function deriveKey(password) {
  const salt = await fetch('salt.json', { cache: 'no-store' }).then(r => r.json());
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(salt.salt), iterations: salt.iterations, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, true, ['decrypt']);
}
async function load(name) {
  if (S.cache.has(name)) return S.cache.get(name);
  const p = (async () => {
    const r = await fetch('d/' + name + '.bin?v=' + (S.meta ? S.meta.t : Date.now()));
    if (!r.ok) return null;
    const buf = new Uint8Array(await r.arrayBuffer());
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, S.key, buf.slice(12));
    const text = await new Response(new Blob([plain]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
    return JSON.parse(text);
  })();
  S.cache.set(name, p);
  try { return await p; } catch (e) { S.cache.delete(name); throw e; }
}
async function unlock(password, remember) {
  S.key = await deriveKey(password);
  S.cache.clear();
  S.meta = null;
  S.meta = await load('meta');
  if (!S.meta) throw new Error('no meta');
  const raw = new Uint8Array(await crypto.subtle.exportKey('raw', S.key));
  const k64 = btoa(String.fromCharCode(...raw));
  try { (remember ? localStorage : sessionStorage).setItem('hf_key', k64); } catch (e) { /* stockage indisponible */ }
}
async function restoreKey() {
  let k64 = null;
  try { k64 = localStorage.getItem('hf_key') || sessionStorage.getItem('hf_key'); } catch (e) { return false; }
  if (!k64) return false;
  try {
    S.key = await crypto.subtle.importKey('raw', b64(k64), { name: 'AES-GCM' }, true, ['decrypt']);
    S.meta = await load('meta');
    return !!S.meta;
  } catch (e) { return false; }
}

// ------------------------------------------------------------------ HDV
function housesByFaction(f) { return (S.meta.houses || []).filter(h => h.faction === f && S.meta.tracked.includes(h.id)); }
function myHouses() {
  let mine = {};
  try { mine = JSON.parse(store('hf_houses') || '{}'); } catch (e) { mine = {}; }
  for (const f of ['horde', 'alliance', 'neutral']) {
    const list = housesByFaction(f);
    if (!list.some(h => h.id === mine[f])) {
      const best = list.slice().sort((a, b) => (b.auctions || 0) - (a.auctions || 0))[0];
      mine[f] = best ? best.id : null;
    }
  }
  return mine;
}
function houseById(id) { return (S.meta.houses || []).find(h => h.id === id); }
function houseLabel(h) { return h ? t(h.faction) + ' #' + h.id : '?'; }
function viewHouseId() { return myHouses()[S.view]; }
async function market(hid) { if (!hid) return null; return load('m_' + hid); }

// ------------------------------------------------------------------ formats
function money(c, opts = {}) {
  if (c == null || isNaN(c)) return '<span class="dim">–</span>';
  c = Math.round(c);
  const neg = c < 0; c = Math.abs(c);
  const g = Math.floor(c / 10000), s = Math.floor((c % 10000) / 100), cp = c % 100;
  const parts = [];
  if (g) {
    parts.push(`<span class="g">${g.toLocaleString(S.lang)}<i class="coin g" title="${t('gold_w')}"></i></span>`);
    if (!(opts.short && g >= 100)) parts.push(`<span class="s">${s}<i class="coin s" title="${t('silver_w')}"></i></span>`);
  } else if (s) {
    parts.push(`<span class="s">${s}<i class="coin s" title="${t('silver_w')}"></i></span>`);
    if (cp) parts.push(`<span class="c">${cp}<i class="coin c" title="${t('copper_w')}"></i></span>`);
  } else {
    parts.push(`<span class="c">${cp}<i class="coin c" title="${t('copper_w')}"></i></span>`);
  }
  return `<span class="money">${neg ? '−' : ''}${parts.join(' ')}</span>`;
}
function gold(c) { return c == null ? '–' : `<span class="money"><span class="g">${(c / 10000).toLocaleString(S.lang, { maximumFractionDigits: c >= 1e8 ? 0 : 1 })}<i class="coin g"></i></span></span>`; }
function num(n, d = 0) { return n == null ? '<span class="dim">–</span>' : Number(n).toLocaleString(S.lang, { maximumFractionDigits: d }); }
function pctf(v) {
  if (v == null) return '<span class="dim">–</span>';
  const cls = v > 0 ? 'up' : v < 0 ? 'down' : 'muted';
  return `<span class="${cls}">${v > 0 ? '▲' : v < 0 ? '▼' : ''}${Math.abs(v).toLocaleString(S.lang, { maximumFractionDigits: 1 })}%</span>`;
}
function when(ts) { return new Date(ts * 1000).toLocaleString(S.lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }); }
function itemName(id, lang = S.lang) { const m = S.items[id]; return m ? (m.n[lang] || m.n.en) : '#' + id; }
function itemAlt(id) { const m = S.items[id]; if (!m) return ''; const o = S.lang === 'fr' ? m.n.en : m.n.fr; return o && o !== itemName(id) ? o : ''; }
function icon(id) { const m = S.items[id]; const ic = m && m.ic ? m.ic : 'inv_misc_questionmark'; return `https://render.worldofwarcraft.com/eu/icons/56/${ic}.jpg`; }
// Icône introuvable : on essaie la copie de metabot (icônes propres à Forever), puis le point d'interrogation.
document.addEventListener('error', e => {
  const im = e.target; if (!(im instanceof HTMLImageElement) || !im.src) return;
  const m = im.src.match(/render\.worldofwarcraft\.com\/eu\/icons\/56\/([^.]+)\.jpg/);
  if (m && m[1] !== 'inv_misc_questionmark') { im.src = `https://metabot.gg/web/wow-forever/icons/${m[1]}.webp`; return; }
  if (/metabot\.gg\/web\/wow-forever\/icons\//.test(im.src)) im.src = 'https://render.worldofwarcraft.com/eu/icons/56/inv_misc_questionmark.jpg';
}, true);
function itemCell(id, withAlt = true) {
  const m = S.items[id];
  const alt = withAlt ? itemAlt(id) : '';
  return `<a class="it" href="#/item/${id}"><img loading="lazy" src="${icon(id)}" alt=""><span><span class="q-${m ? m.q : 'COMMON'}">${esc(itemName(id))}</span>${alt ? `<br><span class="alt">${esc(alt)}</span>` : ''}</span></a>`;
}
const norm = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, "'");
let searchIndex = null;
function buildSearch() {
  searchIndex = Object.entries(S.items).map(([id, m]) => [Number(id), norm(m.n.fr), norm(m.n.en)]);
}
function search(q, limit = 50) {
  const words = norm(q).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const out = [];
  for (const [id, fr, en] of searchIndex) {
    const okFr = words.every(w => fr.includes(w)), okEn = words.every(w => en.includes(w));
    if (!okFr && !okEn) continue;
    const name = okFr ? fr : en;
    const score = (name.startsWith(words[0]) ? 0 : 1) + name.length / 100;
    out.push([score, id]);
  }
  return out.sort((a, b) => a[0] - b[0]).slice(0, limit).map(x => x[1]);
}

// ------------------------------------------------------------------ tableau triable
function table(el, cols, rows, opts = {}) {
  let sortK = opts.sort || null, desc = opts.desc !== false;
  const limit = opts.limit || 200;
  function render() {
    let r = rows.slice();
    const col = cols.find(c => c.k === sortK);
    if (col && col.v) r.sort((a, b) => { const x = col.v(a), y = col.v(b); if (x == null) return 1; if (y == null) return -1; return (typeof x === 'string' ? x.localeCompare(y) : x - y) * (desc ? -1 : 1); });
    const shown = r.slice(0, limit);
    const cl = c => (c.cls || '') + (c.m === false ? ' hm' : '');
    el.innerHTML = `<div class="tablewrap"><table><thead><tr>${cols.map(c => `<th data-k="${c.k}" class="${cl(c)}">${esc(c.label)}${sortK === c.k ? (desc ? ' ▾' : ' ▴') : ''}</th>`).join('')}</tr></thead>
      <tbody>${shown.map(row => `<tr class="${opts.rowClass ? opts.rowClass(row) : ''}">${cols.map(c => `<td class="${cl(c)}">${c.f(row)}</td>`).join('')}</tr>`).join('') || `<tr><td colspan="${cols.length}" class="muted">${t('none')}</td></tr>`}</tbody></table></div>
      ${r.length > limit ? `<p class="note">${shown.length} / ${r.length} ${t('results')}</p>` : ''}`;
    el.querySelectorAll('th').forEach(th => th.onclick = () => { const k = th.dataset.k; if (sortK === k) desc = !desc; else { sortK = k; desc = true; } render(); });
  }
  render();
}

// ------------------------------------------------------------------ graphique
const COLORS = ['#e7c675', '#5aa0e6', '#e2574c', '#6fcf6f', '#b07be6', '#e69a4a'];
function chart(el, series, opts = {}) {
  const W = el.clientWidth || 600, H = el.clientHeight || 280, P = { l: 60, r: 12, t: 12, b: 26 };
  const pts = series.flatMap(s => s.pts.filter(p => p[1] != null));
  if (!pts.length) { el.innerHTML = `<p class="muted">${t('unknown')}</p>`; return; }
  const x0 = Math.min(...pts.map(p => p[0])), x1 = Math.max(...pts.map(p => p[0])) || x0 + 1;
  let y0 = Math.min(...pts.map(p => p[1])), y1 = Math.max(...pts.map(p => p[1]));
  if (y0 === y1) { y0 *= 0.9; y1 = y1 * 1.1 + 1; }
  const pad = (y1 - y0) * 0.08; y0 = Math.max(0, y0 - pad); y1 += pad;
  const X = x => P.l + (x - x0) / Math.max(1, x1 - x0) * (W - P.l - P.r), Y = y => H - P.b - (y - y0) / (y1 - y0) * (H - P.t - P.b);
  const COINC = { g: '#f2c94c', s: '#c9ccd1', c: '#c87533' };
  const fmtY = v => opts.money ? (v >= 10000 ? [(v / 10000).toFixed(v >= 1e5 ? 0 : 1), 'g'] : v >= 100 ? [(v / 100).toFixed(v < 1000 ? 1 : 0), 's'] : [Math.round(v), 'c']) : [v.toFixed(1), null];
  let g = '';
  for (let i = 0; i <= 4; i++) { const v = y0 + (y1 - y0) * i / 4; g += `<line x1="${P.l}" x2="${W - P.r}" y1="${Y(v)}" y2="${Y(v)}" stroke="#2c2215"/>${(() => { const [n, k] = fmtY(v); return k ? `<text x="${P.l - 14}" y="${Y(v) + 4}" fill="#a8987a" font-size="11" text-anchor="end">${n}</text><circle cx="${P.l - 8}" cy="${Y(v)}" r="3.5" fill="${COINC[k]}" stroke="#000" stroke-width=".8"/>` : `<text x="${P.l - 6}" y="${Y(v) + 4}" fill="#a8987a" font-size="11" text-anchor="end">${n}</text>`; })()}`; }
  for (let i = 0; i <= 4; i++) { const x = x0 + (x1 - x0) * i / 4; const d = new Date(x * 1000); const lab = (x1 - x0) > 4 * 86400 ? d.toLocaleDateString(S.lang, { day: 'numeric', month: 'short' }) : d.toLocaleString(S.lang, { weekday: 'short', hour: '2-digit' }); g += `<text x="${X(x)}" y="${H - 6}" fill="#a8987a" font-size="11" text-anchor="middle">${lab}</text>`; }
  const lines = series.map((s, i) => {
    let d = '', pen = false;
    for (const p of s.pts) { if (p[1] == null) { pen = false; continue; } d += (pen ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); pen = true; }
    return `<path d="${d}" fill="none" stroke="${s.color || COLORS[i % COLORS.length]}" stroke-width="2"/>`;
  }).join('');
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}">${g}${lines}<line id="cx" y1="${P.t}" y2="${H - P.b}" stroke="#6b5330" visibility="hidden"/></svg>`;
  const svg = el.querySelector('svg'), tip = $('#tip'), cx = svg.querySelector('#cx');
  svg.onmousemove = e => {
    const r = svg.getBoundingClientRect(); const mx = (e.clientX - r.left) / r.width * W;
    const tx = x0 + (mx - P.l) / (W - P.l - P.r) * (x1 - x0);
    let html = `<b>${when(Math.round(tx))}</b>`;
    series.forEach((s, i) => { let best = null; for (const p of s.pts) if (p[1] != null && (!best || Math.abs(p[0] - tx) < Math.abs(best[0] - tx))) best = p; if (best) html += `<br><span style="color:${s.color || COLORS[i % COLORS.length]}">■</span> ${esc(s.name)} : ${opts.money ? money(best[1]) : best[1].toFixed(1)}`; });
    cx.setAttribute('x1', mx); cx.setAttribute('x2', mx); cx.setAttribute('visibility', 'visible');
    tip.innerHTML = html; tip.style.display = 'block'; tip.style.left = Math.min(e.clientX + 14, innerWidth - 220) + 'px'; tip.style.top = (e.clientY + 14) + 'px';
  };
  svg.onmouseleave = () => { tip.style.display = 'none'; cx.setAttribute('visibility', 'hidden'); };
}
function legend(series) { return `<div class="legend">${series.map((s, i) => `<span><i style="background:${s.color || COLORS[i % COLORS.length]}"></i>${esc(s.name)}</span>`).join('')}</div>`; }
function periodPts(h, p) {
  const now = S.meta.t;
  if (p === '1d' || p === '3d') { const span = p === '1d' ? 86400 : 3 * 86400; return h.h.filter(x => x[0] >= now - span); }
  const span = p === '1w' ? 7 * 86400 : p === '1m' ? 30 * 86400 : Infinity;
  return h.d.filter(x => x[0] >= now - span);
}
function periodChips(cur, onPick) {
  const wrap = document.createElement('div'); wrap.className = 'row';
  for (const p of ['1d', '3d', '1w', '1m', 'all']) {
    const b = document.createElement('button'); b.className = 'chip small' + (p === cur ? ' on' : ''); b.textContent = t('p_' + p);
    b.onclick = () => onPick(p); wrap.appendChild(b);
  }
  return wrap;
}

// ------------------------------------------------------------------ sources de farm
function sourceOf(id) {
  const m = S.items[id]; if (!m) return null;
  const en = (m.n.en || '').toLowerCase();
  if (m.c !== 7) return null;
  switch (m.sc) {
    case 5: return 'mobs_humanoid';
    case 6: return 'skinning';
    case 7: return /ore|stone/.test(en) ? 'mining' : /bar\b/.test(en) ? 'smelt' : 'mining';
    case 8: return /^raw |fish|snapper|mackerel|catfish|salmon|trout|yellowtail|mightfish|eel|squid|clam/.test(en) ? 'fishing' : 'mobs_beast';
    case 9: return 'herbalism';
    case 10: return 'mobs_elemental';
    case 12: return 'disenchant';
    default: return 'mobs_misc';
  }
}
const ZONE_FR = {
  'Elwynn Forest': "Forêt d'Elwynn", 'Westfall': "Marche de l'Ouest", 'Redridge Mountains': 'Les Carmines', 'Duskwood': 'Bois de la Pénombre',
  'Stranglethorn Vale': 'Vallée de Strangleronce', 'Wetlands': 'Les Paluns', 'Arathi Highlands': "Hautes-terres d'Arathi",
  'Hillsbrad Foothills': 'Contreforts de Hautebrande', 'Alterac Mountains': "Montagnes d'Alterac", 'Silverpine Forest': 'Forêt des Pins-Argentés',
  'Tirisfal Glades': 'Clairières de Tirisfal', 'Western Plaguelands': "Maleterres de l'Ouest", 'Eastern Plaguelands': "Maleterres de l'Est",
  'The Hinterlands': 'Les Hinterlands', 'Badlands': 'Terres ingrates', 'Searing Gorge': 'Gorge des Vents brûlants', 'Burning Steppes': 'Steppes ardentes',
  'Swamp of Sorrows': 'Marais des Chagrins', 'Blasted Lands': 'Terres foudroyées', 'Deadwind Pass': 'Défilé de Deuillevent', 'The Barrens': 'Les Tarides',
  'Darkshore': 'Sombrivage', 'Ashenvale': 'Orneval', 'Stonetalon Mountains': 'Les Serres-Rocheuses', 'Desolace': 'Désolace',
  'Thousand Needles': 'Mille pointes', 'Dustwallow Marsh': "Marécage d'Âprefange", 'Feralas': 'Féralas', "Un'Goro Crater": "Cratère d'Un'Goro",
  'Felwood': 'Gangrebois', 'Winterspring': "Berceau-de-l'Hiver", 'Moonglade': 'Reflet-de-Lune', 'Stormwind City': 'Hurlevent', 'Undercity': 'Fossoyeuse', 'Thunder Bluff': 'Les Pitons-du-Tonnerre', 'Ironforge': 'Forgefer', 'Darnassus': 'Darnassus',
  'Durotar': 'Durotar', 'Mulgore': 'Mulgore', 'Teldrassil': 'Teldrassil', 'Dun Morogh': 'Dun Morogh', 'Loch Modan': 'Loch Modan', 'Azshara': 'Azshara',
  'Tanaris': 'Tanaris', 'Silithus': 'Silithus', 'Orgrimmar': 'Orgrimmar', 'Booty Bay': 'Baie-du-Butin', 'Ratchet': 'Cabestan', 'Gadgetzan': 'Gadgetzan',
};
const zoneName = z => esc(S.lang === 'fr' ? (ZONE_FR[z] || z) : z);
const pctTxt = v => v == null ? '' : (v >= 10 ? Math.round(v) : v.toLocaleString(S.lang, { maximumFractionDigits: 1 })) + ' %';
function mySkills() { try { return JSON.parse(store('hf_skills') || '{}'); } catch (e) { return {}; } }
function farmInfo(id) {
  const f = S.farm && S.farm[id];
  if (!f) return null;
  const parts = []; let skill = null, kind = null;
  if (f.k) {
    kind = f.k[0] === 'herb' ? 'herb' : 'mining'; skill = f.k[1];
    const n = f.n && f.n[0];
    parts.push(`<b>${t('sk_' + kind)} ${skill}</b>${n ? ' · ' + n[1].map(zoneName).join(', ') + (n[2] ? ' +' + n[2] : '') : ''}`);
  } else if (f.s) {
    kind = 'skin'; skill = f.s[5];
    parts.push(`<b>${t('sk_skin')} ${skill}+</b> · ${t('beasts')} ${f.s[0]}–${f.s[1]}`);
  }
  if (f.f) parts.push(`<b>${t('sk_fish')}</b> · ${zoneName(f.f[0])} (${pctTxt(f.f[1])} ${t('of_catches')})`);
  if (!f.k && !f.f && f.n && f.n.length) parts.push(f.n.slice(0, 2).map(n => `${esc(n[0])} · ${n[1].map(zoneName).join(', ')} (${pctTxt(n[3])})`).join('<br>'));
  if (!f.k && f.m && f.m.length) parts.push(f.m.slice(0, 2).map(m => `${esc(m[0])} <span class="dim">(${t('lvl_s')} ${m[1]}${m[2] !== m[1] ? '–' + m[2] : ''})</span> · ${zoneName(m[3])} · <b>${pctTxt(m[4])}</b>${m[5] ? ' ×' + m[5] : ''}`).join('<br>'));
  if (f.new && !parts.length) parts.push(`<span class="dim">${t('farm_new')}</span>`);
  if (!parts.length) return null;
  const myv = kind ? mySkills()[kind] : null;
  const tooHigh = skill != null && myv != null && myv !== '' && Number(myv) < skill;
  return { html: parts.join('<br>'), skill, kind, tooHigh };
}
function vendorSet() { const s = new Map(); for (const v of S.vendor || []) s.set(v.id, v); return s; }
function vendorBuyPrice(id, vs) {
  const v = vs.get(id); if (!v) return null;
  if (v.price) return v.price;
  const m = S.items[id]; if (!m || !m.bp) return null;
  return m.bp / (m.pq || 1);
}

// ------------------------------------------------------------------ vues
const app = () => $('#app');
async function viewMarket() {
  const hid = viewHouseId(); const h = houseById(hid);
  const m = await market(hid);
  if (!m) { app().innerHTML = `<div class="panel">${t('no_data')}</div>`; return; }
  const rows = Object.entries(m.items).map(([id, r]) => [Number(id), r]);
  const flow = rows.reduce((a, [, r]) => a + (r[PD] && r[MKT] ? r[PD] * r[MKT] : 0), 0);
  app().innerHTML = `
    <div class="hero"><h1>${t('title_market')}</h1><p>${t('sub_market', { rs: esc(S.meta.ruleset_name || '') })} · ${houseLabel(h)}</p></div>
    <div class="grid g4">
      <div class="kpi"><div class="l">${t('k_auctions')}</div><div class="v">${num(h && h.auctions)}</div><div class="s">${t('updated')} ${when(m.t)}</div></div>
      <div class="kpi"><div class="l">${t('k_value')}</div><div class="v">${gold(h && h.value)}</div><div class="s">${t('k_value_s')}</div></div>
      <div class="kpi"><div class="l">${t('k_items')}</div><div class="v">${num(rows.filter(r => r[1][QTY] > 0).length)}</div><div class="s">${num(h && h.items)} ${t('col_item').toLowerCase()}s</div></div>
      <div class="kpi"><div class="l">${t('k_flow')}</div><div class="v">${flow ? gold(flow) : '–'}</div><div class="s">${flow ? t('k_flow_s') : t('unknown')}</div></div>
    </div>
    <div class="panel"><h2>${t('trade_board')}</h2><div class="ticker" id="ticker"></div></div>
    <div class="grid g2">
      <div class="panel"><h2>${t('indexes')}</h2><p class="help">${t('index_help')}</p><div id="idxTable"></div></div>
      <div class="panel"><div class="row spread"><h2>${t('col_index')}</h2><div id="idxPeriod"></div></div><div class="chart" id="idxChart"></div><div id="idxLegend"></div></div>
    </div>
    <div class="panel"><h2>${t('best_sellers')}</h2><p class="help">${t('best_help')}</p><div id="best"></div><p class="note">${t('sales_note')}</p></div>
    <div class="grid g2">
      <div class="panel"><h2>${t('movers')} · ${t('rising')}</h2><div id="up"></div></div>
      <div class="panel"><h2>${t('movers')} · ${t('falling')}</h2><div id="down"></div></div>
    </div>
    <div class="panel"><h2>${t('factions')}</h2><p class="help">${t('factions_help')}</p><div id="fac"></div></div>`;
  const trade = rows.filter(([id, r]) => S.items[id] && S.items[id].c === 7 && r[MKT] && r[PD]).sort((a, b) => b[1][PD] * b[1][MKT] - a[1][PD] * a[1][MKT]).slice(0, 30);
  $('#ticker').innerHTML = trade.map(([id, r]) => `<span><a href="#/item/${id}">${esc(itemName(id))}</a> ${money(r[MKT], { short: true })} ${pctf(r[C1])}</span>`).join('') || `<span class="muted">${t('unknown')}</span>`;
  // indices
  const idx = await load('idx_' + hid) || {};
  const cats = Object.keys(T.fr).filter(k => k.startsWith('cat_')).map(k => k.slice(4)).filter(c => idx[c]);
  let picked = JSON.parse(store('hf_idx') || '["ALL","TRADE","CONS","GEAR"]').filter(c => idx[c]);
  let period = store('hf_period') || '1w';
  const idxRows = cats.map(c => { const s = idx[c]; const last = s.h[s.h.length - 1] || s.d[s.d.length - 1]; const ago = s.h.find(p => p[0] >= S.meta.t - 86400) || s.h[0]; const w = s.d.find(p => p[0] >= S.meta.t - 7 * 86400) || s.d[0]; return { c, v: last ? last[1] : null, d1: last && ago ? (last[1] - ago[1]) / ago[1] * 100 : null, d7: last && w ? (last[1] - w[1]) / w[1] * 100 : null, n: last ? last[2] : 0 }; });
  function drawIdx() {
    table($('#idxTable'), [
      { k: 'c', label: t('col_index'), f: r => `<label style="cursor:pointer"><input type="checkbox" data-c="${r.c}" ${picked.includes(r.c) ? 'checked' : ''}> ${t('cat_' + r.c)} <span class="dim">(${r.n})</span></label>`, cls: 'l' },
      { k: 'v', label: t('col_value'), f: r => r.v == null ? '–' : r.v.toFixed(1), v: r => r.v },
      { k: 'd1', label: t('col_d1'), f: r => pctf(r.d1 == null ? null : Math.round(r.d1 * 10) / 10), v: r => r.d1 },
      { k: 'd7', label: t('col_d7'), f: r => pctf(r.d7 == null ? null : Math.round(r.d7 * 10) / 10), v: r => r.d7 },
    ], idxRows, { limit: 50 });
    $('#idxTable').querySelectorAll('input[type=checkbox]').forEach(cb => cb.onchange = () => {
      const c = cb.dataset.c; picked = cb.checked ? [...picked, c].slice(-5) : picked.filter(x => x !== c);
      store('hf_idx', JSON.stringify(picked)); drawIdx();
    });
    const series = picked.map(c => ({ name: t('cat_' + c), pts: periodPts(idx[c], period).map(p => [p[0], p[1]]) }));
    chart($('#idxChart'), series);
    $('#idxLegend').innerHTML = legend(series);
    const pc = $('#idxPeriod'); pc.innerHTML = ''; pc.appendChild(periodChips(period, p => { period = p; store('hf_period', p); drawIdx(); }));
  }
  drawIdx();
  const cols = [
    { k: 'n', label: t('col_item'), f: r => itemCell(r[0]), v: r => itemName(r[0]), cls: 'l' },
    { k: 'mkt', label: t('col_mkt'), f: r => money(r[1][MKT]), v: r => r[1][MKT] },
    { k: 'pd', label: t('col_pd'), f: r => num(r[1][PD]), v: r => r[1][PD] },
    { k: 'flow', label: t('col_flow'), f: r => money(r[1][PD] * r[1][MKT], { short: true }), v: r => r[1][PD] * r[1][MKT] },
    { m: false, k: 'qty', label: t('col_qty'), f: r => num(r[1][QTY]), v: r => r[1][QTY] },
    { k: 'd1', label: t('col_d1'), f: r => pctf(r[1][C1]), v: r => r[1][C1] },
  ];
  table($('#best'), cols, rows.filter(r => r[1][PD] && r[1][MKT]), { sort: 'flow', limit: 25 });
  const movers = rows.filter(r => r[1][C1] != null && r[1][QTY] >= 3 && r[1][MKT] >= 50 && (r[1][PD] || 0) >= 1);
  const mcols = [cols[0], cols[1], { k: 'd1', label: t('col_d1'), f: r => pctf(r[1][C1]), v: r => r[1][C1] }, cols[2]];
  table($('#up'), mcols, movers.filter(r => r[1][C1] > 0), { sort: 'd1', limit: 12 });
  table($('#down'), mcols, movers.filter(r => r[1][C1] < 0), { sort: 'd1', desc: false, limit: 12 });
  // comparaison factions
  const mine = myHouses();
  const [mh, ma, mn] = await Promise.all([market(mine.horde), market(mine.alliance), market(mine.neutral)]);
  const facRows = trade.slice(0, 25).map(([id]) => [id, mh && mh.items[id], ma && ma.items[id], mn && mn.items[id]]);
  const cell = r => r ? money(r[MKT]) : '<span class="dim">–</span>';
  table($('#fac'), [
    { k: 'n', label: t('col_item'), f: r => itemCell(r[0]), v: r => itemName(r[0]), cls: 'l' },
    { k: 'h', label: t('horde'), f: r => cell(r[1]), v: r => r[1] && r[1][MKT] },
    { k: 'a', label: t('alliance'), f: r => cell(r[2]), v: r => r[2] && r[2][MKT] },
    { k: 'n2', label: 'Blackwater', f: r => cell(r[3]), v: r => r[3] && r[3][MKT] },
  ], facRows, { limit: 25 });
}

async function viewSearch(q) {
  const ids = search(q, 300);
  const m = await market(viewHouseId()) || { items: {} };
  app().innerHTML = `<div class="panel"><h2>« ${esc(q)} » · ${ids.length} ${t('results')}</h2><div id="res"></div></div>`;
  table($('#res'), [
    { k: 'n', label: t('col_item'), f: id => itemCell(id), v: id => itemName(id), cls: 'l' },
    { m: false, k: 'lvl', label: t('col_lvl'), f: id => num(S.items[id].il), v: id => S.items[id].il },
    { m: false, k: 'min', label: t('col_min'), f: id => money((m.items[id] || [])[MIN]), v: id => (m.items[id] || [])[MIN] },
    { k: 'mkt', label: t('col_mkt'), f: id => money((m.items[id] || [])[MKT]), v: id => (m.items[id] || [])[MKT] },
    { k: 'qty', label: t('col_qty'), f: id => num((m.items[id] || [])[QTY]), v: id => (m.items[id] || [])[QTY] },
    { k: 'pd', label: t('col_pd'), f: id => num((m.items[id] || [])[PD]), v: id => (m.items[id] || [])[PD] },
    { m: false, k: 'd7', label: t('col_d7'), f: id => pctf((m.items[id] || [])[C7]), v: id => (m.items[id] || [])[C7] },
    { m: false, k: 'v', label: t('col_vendor'), f: id => money(S.items[id].sp || null), v: id => S.items[id].sp },
  ], ids, { sort: null });
}

async function viewItem(id) {
  const meta = S.items[id];
  if (!meta) { app().innerHTML = `<div class="panel">${t('none')}</div>`; return; }
  const hid = viewHouseId();
  const shard = id % (S.meta.shards || 32);
  const [m, hist] = await Promise.all([market(hid), load(`h_${hid}_${shard}`)]);
  const r = (m && m.items[id]) || []; S._lastMarket = m;
  const h = (hist && hist[id]) || { h: [], d: [] };
  const vs = vendorSet(); const vb = vendorBuyPrice(id, vs);
  const watching = S.watch.some(w => w.id === id);
  app().innerHTML = `
    <div class="hero"><div class="row">
      <img src="${icon(id)}" data-tt="${id}" style="width:56px;height:56px;border-radius:8px;border:1px solid #000" alt="">
      <div><h1 class="q-${meta.q}" style="font-family:Cinzel,serif">${esc(itemName(id))}</h1>
      <p>${esc(itemAlt(id))} · ${esc(meta.cn[S.lang] || '')} / ${esc(meta.scn[S.lang] || '')} · ${t('item_ilvl')} ${meta.il}${meta.rl ? ' · ' + t('item_req') + ' ' + meta.rl : ''}</p></div>
      <div style="margin-left:auto"><button class="act" id="watchBtn">${watching ? t('watch_on') : t('watch_add')}</button></div></div></div>
    <div class="grid g4">
      <div class="kpi"><div class="l">${t('col_min')}</div><div class="v">${money(r[MIN])}</div><div class="s">${houseLabel(houseById(hid))}</div></div>
      <div class="kpi"><div class="l">${t('col_mkt')}</div><div class="v">${money(r[MKT])}</div><div class="s">${t('col_d1')} ${pctf(r[C1])} · ${t('col_d7')} ${pctf(r[C7])} · ${t('col_d30')} ${pctf(r[C30])}</div></div>
      <div class="kpi"><div class="l">${t('col_pd')}</div><div class="v">${num(r[PD], 1)}</div><div class="s">${r[PD] == null ? t('unknown') : t('est')} · ${num(r[QTY])} ${t('col_qty').toLowerCase()}</div></div>
      <div class="kpi"><div class="l">${t('item_vendor_sell')}</div><div class="v">${money(meta.sp || null)}</div><div class="s">${vb ? t('item_vendor_buy') + ' ' + money(vb) : ''}</div></div>
    </div>
    <div id="effect"></div>
    <div class="panel"><div class="row spread"><h2>${t('item_chart')}</h2><div id="per"></div></div><div class="chart" id="ch"></div><div id="lg"></div></div>
    ${craftPanelHtml(id) ? `<div class="panel"><h2>${t('pr_craft_title')}</h2>${craftPanelHtml(id)}</div>` : ''}
    ${howToHtml(id) ? `<div class="panel"><h2>${t('ht_title')}</h2>${howToHtml(id)}</div>` : ''}
    <div class="panel"><h2>${t('item_houses')}</h2><div id="hs"></div></div>
    <div class="grid g2"><div class="panel"><h2>${t('item_made_by')}</h2><div id="mk"></div></div><div class="panel"><h2>${t('item_used_in')}</h2><div id="us"></div></div></div>`;
  (S.tt ? Promise.resolve(S.tt) : load('tt').catch(() => null)).then(x => { S.tt = x || {}; const l = ttLines(id); const el = $('#effect');
    if (el && l.length) el.innerHTML = `<div class="panel ttpanel"><h2>${t('item_effect')}</h2>${l.map(([x, c]) => `<div style="color:${TTCOL[c] || '#fff'}">${esc(x)}</div>`).join('')}</div>`; });
  drawWhereMap(S.farm && S.farm[id], 'wmap');
  S.recipes.filter(rc => rc.o === id).forEach(rc => drawWhereMap(recipeInfo(craftInfo(id, rc.p)), 'rmap_' + rc.id));
  bindWay(app());
  $('#watchBtn').onclick = () => {
    if (S.watch.some(w => w.id === id)) S.watch = S.watch.filter(w => w.id !== id); else S.watch.push({ id, buy: null, sell: null });
    store('hf_watch', JSON.stringify(S.watch)); viewItem(id); renderNav();
  };
  let period = store('hf_iperiod') || '3d';
  function draw() {
    const pts = periodPts(h, period); const daily = period !== '1d' && period !== '3d';
    const series = [{ name: t('series_mkt'), pts: pts.map(p => [p[0], daily ? p[1] : p[2]]) }, { name: t('series_min'), pts: pts.map(p => [p[0], daily ? p[2] : p[1]]) }];
    chart($('#ch'), series, { money: true }); $('#lg').innerHTML = legend(series);
    const pc = $('#per'); pc.innerHTML = ''; pc.appendChild(periodChips(period, p => { period = p; store('hf_iperiod', p); draw(); }));
  }
  draw();
  const all = await Promise.all(S.meta.tracked.map(async x => [x, await market(x)]));
  const mine = Object.values(myHouses());
  table($('#hs'), [
    { k: 'h', label: t('col_house'), f: x => `<span class="badge ${mine.includes(x[0]) ? 'good' : ''}">${houseLabel(houseById(x[0]))}</span>`, cls: 'l', v: x => x[0] },
    { k: 'min', label: t('col_min'), f: x => money(x[1][MIN]), v: x => x[1][MIN] },
    { k: 'mkt', label: t('col_mkt'), f: x => money(x[1][MKT]), v: x => x[1][MKT] },
    { m: false, k: 'qty', label: t('col_qty'), f: x => num(x[1][QTY]), v: x => x[1][QTY] },
    { k: 'pd', label: t('col_pd'), f: x => num(x[1][PD]), v: x => x[1][PD] },
    { m: false, k: 'd7', label: t('col_d7'), f: x => pctf(x[1][C7]), v: x => x[1][C7] },
  ], all.filter(([, mm]) => mm && mm.items[id]).map(([x, mm]) => [x, mm.items[id]]), { sort: 'mkt', desc: false });
  const made = S.recipes.filter(rc => rc.o === id), used = S.recipes.filter(rc => rc.r.some(x => x[0] === id));
  $('#mk').innerHTML = made.map(rc => `<p>${profName(rc.p)} : ${rc.r.map(([rid, q]) => `${q} × <a href="#/item/${rid}">${esc(itemName(rid))}</a>`).join(', ')}</p>`).join('') || `<p class="muted">${t('none')}</p>`;
  $('#us').innerHTML = used.map(rc => `<p><a href="#/item/${rc.o}">${esc(itemName(rc.o))}</a> <span class="dim">(${profName(rc.p)})</span></p>`).join('') || `<p class="muted">${t('none')}</p>`;
}
function profName(p) { return S.lang === 'fr' && PROF[p] ? PROF[p].fr : p; }

async function viewFarm() {
  const m = await market(viewHouseId());
  if (!m) { app().innerHTML = `<div class="panel">${t('no_data')}</div>`; return; }
  let lvl = Number(store('hf_level') || 22), band = Number(store('hf_band') || 8), src = store('hf_src') || 'all';
  app().innerHTML = `<div class="hero"><h1>${t('farm_title')}</h1><p>${t('farm_sub')}</p></div>
    <div class="panel"><div class="row"><label>${t('my_level')} <input type="number" id="lvl" min="1" max="60" value="${lvl}"></label>
      <label>${t('range')} ± <input type="number" id="band" min="1" max="30" value="${band}"></label><div class="row" id="srcs"></div></div>
      <div class="row" style="margin-top:8px"><span class="muted">${t('my_skills')} :</span>${['herb', 'mining', 'skin'].map(k => `<label>${t('sk_' + k)} <input type="number" class="sk" data-k="${k}" min="0" max="300" value="${mySkills()[k] ?? ''}"></label>`).join('')}</div>
      <p class="help">${t('farm_help')}</p></div>
    <div class="panel focus"><h2>${t('focus')}</h2><div id="top"></div></div>
    <div class="panel"><div id="list"></div><p class="note">${t('sales_note')}</p><p class="note">${t('farm_src_note')}</p></div>`;
  app().querySelectorAll('input.sk').forEach(inp => inp.oninput = () => { const m = mySkills(); m[inp.dataset.k] = inp.value === '' ? '' : Number(inp.value); store('hf_skills', JSON.stringify(m)); draw(); });
  const sources = ['all', 'mobs_humanoid', 'mobs_beast', 'skinning', 'herbalism', 'mining', 'fishing', 'mobs_elemental', 'disenchant', 'mobs_misc'];
  function draw() {
    $('#srcs').innerHTML = sources.map(s => `<button class="chip small ${s === src ? 'on' : ''}" data-s="${s}">${t('src_' + s)}</button>`).join('');
    $('#srcs').querySelectorAll('button').forEach(b => b.onclick = () => { src = b.dataset.s; store('hf_src', src); draw(); });
    const vs = vendorSet();
    const rows = Object.entries(m.items).map(([id, r]) => [Number(id), r]).filter(([id, r]) => {
      const meta = S.items[id]; const so = sourceOf(id);
      if (!meta || !so || !r[MKT] || vs.has(id)) return false;
      if (src !== 'all' && so !== src) return false;
      return meta.il >= lvl - band && meta.il <= lvl + Math.ceil(band / 2);
    });
    const flow = r => (r[1][PD] || 0) * r[1][MKT];
    const cols = [
      { k: 'n', label: t('col_item'), f: r => itemCell(r[0]), v: r => itemName(r[0]), cls: 'l' },
      { m: false, k: 'src', label: t('col_source'), f: r => `<span class="badge">${t('src_' + sourceOf(r[0]))}</span>`, v: r => sourceOf(r[0]), cls: 'l' },
      { m: false, k: 'lvl', label: t('col_lvl'), f: r => num(S.items[r[0]].il), v: r => S.items[r[0]].il },
      { k: 'mkt', label: t('col_mkt'), f: r => money(r[1][MKT]) + (S.items[r[0]].sp > r[1][MKT] ? ` <span class="badge warn" title="${esc(t('vendor_note'))}">PNJ</span>` : ''), v: r => r[1][MKT] },
      { k: 'pd', label: t('col_pd'), f: r => num(r[1][PD]), v: r => r[1][PD] },
      { k: 'flow', label: t('col_flow'), f: r => money(flow(r), { short: true }), v: r => flow(r) },
      { k: 'where', label: t('col_where'), f: r => { const fi = farmInfo(r[0]); return fi ? `<div class="where">${fi.html}${fi.tooHigh ? ` <span class="badge bad">${t('too_high')}</span>` : ''}</div>` : '<span class="dim">–</span>'; }, cls: 'l' },
      { m: false, k: 'qty', label: t('col_qty'), f: r => num(r[1][QTY]), v: r => r[1][QTY] },
      { m: false, k: 'd7', label: t('col_d7'), f: r => pctf(r[1][C7]), v: r => r[1][C7] },
    ];
    table($('#top'), cols, rows.filter(r => r[1][PD]), { sort: 'flow', limit: 5 });
    table($('#list'), cols, rows, { sort: 'flow', limit: 150 });
  }
  $('#lvl').oninput = e => { lvl = Number(e.target.value) || 1; store('hf_level', lvl); draw(); };
  $('#band').oninput = e => { band = Number(e.target.value) || 1; store('hf_band', band); draw(); };
  draw();
}

function craftCost(rc, items, vs) {
  let cost = 0, missing = false; const parts = [];
  for (const [rid, q] of rc.r) {
    const ah = items[rid] ? items[rid][MKT] : null; const vp = vendorBuyPrice(rid, vs);
    const unit = [ah, vp].filter(x => x != null && x > 0).sort((a, b) => a - b)[0];
    if (unit == null) { missing = true; parts.push(`${q}× ${itemName(rid)} : ?`); continue; }
    cost += unit * q; parts.push(`${q}× ${itemName(rid)} : ${unit === vp ? 'PNJ' : 'HDV'}`);
  }
  return { cost, missing, parts };
}
// ------------------------------------------------------------------ métiers
const PF_SLUG = p => String(p || '').toLowerCase().replace(/\s+/g, '-');
function craftInfo(outId, prof) {
  const c = S.craft && S.craft.o && S.craft.o[outId];
  if (!c || !c.length) return null;
  return c.find(e => e.pf === PF_SLUG(prof)) || c[0];
}
function skillColor(sk, my) {
  if (!sk || my == null || my === '') return '';
  if (my < sk[0]) return 'red';
  if (my < sk[1]) return 'orange';
  if (my < sk[2]) return 'yellow';
  if (my < sk[3]) return 'green';
  return 'grey';
}
function skillChance(sk, my) {
  if (!sk || my == null || my === '' || my < sk[0]) return 0;
  if (my < sk[1]) return 1;
  if (my >= sk[3]) return 0;
  return Math.max(0, Math.min(1, (sk[3] - my) / (sk[3] - sk[1])));
}
function recipeInfo(ci) { return ci && ci.rs && S.craft && S.craft.r ? S.craft.r[ci.rs] || { nm: ci.rn } : null; }
function recipeCell(ci, items) {
  if (!ci) return '<span class="dim">?</span>';
  if (ci.tr) return `<span class="tag">${t('pr_trainer')}</span>`;
  if (ci.nt) return `<span class="dim">${esc(ci.nt)}</span>`;
  const r = recipeInfo(ci); if (!r) return '<span class="dim">?</span>';
  const ah = r.id && items[r.id] && items[r.id][MKT];
  const v = r.v && r.v.length ? [...r.v].sort((a, b) => (a[1] === 'h' ? -1 : a[1] === '' ? 0 : 1) - (b[1] === 'h' ? -1 : b[1] === '' ? 0 : 1))[0] : null;
  const src = v ? `${esc(v[0])} · ${zoneName(v[3])}${v[6] ? ' · ' + money(v[6]) : ''}` : r.m && r.m.length ? `${t('pr_drop')} : ${esc(r.m[0][0])} (${pctTxt(r.m[0][4])})` : r.p && r.p.length ? zoneName(r.p[0][1]) : '';
  return `<span class="tag warn">${t('pr_recipe')}</span> ${src ? `<span class="dim">${src}</span>` : ''}${ah ? `<br>${t('pr_ah')} <b>${money(ah)}</b>` : ''}`;
}
function profSkills() { try { return JSON.parse(store('hf_pskill') || '{}'); } catch (e) { return {}; } }
async function viewCraft() {
  const m = await market(viewHouseId());
  if (!m) { app().innerHTML = `<div class="panel">${t('no_data')}</div>`; return; }
  const cut = S.meta.ah_cut || 0.05, vs = vendorSet();
  const profs = [...new Set(S.recipes.map(r => r.p))].sort();
  let prof = store('hf_prof'); if (!profs.includes(prof)) prof = profs.includes('Cooking') ? 'Cooking' : profs[0];
  let mode = store('hf_pmode') || 'gold', minPd = Number(store('hf_minpd') || 0), onlyCan = store('hf_onlycan') === '1', noRecipe = store('hf_norec') === '1';
  app().innerHTML = `<div class="hero"><h1>${t('pr_title')}</h1><p>${t('pr_sub', { cut: Math.round(cut * 100) })}</p></div>
    <div class="panel"><div class="row" id="profs"></div>
    <div class="row" style="margin-top:10px"><label>${t('pr_my')} <b id="pname"></b> <input type="number" id="psk" min="0" max="300"></label>
      <span class="seg"><button class="chip" data-m="gold">${t('pr_mode_gold')}</button><button class="chip" data-m="lvl">${t('pr_mode_lvl')}</button></span></div>
    <div class="row" style="margin-top:8px"><label><input type="checkbox" id="onlycan"> ${t('pr_onlycan')}</label><label><input type="checkbox" id="norec"> ${t('pr_norec')}</label>
      <label id="minpdl">${t('min_sales')} <input type="number" id="minpd" min="0" value="${minPd}"></label></div>
    <p class="help" id="phelp"></p></div>
    <div class="panel" id="advice"></div>
    <div class="panel"><div id="list"></div><p class="note">${t('sales_note')}</p><p class="note">${t('pr_note')}</p></div>`;
  $('#onlycan').checked = onlyCan; $('#norec').checked = noRecipe;
  function draw() {
    $('#profs').innerHTML = profs.map(p => `<button class="chip ${p === prof ? 'on' : ''}" data-p="${esc(p)}">${esc(profName(p))}</button>`).join('');
    $('#profs').querySelectorAll('[data-p]').forEach(b => b.onclick = () => { prof = b.dataset.p; store('hf_prof', prof); draw(); });
    document.querySelectorAll('[data-m]').forEach(b => { b.classList.toggle('on', b.dataset.m === mode); b.onclick = () => { mode = b.dataset.m; store('hf_pmode', mode); draw(); }; });
    $('#pname').textContent = profName(prof);
    const sks = profSkills(); const my = sks[prof] ?? '';
    $('#psk').value = my;
    $('#psk').oninput = e => { const s = profSkills(); s[prof] = e.target.value === '' ? '' : Number(e.target.value); store('hf_pskill', JSON.stringify(s)); drawList(); };
    $('#minpdl').style.display = mode === 'gold' ? '' : 'none';
    $('#phelp').textContent = mode === 'gold' ? t('pr_help_gold') : t('pr_help_lvl');
    drawList();
  }
  function drawList() {
    const my = profSkills()[prof]; const myN = my === '' || my == null ? null : Number(my);
    let rows = S.recipes.filter(rc => rc.p === prof).map(rc => {
      const out = m.items[rc.o]; const c = craftCost(rc, m.items, vs); const ci = craftInfo(rc.o, prof);
      const sell = out && out[MKT] ? out[MKT] * rc.oq * (1 - cut) : null;
      const profit = sell != null && !c.missing ? sell - c.cost : null;
      const ch = ci && myN != null ? skillChance(ci.sk, myN) : null;
      return { rc, out, c, ci, sell, profit, pd: out ? out[PD] : null, ch,
        ppd: profit != null && out && out[PD] ? profit / rc.oq * out[PD] : null,
        ppp: ch ? (c.missing ? null : (c.cost - (sell || 0) * 0.5) / ch) : null };
    });
    if (onlyCan && myN != null) rows = rows.filter(x => x.ci && x.ci.sk && x.ci.sk[0] <= myN);
    if (noRecipe) rows = rows.filter(x => x.ci && x.ci.tr);
    if (mode === 'gold') rows = rows.filter(x => x.out && (x.pd || 0) >= minPd);
    else rows = rows.filter(x => x.ch > 0);
    advice(rows, myN);
    const cols = [
      { k: 'n', label: t('col_item'), f: x => itemCell(x.rc.o) + (x.rc.oq > 1 ? ` <span class="dim">×${x.rc.oq}</span>` : ''), v: x => itemName(x.rc.o), cls: 'l' },
      { k: 'sk', label: t('pr_skill'), f: x => x.ci && x.ci.sk ? `<span class="sk ${skillColor(x.ci.sk, myN)}" title="${t('pr_tiers', { a: x.ci.sk[0], b: x.ci.sk[1], c: x.ci.sk[2], d: x.ci.sk[3] })}">${x.ci.sk[0]}</span> <span class="dim small">${x.ci.sk[1]}/${x.ci.sk[2]}/${x.ci.sk[3]}</span>` : '<span class="dim">?</span>', v: x => x.ci && x.ci.sk ? x.ci.sk[0] : null },
      { k: 'rec', label: t('pr_learn'), f: x => `<div class="where">${recipeCell(x.ci, m.items)}</div>`, v: x => x.ci && x.ci.tr ? 0 : 1, cls: 'l' },
      { k: 'cost', label: t('col_cost'), f: x => `<span title="${esc(x.c.parts.join('\n'))}">${x.c.missing ? `<span class="badge bad">${t('incomplete')}</span>` : money(x.c.cost)}</span>`, v: x => x.c.missing ? null : x.c.cost },
    ];
    if (mode === 'gold') cols.push(
      { k: 'sell', label: t('col_sell'), f: x => money(x.sell), v: x => x.sell },
      { k: 'profit', label: t('col_profit'), f: x => x.profit == null ? '–' : `<span class="${x.profit > 0 ? 'up' : 'down'}">${money(x.profit / x.rc.oq)}</span>`, v: x => x.profit },
      { k: 'pd', label: t('col_pd'), f: x => num(x.pd), v: x => x.pd },
      { k: 'ppd', label: t('col_ppd'), f: x => x.ppd == null ? '–' : `<b>${money(x.ppd, { short: true })}</b>`, v: x => x.ppd });
    else cols.push(
      { k: 'ch', label: t('pr_chance'), f: x => Math.round(x.ch * 100) + ' %', v: x => x.ch },
      { k: 'ppp', label: t('pr_ppp'), f: x => x.ppp == null ? '–' : (x.ppp <= 0 ? `<span class="up">${t('pr_free')}</span>` : `<b>${money(x.ppp)}</b>`), v: x => x.ppp == null ? null : Math.max(0, x.ppp) });
    table($('#list'), cols, rows, { sort: mode === 'gold' ? 'ppd' : 'ppp', desc: mode === 'gold', limit: 300 });
  }
  function advice(rows, myN) {
    const box = $('#advice');
    if (myN == null) { box.innerHTML = `<p class="muted">${t('pr_adv_noskill', { p: esc(profName(prof)) })}</p>`; return; }
    const can = rows.filter(x => x.ci && x.ci.sk && x.ci.sk[0] <= myN);
    const lvl = can.filter(x => x.ch > 0 && x.ppp != null).sort((a, b) => a.ppp - b.ppp).slice(0, 3);
    const gold = can.filter(x => x.ppd > 0).sort((a, b) => b.ppd - a.ppd).slice(0, 3);
    const next = S.recipes.filter(rc => rc.p === prof).map(rc => ({ rc, ci: craftInfo(rc.o, prof) }))
      .filter(x => x.ci && x.ci.sk && x.ci.sk[0] > myN && x.ci.sk[0] <= myN + 25).sort((a, b) => a.ci.sk[0] - b.ci.sk[0]).slice(0, 4);
    const li = x => `<li><a href="#/item/${x.rc.o}">${esc(itemName(x.rc.o))}</a>`;
    box.innerHTML = `<h2>${t('pr_adv_title')}</h2><div class="grid g3">
      <div><h3>${t('pr_adv_lvl')}</h3><ul class="vlist">${lvl.map(x => `${li(x)} · ${x.ppp <= 0 ? `<span class="up">${t('pr_free')}</span>` : money(x.ppp) + '/' + t('pr_pt')} <span class="sk ${skillColor(x.ci.sk, myN)}">●</span></li>`).join('') || `<li class="dim">${t('none')}</li>`}</ul></div>
      <div><h3>${t('pr_adv_gold')}</h3><ul class="vlist">${gold.map(x => `${li(x)} · <b>${money(x.ppd, { short: true })}</b>/${t('pr_day')}</li>`).join('') || `<li class="dim">${t('pr_adv_nogold')}</li>`}</ul></div>
      <div><h3>${t('pr_adv_next')}</h3><ul class="vlist">${next.map(x => `${li(x)} · ${t('pr_at')} ${x.ci.sk[0]}${x.ci.rs ? ` · <span class="tag warn">${t('pr_recipe')}</span>` : ''}</li>`).join('') || `<li class="dim">${t('none')}</li>`}</ul></div>
    </div>`;
  }
  $('#minpd').oninput = e => { minPd = Number(e.target.value) || 0; store('hf_minpd', minPd); drawList(); };
  $('#onlycan').onchange = e => { onlyCan = e.target.checked; store('hf_onlycan', onlyCan ? '1' : '0'); drawList(); };
  $('#norec').onchange = e => { noRecipe = e.target.checked; store('hf_norec', noRecipe ? '1' : '0'); drawList(); };
  draw();
}
function craftPanelHtml(id) {
  const rcs = S.recipes.filter(rc => rc.o === id);
  if (!rcs.length) return '';
  const my = profSkills();
  return rcs.map(rc => {
    const ci = craftInfo(id, rc.p); const r = recipeInfo(ci);
    const myN = my[rc.p] === '' || my[rc.p] == null ? null : Number(my[rc.p]);
    let html = `<p><b>${esc(profName(rc.p))}</b>${ci && ci.sk ? ` · ${t('pr_skill')} <span class="sk ${skillColor(ci.sk, myN)}">${ci.sk[0]}</span> <span class="dim">(${t('pr_tiers', { a: ci.sk[0], b: ci.sk[1], c: ci.sk[2], d: ci.sk[3] })})</span>` : ''}</p>
      <p>${rc.r.map(([rid, q]) => `${q}× <a href="#/item/${rid}">${esc(itemName(rid))}</a>`).join(' + ')}</p>`;
    if (ci && ci.tr) html += `<p>${t('pr_trainer_long')}</p>`;
    else if (ci && ci.nt) html += `<p>${esc(ci.nt)}</p>`;
    else if (r) {
      const ah = r.id && S._lastMarket && S._lastMarket.items[r.id] ? S._lastMarket.items[r.id][MKT] : null;
      html += `<h3>${t('pr_recipe')} : ${r.id ? `<a href="#/item/${r.id}">${esc(r.nm || ci.rn)}</a>` : esc(r.nm || ci.rn)}</h3>
        ${ah ? `<p>${t('pr_ah_long')} <b>${money(ah)}</b></p>` : `<p class="dim">${t('pr_ah_none')}</p>`}
        ${whereBlocks(r, 'rmap_' + rc.id)}`;
    }
    return html;
  }).join('<hr>') + `<p class="note">${t('pr_note')}</p>`;
}

async function viewVendor() {
  const m = await market(viewHouseId());
  if (!m) { app().innerHTML = `<div class="panel">${t('no_data')}</div>`; return; }
  const cut = S.meta.ah_cut || 0.05, vs = vendorSet();
  const rows = [];
  for (const [ids, r] of Object.entries(m.items)) {
    const id = Number(ids); const meta = S.items[id]; if (!meta || !r[MKT]) continue;
    let buy = null, kind = null;
    if (vs.has(id)) { buy = vendorBuyPrice(id, vs); kind = 'curated'; }
    else if (meta.c === 9 && meta.bp) { buy = meta.bp / (meta.pq || 1); kind = 'to_check'; }
    if (!buy) continue;
    const profit = r[MKT] * (1 - cut) - buy;
    if (profit <= 0) continue;
    rows.push({ id, r, buy, kind, profit, ppd: r[PD] ? profit * r[PD] : null });
  }
  app().innerHTML = `<div class="hero"><h1>${t('vendor_title')}</h1><p>${t('vendor_sub')}</p></div>
    <div class="panel"><p class="help">${t('vendor_help')}</p><div id="list"></div><p class="note">${t('sales_note')}</p></div>`;
  table($('#list'), [
    { k: 'n', label: t('col_item'), f: x => itemCell(x.id) + ` <span class="badge ${x.kind === 'curated' ? 'good' : 'warn'}">${t(x.kind)}</span>`, v: x => itemName(x.id), cls: 'l' },
    { k: 'buy', label: t('col_buy'), f: x => money(x.buy), v: x => x.buy },
    { k: 'mkt', label: t('col_mkt'), f: x => money(x.r[MKT]), v: x => x.r[MKT] },
    { k: 'profit', label: t('col_profit'), f: x => `<span class="up">${money(x.profit)}</span>`, v: x => x.profit },
    { m: false, k: 'ratio', label: '×', f: x => num(x.r[MKT] / x.buy, 1), v: x => x.r[MKT] / x.buy },
    { k: 'pd', label: t('col_pd'), f: x => num(x.r[PD]), v: x => x.r[PD] },
    { m: false, k: 'qty', label: t('col_qty'), f: x => num(x.r[QTY]), v: x => x.r[QTY] },
    { k: 'ppd', label: t('col_ppd'), f: x => x.ppd == null ? '–' : `<b>${money(x.ppd, { short: true })}</b>`, v: x => x.ppd },
  ], rows, { sort: 'ppd' });
}

async function viewGaps() {
  const mine = myHouses(), cut = S.meta.ah_cut || 0.05;
  let withA = store('hf_gapA') === '1';
  const ms = {};
  for (const f of ['horde', 'alliance', 'neutral']) ms[f] = await market(mine[f]);
  app().innerHTML = `<div class="hero"><h1>${t('gaps_title')}</h1><p>${t('gaps_sub')}</p></div>
    <div class="panel"><label><input type="checkbox" id="wa" ${withA ? 'checked' : ''}> ${t('with_alliance')}</label><p class="help">${t('gaps_help')}</p><div id="list"></div></div>`;
  function draw() {
    const fs = ['horde', 'neutral', ...(withA ? ['alliance'] : [])].filter(f => ms[f]);
    const ids = new Set(fs.flatMap(f => Object.keys(ms[f].items)));
    const rows = [];
    for (const ids_ of ids) {
      const id = Number(ids_);
      for (const b of fs) for (const s of fs) {
        if (b === s) continue;
        const rb = ms[b].items[id], rs = ms[s].items[id];
        if (!rb || !rs || !rb[MIN] || !rs[MKT] || !rb[QTY]) continue;
        const profit = rs[MKT] * (1 - cut) - rb[MIN];
        if (profit <= 0 || rs[MKT] < rb[MIN] * 1.3) continue;
        const pd = rs[PD] || 0;
        rows.push({ id, b, s, rb, rs, profit, ppd: pd ? profit * Math.min(pd, rb[QTY]) : null });
      }
    }
    table($('#list'), [
      { k: 'n', label: t('col_item'), f: x => itemCell(x.id), v: x => itemName(x.id), cls: 'l' },
      { k: 'b', label: t('buy_at'), f: x => `<span class="badge">${t(x.b)}</span> ${money(x.rb[MIN])}`, v: x => x.rb[MIN] },
      { k: 's', label: t('sell_at'), f: x => `<span class="badge">${t(x.s)}</span> ${money(x.rs[MKT])}`, v: x => x.rs[MKT] },
      { k: 'profit', label: t('col_profit'), f: x => `<span class="up">${money(x.profit)}</span>`, v: x => x.profit },
      { k: 'pd', label: t('col_pd') + ' (' + t('sell_at').toLowerCase() + ')', f: x => num(x.rs[PD]), v: x => x.rs[PD] },
      { k: 'ppd', label: t('col_ppd'), f: x => x.ppd == null ? '–' : `<b>${money(x.ppd, { short: true })}</b>`, v: x => x.ppd },
    ], rows, { sort: 'ppd' });
  }
  $('#wa').onchange = e => { withA = e.target.checked; store('hf_gapA', withA ? '1' : '0'); draw(); };
  draw();
}

async function alertsCount() {
  if (!S.watch.length || !S.meta) return 0;
  const m = await market(viewHouseId()); if (!m) return 0;
  return S.watch.filter(w => { const r = m.items[w.id]; if (!r) return false; return (w.buy && r[MIN] && r[MIN] <= w.buy) || (w.sell && r[MKT] && r[MKT] >= w.sell); }).length;
}
async function viewWatch() {
  const m = await market(viewHouseId()) || { items: {} };
  app().innerHTML = `<div class="hero"><h1>${t('watch_title')}</h1><p>${t('watch_sub')}</p></div><div class="panel" id="list"></div>`;
  if (!S.watch.length) { $('#list').innerHTML = `<p class="muted">${t('watch_empty')}</p>`; return; }
  $('#list').innerHTML = `<div class="tablewrap"><table><thead><tr><th class="l">${t('col_item')}</th><th>${t('col_min')}</th><th>${t('col_mkt')}</th><th>${t('col_pd')}</th><th>${t('watch_buy')}</th><th>${t('watch_sell')}</th><th>${t('watch_alert')}</th><th></th></tr></thead><tbody>${S.watch.map((w, i) => {
    const r = m.items[w.id] || []; const a = (w.buy && r[MIN] && r[MIN] <= w.buy) ? `<span class="badge good">${t('watch_buy')}</span>` : (w.sell && r[MKT] && r[MKT] >= w.sell) ? `<span class="badge warn">${t('watch_sell')}</span>` : '';
    return `<tr><td>${itemCell(w.id)}</td><td>${money(r[MIN])}</td><td>${money(r[MKT])}</td><td>${num(r[PD])}</td>
      <td><input type="number" data-i="${i}" data-f="buy" value="${w.buy || ''}" placeholder="pc"></td><td><input type="number" data-i="${i}" data-f="sell" value="${w.sell || ''}" placeholder="pc"></td>
      <td>${a}</td><td><button class="chip small" data-rm="${i}">${t('remove')}</button></td></tr>`;
  }).join('')}</tbody></table></div><p class="note">pc = ${S.lang === 'fr' ? 'pièces de cuivre (1 po = 10000)' : 'copper (1g = 10000)'}</p>`;
  $('#list').querySelectorAll('input').forEach(inp => inp.onchange = () => { S.watch[inp.dataset.i][inp.dataset.f] = Number(inp.value) || null; store('hf_watch', JSON.stringify(S.watch)); viewWatch(); renderNav(); });
  $('#list').querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { S.watch.splice(Number(b.dataset.rm), 1); store('hf_watch', JSON.stringify(S.watch)); viewWatch(); renderNav(); });
}

async function viewSettings() {
  const mine = myHouses();
  const opt = f => (S.meta.houses || []).filter(h => h.faction === f && S.meta.tracked.includes(h.id)).map(h => `<option value="${h.id}" ${mine[f] === h.id ? 'selected' : ''}>#${h.id} · ${num(h.auctions)} ${t('k_auctions').toLowerCase()}</option>`).join('');
  app().innerHTML = `<div class="hero"><h1>${t('settings_title')}</h1></div>
    <div class="panel"><h2>${t('my_houses')}</h2><p class="help">${t('my_houses_help')}</p>
      <div class="row">${['horde', 'alliance', 'neutral'].map(f => `<label>${t(f)} <select data-f="${f}">${opt(f)}</select></label>`).join('')}</div></div>
    <div class="panel"><h2>${t('find_house')}</h2><p class="help">${t('find_help')}</p>
      <div class="row"><input type="text" id="fq" placeholder="${esc(t('search_ph'))}" style="width:260px"><select id="fi"></select>
      <label>${t('price_seen')} <input type="number" id="fp" style="width:120px"></label></div><div id="fr"></div></div>
    <div class="panel"><h2>${t('language')}</h2><div class="row"><button class="chip ${S.lang === 'fr' ? 'on' : ''}" data-l="fr">Français</button><button class="chip ${S.lang === 'en' ? 'on' : ''}" data-l="en">English</button></div></div>
    <div class="panel"><button class="act" id="logout">${t('logout')}</button></div>`;
  app().querySelectorAll('select[data-f]').forEach(s => s.onchange = () => { const m2 = myHouses(); m2[s.dataset.f] = Number(s.value); store('hf_houses', JSON.stringify(m2)); renderHousebar(); });
  app().querySelectorAll('[data-l]').forEach(b => b.onclick = () => setLang(b.dataset.l));
  $('#logout').onclick = () => { try { localStorage.removeItem('hf_key'); sessionStorage.removeItem('hf_key'); } catch (e) { /* rien */ } location.reload(); };
  const fq = $('#fq'), fi = $('#fi'), fp = $('#fp');
  fq.oninput = () => { fi.innerHTML = search(fq.value, 20).map(id => `<option value="${id}">${esc(itemName(id))}</option>`).join(''); find(); };
  fi.onchange = fp.oninput = find;
  async function find() {
    const id = Number(fi.value), price = Number(fp.value);
    if (!id || !price) { $('#fr').innerHTML = ''; return; }
    const all = await Promise.all(S.meta.tracked.map(async x => [x, await market(x)]));
    const rows = all.filter(([, mm]) => mm && mm.items[id]).map(([x, mm]) => ({ x, min: mm.items[id][MIN], d: Math.abs(mm.items[id][MIN] - price) / price }));
    table($('#fr'), [
      { k: 'h', label: t('col_house'), f: r => houseLabel(houseById(r.x)), cls: 'l' },
      { k: 'min', label: t('col_min'), f: r => money(r.min), v: r => r.min },
      { k: 'd', label: 'Δ', f: r => num(r.d * 100, 1) + '%', v: r => r.d },
    ], rows, { sort: 'd', desc: false });
  }
}

// ------------------------------------------------------------------ comment l'obtenir + carte interactive
const PIN_COLORS = ['#ff4d4d', '#ffd23f', '#4dd2ff', '#7dff6b', '#ff8cf0', '#ff9a3c', '#b18cff', '#ffffff'];
const SIDE = { h: 'Horde', a: 'Alliance', '': '' };
function wayBtn(x, y) { return x == null ? '' : `<button class="way" data-way="/way ${x} ${y}" title="${t('copy_way')}">${x}, ${y}</button>`; }
function bindWay(root) {
  root.querySelectorAll('[data-way]').forEach(b => b.onclick = e => {
    e.preventDefault(); e.stopPropagation();
    const txt = b.dataset.way;
    (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(t('copied') + ' ' + txt), () => toast(txt));
  });
}
function toast(msg) {
  let el = $('#toast'); if (!el) { el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el); }
  el.textContent = msg; el.className = 'show'; clearTimeout(el._t); el._t = setTimeout(() => el.className = '', 1800);
}
function howToHtml(id) {
  const f = S.farm && S.farm[id];
  const meta = S.items[id];
  const blocks = [];
  const fi = farmInfo(id);
  if (fi && (f.k || f.s || f.f)) blocks.push(`<div class="where" style="margin-bottom:10px">${fi.html.split('<br>')[0]}${f.f && (f.k || f.s) ? '<br>' + fi.html.split('<br>')[1] : ''}</div>`);
  blocks.push(whereBlocks(f, 'wmap'));
  if (vendorSet().has(id) && (!f || !f.v || !f.v.length)) blocks.push(`<p>${t('ht_vendor_generic')}</p>`);
  if (!blocks.join('')) {
    if (f && f.new) return `<p class="muted">${t('farm_new')}</p>`;
    return '';
  }
  return blocks.join('') + `<p class="note">${t('farm_src_note')}</p>`;
}
function whereBlocks(f, boxId) {
  const blocks = [];
  if (!f) return '';
  if (f.v && f.v.length) {
    const order = { h: 0, '': 1, a: 2 };
    const vs = [...f.v].sort((a, b) => order[a[1]] - order[b[1]]);
    blocks.push(`<h3>${t('ht_vendors')} <span class="dim">(${f.vn || vs.length})</span></h3><ul class="vlist">${vs.map(v => `<li>
      <b>${esc(v[0])}</b> ${v[1] ? `<span class="badge ${v[1] === 'h' ? 'bad' : 'info'}">${SIDE[v[1]]}</span>` : `<span class="badge">${t('ht_neutral')}</span>`}
      ${v[2] ? `<span class="dim">&lt;${esc(v[2])}&gt;</span>` : ''}<br>
      ${zoneName(v[3])} ${wayBtn(v[4], v[5])} · ${money(v[6])}${v[7] ? ` · <span class="dim">${t('ht_limited')}</span>` : ''}</li>`).join('')}</ul>
      ${(f.vn || 0) > vs.length ? `<p class="note">${t('ht_more_vendors').replace('{n}', f.vn - vs.length)}</p>` : ''}`);
  }
  if (f.m && f.m.length) {
    blocks.push(`<h3>${t('ht_mobs')}</h3><div class="tablewrap"><table class="t"><thead><tr><th>${t('ht_mob')}</th><th>${t('lvl_s')}</th><th>${t('ht_zone')}</th><th class="r">${t('ht_rate')}</th></tr></thead><tbody>
      ${f.m.map(m => `<tr><td>${esc(m[0])}</td><td>${m[1] ?? ''}${m[2] && m[2] !== m[1] ? '–' + m[2] : ''}</td><td>${zoneName(m[3])}</td><td class="r"><b>${pctTxt(m[4])}</b>${m[5] ? ' <span class="dim">×' + m[5] + '</span>' : ''}</td></tr>`).join('')}
      </tbody></table></div>`);
  }
  if (f.n && f.n.length && !f.k) {
    blocks.push(`<h3>${t('ht_nodes')}</h3><ul class="vlist">${f.n.map(n => `<li>${esc(n[0])} · ${n[1].map(zoneName).join(', ')}${n[2] ? ' +' + n[2] : ''} · <b>${pctTxt(n[3])}</b></li>`).join('')}</ul>`);
  }
  if (f.p && f.p.length) blocks.push(`<h3>${t('ht_map')}</h3><div class="wbox" id="${boxId}"></div>`);
  return blocks.join('');
}
function drawWhereMap(f, boxId) {
  const box = document.getElementById(boxId);
  if (!f || !f.p || !box) return;
  let cur = 0; const hidden = new Set();
  const render = () => {
    const [mid, zone, names, pins] = f.p[cur];
    box.innerHTML = `${f.p.length > 1 ? `<div class="row" style="margin-bottom:8px">${f.p.map((m, i) => `<button class="chip ${i === cur ? 'on' : ''}" data-z="${i}">${zoneName(m[1])} <span class="dim">${m[3].length}</span></button>`).join('')}</div>` : `<p class="muted">${zoneName(zone)}</p>`}
      <div class="wmap"><img src="maps/${mid}.webp" alt="${esc(zoneName(zone))}" onerror="this.parentNode.classList.add('nomap')">
      ${pins.map(p => hidden.has(p[2]) ? '' : `<span class="pin${names[p[2]][1] === 'v' ? ' big' : ''}" style="left:${p[0]}%;top:${p[1]}%;background:${PIN_COLORS[p[2] % PIN_COLORS.length]}" data-way="/way ${p[0]} ${p[1]}" title="${esc(names[p[2]][0])} (${p[0]}, ${p[1]})"></span>`).join('')}
      <div class="nomapmsg">${t('ht_nomap')}</div></div>
      <div class="row legend">${names.map((n, i) => `<button class="chip ${hidden.has(i) ? '' : 'on'}" data-l="${i}"><span class="dot" style="background:${PIN_COLORS[i % PIN_COLORS.length]}"></span>${esc(n[0])} <span class="dim">${t('kind_' + n[1]) || ''}</span></button>`).join('')}</div>
      <p class="note">${t('ht_map_help')}</p>`;
    box.querySelectorAll('[data-z]').forEach(b => b.onclick = () => { cur = +b.dataset.z; hidden.clear(); render(); });
    box.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { const i = +b.dataset.l; hidden.has(i) ? hidden.delete(i) : hidden.add(i); render(); });
    bindWay(box);
  };
  render();
}
async function viewBestiary() {
  const ids = Object.keys(S.farm || {}).map(Number).filter(id => S.items[id]);
  const kindOf = id => {
    const f = S.farm[id];
    if (f.k) return f.k[0] === 'herb' ? 'herb' : 'mining';
    if (f.s) return 'skin';
    if (f.f) return 'fish';
    if (f.v && f.v.length) return 'vendor';
    if (f.m && f.m.length) return 'mob';
    if (f.n && f.n.length) return 'node';
    return 'other';
  };
  const kinds = ['all', 'mob', 'vendor', 'herb', 'mining', 'skin', 'fish', 'node'];
  let kind = store('hf_bkind') || 'all', q = '';
  app().innerHTML = `<div class="hero"><h1>${t('nav_best')}</h1><p>${t('best_sub')}</p></div>
    <div class="panel"><div class="row"><input id="bq" placeholder="${t('search_ph')}" style="flex:1;min-width:200px"></div>
    <div class="row" id="bk" style="margin-top:8px"></div></div><div class="panel"><div id="list"></div></div>`;
  const draw = () => {
    $('#bk').innerHTML = kinds.map(k => `<button class="chip ${k === kind ? 'on' : ''}" data-k="${k}">${t('bk_' + k)}</button>`).join('');
    $('#bk').querySelectorAll('[data-k]').forEach(b => b.onclick = () => { kind = b.dataset.k; store('hf_bkind', kind); draw(); });
    const nq = norm(q);
    const rows = ids.filter(id => (kind === 'all' || kindOf(id) === kind) && (!nq || norm(itemName(id) + ' ' + itemAlt(id)).includes(nq)));
    table($('#list'), [
      { k: 'n', label: t('col_item'), f: id => itemCell(id), v: id => itemName(id), cls: 'l' },
      { k: 'k', label: t('col_source'), f: id => `<span class="tag">${t('bk_' + kindOf(id))}</span>`, v: id => kindOf(id) },
      { k: 'w', label: t('col_where'), f: id => { const fi = farmInfo(id); const f = S.farm[id]; const v = f.v && f.v.length ? [...f.v].sort((a, b) => (a[1] === 'h' ? -1 : 0) - (b[1] === 'h' ? -1 : 0))[0] : null;
        return `<div class="where">${fi ? fi.html : ''}${v ? (fi ? '<br>' : '') + `${esc(v[0])} · ${zoneName(v[3])}` : ''}</div>`; }, cls: 'l' },
    ], rows, { sort: 'n', desc: false });
  };
  $('#bq').oninput = e => { q = e.target.value; draw(); };
  draw();
}


// ------------------------------------------------------------------ infobulle façon jeu
const QCOL = { POOR: '#9d9d9d', COMMON: '#ffffff', UNCOMMON: '#1eff00', RARE: '#0070dd', EPIC: '#a335ee', LEGENDARY: '#ff8000' };
const TTCOL = { u: '#1eff00', g: '#1eff00', y: '#ffd100', b: '#71d5ff', '': '#ffffff' };
function ttLines(id) { const tt = S.tt && S.tt[id]; return (tt || []).map(([txt, c]) => [txt[S.lang] || txt.en, c]); }
function ttHtml(id) {
  const m = S.items[id]; if (!m) return '';
  const lines = ttLines(id);
  return `<div class="tt-name" style="color:${QCOL[m.q] || '#fff'}">${esc(itemName(id))}</div>
    ${lines.map(([x, c]) => `<div style="color:${TTCOL[c] || '#fff'}">${esc(x)}</div>`).join('')}
    ${!lines.length && S.tt ? `<div class="dim">${t('tt_none')}</div>` : ''}
    ${m.sp ? `<div class="tt-sell">${t('tt_sell')} ${money(m.sp)}</div>` : ''}`;
}
function setupTooltips() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const box = document.createElement('div'); box.id = 'itt'; document.body.appendChild(box);
  let cur = null;
  const place = e => {
    const w = box.offsetWidth, h = box.offsetHeight;
    let x = e.clientX + 16, y = e.clientY + 16;
    if (x + w > innerWidth - 8) x = e.clientX - w - 16;
    if (y + h > innerHeight - 8) y = Math.max(8, innerHeight - h - 8);
    box.style.left = x + 'px'; box.style.top = y + 'px';
  };
  document.addEventListener('mouseover', async e => {
    const a = e.target.closest && e.target.closest('a[href^="#/item/"], [data-tt]');
    if (!a) { if (cur) { box.style.display = 'none'; cur = null; } return; }
    const id = Number(a.dataset.tt || a.getAttribute('href').split('/')[2]);
    if (!id || id === cur) return;
    cur = id;
    if (!S.tt) { load('tt').then(x => { S.tt = x || {}; if (cur === id) { box.innerHTML = ttHtml(id); } }).catch(() => { S.tt = {}; }); }
    box.innerHTML = ttHtml(id); box.style.display = 'block'; place(e);
  });
  document.addEventListener('mousemove', e => { if (cur) place(e); });
}

// ------------------------------------------------------------------ cadre
function setLang(l) { S.lang = l; store('hf_lang', l); document.documentElement.lang = l; renderChrome(); route(); }
async function renderNav() {
  const cur = (location.hash.split('/')[1] || '').split('?')[0];
  const n = await alertsCount();
  $('#nav').innerHTML = [['', 'nav_market'], ['best', 'nav_best'], ['farm', 'nav_farm'], ['craft', 'nav_craft'], ['vendor', 'nav_vendor'], ['gaps', 'nav_gaps'], ['watch', 'nav_watch'], ['settings', 'nav_settings']]
    .map(([k, l]) => `<a href="#/${k}" class="${cur === k ? 'on' : ''}">${t(l)}${k === 'watch' && n ? ` <span class="badge warn">${n}</span>` : ''}</a>`).join('');
}
function renderHousebar() {
  const mine = myHouses();
  $('#housebar').innerHTML = ['horde', 'alliance', 'neutral'].map(f => `<button class="chip ${f} ${S.view === f ? 'on' : ''}" data-v="${f}">${t(f)}${mine[f] ? ' <span class="dim">#' + mine[f] + '</span>' : ''}</button>`).join('')
    + `<span class="note" style="margin-left:auto">${t('updated')} ${when(S.meta.t)} · ${t('next_update')} ${new Date((S.meta.t + 3600) * 1000).toLocaleTimeString(S.lang, { hour: '2-digit', minute: '2-digit' })}</span>`;
  $('#housebar').querySelectorAll('[data-v]').forEach(b => b.onclick = () => { S.view = b.dataset.v; store('hf_view', S.view); renderHousebar(); route(); });
}
function renderChrome() {
  $('#q').placeholder = t('search_ph');
  $('#langBtn').textContent = S.lang === 'fr' ? 'EN' : 'FR';
  $('#foot').textContent = (S.lang === 'fr' ? 'Données : API Blizzard (WoW Forever), relevées toutes les heures. Site personnel.' : 'Data: Blizzard API (WoW Forever), read hourly. Personal site.');
  if (S.meta) { renderNav(); renderHousebar(); }
}
async function route() {
  if (!S.meta) return;
  const h = decodeURIComponent(location.hash.slice(1) || '/');
  renderNav();
  app().innerHTML = `<div class="panel muted">${t('loading')}</div>`;
  try {
    if (h.startsWith('/item/')) await viewItem(Number(h.split('/')[2]));
    else if (h.startsWith('/search')) await viewSearch(new URLSearchParams(h.split('?')[1] || '').get('q') || '');
    else if (h.startsWith('/farm')) await viewFarm();
    else if (h.startsWith('/best')) await viewBestiary();
    else if (h.startsWith('/craft')) await viewCraft();
    else if (h.startsWith('/vendor')) await viewVendor();
    else if (h.startsWith('/gaps')) await viewGaps();
    else if (h.startsWith('/watch')) await viewWatch();
    else if (h.startsWith('/settings')) await viewSettings();
    else await viewMarket();
  } catch (e) { console.error(e); app().innerHTML = `<div class="panel err">${esc(e.message)}</div>`; }
  window.scrollTo(0, 0);
}
function setupSearch() {
  const q = $('#q'), sg = $('#suggest'); let sel = -1, ids = [];
  const show = () => {
    ids = search(q.value, 12);
    sg.innerHTML = ids.map((id, i) => `<a href="#/item/${id}" class="${i === sel ? 'sel' : ''}"><img src="${icon(id)}" width="20" height="20" alt=""><span class="q-${S.items[id].q}">${esc(itemName(id))}</span><span class="dim" style="margin-left:auto;font-size:12px">${esc(itemAlt(id))}</span></a>`).join('');
    sg.style.display = ids.length && document.activeElement === q ? 'block' : 'none';
  };
  q.oninput = () => { sel = -1; show(); };
  q.onfocus = show;
  q.onblur = () => setTimeout(() => sg.style.display = 'none', 200);
  q.onkeydown = e => {
    if (e.key === 'ArrowDown') { sel = Math.min(ids.length - 1, sel + 1); show(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { sel = Math.max(-1, sel - 1); show(); e.preventDefault(); }
    else if (e.key === 'Enter') { location.hash = sel >= 0 ? '#/item/' + ids[sel] : '#/search?q=' + encodeURIComponent(q.value); sg.style.display = 'none'; q.blur(); }
  };
}
async function start() {
  [S.items, S.recipes, S.vendor, S.farm, S.craft] = await Promise.all([load('items'), load('recipes'), load('vendor'), load('farm').catch(() => null), load('craft').catch(() => null)]);
  S.items = S.items || {}; S.recipes = S.recipes || []; S.vendor = S.vendor || [];
  buildSearch();
  $('#lock').style.display = 'none';
  renderChrome(); setupSearch(); setupTooltips(); route();
}
async function boot() {
  document.documentElement.lang = S.lang;
  $('#lockText').textContent = t('lock_text'); $('#rememberText').textContent = t('remember'); $('#lockBtn').textContent = t('unlock');
  $('#langBtn').onclick = () => setLang(S.lang === 'fr' ? 'en' : 'fr');
  window.addEventListener('hashchange', route);
  $('#lockForm').onsubmit = async e => {
    e.preventDefault(); $('#lockErr').textContent = t('loading');
    try { await unlock($('#pw').value, $('#remember').checked); $('#lockErr').textContent = ''; await start(); }
    catch (err) { console.error(err); $('#lockErr').textContent = t('bad_pw'); }
  };
  if (await restoreKey()) await start();
  else $('#pw').focus();
}
boot();
