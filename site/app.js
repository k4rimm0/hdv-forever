'use strict';
/* HDV Forever : site personnel d'analyse de l'hôtel des ventes de WoW Forever.
   Les données sont chiffrées (AES-GCM) et déchiffrées ici avec le mot de passe. */

// ------------------------------------------------------------------ textes FR / EN
const T = {
  fr: {
    nav_market: 'Marché', nav_best: 'Bestiaire', nav_farm: 'Farm par niveau', nav_craft: 'Métiers', nav_guide: '📘 Guides métiers', gd_title: 'Guides de montée de métier', gd_sub: 'Choisis ton métier et entre ta compétence actuelle : le guide te donne, palier par palier, quoi fabriquer et combien, avec le plan le moins cher selon les prix de ton HDV (composants, recettes, où les trouver).', nav_vendor: 'PNJ → HDV',
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
    item_houses: 'Prix dans tes HDV', hs_horde: 'HDV Horde (le tien)', hs_alliance: 'HDV Alliance', hs_neutral: 'HDV neutre (Blackwater)', hs_group: 'groupe',
    hs_more: 'Comparer avec les {n} HDV des autres groupes de serveurs', hs_nomine: 'Choisis tes HDV dans Réglages → Retrouver mon HDV pour ne garder que les tiens.',
    hs_explain: "En Europe, les serveurs WoW Forever sont regroupés en 5 groupes. Chaque groupe a 3 HDV (Horde, Alliance, neutre), d'où les 15 HDV et les numéros. Tu ne peux acheter et vendre que dans ceux de ton groupe (en haut) : ces lignes servent juste à comparer.", item_chart: 'Historique des prix', item_made_by: 'Se fabrique avec', item_used_in: 'Sert à fabriquer',
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
    pr_mode_guide: 'Guide de montée', pr_help_guide: "Plan calculé avec les prix de ton HDV : à chaque point, la recette la moins chère par point gagné (orange = 100 %, jaune puis vert = de moins en moins). Il part de ton niveau actuel.",
    gd_total: 'Coût total estimé', gd_total_s: 'de {a} à {b}, composants + recettes', gd_steps: 'Étapes', gd_crafts: '{n} fabrications au total', gd_recipes: 'Recettes à acheter', gd_recipes_s: 'déjà compris dans le total',
    gd_range: 'Niveaux', gd_recipe: 'Recette', gd_n: 'Nombre', gd_mats: 'Composants (total)', gd_learn: "Où l'apprendre", gd_at: 'à', gd_shop: 'Liste de courses',
    gd_qty: 'Quantité', gd_unit: "Prix à l'unité", gd_where: 'Où', gd_vendor: 'PNJ (moins cher)', gd_ah: 'HDV', gd_resale: 'Compter la revente des objets fabriqués (moitié du prix HDV)',
    gd_gap: 'À partir de {s}, aucune recette connue avec des prix à ton HDV : regarde le guide de référence.', gd_gap2: 'De {s} à {e} : aucune recette ne fait monter à ce niveau avec les prix actuels.', gd_gap_mining: 'Continue en minant (guide du dessus).',
    gd_note: "Les nombres de fabrications sont des moyennes (la chance de gagner un point baisse quand la recette passe au jaune puis au vert). Les prix bougent : recharge la page avant d'acheter.",
    gd_ref: 'Guide de référence (en anglais), pour comparer :',
    rank_journeyman: "palier bloqué : entraîne Compagnon chez ton maître de métier (possible dès 50).",
    rank_expert: 'palier bloqué : entraîne Expert chez ton maître de métier (dès 125).',
    rank_artisan: 'palier bloqué : entraîne Artisan chez un maître artisan (dès 200).',
    rank_cook_expert: 'palier bloqué : achète le livre « The Expert Cookbook » chez Wulan (Désolace, Horde) ou Shandrina.',
    rank_cook_artisan: 'palier bloqué : Artisan s’apprend avec la quête « Clamlette Surprise ».',
    rank_fa_expert: 'palier bloqué : il faut le livre de Secourisme Expert (vendu par un PNJ spécialisé), voir le guide de référence.',
    rank_fa_artisan: 'palier bloqué : Artisan s’apprend par une quête (voir le guide de référence).',
    pr_title: 'Métiers', pr_sub: "Par métier : ce qui rapporte le plus, ce qui monte le métier au moins cher, où apprendre chaque recette. Taxe de l'HDV ({cut} %) déduite.",
    pr_my: 'Mon niveau en', pr_mode_gold: "Gagner de l'or", pr_mode_lvl: 'Monter le métier', pr_onlycan: 'Seulement ce que je peux faire', pr_norec: 'Sans recette à acheter (entraîneur)',
    pr_help_gold: "Bénéfice/jour = bénéfice par objet × ventes estimées par jour : c'est ce qui dit si ça vaut le coup. Chaque composant est compté au moins cher entre l'HDV et le PNJ.",
    pr_help_lvl: "Coût par point = coût des composants (moins la moitié de la revente) ÷ chance de gagner un point. Orange = 100 %, jaune puis vert = de moins en moins, gris = 0.",
    pr_skill: 'Niveau', nav_gear: '🛡️ Équipement', ge_title: 'Équipement : les stuffs par classe et par niveau', ge_sub: "Le meilleur stuff pour ta classe, ta spécialisation et ton niveau, avec où trouver chaque pièce (quête, donjon, vendeur, craft, HDV) et ce que ça coûte. Les priorités de stats viennent des guides de WoW Forever (Icy Veins, Mobalytics, Warcraft Tavern) : tank, dégâts et soins ne cherchent pas du tout les mêmes objets.", ge_filters: 'Filtres', ge_class: 'Classe', ge_spec: 'Spécialisation', ge_all_specs: 'Toutes', ge_level: 'Niveau', ge_faction: 'Faction', ge_budget: 'Budget', ge_b_all: 'Sans limite', ge_b_free: 'Gratuit', ge_dung: 'Butin de donjon', ge_craft: 'Objets craftés', ge_raid: 'Butin de raid', ge_pvp: 'Récompenses JcJ (champs de bataille, rangs)', ge_up: 'Dans {n} niveau(x) (niv. {l})', ge_up_title: '⏫ Améliorations à venir', ge_up_hz: 'Niveaux à l\'avance :', ge_up_none: "Pas de grosse amélioration dans les {n} prochains niveaux : ce stuff tient bien.", ge_up_note: "Le pourcentage est ce que la pièce ajoute à la puissance de tout ton stuff (avec la même priorité de stats). 🔥 = gros bond (7 % ou plus), ⏫ = bonne amélioration (3 % ou plus).", ge_wait: "Conseil : n'achète pas la pièce actuelle, attends celle-ci.", ge_or_ah: 'ou HDV :', ge_bop: 'lié quand ramassé : pas à l\'HDV', ge_not_ah: 'pas en vente à l\'HDV en ce moment', ge_sets: 'Panoplies', ge_sets_none: "Aucune pièce de panoplie dans ce stuff (les objets « immaculés » de couture, par exemple, ne forment pas une panoplie : pas de bonus).", ge_sets_note: "Les bonus de panoplie sont comptés dans le calcul : une pièce de panoplie remplace un objet un peu meilleur si le bonus le compense. Les effets spéciaux (procs) sont affichés mais pas chiffrés.", ge_unk: "Objets dont la source est inconnue (parfois des objets pas encore disponibles en jeu)", ge_cover: "Base d'objets : metabot.gg (16 000 objets de WoW Forever). Blizzard cache encore certains objets de Classic tant que personne ne les a ramassés : ils apparaîtront ici au fil des jours. Au niveau 60, les guides n'ont pas encore publié de listes « BiS » pour Forever : les stuffs 60 sont calculés à partir de leurs priorités de stats.", ge_src_note: "Sources connues pour {k} objets sur {n} (le reste arrive au fil des mises à jour).", ge_nodata: "La base d'équipement n'est pas encore récupérée : elle arrive à la prochaine mise à jour du site (toutes les heures).", ge_free: 'Gratuit', ge_see: 'Voir le détail →', ge_back: 'Tous les stuffs', ge_totals: 'Stats totales', ge_prio: 'Priorité de stats', ge_prio_src: "Priorités tirées des guides WoW Forever : Icy Veins (niveau 60) et Mobalytics (leveling), recoupées avec Warcraft Tavern.", ge_caps: "Au niveau 60 le toucher sert jusqu'à {h} % et l'expertise jusqu'à {e} % (au-delà, presque plus rien) : le stuff en tient compte.", ge_total_cost: 'Coût total', ge_slot: 'Emplacement', ge_item: 'Objet', ge_how: "Comment l'obtenir", ge_cost: 'Coût', ge_none: 'Rien de mieux trouvé', ge_alts: 'Autres choix', ge_dps: 'DPS', ge_h_q: 'Quête', ge_h_d: 'Donjon', ge_h_w: 'Butin (rare)', ge_h_v: 'Vendeur', ge_h_c: 'Craft', ge_h_ah: 'HDV', ge_h_unk: 'Source pas encore connue', ge_mats: 'composants', ge_h_pending: 'Source en cours de récupération', ge_quest: 'Quête', ge_req: 'niv. requis', ge_start: 'départ', ge_both: 'les deux factions', ge_more_mobs: '+ {n} autres monstres', ge_ah: 'HDV :', ge_method: "Comment c'est calculé : chaque objet reçoit un score selon la priorité de stats de la spé (en leveling d'abord la survie et le confort, au niveau 60 les priorités des guides de raid), on garde le meilleur par emplacement parmi ce que ta classe peut porter à ce niveau. Les objets de quête et de boss de donjon sont comptés gratuits, les autres au prix du vendeur ou de l'HDV.", fs_label: 'Je farme :', fs_h: 'côté Horde', fs_a: 'côté Alliance', fs_all: 'partout', zs_h: 'Territoire Horde', zs_a: "Territoire Alliance (gardes hostiles si tu es Horde)", zs_c: 'Zone contestée (les deux factions)', fs_hidden: '{n} autre(s) monstre(s) seulement en territoire adverse, masqué(s). Choisis « partout » pour les voir.', fs_none: "Aucun monstre connu de ce côté : voici ceux du territoire adverse. Attention aux gardes.", fs_enemy: "{z} est en territoire adverse : gardes et joueurs ennemis. Regarde les autres zones au-dessus si possible.", rk_title: 'Paliers à débloquer', rk_pass: 'Pour dépasser {c}', rk_n_j: 'Compagnon', rk_n_e: 'Expert', rk_n_a: 'Artisan', rk_skill: 'dès {s} de compétence', rk_lvl: 'perso niveau {l}', rk_missing: '(il te manque {n} niveau(x))', rk_mylvl: 'Niveau de ton perso :', rk_train_j: "à apprendre chez l'entraîneur du métier (en ville)", rk_train_e: "à apprendre chez l'entraîneur du métier", rk_train_a: "à apprendre chez un maître artisan (entraîneur spécial, souvent hors des capitales)", rk_cook_e: "lire le livre « The Expert Cookbook » (1 po), vendu par Wulan au village de Shadowprey, Désolace (Horde, étage du bâtiment le plus à l'est) ou Shandrina à Orneval (Alliance), il s'échange donc regarde aussi l'HDV", rk_cook_a: "quête « Clamlette Surprise » de Dirge Quikcleave, à l'auberge de Gadgetzan (Tanaris) : il faut 12 Œufs géants (rocs autour de Gadgetzan), 10 Chairs de palourde relevée et 20 Gruyère d'Alterac (aubergiste)", rk_fa_e: "lire le livre « Expert First Aid - Under Wraps » (1 po), vendu au marécage d'Âprefange (Brackenwall, Horde) ou dans les Hautes-terres d'Arathi (Alliance)", rk_fa_a: "quête « Triage » à Trépas-d'Orgrim / Hammerfall (Hautes-terres d'Arathi, Horde) ou à Theramore (Alliance)", rk_fish_e: "lire le livre « Expert Fishing - The Bass and You » (1 po), vendu par le vieux Heming à Baie-du-Butin", rk_fish_a: "quête « Nat Pagle, Angler Extreme » au marécage d'Âprefange (4 poissons rares à ramener)", gg_help_Herbalism: "Ramasse la plante indiquée pour ton niveau : tant qu'elle est orange, chaque cueillette donne un point. Clique sur « Route » pour un trajet de farm optimisé.", gg_help_Mining: "Mine le filon indiqué pour ton niveau (orange = un point à chaque fois). Fondre les minerais en barres fait aussi monter le Minage : voir plus bas. Clique sur « Route » pour un trajet optimisé.", gg_help_Skinning: "Le dépeçage dépend du niveau des bêtes : pour monter, dépèce les bêtes les plus hautes que tu peux. Formule : jusqu'au niveau 20, compétence = (niveau − 10) × 10 ; au-dessus, niveau × 5. Astuce : dépèce tout ce que tu tues en montant de niveau.", gg_help_Fishing: "La pêche monte un point par prise, de plus en plus lentement. Pêche dans des zones de ton niveau de pêche, avec un appât (+25 ou +50) si tu rates trop de prises.", gg_what: 'Quoi récolter', gg_rare: 'rare, à prendre si tu le croises :', gg_where: 'Où', gg_value: 'Valeur HDV', gg_nozone: 'zones inconnues', gg_note: "Niveaux requis de Classic : Forever a pu en changer quelques-uns. Une plante/un filon reste orange jusqu'à +25, jaune jusqu'à +50, vert jusqu'à +100 au-dessus du niveau requis. Paliers : Compagnon à 75, Expert à 150 et Artisan à 225 chez l'entraîneur.", gg_mobs: 'Bêtes à dépecer', gg_beasts: 'niveau {a} à {b}', gg_skin_note: "Paliers chez l'entraîneur de dépeçage : Compagnon (75), Expert (150), Artisan (225). Le cuir récupéré se vend bien à l'HDV.", gg_tip: 'Conseil', fish_1: "Apprends la pêche chez l'entraîneur (Orgrimmar). N'importe quelle eau de départ suffit.", fish_75: "Achète un appât (Appât brillant, +25) si tu rates des prises.", fish_150: "À 150 : quête « Commence par la fin » (livre Expert) chez le vieux Heming à Baie-du-Butin, Strangleronce.", fish_225: "À 225 : quête Artisan de Nat Pagle au marécage d'Âprefange (il faut rapporter 4 poissons rares).", gg_fish_note: "Zones conseillées de Classic. Une canne à pêche plus forte (+20 ou +25) aide beaucoup à partir de 150.", gg_smelt: 'Fonte (fait aussi monter le Minage)', rah_loading: 'Recherche dans tes 3 HDV…', rah_bop: "<b>Liée quand ramassée</b> : cette recette ne peut jamais être vendue à l'HDV, il faut la looter toi-même (voir ci-dessous).", rah_noid: "Jamais vue en vente dans aucun de tes 3 HDV (Horde, Alliance, neutre) depuis que le site les relève. C'est souvent une recette « liée quand ramassée » : elle ne peut pas être vendue, il faut la looter soi-même.", rah_found: 'En vente en ce moment :', rah_none_all: "Pas en vente en ce moment, ni à l'HDV Horde, ni à l'Alliance, ni au neutre (Blackwater).", rah_last: 'Dernier prix vu :', rah_ally: 'il faut un perso Alliance', rah_neutral: 'accessible aux deux factions (Baie-du-Butin, Gadgetzan, Everlook)', rah_alert: "🔔 M'avertir quand elle est en vente", rah_alert_on: '🔕 Alerte activée (cliquer pour retirer)', rah_notif: '{n} est en vente à l\'HDV !', rah_badge_on: 'en vente !', rah_badge_wait: 'pas encore en vente', rah_nosrc: "Aucune source connue dans nos données (souvent une recette qui tombe au hasard sur les monstres d'une tranche de niveau, ou une récompense de quête). Fiche complète :", cd_open: 'Voir le prix de chaque composant', cd_mat: 'Composant', cd_qty: 'Quantité', cd_unit: "Prix à l'unité", cd_src: 'Où l\'acheter', cd_total: 'Total', cd_vendor: 'PNJ', cd_ah: 'HDV', cd_none: 'aucun prix connu', cd_sum: 'Coût pour une fabrication', cd_makes: 'donne {n} objets', pr_tiers: 'apprise à {a}, jaune à {b}, vert à {c}, gris à {d}', pr_tiers_tip: 'Tu peux l\'apprendre à {a}. De {a} à {b} (orange) : chaque fabrication donne 1 point à coup sûr. De {b} à {c} (jaune) : souvent un point. De {c} à {d} (vert) : rarement. À partir de {d} (gris) : plus aucun point.', pr_learn: 'Comment apprendre', pr_trainer: 'Entraîneur', pr_recipe: 'Recette', pr_drop: 'drop', pr_ah: 'HDV :',
    pr_chance: 'Chance de point', pr_ppp: 'Coût par point', pr_pt: 'point', pr_day: 'jour', pr_at: 'à',
    pr_adv_title: 'Conseils pour toi', pr_adv_lvl: 'Pour monter le moins cher', pr_adv_gold: "Pour faire de l'or", pr_adv_nogold: 'Rien de rentable à ton niveau pour le moment.', pr_adv_next: 'Ce qui se débloque bientôt',
    pr_adv_noskill: 'Entre ton niveau en {p} juste au-dessus pour avoir des conseils adaptés.',
    pr_note: "Niveaux et sources des recettes : metabot.gg (données du jeu et de Classic). Revu toutes les deux semaines. Données de Classic : Forever a pu en changer quelques-unes.", pr_free: 'gratuit (rentable)', _x: "",
    pr_craft_title: 'Fabrication', pr_trainer_long: "S'apprend chez l'entraîneur du métier (en ville).", pr_ah_long: "Prix de la recette à l'HDV :", pr_ah_none: "Recette pas en vente à l'HDV en ce moment.",
    tt_sell: 'Prix de vente :', tt_none: 'Pas encore de description (chargée au fil des mises à jour).', item_effect: 'Effet',
    ht_title: "Comment l'obtenir", ht_vendors: 'Vendu par', ht_neutral: 'Neutre', ht_limited: 'stock limité', ht_more_vendors: '+{n} autres vendeurs (les plus proches de chez toi peuvent ne pas être listés).',
    ht_vendor_generic: 'Vendu chez les PNJ marchands (fournitures, cuisine…), par exemple en ville.', ht_mobs: 'Monstres qui le lâchent', ht_mob: 'Monstre', ht_zone: 'Zone', ht_rate: 'Taux de drop',
    ht_nodes: 'Ramassé sur', ht_map: 'Carte', terr_auto: 'Vrai terrain : automatique quand tu zoomes (clic pour changer)', terr_on: 'Vrai terrain : toujours affiché', terr_off: 'Vrai terrain : désactivé (carte dessinée)', ht_nomap: 'Carte en cours de téléchargement, réessaie après la prochaine mise à jour.',
    ht_map_help: 'Survole un point pour voir le nom, clique dessus pour le GPS (itinéraire depuis là où tu es). Clique sur la légende pour masquer ou afficher une source.',
    rt_extra_title: 'À ramasser aussi sur le chemin', rt_bonus: 'Bonus possible en chemin (matériau Scarce) :', rt_extra_n: '{n} point(s) près de la route', rt_each: "l'unité",
    rt_sold_day: 'ventes/jour', rt_extra_skill: 'ta compétence est trop basse pour celle-ci', rt_extra_none: 'Rien de connu à moins de quelques pas de cette route.',
    rt_extra_help: 'Classées par valeur à ton HDV (prix × nombre de points près du chemin). Coche pour les ajouter : la route passe aussi par elles, avec leur couleur.',
    mob_open: 'voir la fiche du monstre', mob_nomap: "Pas de position connue pour ce monstre.", mob_loop: 'Afficher une boucle de farm sur ses apparitions',
    mob_map_help: "Chaque point rouge est un endroit où il apparaît. Clique dessus pour le GPS. Zoom à la molette.", mob_elite: 'Élite', mob_rare: 'Rare',
    mob_card: 'Fiche', mob_level: 'Niveau', mob_role: 'Type', mob_enemy: 'Ennemi', mob_spawns: "Points d'apparition", mob_value: 'Valeur moyenne par monstre tué',
    mob_drops: 'Butin', mob_price: 'Prix HDV', mob_vendor: 'PNJ', mob_value_help: "Valeur par monstre = somme de (chance × quantité × prix) de chaque objet : prix de ton HDV, ou prix de revente au PNJ pour les objets gris.",
    rt_btn: 'Route de farm', rt_title: 'Route de farm', rt_none: "Pas de points de récolte connus pour cette ressource.",
    rt_summary: 'Ta route', rt_points: '{n} arrêts dans {z}, en boucle.', rt_skipped: '{n} point(s) évité(s)',
    rt_gain: 'Optimisée : {p} % plus courte que de passer les points dans le désordre.', rt_start: 'Départ conseillé : <b>{s}</b> (le ▶ sur la carte).', rt_go_start: "M'y amener (GPS)",
    rt_click_skip: 'clic = éviter ce point', rt_click_back: 'clic = remettre ce point', rt_maybe: 'ajouter aussi {l} (sources pas sûres)',
    rt_skill_warn: 'Retirés de la route, ta compétence est trop basse pour :',
    rt_no_town: "Pas de ville Horde dans cette zone : commence au point 1 (le plus proche de l'entrée que tu prends).",
    rt_help: "Suis les numéros dans l'ordre, la boucle te ramène au départ. Clique sur un point dangereux ou inaccessible (camp d'élites, falaise) pour l'éviter : la route se recalcule.",
    rt_limits: "Les points sont les endroits où la ressource peut apparaître (données de Classic) : tous ne sont pas occupés en même temps. La route relie les points en ligne droite, sans voir le relief.",
    scarce_lichen: 'Matériau « Scarce » : pas de plante à cueillir, il tombe en bonus en cueillant Terrestrine, Mage royal et Églantine (dès 15 en herboristerie).',
    scarce_rosecap: 'Matériau « Scarce » : tombe en bonus sur Sang-royal, Pâlerette et Dorépine (et peut-être d’autres).',
    scarce_pyrite: 'Matériau « Scarce » : tombe en bonus en minant les filons de cuivre, d’étain et de fer.',
    scarce_bauxite: 'Matériau « Scarce » : tombe en bonus en minant les filons d’or et de mithril.',
    gps_pick: 'Je suis ici (sur la carte)', gps_pick_title: 'Où es-tu ?', gps_pick_zone: 'Zone', gps_pick_help: 'Clique sur la carte là où tu es. Les petits points blancs sont les villes et maîtres de vol connus.',
    gps_pick_near: 'Départ pris depuis <b>{n}</b>, le lieu connu le plus proche de ton point.', gps_pick_zone_only: 'Pas de ville proche : départ depuis le centre de {z}.',
    gps_title: 'GPS : y aller', gps_click: 'clique pour le GPS', gps_way_help: '← clique pour copier /way (addon TomTom)', gps_from: 'Je suis à', gps_speed: 'Je me déplace', gps_foot: 'à pied', gps_m60: 'monture (60 %)', gps_m100: 'monture rapide (100 %)',
    gps_fp: "j'ai les points de vol", gps_go: "Calculer l'itinéraire", gps_last: 'Dernière étape dans {z}', gps_open: 'Ouvrir en grand ↗',
    gps_last_help: "Une fois dans la zone, le point jaune clignotant est ta destination. Avec l'addon TomTom, tape <b>{way}</b> pour avoir une flèche.",
    gps_src: 'Itinéraire calculé par Travelcraft (planificateur fait pour WoW Forever : vols mesurés dans Forever, zeppelins, bateaux, routes réelles).',
    gps_redrawn: "Attention : Blizzard a redessiné cette carte pour Forever, les points (repris de Classic) peuvent être un peu décalés.",
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
    nav_market: 'Market', nav_best: 'Bestiary', nav_farm: 'Farm by level', nav_craft: 'Professions', nav_guide: '📘 Leveling guides', gd_title: 'Profession leveling guides', gd_sub: 'Pick your profession and enter your current skill: the guide tells you, step by step, what to craft and how many, using the cheapest plan from your auction house prices (materials, recipes, where to find them).', nav_vendor: 'Vendor → AH',
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
    item_houses: 'Prices in your houses', hs_horde: 'Horde AH (yours)', hs_alliance: 'Alliance AH', hs_neutral: 'Neutral AH (Blackwater)', hs_group: 'group',
    hs_more: 'Compare with the {n} houses of the other realm groups', hs_nomine: 'Pick your houses in Settings to keep only yours.',
    hs_explain: 'In Europe, WoW Forever realms are grouped into 5 groups, each with 3 auction houses (Horde, Alliance, neutral): hence 15 houses and the numbers. You can only trade in your own group (above); these rows are for comparison.', item_chart: 'Price history', item_made_by: 'Made from', item_used_in: 'Used to craft',
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
    pr_mode_guide: 'Leveling guide', pr_help_guide: 'Plan built with your AH prices: at each point, the recipe that costs the least per skill point (orange = 100%, then yellow and green less and less). It starts from your current skill.',
    gd_total: 'Estimated total cost', gd_total_s: 'from {a} to {b}, reagents + recipes', gd_steps: 'Steps', gd_crafts: '{n} crafts in total', gd_recipes: 'Recipes to buy', gd_recipes_s: 'already in the total',
    gd_range: 'Skill', gd_recipe: 'Recipe', gd_n: 'Count', gd_mats: 'Reagents (total)', gd_learn: 'Where to learn', gd_at: 'at', gd_shop: 'Shopping list',
    gd_qty: 'Quantity', gd_unit: 'Unit price', gd_where: 'Where', gd_vendor: 'vendor (cheaper)', gd_ah: 'AH', gd_resale: 'Count resale of crafted items (half AH price)',
    gd_gap: 'From {s}, no known recipe with prices at your AH: check the reference guide.', gd_gap2: 'From {s} to {e}: no recipe gives points at this skill with current prices.', gd_gap_mining: 'Keep mining (guide above).',
    gd_note: 'Craft counts are averages (skill-up chance drops as the recipe turns yellow then green). Prices move: reload before buying.',
    gd_ref: 'Reference guide, to compare:',
    rank_journeyman: 'cap reached: train Journeyman at your trainer (from 50).', rank_expert: 'cap reached: train Expert at your trainer (from 125).',
    rank_artisan: 'cap reached: train Artisan at an artisan trainer (from 200).', rank_cook_expert: 'cap reached: buy “The Expert Cookbook” from Wulan (Desolace, Horde) or Shandrina.',
    rank_cook_artisan: 'cap reached: Artisan is learned through the quest “Clamlette Surprise”.', rank_fa_expert: 'cap reached: you need the Expert First Aid book from a vendor, see the reference guide.',
    rank_fa_artisan: 'cap reached: Artisan is learned through a quest (see the reference guide).',
    pr_title: 'Professions', pr_sub: 'Per profession: what earns the most, what levels it cheapest, where to learn each recipe. AH cut ({cut}%) included.',
    pr_my: 'My skill in', pr_mode_gold: 'Make gold', pr_mode_lvl: 'Level it', pr_onlycan: 'Only what I can make', pr_norec: 'No recipe to buy (trainer)',
    pr_help_gold: 'Profit/day = profit per item × estimated sales per day. Each reagent is counted at the cheaper of AH and vendor.',
    pr_help_lvl: 'Cost per point = reagent cost (minus half the resale) ÷ chance of a skill-up. Orange = 100%, yellow then green = less and less, grey = 0.',
    pr_skill: 'Skill', nav_gear: '🛡️ Gear', ge_title: 'Gear: sets by class and level', ge_sub: 'The best set for your class, spec and level, with where to get each piece (quest, dungeon, vendor, crafting, AH) and what it costs. Stat priorities come from WoW Forever guides (Icy Veins, Mobalytics, Warcraft Tavern): tanks, damage dealers and healers want very different items.', ge_filters: 'Filters', ge_class: 'Class', ge_spec: 'Spec', ge_all_specs: 'All', ge_level: 'Level', ge_faction: 'Faction', ge_budget: 'Budget', ge_b_all: 'No limit', ge_b_free: 'Free', ge_dung: 'Dungeon loot', ge_craft: 'Crafted items', ge_raid: 'Raid loot', ge_pvp: 'PvP rewards (battlegrounds, ranks)', ge_up: 'In {n} level(s) (lvl {l})', ge_up_title: '⏫ Upcoming upgrades', ge_up_hz: 'Levels ahead:', ge_up_none: 'No big upgrade in the next {n} levels: this set holds up well.', ge_up_note: 'The percentage is what the piece adds to your whole set (same stat priority). 🔥 = big jump (7% or more), ⏫ = good upgrade (3% or more).', ge_wait: 'Tip: do not buy the current piece, wait for this one.', ge_or_ah: 'or AH:', ge_bop: 'binds on pickup: not on AH', ge_not_ah: 'not on the AH right now', ge_sets: 'Item sets', ge_sets_none: 'No set piece in this gear.', ge_sets_note: 'Set bonuses are counted: a set piece replaces a slightly better item when the bonus makes up for it. Special effects (procs) are shown but not valued.', ge_unk: 'Items with unknown source', ge_cover: 'Item database: metabot.gg (16,000 WoW Forever items). Blizzard still hides some Classic items until someone loots them: they will show up here over time. At level 60, guides have not published Forever BiS lists yet: level 60 sets are computed from their stat priorities.', ge_src_note: 'Sources known for {k} of {n} items (the rest comes with the next updates).', ge_nodata: 'The gear database has not been fetched yet: it arrives with the next site update (hourly).', ge_free: 'Free', ge_see: 'See details →', ge_back: 'All sets', ge_totals: 'Total stats', ge_prio: 'Stat priority', ge_prio_src: 'Priorities from WoW Forever guides: Icy Veins (level 60) and Mobalytics (leveling), cross-checked with Warcraft Tavern.', ge_caps: 'At level 60, hit is useful up to {h}% and expertise up to {e}%: the set accounts for it.', ge_total_cost: 'Total cost', ge_slot: 'Slot', ge_item: 'Item', ge_how: 'How to get it', ge_cost: 'Cost', ge_none: 'Nothing better found', ge_alts: 'Other choices', ge_dps: 'DPS', ge_h_q: 'Quest', ge_h_d: 'Dungeon', ge_h_w: 'Drop (rare)', ge_h_v: 'Vendor', ge_h_c: 'Crafted', ge_h_ah: 'AH', ge_h_unk: 'Unknown source', ge_mats: 'materials', ge_h_pending: 'Source being fetched', ge_quest: 'Quest', ge_req: 'req. level', ge_start: 'start', ge_both: 'both factions', ge_more_mobs: '+ {n} more mobs', ge_ah: 'AH:', ge_method: 'How it works: each item gets a score from the spec stat priority (survival and comfort while leveling, raid guide priorities at 60); we keep the best one per slot among what your class can wear at that level. Quest and dungeon boss items count as free, others at vendor or AH price.', fs_label: 'I farm:', fs_h: 'Horde side', fs_a: 'Alliance side', fs_all: 'anywhere', zs_h: 'Horde territory', zs_a: 'Alliance territory (hostile guards if you are Horde)', zs_c: 'Contested zone (both factions)', fs_hidden: '{n} other mob(s) only in enemy territory, hidden. Choose “anywhere” to see them.', fs_none: 'No known mob on your side: here are the enemy-territory ones. Watch out for guards.', fs_enemy: '{z} is enemy territory: guards and enemy players. Check the other zones above if you can.', rk_title: 'Ranks to unlock', rk_pass: 'To go past {c}', rk_n_j: 'Journeyman', rk_n_e: 'Expert', rk_n_a: 'Artisan', rk_skill: 'from skill {s}', rk_lvl: 'character level {l}', rk_missing: '({n} level(s) missing)', rk_mylvl: 'Your character level:', rk_train_j: 'learned from the profession trainer (in cities)', rk_train_e: 'learned from the profession trainer', rk_train_a: 'learned from an artisan trainer (special trainer, often outside capitals)', rk_cook_e: 'read “The Expert Cookbook” (1g), sold by Wulan in Shadowprey Village, Desolace (Horde) or Shandrina in Ashenvale (Alliance); it is tradable, so check the AH too', rk_cook_a: 'quest “Clamlette Surprise” from Dirge Quikcleave, Gadgetzan inn (Tanaris): needs 12 Giant Eggs (rocs around Gadgetzan), 10 Zesty Clam Meat and 20 Alterac Swiss (innkeeper)', rk_fa_e: 'read “Expert First Aid - Under Wraps” (1g), sold in Dustwallow Marsh (Brackenwall, Horde) or Arathi Highlands (Alliance)', rk_fa_a: 'quest “Triage” in Hammerfall (Arathi Highlands, Horde) or Theramore (Alliance)', rk_fish_e: 'read “Expert Fishing - The Bass and You” (1g), sold by Old Man Heming in Booty Bay', rk_fish_a: 'quest “Nat Pagle, Angler Extreme” in Dustwallow Marsh (bring back 4 rare fish)', gg_help_Herbalism: 'Pick the plant shown for your skill: while it is orange every pick gives a point. Click "Route" for an optimized farm path.', gg_help_Mining: 'Mine the vein shown for your skill (orange = a point every time). Smelting ore into bars also raises Mining: see below. Click "Route" for an optimized path.', gg_help_Skinning: 'Skinning depends on beast level: skin the highest beasts you can. Formula: up to level 20, skill = (level − 10) × 10; above, level × 5. Tip: skin everything you kill while leveling.', gg_help_Fishing: 'Fishing gives a point per catch, slower and slower. Fish in zones matching your fishing skill, with a lure (+25 or +50) if you miss too many catches.', gg_what: 'What to gather', gg_rare: 'rare, take it if you see one:', gg_where: 'Where', gg_value: 'AH value', gg_nozone: 'unknown zones', gg_note: 'Classic skill requirements: Forever may have changed a few. A plant/vein stays orange until +25, yellow until +50, green until +100 above the requirement. Ranks: Journeyman at 75, Expert at 150, Artisan at 225 from the trainer.', gg_mobs: 'Beasts to skin', gg_beasts: 'level {a} to {b}', gg_skin_note: 'Skinning trainer ranks: Journeyman (75), Expert (150), Artisan (225). Leather sells well on the AH.', gg_tip: 'Tip', fish_1: 'Learn fishing from the trainer (Orgrimmar). Any starting water works.', fish_75: 'Buy a lure (Shiny Bauble, +25) if you miss catches.', fish_150: 'At 150: quest "Expert Fishing" (book) from Old Man Heming in Booty Bay, Stranglethorn.', fish_225: "At 225: Nat Pagle's Artisan quest in Dustwallow Marsh (bring back 4 rare fish).", gg_fish_note: 'Classic recommended zones. A better fishing pole (+20 or +25) helps a lot from 150.', gg_smelt: 'Smelting (also raises Mining)', rah_loading: 'Checking your 3 auction houses…', rah_bop: '<b>Binds when picked up</b>: this recipe can never be sold on the AH, you must loot it yourself (see below).', rah_noid: 'Never seen on sale in any of your 3 auction houses since the site started reading them. It is often a "binds when picked up" recipe: it cannot be sold, you have to loot it yourself.', rah_found: 'On sale right now:', rah_none_all: 'Not on sale right now, neither on the Horde, Alliance nor neutral (Blackwater) AH.', rah_last: 'Last price seen:', rah_ally: 'needs an Alliance character', rah_neutral: 'open to both factions (Booty Bay, Gadgetzan, Everlook)', rah_alert: '🔔 Notify me when it is on sale', rah_alert_on: '🔕 Alert on (click to remove)', rah_notif: '{n} is on the AH!', rah_badge_on: 'on sale!', rah_badge_wait: 'not on sale yet', rah_nosrc: 'No known source in our data (often a random world drop from mobs of a level range, or a quest reward). Full page:', cd_open: 'Show the price of each material', cd_mat: 'Material', cd_qty: 'Qty', cd_unit: 'Unit price', cd_src: 'Where to buy', cd_total: 'Total', cd_vendor: 'Vendor', cd_ah: 'AH', cd_none: 'no known price', cd_sum: 'Cost for one craft', cd_makes: 'makes {n} items', pr_tiers: 'learn at {a}, yellow {b}, green {c}, grey {d}', pr_tiers_tip: 'Learnable at {a}. From {a} to {b} (orange): every craft gives a skill point. From {b} to {c} (yellow): usually a point. From {c} to {d} (green): rarely. From {d} (grey): no more points.', pr_learn: 'How to learn', pr_trainer: 'Trainer', pr_recipe: 'Recipe', pr_drop: 'drop', pr_ah: 'AH:',
    pr_chance: 'Skill-up chance', pr_ppp: 'Cost per point', pr_pt: 'point', pr_day: 'day', pr_at: 'at',
    pr_adv_title: 'Advice for you', pr_adv_lvl: 'Cheapest to level', pr_adv_gold: 'To make gold', pr_adv_nogold: 'Nothing profitable at your skill yet.', pr_adv_next: 'Unlocking soon',
    pr_adv_noskill: 'Enter your {p} skill above for tailored advice.',
    pr_note: 'Skill levels and recipe sources: metabot.gg (game and Classic data). Refreshed every two weeks. Classic data: Forever may have changed a few.', pr_free: 'free (profitable)', _x: '',
    pr_craft_title: 'Crafting', pr_trainer_long: 'Learned from the profession trainer (in cities).', pr_ah_long: 'Recipe price on the AH:', pr_ah_none: 'Recipe not on the AH right now.',
    tt_sell: 'Sell price:', tt_none: 'No description yet (loaded over the next updates).', item_effect: 'Effect',
    ht_title: 'How to get it', ht_vendors: 'Sold by', ht_neutral: 'Neutral', ht_limited: 'limited stock', ht_more_vendors: '+{n} more vendors (ones near you may not be listed).',
    ht_vendor_generic: 'Sold by merchant NPCs (trade supplies, cooking…), for example in cities.', ht_mobs: 'Mobs that drop it', ht_mob: 'Mob', ht_zone: 'Zone', ht_rate: 'Drop rate',
    ht_nodes: 'Gathered from', ht_map: 'Map', terr_auto: 'Real terrain: automatic when zooming (click to change)', terr_on: 'Real terrain: always on', terr_off: 'Real terrain: off (drawn map)', ht_nomap: 'Map is downloading, try again after the next update.',
    ht_map_help: 'Hover a dot to see the name, click it for the GPS (route from where you are). Click the legend to hide or show a source.',
    rt_extra_title: 'Also pick up along the way', rt_bonus: 'Possible bonus on the way (Scarce material):', rt_extra_n: '{n} point(s) near the route', rt_each: 'each',
    rt_sold_day: 'sold/day', rt_extra_skill: 'your skill is too low for this one', rt_extra_none: 'Nothing known within a few steps of this route.',
    rt_extra_help: 'Ranked by value at your AH (price × points near the path). Tick to add them: the route also visits them, in their colour.',
    mob_open: 'open the creature card', mob_nomap: 'No known position for this creature.', mob_loop: 'Show a farm loop over its spawns',
    mob_map_help: 'Each red dot is a spawn point. Click it for the GPS. Scroll to zoom.', mob_elite: 'Elite', mob_rare: 'Rare',
    mob_card: 'Card', mob_level: 'Level', mob_role: 'Type', mob_enemy: 'Enemy', mob_spawns: 'Spawn points', mob_value: 'Average value per kill',
    mob_drops: 'Loot', mob_price: 'AH price', mob_vendor: 'vendor', mob_value_help: 'Value per kill = sum of (chance × quantity × price) of each item: your AH price, or vendor price for grey items.',
    rt_btn: 'Farm route', rt_title: 'Farm route', rt_none: 'No known gathering points for this resource.',
    rt_summary: 'Your route', rt_points: '{n} stops in {z}, as a loop.', rt_skipped: '{n} point(s) skipped',
    rt_gain: 'Optimised: {p}% shorter than visiting the points in any order.', rt_start: 'Suggested start: <b>{s}</b> (the ▶ on the map).', rt_go_start: 'Take me there (GPS)',
    rt_click_skip: 'click = skip this point', rt_click_back: 'click = put this point back', rt_maybe: 'also add {l} (unsure sources)',
    rt_skill_warn: 'Removed from the route, your skill is too low for:',
    rt_no_town: 'No Horde town in this zone: start at point 1.',
    rt_help: 'Follow the numbers in order; the loop brings you back to the start. Click a dangerous or unreachable point (elite camp, cliff) to skip it: the route updates.',
    rt_limits: 'Points are places where the resource can spawn (Classic data): not all are up at once. The route joins points in straight lines and does not see terrain.',
    scarce_lichen: 'Scarce material: no plant of its own, it drops as a bonus when picking Earthroot, Mageroyal and Briarthorn (from 15 Herbalism).',
    scarce_rosecap: 'Scarce material: bonus drop from Kingsblood, Fadeleaf and Goldthorn (maybe more).',
    scarce_pyrite: 'Scarce material: bonus drop when mining Copper, Tin and Iron veins.',
    scarce_bauxite: 'Scarce material: bonus drop when mining Gold and Mithril veins.',
    gps_pick: 'I am here (on the map)', gps_pick_title: 'Where are you?', gps_pick_zone: 'Zone', gps_pick_help: 'Click the map where you are. Small white dots are known towns and flight masters.',
    gps_pick_near: 'Starting from <b>{n}</b>, the known place closest to your point.', gps_pick_zone_only: 'No town nearby: starting from the middle of {z}.',
    gps_title: 'GPS: get there', gps_click: 'click for GPS', gps_way_help: '← click to copy /way (TomTom addon)', gps_from: 'I am at', gps_speed: 'Travel by', gps_foot: 'on foot', gps_m60: 'mount (60%)', gps_m100: 'fast mount (100%)',
    gps_fp: 'I have the flight paths', gps_go: 'Get route', gps_last: 'Last leg in {z}', gps_open: 'Open full size ↗',
    gps_last_help: 'Once in the zone, the blinking yellow dot is your destination. With the TomTom addon, type <b>{way}</b> for an arrow.',
    gps_src: 'Route by Travelcraft (planner built for WoW Forever: flights timed in Forever, zeppelins, boats, real roads).',
    gps_redrawn: 'Note: Blizzard redrew this map for Forever, the dots (from Classic) may be slightly off.',
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
  Mining: { fr: 'Minage' }, Herbalism: { fr: 'Herboristerie' }, Skinning: { fr: 'Dépeçage' }, Fishing: { fr: 'Pêche' },
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
    const r = await fetch('d/' + name + '.bin?v=' + (S.meta && name !== 'meta' ? S.meta.t : Date.now()));
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
  if (m && m.virt) return `<span class="it"><img loading="lazy" src="${icon(id)}" alt=""><span><span class="q-COMMON">${esc(itemName(id))}</span></span></span>`;
  return `<a class="it" href="#/item/${id}"><img loading="lazy" src="${icon(id)}" alt=""><span><span class="q-${m ? m.q : 'COMMON'}">${esc(itemName(id))}</span>${alt ? `<br><span class="alt">${esc(alt)}</span>` : ''}</span></a>`;
}
const norm = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, "'");
let searchIndex = null;
function buildSearch() {
  searchIndex = Object.entries(S.items).filter(([, m]) => !m.virt).map(([id, m]) => [Number(id), norm(m.n.fr), norm(m.n.en)]);
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
  if (!f.k && f.m && f.m.length) parts.push(f.m.slice(0, 2).map(m => `${mobLink(m[0], m[6])} <span class="dim">(${t('lvl_s')} ${m[1]}${m[2] !== m[1] ? '–' + m[2] : ''})</span> · ${zoneName(m[3])} · <b>${pctTxt(m[4])}</b>${m[5] ? ' ×' + m[5] : ''}`).join('<br>'));
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
      <div style="margin-left:auto;display:flex;gap:8px">${routeAvailable(id) ? `<button class="act" id="routeBtn">🗺️ ${t('rt_btn')}</button>` : ''}<button class="act" id="watchBtn">${watching ? t('watch_on') : t('watch_add')}</button></div></div></div>
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
  bindWay(app()); fillRecipeAH(app());
  if ($('#routeBtn')) $('#routeBtn').onclick = async () => openRoute(id, await market(viewHouseId()));
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
  const myH = myHouses(); const mine = Object.values(myH).filter(Boolean);
  const FNAME = { horde: t('hs_horde'), alliance: t('hs_alliance'), neutral: t('hs_neutral') };
  const hsCols = own => [
    { k: 'h', label: t('col_house'), f: x => { const hh = houseById(x[0]); return own ? `<b>${FNAME[hh.faction]}</b>` : `<span class="dim">${t(hh.faction)} · ${t('hs_group')} ${x[0]}</span>`; }, cls: 'l', v: x => x[0] },
    { k: 'min', label: t('col_min'), f: x => money(x[1][MIN]), v: x => x[1][MIN] },
    { k: 'mkt', label: t('col_mkt'), f: x => money(x[1][MKT]), v: x => x[1][MKT] },
    { m: false, k: 'qty', label: t('col_qty'), f: x => num(x[1][QTY]), v: x => x[1][QTY] },
    { k: 'pd', label: t('col_pd'), f: x => num(x[1][PD]), v: x => x[1][PD] },
    { m: false, k: 'd7', label: t('col_d7'), f: x => pctf(x[1][C7]), v: x => x[1][C7] },
  ];
  const rowsH = all.filter(([, mm]) => mm && mm.items[id]).map(([x, mm]) => [x, mm.items[id]]);
  const order = { horde: 0, neutral: 1, alliance: 2 };
  const ownRows = rowsH.filter(r => mine.includes(r[0])).sort((a, b) => order[houseById(a[0]).faction] - order[houseById(b[0]).faction]);
  const otherRows = rowsH.filter(r => !mine.includes(r[0]));
  $('#hs').innerHTML = `<div id="hsOwn"></div>${mine.length ? '' : `<p class="note">${t('hs_nomine')}</p>`}
    ${otherRows.length ? `<details class="hs-more"><summary>${t('hs_more', { n: otherRows.length })}</summary><p class="note">${t('hs_explain')}</p><div id="hsOther"></div></details>` : ''}`;
  table($('#hsOwn'), hsCols(true), mine.length ? ownRows : rowsH, { sort: null });
  if (otherRows.length) table($('#hsOther'), hsCols(false), otherRows, { sort: 'mkt', desc: false });
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
  let cost = 0, missing = false; const parts = [], det = [];
  for (const [rid, q] of rc.r) {
    const ah = items[rid] ? items[rid][MKT] : null; const vp = vendorBuyPrice(rid, vs);
    const unit = [ah, vp].filter(x => x != null && x > 0).sort((a, b) => a - b)[0];
    if (unit == null) { missing = true; parts.push(`${q}× ${itemName(rid)} : ?`); det.push([rid, q, null, '']); continue; }
    const src = unit === vp ? 'v' : 'a';
    cost += unit * q; parts.push(`${q}× ${itemName(rid)} : ${src === 'v' ? 'PNJ' : 'HDV'}`); det.push([rid, q, unit, src, src === 'v' ? ah : vp]);
  }
  return { cost, missing, parts, det };
}
// ------------------------------------------------------------------ métiers
const PF_SLUG = p => String(p || '').toLowerCase().replace(/\s+/g, '-');
function craftInfoMb(outId, prof) {
  const c = S.craft && S.craft.o && S.craft.o[outId];
  if (!c || !c.length) return null;
  return c.find(e => e.pf === PF_SLUG(prof)) || c[0];
}
// Niveaux des recettes : 2e source (wowforeverbuilds, tirée du client de Forever), fusionnée avec metabot.
// Jaune/vert/gris viennent du client ; le niveau d'apprentissage de metabot sert quand le client ne le donne pas.
const CI_CACHE = new Map();
function craftInfo(outId, prof) {
  const k = prof + '|' + outId; if (CI_CACHE.has(k)) return CI_CACHE.get(k);
  const ci = craftInfoMb(outId, prof);
  const w = S._wfb && S._wfb[prof] ? S._wfb[prof].get(outId) : null;
  let r = ci;
  if (w && w.sk && w.sk[1] != null) {
    const y = w.sk[1]; const mbl = ci && ci.sk ? ci.sk[0] : null;
    const learn = w.sk[0] != null ? w.sk[0] : mbl != null ? Math.min(mbl, y) : y;
    const tr = w.src === 'Trainer' || !!(ci && ci.tr);
    const rn = ci && ci.rn ? ci.rn : (!tr && w.src ? w.src.replace(/^[^:]+:\s*/, '') : '');
    r = Object.assign({}, ci || {}, { sk: [learn, y, w.sk[2], w.sk[3]], tr, rn, wst: w.st, wsrc: w.src });
    if (!tr && !(ci && ci.rs) && rn) r.rs = 'w:' + rn;
  } else if (ci && !ci.tr && !ci.rs && !ci.nt) r = Object.assign({}, ci, { tr: true }); // appris d'office
  CI_CACHE.set(k, r); return r;
}
function applyWfb(wfb) {
  S._wfb = {}; CI_CACHE.clear(); if (!wfb) return;
  const keep = []; const known = {};
  for (const [prof, list] of Object.entries(wfb)) {
    if (!list || list.length < 5) continue;
    const m = new Map(); for (const w of list) { if (w.o) m.set(w.o, w); m.set(-w.sp, w); } S._wfb[prof] = m;
  }
  for (const rc of S.recipes) {
    const m = S._wfb[rc.p];
    if (!m) { keep.push(rc); continue; }
    const w = m.get(rc.o);
    if (!w || w.st === 'removed') continue; // pas dans Forever (Season of Discovery, Classic seulement) ou retirée
    keep.push(rc); (known[rc.p] = known[rc.p] || new Set()).add(rc.o);
  }
  // Recettes connues seulement par la 2e source (ex. enchantements, sans objet fabriqué).
  for (const [prof, list] of Object.entries(wfb)) {
    if (!S._wfb[prof]) continue;
    for (const w of list) {
      if (w.st === 'removed' || !w.r || !w.r.length || w.r.some(x => typeof x[0] !== 'number')) continue;
      const o = w.o || -w.sp; if (known[prof] && known[prof].has(o)) continue;
      if (!S.items[o]) S.items[o] = { n: { en: w.n, fr: w.n }, q: 'COMMON', ic: /^Enchant/.test(w.n) ? 'trade_engraving' : 'inv_misc_questionmark', cn: { en: '', fr: '' }, scn: { en: '', fr: '' }, il: 0, virt: 1 };
      keep.push({ id: 'w' + w.sp, p: prof, n: { en: w.n, fr: w.n }, o, oq: 1, r: w.r });
      (known[prof] = known[prof] || new Set()).add(o);
    }
  }
  S.recipes = keep;
}
// Icône de difficulté comme dans la fenêtre de métier du jeu : 3 chevrons orange, 2 jaunes, 1 vert, aucun en gris.
const DIFF_N = { orange: 3, yellow: 2, green: 1, grey: 0, red: 0 };
const DIFF_COL = { orange: '#ff8040', yellow: '#ffff00', green: '#40bf40', grey: '#9a9a9a', red: '#ff4d4d' };
function diffIcon(c, title) {
  const n = DIFF_N[c]; if (n == null) return '';
  const tt = title ? ` title="${esc(title)}"` : '';
  if (!n) return `<svg class="dif" viewBox="0 0 12 14" width="12" height="14"${tt}><circle cx="6" cy="8" r="2.6" fill="${DIFF_COL[c]}" stroke="#000" stroke-width="1"/></svg>`;
  let p = ''; for (let i = n - 1; i >= 0; i--) { const y = 0.6 + i * 4 + (3 - n) * 2; p += `<path d="M6 ${y}L11.6 ${y + 5.4}L11.6 ${y + 7.6}L6 ${y + 3.6}L0.4 ${y + 7.6}L0.4 ${y + 5.4}Z" fill="${DIFF_COL[c]}" stroke="#000" stroke-width=".6" stroke-linejoin="round"/>`; }
  return `<svg class="dif" viewBox="0 0 12 14" width="12" height="14"${tt}>${p}</svg>`;
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
function recipeInfo(ci) { if (!ci || !ci.rs) return null; const r = S.craft && S.craft.r && S.craft.r[ci.rs]; if (r) return r.id ? r : Object.assign({}, r, { id: itemByEn(r.nm || ci.rn) }); return { nm: ci.rn, id: itemByEn(ci.rn) }; }
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
async function viewCraft(page) {
  const m = await market(viewHouseId());
  if (!m) { app().innerHTML = `<div class="panel">${t('no_data')}</div>`; return; }
  const cut = S.meta.ah_cut || 0.05, vs = vendorSet();
  const profs = [...new Set(S.recipes.map(r => r.p).concat(page === 'guide' ? GATHER_PROFS : []))].sort((a, b) => profName(a).localeCompare(profName(b)));
  let prof = store('hf_prof'); if (!profs.includes(prof)) prof = profs.includes('Cooking') ? 'Cooking' : profs[0];
  let mode = store('hf_pmode') || 'gold'; if (page === 'guide') mode = 'guide'; else if (mode === 'guide') mode = 'gold'; let minPd = Number(store('hf_minpd') || 0), onlyCan = store('hf_onlycan') === '1', noRecipe = store('hf_norec') === '1';
  app().innerHTML = `<div class="hero"><h1>${page === 'guide' ? t('gd_title') : t('pr_title')}</h1><p>${page === 'guide' ? t('gd_sub') : t('pr_sub', { cut: Math.round(cut * 100) })}</p></div>
    <div class="panel"><div class="row" id="profs"></div>
    <div class="row" style="margin-top:10px"><label>${t('pr_my')} <b id="pname"></b> <input type="number" id="psk" min="0" max="300"></label>
      <span class="seg"><button class="chip" data-m="gold">${t('pr_mode_gold')}</button><button class="chip" data-m="lvl">${t('pr_mode_lvl')}</button><button class="chip" data-m="guide">📘 ${t('pr_mode_guide')}</button></span></div>
    <div class="row" style="margin-top:8px"><label><input type="checkbox" id="onlycan"> ${t('pr_onlycan')}</label><label><input type="checkbox" id="norec"> ${t('pr_norec')}</label>
      <label id="minpdl">${t('min_sales')} <input type="number" id="minpd" min="0" value="${minPd}"></label></div>
    <p class="help" id="phelp"></p></div>
    <div class="panel" id="advice"></div>
    <div class="panel"><div id="list"></div><p class="note">${t('sales_note')}</p><p class="note">${t('pr_note')}</p></div>`;
  $('#onlycan').checked = onlyCan; $('#norec').checked = noRecipe;
  function draw() {
    $('#profs').innerHTML = profs.map(p => `<button class="chip ${p === prof ? 'on' : ''}" data-p="${esc(p)}">${esc(profName(p))}</button>`).join('');
    $('#profs').querySelectorAll('[data-p]').forEach(b => b.onclick = () => { prof = b.dataset.p; store('hf_prof', prof); draw(); });
    document.querySelectorAll('[data-m]').forEach(b => { b.classList.toggle('on', b.dataset.m === mode); b.onclick = () => { const nm = b.dataset.m; store('hf_pmode', nm); if ((nm === 'guide') !== (page === 'guide')) { location.hash = nm === 'guide' ? '#/guide' : '#/craft'; return; } mode = nm; draw(); }; });
    $('#pname').textContent = profName(prof);
    const sks = profSkills(); const my = sks[prof] ?? '';
    $('#psk').value = my;
    $('#psk').oninput = e => { const s = profSkills(); s[prof] = e.target.value === '' ? '' : Number(e.target.value); store('hf_pskill', JSON.stringify(s)); drawList(); };
    $('#minpdl').style.display = mode === 'gold' ? '' : 'none';
    $('#phelp').textContent = mode === 'gold' ? t('pr_help_gold') : mode === 'guide' ? t('pr_help_guide') : t('pr_help_lvl');
    drawList();
  }
  function drawList() {
    const my = profSkills()[prof]; const myN = my === '' || my == null ? null : Number(my);
    if (mode === 'guide') {
      $('#advice').style.display = '';
      advice(S.recipes.filter(rc => rc.p === prof).map(rc => {
        const out = m.items[rc.o]; const c = craftCost(rc, m.items, vs); const ci = craftInfo(rc.o, prof);
        const sell = out && out[MKT] ? out[MKT] * rc.oq * (1 - cut) : null; const profit = sell != null && !c.missing ? sell - c.cost : null;
        const ch = ci && myN != null ? skillChance(ci.sk, myN) : null;
        return { rc, ci, ch, ppd: profit != null && out && out[PD] ? profit / rc.oq * out[PD] : null, ppp: ch ? (c.missing ? null : (c.cost - (sell || 0) * 0.5) / ch) : null };
      }), myN);
      const bindLvl = () => { const el = $('#charlvl'); if (el) el.onchange = e => { store('hf_charlvl', e.target.value); drawList(); }; };
      if (GATHER_PROFS.includes(prof)) {
        const hasCraft = S.recipes.some(rc => rc.p === prof);
        $('#list').innerHTML = ranksHtml(prof, myN) + gatherGuideHtml(prof, myN, m) + (hasCraft ? `<h2 style="margin-top:18px">${t('gg_smelt')}</h2>` + guideHtml(prof, Math.max(1, myN || 1), m, vs, { noRecipe, resale: false }) : '');
        $('#list').querySelectorAll('[data-route]').forEach(b => b.onclick = () => openRoute(+b.dataset.route, m));
        bindLvl(); return;
      }
      $('#list').innerHTML = ranksHtml(prof, myN) + guideHtml(prof, Math.max(1, myN || 1), m, vs, { noRecipe, resale: store('hf_gresale') === '1' })
        + `<label class="chk" style="margin-top:8px"><input type="checkbox" id="gresale" ${store('hf_gresale') === '1' ? 'checked' : ''}> ${t('gd_resale')}</label>`;
      $('#gresale').onchange = e => { store('hf_gresale', e.target.checked ? '1' : '0'); drawList(); }; bindLvl();
      return;
    }
    $('#advice').style.display = '';
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
      { k: 'sk', label: t('pr_skill'), f: x => x.ci && x.ci.sk ? `<span class="skw" title="${t('pr_tiers_tip', { a: x.ci.sk[0], b: x.ci.sk[1], c: x.ci.sk[2], d: x.ci.sk[3] })}"><span class="dnow">${diffIcon(myN != null && skillColor(x.ci.sk, myN) ? skillColor(x.ci.sk, myN) : 'orange')}</span><span class="sk ${skillColor(x.ci.sk, myN)}">${x.ci.sk[0]}</span> <span class="small">${diffIcon('yellow')}<span class="sk yellow">${x.ci.sk[1]}</span> ${diffIcon('green')}<span class="sk green">${x.ci.sk[2]}</span> ${diffIcon('grey')}<span class="sk grey">${x.ci.sk[3]}</span></span></span>` : '<span class="dim">?</span>', v: x => x.ci && x.ci.sk ? x.ci.sk[0] : null },
      { k: 'rec', label: t('pr_learn'), f: x => `<div class="where">${recipeCell(x.ci, m.items)}</div>`, v: x => x.ci && x.ci.tr ? 0 : 1, cls: 'l' },
      { k: 'cost', label: t('col_cost'), f: x => `<button type="button" class="cbx" title="${t('cd_open')}" data-cd="${esc(JSON.stringify([x.rc.oq, x.c.det]))}">▸</button> ${x.c.missing ? `<span class="badge bad">${t('incomplete')}</span>` : money(x.c.cost)}`, v: x => x.c.missing ? null : x.c.cost },
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
    $('#list').onclick = e => {
      const b = e.target.closest('.cbx'); if (!b) return; e.preventDefault(); e.stopPropagation();
      const tr = b.closest('tr'); const nx = tr.nextElementSibling;
      if (nx && nx.classList.contains('cdrow')) { nx.remove(); b.textContent = '▸'; b.classList.remove('on'); return; }
      const [oq, det] = JSON.parse(b.dataset.cd);
      const tot = det.reduce((a, d) => a + (d[2] || 0) * d[1], 0);
      const row = document.createElement('tr'); row.className = 'cdrow';
      row.innerHTML = `<td colspan="${tr.children.length}"><table class="cdt"><thead><tr><th class="l">${t('cd_mat')}</th><th>${t('cd_qty')}</th><th>${t('cd_unit')}</th><th class="l">${t('cd_src')}</th><th>${t('cd_total')}</th></tr></thead><tbody>
        ${det.map(([rid, q, unit, src, alt]) => `<tr><td class="l">${itemCell(rid)}</td><td>${q}</td><td>${unit == null ? '<span class="badge bad">?</span>' : money(unit)}</td>
          <td class="l small">${unit == null ? `<span class="dim">${t('cd_none')}</span>` : src === 'v' ? `${t('cd_vendor')}${alt ? ` <span class="dim">(${t('cd_ah')} ${money(alt)})</span>` : ''}` : `${t('cd_ah')}${alt ? ` <span class="dim">(${t('cd_vendor')} ${money(alt)})</span>` : ''}`}</td>
          <td><b>${unit == null ? '–' : money(unit * q)}</b></td></tr>`).join('')}
        <tr class="cdsum"><td class="l" colspan="4">${t('cd_sum')}${oq > 1 ? ` <span class="dim">(${t('cd_makes', { n: oq })})</span>` : ''}</td><td><b>${money(tot)}</b></td></tr></tbody></table></td>`;
      tr.after(row); b.textContent = '▾'; b.classList.add('on');
    };
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
      <div><h3>${t('pr_adv_lvl')}</h3><ul class="vlist">${lvl.map(x => `${li(x)} · ${x.ppp <= 0 ? `<span class="up">${t('pr_free')}</span>` : money(x.ppp) + '/' + t('pr_pt')} ${diffIcon(skillColor(x.ci.sk, myN))}</li>`).join('') || `<li class="dim">${t('none')}</li>`}</ul></div>
      <div><h3>${t('pr_adv_gold')}</h3><ul class="vlist">${gold.map(x => `${li(x)} · <b>${money(x.ppd, { short: true })}</b>/${t('pr_day')}</li>`).join('') || `<li class="dim">${t('pr_adv_nogold')}</li>`}</ul></div>
      <div><h3>${t('pr_adv_next')}</h3><ul class="vlist">${next.map(x => `${li(x)} · ${t('pr_at')} ${x.ci.sk[0]}${x.ci.rs ? ` · <span class="tag warn">${t('pr_recipe')}</span>` : ''}</li>`).join('') || `<li class="dim">${t('none')}</li>`}</ul></div>
    </div>`;
  }
  $('#minpd').oninput = e => { minPd = Number(e.target.value) || 0; store('hf_minpd', minPd); drawList(); };
  $('#onlycan').onchange = e => { onlyCan = e.target.checked; store('hf_onlycan', onlyCan ? '1' : '0'); drawList(); };
  $('#norec').onchange = e => { noRecipe = e.target.checked; store('hf_norec', noRecipe ? '1' : '0'); drawList(); };
  draw();
}
function srcLinks(nm) {
  const q = encodeURIComponent(nm);
  return `<a href="https://www.wowhead.com/forever/search?q=${q}" target="_blank" rel="noopener">Wowhead ↗</a> · <a href="https://metabot.gg/en/wow-forever/search?q=${q}" target="_blank" rel="noopener">Metabot ↗</a>`;
}
// Cherche une recette (ou n'importe quel objet) dans les 3 HDV du joueur : Horde, Alliance, neutre.
async function availAll(rid) {
  const mh = myHouses(); const out = [];
  for (const f of ['horde', 'neutral', 'alliance']) {
    const hid = mh[f]; if (!hid) continue; const m = await market(hid).catch(() => null);
    const r = m && m.items[rid]; out.push({ f, hid, qty: r ? r[QTY] || 0 : 0, min: r ? r[MIN] : null, mkt: r ? r[MKT] : null });
  }
  return out;
}
async function fillRecipeAH(root) {
  if (!S.tt && root.querySelector('.rcah')) S.tt = (await load('tt').catch(() => null)) || {};
  for (const box of root.querySelectorAll('.rcah')) {
    const rid = Number(box.dataset.rid) || null;
    if (!rid) { box.innerHTML = `<p class="dim">${t('rah_noid')}</p>`; continue; }
    const tl = (typeof ttLines === 'function' ? ttLines(rid) : []).map(x => x[0]).join(' ');
    if (/Binds when picked up|Lié quand ramassé/i.test(tl)) { box.innerHTML = `<p>${t('rah_bop')}</p>`; continue; }
    const av = await availAll(rid); const on = av.filter(a => a.qty > 0);
    const FN = { horde: t('hs_horde'), alliance: t('hs_alliance'), neutral: t('hs_neutral') };
    const w = S.watch.find(x => x.id === rid && x.avail);
    let h = on.length
      ? `<p>${t('rah_found')}</p><ul class="vlist">${on.map(a => `<li><b>${FN[a.f]}</b> : ${money(a.min)} <span class="dim">(${a.qty} ${t('col_qty').toLowerCase()})</span>${a.f === 'alliance' ? ` <span class="dim">· ${t('rah_ally')}</span>` : a.f === 'neutral' ? ` <span class="dim">· ${t('rah_neutral')}</span>` : ''}</li>`).join('')}</ul>`
      : `<p>${t('rah_none_all')}</p>${av.some(a => a.mkt) ? `<p class="dim">${t('rah_last')} ${money(Math.min(...av.filter(a => a.mkt).map(a => a.mkt)))}</p>` : ''}`;
    h += `<button class="act small" data-avw="${rid}">${w ? t('rah_alert_on') : t('rah_alert')}</button>`;
    box.innerHTML = h;
    box.querySelector('[data-avw]').onclick = async () => {
      const i = S.watch.findIndex(x => x.id === rid && x.avail);
      if (i >= 0) S.watch.splice(i, 1); else {
        S.watch.push({ id: rid, buy: null, sell: null, avail: true, seen: on.length > 0 });
        try { if ('Notification' in window && Notification.permission === 'default') await Notification.requestPermission(); } catch (e) {}
      }
      store('hf_watch', JSON.stringify(S.watch)); renderNav(); fillRecipeAH(root);
    };
  }
}
// Alertes « disponible » : vérifiées à chaque chargement et toutes les 10 min, notification du navigateur si autorisée.
async function checkAvailAlerts() {
  const ws = S.watch.filter(w => w.avail); if (!ws.length || !S.meta) return [];
  const hits = [];
  for (const w of ws) {
    const on = (await availAll(w.id)).filter(a => a.qty > 0);
    if (on.length) { hits.push(w.id); if (!w.seen) { w.seen = true;
      try { if ('Notification' in window && Notification.permission === 'granted') new Notification('HDV Forever', { body: t('rah_notif', { n: itemName(w.id) }), icon: icon(w.id) }); } catch (e) {} } }
    else w.seen = false;
  }
  store('hf_watch', JSON.stringify(S.watch));
  return hits;
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
      const nm = r.nm || ci.rn || ''; const rid = r.id || itemByEn(nm);
      const wb = whereBlocks(r, 'rmap_' + rc.id);
      html += `<h3>${t('pr_recipe')} : ${rid ? `<a href="#/item/${rid}">${esc(rid ? itemName(rid) : nm)}</a>` : esc(nm)}</h3>
        <div class="rcah" data-rid="${rid || ''}" data-nm="${esc(nm)}"><p class="dim">${t('rah_loading')}</p></div>
        ${wb || `<div class="note">${t('rah_nosrc')} ${srcLinks(nm)}</div>`}`;
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
  const av = await checkAvailAlerts();
  return S.watch.filter(w => { if (w.avail) return av.includes(w.id); const r = m.items[w.id]; if (!r) return false; return (w.buy && r[MIN] && r[MIN] <= w.buy) || (w.sell && r[MKT] && r[MKT] >= w.sell); }).length;
}
async function viewWatch() {
  const m = await market(viewHouseId()) || { items: {} };
  app().innerHTML = `<div class="hero"><h1>${t('watch_title')}</h1><p>${t('watch_sub')}</p></div><div class="panel" id="list"></div>`;
  if (!S.watch.length) { $('#list').innerHTML = `<p class="muted">${t('watch_empty')}</p>`; return; }
  $('#list').innerHTML = `<div class="tablewrap"><table><thead><tr><th class="l">${t('col_item')}</th><th>${t('col_min')}</th><th>${t('col_mkt')}</th><th>${t('col_pd')}</th><th>${t('watch_buy')}</th><th>${t('watch_sell')}</th><th>${t('watch_alert')}</th><th></th></tr></thead><tbody>${S.watch.map((w, i) => {
    const r = m.items[w.id] || []; const a = w.avail ? (w.seen ? `<span class="badge good">${t('rah_badge_on')}</span>` : `<span class="dim small">${t('rah_badge_wait')}</span>`) : (w.buy && r[MIN] && r[MIN] <= w.buy) ? `<span class="badge good">${t('watch_buy')}</span>` : (w.sell && r[MKT] && r[MKT] >= w.sell) ? `<span class="badge warn">${t('watch_sell')}</span>` : '';
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
// Territoire de chaque zone (Classic) : h = Horde, a = Alliance, le reste est contesté (les deux factions, sans gardes d'un seul camp partout).
const ZONE_SIDE = {
  Durotar: 'h', Mulgore: 'h', 'The Barrens': 'h', 'Tirisfal Glades': 'h', 'Silverpine Forest': 'h', Orgrimmar: 'h', 'Thunder Bluff': 'h', Undercity: 'h',
  'Elwynn Forest': 'a', Westfall: 'a', 'Redridge Mountains': 'a', Duskwood: 'a', 'Dun Morogh': 'a', 'Loch Modan': 'a', Teldrassil: 'a', Darkshore: 'a',
  Wetlands: 'a', 'Stormwind City': 'a', Ironforge: 'a', Darnassus: 'a',
};
const zoneSide = z => ZONE_SIDE[z] || 'c';
// Où je veux farmer : 'h' (Horde + contesté), 'a' (Alliance + contesté) ou 'all'.
function farmSide() { const v = store('hf_fside'); return v === 'a' || v === 'all' ? v : 'h'; }
const sideOk = z => { const f = farmSide(); return f === 'all' || zoneSide(z) === 'c' || zoneSide(z) === f; };
const sideRank = z => { const f = farmSide(), sd = zoneSide(z); return f === 'all' ? 0 : sd === f ? 0 : sd === 'c' ? 1 : 2; };
function zoneTag(z) {
  const sd = zoneSide(z);
  return `<span class="ztag z${sd}" title="${t('zs_' + sd)}">${sd === 'h' ? 'H' : sd === 'a' ? 'A' : '⚔'}</span>`;
}
function sideBar() {
  const f = farmSide();
  return `<div class="row sidebar"><span class="small muted">${t('fs_label')}</span>${['h', 'all', 'a'].map(k => `<button type="button" class="chip small ${f === k ? 'on' : ''}" data-fside="${k}">${t('fs_' + k)}</button>`).join('')}</div>`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-fside]'); if (!b) return;
  e.preventDefault(); store('hf_fside', b.dataset.fside);
  const gps = document.getElementById('gps');
  if (gps && gps.style.display !== 'none' && gps._redraw) gps._redraw(); else route();
});
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
      ${v[4] != null ? `<a href="#" class="vgps" data-vg="${esc(JSON.stringify([v[3], v[4], v[5], v[0]]))}" title="${t('gps_click')}"><b>${esc(v[0])}</b> 🧭</a>` : `<b>${esc(v[0])}</b>`} ${v[1] ? `<span class="badge ${v[1] === 'h' ? 'bad' : 'info'}">${SIDE[v[1]]}</span>` : `<span class="badge">${t('ht_neutral')}</span>`}
      ${v[2] ? `<span class="dim">&lt;${esc(v[2])}&gt;</span>` : ''}<br>
      ${zoneName(v[3])} ${wayBtn(v[4], v[5])} · ${money(v[6])}${v[7] ? ` · <span class="dim">${t('ht_limited')}</span>` : ''}</li>`).join('')}</ul>
      ${(f.vn || 0) > vs.length ? `<p class="note">${t('ht_more_vendors').replace('{n}', f.vn - vs.length)}</p>` : ''}`);
  }
  if (f.m && f.m.length) {
    const zs = m => (m[7] && m[7].length ? m[7] : [m[3]]);
    const okm = f.m.filter(m => zs(m).some(sideOk)), hid = f.m.length - okm.length;
    const list = (okm.length ? okm : f.m).slice(0, 12);
    blocks.push(`<h3>${t('ht_mobs')}</h3>${sideBar()}<div class="tablewrap"><table class="t"><thead><tr><th>${t('ht_mob')}</th><th>${t('lvl_s')}</th><th>${t('ht_zone')}</th><th class="r">${t('ht_rate')}</th></tr></thead><tbody>
      ${list.map(m => `<tr><td>${mobLink(m[0], m[6])}</td><td>${m[1] ?? ''}${m[2] && m[2] !== m[1] ? '–' + m[2] : ''}</td><td>${[...zs(m)].sort((a, b) => sideRank(a) - sideRank(b)).map(z => `${zoneTag(z)} ${zoneName(z)}`).join(', ')}</td><td class="r"><b>${pctTxt(m[4])}</b>${m[5] ? ' <span class="dim">×' + m[5] + '</span>' : ''}</td></tr>`).join('')}
      </tbody></table></div>
      ${!okm.length ? `<p class="note warn">${t('fs_none')}</p>` : hid ? `<p class="note">${t('fs_hidden', { n: hid })}</p>` : ''}`);
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
  const order = f.p.map((m, i) => i).sort((a, b) => sideRank(f.p[a][1]) - sideRank(f.p[b][1]) || f.p[b][3].length - f.p[a][3].length);
  let cur = order[0]; const hidden = new Set();
  const render = () => {
    const [mid, zone, names, pins] = f.p[cur];
    box.innerHTML = `${f.p.length > 1 ? `<div class="row" style="margin-bottom:8px">${order.map(i => { const m = f.p[i]; return `<button class="chip ${i === cur ? 'on' : ''} ${sideOk(m[1]) ? '' : 'off-side'}" data-z="${i}">${zoneTag(m[1])} ${zoneName(m[1])} <span class="dim">${m[3].length}</span></button>`; }).join('')}</div>` : `<p class="muted">${zoneTag(zone)} ${zoneName(zone)}</p>`}
      ${!sideOk(zone) ? `<p class="note warn">${t('fs_enemy', { z: zoneName(zone) })}</p>` : ''}
      ${REDRAWN.has(zone) ? `<p class="note">${t('gps_redrawn')}</p>` : ''}
      <div class="wmap"><img src="maps/z_${zoneSlug(zone)}.jpg" alt="${esc(zoneName(zone))}" onerror="this.parentNode.classList.add('nomap')">
      ${pins.map((p, pi) => hidden.has(p[2]) ? '' : `<span class="pin${names[p[2]][1] === 'v' ? ' big' : ''}" style="left:${p[0]}%;top:${p[1]}%;background:${PIN_COLORS[p[2] % PIN_COLORS.length]}" data-gps="${pi}" title="${esc(names[p[2]][0])} (${p[0]}, ${p[1]}) · ${t('gps_click')}"></span>`).join('')}
      <div class="nomapmsg">${t('ht_nomap')}</div></div>
      <div class="row legend">${names.map((n, i) => `<button class="chip ${hidden.has(i) ? '' : 'on'}" data-l="${i}"><span class="dot" style="background:${PIN_COLORS[i % PIN_COLORS.length]}"></span>${esc(n[0])} <span class="dim">${t('kind_' + n[1]) || ''}</span></button>`).join('')}</div>
      <p class="note">${t('ht_map_help')}</p>`;
    box.querySelectorAll('[data-z]').forEach(b => b.onclick = () => { cur = +b.dataset.z; hidden.clear(); render(); });
    box.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { const i = +b.dataset.l; hidden.has(i) ? hidden.delete(i) : hidden.add(i); render(); });
    box.querySelectorAll('[data-gps]').forEach(el => el.onclick = e => { e.preventDefault(); e.stopPropagation(); openGps(f.p[cur], pins[+el.dataset.gps]); });
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
document.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('[data-vg]'); if (!a) return;
  e.preventDefault(); const [zone, x, y, name] = JSON.parse(a.dataset.vg);
  openGps([null, zone, [[name, 'v']], [[x, y, 0]]], [x, y, 0]);
});
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

// ------------------------------------------------------------------ GPS (itinéraire)
// Le calcul du trajet est confié à Travelcraft (planificateur WoW Forever : vols mesurés dans Forever,
// zeppelins, bateaux, routes tracées à la main). On lui passe le départ et la zone d'arrivée,
// puis on guide le dernier bout dans la zone avec la carte et la commande /way.
const GPS_TOWNS = {"Durotar": [["Orgrimmar", 45.5, 10.5], ["Tours de zeppelin d'Orgrimmar", 50.8, 13.8], ["Tranchecolline", 52.0, 41.6], ["Village de Sen'jin", 55.5, 74.0]], "Orgrimmar": [["Orgrimmar", 45.3, 63.7]], "Tirisfal Glades": [["Brill", 61.0, 52.4], ["Tours de zeppelin d'Undercity", 60.7, 58.8], ["Undercity", 61.8, 70.0]], "Undercity": [["Undercity", 63.1, 48.3]], "Mulgore": [["Village de Sabot-de-Sang", 47.5, 58.5], ["Thunder Bluff", 37.0, 30.0]], "Thunder Bluff": [["Thunder Bluff", 46.6, 50.0]], "The Barrens": [["La Croisée", 51.5, 30.4], ["Cabestan", 63.1, 37.1], ["Camp Taurajo", 44.5, 59.1]], "Stranglethorn Vale": [["Camp de base de Grom'gol", 32.5, 29.3], ["Baie-du-Butin", 26.8, 77.0]], "Hillsbrad Foothills": [["Moulin-de-Tarren", 60.2, 18.8]], "Arathi Highlands": [["Trépas-d'Orgrim", 73.1, 32.6]], "Badlands": [["Kargath", 4.1, 44.9]], "Swamp of Sorrows": [["Pierrêche", 46.1, 54.7]], "The Hinterlands": [["Village de Revantusk", 81.7, 81.9]], "Ashenvale": [["Poste de Bois-Brisé", 73.3, 61.7], ["Avant-poste de Zoram'gar", 12.2, 33.8], ["Astranaar", 34.5, 48.0]], "Stonetalon Mountains": [["Retraite de Roche-Soleil", 45.2, 59.9], ["Pic des Serres-Rocheuses", 36.5, 7.2]], "Desolace": [["Village de Proie-de-l'Ombre", 21.6, 74.0], ["Pointe de Nijel", 64.7, 10.4]], "Thousand Needles": [["Poste de Librevent", 45.0, 49.1]], "Dustwallow Marsh": [["Village de Fougerelle", 35.6, 31.8], ["Île de Theramore", 67.5, 51.2]], "Feralas": [["Camp Mojache", 75.4, 44.3], ["Bastion de Plume-de-lune", 30.3, 43.3]], "Tanaris": [["Gadgetzan", 51.6, 25.5]], "Azshara": [["Valormok", 22.0, 49.7], ["Pointe Talrendis", 11.9, 77.5]], "Felwood": [["Poste de Sang-Venin", 34.4, 53.9], ["Clairière de Serre-Branche", 62.5, 24.2]], "Un'Goro Crater": [["Refuge de Marshal", 45.3, 6.0]], "Silithus": [["Fort Cénarien", 50.7, 34.6]], "Winterspring": [["Long-Guet", 60.5, 36.3]], "Silverpine Forest": [["Le Sépulcre", 45.6, 42.4]], "Searing Gorge": [["Pointe du Thorium", 37.9, 30.4]], "Burning Steppes": [["Crête-de-Flammes", 65.6, 24.2]], "Moonglade": [["Havrenuit", 44.3, 45.3]], "Eastern Plaguelands": [["Chapelle de l'Espoir de Lumière", 70.4, 47.6]], "Western Plaguelands": [["Camp de Vent-Glacial", 42.9, 85.0]], "Darkshore": [["Auberdine", 36.4, 45.6]], "Wetlands": [["Port de Menethil", 9.5, 59.7]], "Westfall": [["Colline des Sentinelles", 56.6, 52.7]], "Duskwood": [["Sombre-Comté", 77.6, 44.4]], "Redridge Mountains": [["Comté-du-Lac", 25.3, 59.0]], "Loch Modan": [["Thelsamar", 33.9, 50.8]], "Elwynn Forest": [["Comté-de-l'Or", 42.0, 65.0]], "Blasted Lands": [["Donjon de Garde-Néant", 65.5, 24.4]]};
const GPS_PLACES = ["Orgrimmar", "Tours de zeppelin d'Orgrimmar", "Undercity", "Tours de zeppelin d'Undercity", "Thunder Bluff", "Camp de base de Grom'gol", "Brill", "Le Sépulcre", "Moulin-de-Tarren", "Trépas-d'Orgrim", "Kargath", "Pierrêche", "Village de Revantusk", "La Croisée", "Camp Taurajo", "Tranchecolline", "Village de Sen'jin", "Cabestan", "Baie-du-Butin", "Poste de Bois-Brisé", "Pic des Serres-Rocheuses", "Village de Proie-de-l'Ombre", "Poste de Librevent", "Camp Mojache", "Village de Fougerelle", "Gadgetzan", "Poste de Sang-Venin", "Valormok", "Avant-poste de Zoram'gar", "Village de Sabot-de-Sang", "Refuge de Marshal", "Fort Cénarien", "Long-Guet", "Chapelle de l'Espoir de Lumière", "Durotar", "Les Tarides", "Mulgore", "Clairières de Tirisfal", "Forêt des Pins argentés", "Contreforts d'Hillsbrad", "Montagnes d'Alterac", "Hautes-terres d'Arathi", "Vallée de Strangleronce", "Mille pointes", "Les Serres-Rocheuses", "Ashenvale", "Désolace", "Marécage d'Âprefange", "Terres ingrates", "Marais des Chagrins", "Feralas", "Tanaris", "Les Hinterlands", "Azshara", "Terres foudroyées", "Cratère d'Un'Goro", "Gangrebois", "Gorge des Vents brûlants", "Steppes ardentes", "Maleterres de l'ouest", "Maleterres de l'est", "Berceau-de-l'Hiver", "Silithus", "Les Paluns", "Bois de la Pénombre", "Les Carmines", "Marche de l'Ouest", "Forêt d'Elwynn", "Loch Modan", "Dun Morogh", "Sombrivage", "Riverglades", "Mont Hyjal", "Défilé de Deuillevent"];
const zoneSlug = z => String(z || '').toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const REDRAWN = new Set(['Alterac Mountains', 'Eastern Plaguelands', 'Redridge Mountains', 'Stormwind City', 'Tirisfal Glades', 'Desolace', 'Mulgore']);
function gpsPrefs() { try { return JSON.parse(store('hf_gps') || '{}'); } catch (e) { return {}; } }
function dirWord(dx, dy) {
  const a = (Math.atan2(-dy, dx) * 180 / Math.PI + 360) % 360;
  const fr = ['à l’est', 'au nord-est', 'au nord', 'au nord-ouest', 'à l’ouest', 'au sud-ouest', 'au sud', 'au sud-est'];
  const en = ['east', 'north-east', 'north', 'north-west', 'west', 'south-west', 'south', 'south-east'];
  return (S.lang === 'fr' ? fr : en)[Math.round(a / 45) % 8];
}
function openGps(mapEntry, pin) {
  const [, zone, names] = mapEntry; const [x, y, ni] = pin;
  const p = gpsPrefs();
  let ov = $('#gps'); if (!ov) { ov = document.createElement('div'); ov.id = 'gps'; document.body.appendChild(ov); }
  const way = `/way ${x} ${y}`;
  ov.innerHTML = `<div class="gps-box">
    <div class="gps-head">
      <div class="gps-dest">🧭 <b>${esc(names[ni][0])}</b> · ${zoneName(zone)} <button class="way" id="gpsWay" title="${t('gps_way_help')}">/way ${x} ${y} 📋</button></div>
      <label>${t('gps_from')} <input id="gpsFrom" list="gpsPlaces" value="${esc(p.from || 'Orgrimmar')}" placeholder="Orgrimmar, Brill…"></label>
      <label>${t('gps_speed')} <select id="gpsBy">${[['foot', t('gps_foot')], ['m60', t('gps_m60')], ['m100', t('gps_m100')]].map(([v, l]) => `<option value="${v}" ${p.by === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
      <label class="chk"><input type="checkbox" id="gpsFp" ${p.fp !== false ? 'checked' : ''}> ${t('gps_fp')}</label>
      <button class="act big" id="gpsPick">📍 ${t('gps_pick')}</button>
      <button class="act big" id="gpsGo">${t('gps_go')}</button>
      <button class="act big" id="gpsClose" title="Échap">✕</button>
    </div>
    <datalist id="gpsPlaces">${GPS_PLACES.map(n => `<option value="${esc(n)}">`).join('')}</datalist>
    <div class="gps-body">
      <div class="gps-route" id="gpsOut"></div>
      <div class="gps-side">
        <div id="gpsPicker" style="display:none"><h3>📍 ${t('gps_pick_title')}</h3>
          <label>${t('gps_pick_zone')} <select id="gpsZone">${Object.keys(GPS_TOWNS).sort((a, b) => zoneName(a).localeCompare(zoneName(b))).map(z => `<option value="${esc(z)}" ${p.zone === z ? 'selected' : ''}>${zoneName(z)}</option>`).join('')}</select></label>
          <div class="wmap gps-map pick" id="gpsPickMap"></div><p class="note" id="gpsPickNote">${t('gps_pick_help')}</p><hr></div>
        <h3>${t('gps_last', { z: zoneName(zone) })}</h3>
        ${REDRAWN.has(zone) ? `<p class="note">${t('gps_redrawn')}</p>` : ''}
        <div class="wmap gps-map"><img src="maps/z_${zoneSlug(zone)}.jpg" alt="" onerror="this.parentNode.classList.add('nomap')">
          <span class="pin target" style="left:${x}%;top:${y}%"></span><div class="nomapmsg">${t('ht_nomap')}</div></div>
        <p>${t('gps_last_help', { way })}</p>
        <p class="note">${t('gps_src')} <a id="gpsOpen" href="#" target="_blank" rel="noopener">${t('gps_open')}</a></p>
      </div>
    </div>
  </div>`;
  ov.style.display = 'flex';
  const close = () => { ov.style.display = 'none'; ov.innerHTML = ''; document.body.style.overflow = ''; document.removeEventListener('keydown', esc_); };
  const esc_ = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', esc_); document.body.style.overflow = 'hidden';
  $('#gpsClose').onclick = close; ov.onclick = e => { if (e.target === ov) close(); };
  $('#gpsWay').onclick = () => (navigator.clipboard ? navigator.clipboard.writeText(way) : Promise.reject()).then(() => toast(t('copied') + ' ' + way), () => toast(way));
  const go = () => {
    const from = $('#gpsFrom').value.trim() || 'Orgrimmar', by = $('#gpsBy').value, fp = $('#gpsFp').checked;
    store('hf_gps', JSON.stringify({ ...gpsPrefs(), from, by, fp }));
    const q = new URLSearchParams({ from, to: zone, f: 'horde', by }); if (fp) q.set('fp', '1');
    const url = `https://wow-travelcraft.com/${S.lang === 'fr' ? 'fr/' : ''}#${q}`;
    $('#gpsOut').innerHTML = `<iframe class="gps-frame" src="${url}" title="Travelcraft"></iframe>`;
    $('#gpsOpen').href = url;
  };
  $('#gpsGo').onclick = go;
  const drawPick = () => {
    const z = $('#gpsZone').value, me = gpsPrefs().me;
    $('#gpsPickMap').innerHTML = `<img src="maps/z_${zoneSlug(z)}.jpg" alt="" onerror="this.parentNode.classList.add('nomap')"><div class="nomapmsg">${t('ht_nomap')}</div>
      ${(GPS_TOWNS[z] || []).map(([n, tx, ty]) => `<span class="town" style="left:${tx}%;top:${ty}%" title="${esc(n)}"></span>`).join('')}
      ${me && me.zone === z ? `<span class="pin me" style="left:${me.x}%;top:${me.y}%"></span>` : ''}`;
  };
  $('#gpsPick').onclick = () => { const el = $('#gpsPicker'); el.style.display = el.style.display === 'none' ? '' : 'none'; drawPick(); el.scrollIntoView({ block: 'nearest' }); };
  $('#gpsZone').onchange = drawPick;
  $('#gpsPickMap').onclick = e => {
    const z = $('#gpsZone').value; const [mx, my] = mapPct(e.currentTarget, e);
    // Point de départ = le lieu connu le plus proche (ville, maître de vol, zeppelin) ; sinon la zone elle-même.
    let best = null;
    for (const [n, tx, ty] of GPS_TOWNS[z] || []) { const d = Math.hypot(tx - mx, ty - my); if (!best || d < best.d) best = { n, d }; }
    const from = best && best.d <= 18 ? best.n : z;
    const pr = gpsPrefs(); pr.zone = z; pr.me = { zone: z, x: mx, y: my }; pr.from = from; store('hf_gps', JSON.stringify(pr));
    $('#gpsFrom').value = from;
    $('#gpsPickNote').innerHTML = best && best.d <= 18 ? t('gps_pick_near', { n: esc(best.n) }) : t('gps_pick_zone_only', { z: zoneName(z) });
    drawPick(); go();
  };
  $('#gpsFrom').onkeydown = e => { if (e.key === 'Enter') go(); };
  go();
}

// ------------------------------------------------------------------ routes de farm
// Matériaux « Scarce » de Forever : pas de point de récolte, ils tombent en bonus sur d'autres nœuds.
// Sources : wow-professions.com, expcarry.com, conquestcapped.com, warcraft.wiki.gg (novembre 2026).
const SCARCE = {
  'Frilled Lichen': { src: [2449, 785, 2450], maybe: [3820, 2453], note: 'scarce_lichen' },
  'Rosecap': { src: [3356, 3818, 3821], maybe: [], note: 'scarce_rosecap' },
  'Pyrite': { src: [2770, 2771, 2772], maybe: [], note: 'scarce_pyrite' },
  'Bauxite': { src: [2776, 3858], maybe: [], note: 'scarce_bauxite' },
};
const ROUTE_SKIP = /Crate|Chest|Strongbox|Trunk|\bBox\b|Cache|Barrel|Footlocker|Coffer/i;
const ROUTE_COLORS = ['#ffd23f', '#4dd2ff', '#7dff6b', '#ff8cf0', '#ff9a3c', '#b18cff'];
const MAP_ASPECT = 1002 / 668;
const rdist = (a, b) => Math.hypot((a.x - b.x) * MAP_ASPECT, a.y - b.y);

function routeSources(id) {
  const en = (S.items[id] && S.items[id].n && S.items[id].n.en) || '';
  const sc = SCARCE[en];
  if (sc) return { ids: sc.src, maybe: sc.maybe, note: sc.note };
  return { ids: [id], maybe: [], note: null };
}
// Points par zone pour une liste de sources.
function routePoints(ids) {
  const zones = {};
  ids.forEach((sid, si) => {
    const f = S.farm && S.farm[sid]; if (!f || !f.p) return;
    // Si la ressource a des nœuds de récolte quelque part, on ne garde que les nœuds (pas les monstres qui
    // en lâchent par hasard). Sinon, on suit les apparitions des monstres qui la lâchent souvent (≥ 10 %).
    const hasNodes = f.p.some(m => m[2].some(n => n[1] === 'o' && !ROUTE_SKIP.test(n[0])));
    const goodMobs = new Set((f.m || []).filter(m => m[4] >= 10).map(m => m[0]));
    for (const [, zone, names, pins] of f.p) {
      for (const [x, y, ni] of pins) {
        const [nm, kind] = names[ni];
        if (ROUTE_SKIP.test(nm)) continue;
        if (hasNodes ? kind !== 'o' : !(kind === 'd' && goodMobs.has(nm))) continue;
        (zones[zone] = zones[zone] || []).push({ x, y, src: sid, si, nm });
      }
    }
  });
  return zones;
}
// Regroupe les points très proches (un seul passage pour plusieurs points voisins).
function routeCluster(pts, r = 1.6) {
  const out = [];
  for (const p of pts) {
    const c = out.find(q => rdist(q, p) < r);
    if (c) { c.n++; c.x = (c.x * (c.n - 1) + p.x) / c.n; c.y = (c.y * (c.n - 1) + p.y) / c.n; c.srcs.add(p.si); }
    else out.push({ x: p.x, y: p.y, n: 1, srcs: new Set([p.si]), nm: p.nm });
  }
  out.forEach(c => { c.x = Math.round(c.x * 10) / 10; c.y = Math.round(c.y * 10) / 10; });
  return out;
}
function tourLen(t) { let s = 0; for (let i = 0; i < t.length; i++) s += rdist(t[i], t[(i + 1) % t.length]); return s; }
// Boucle la plus courte : plus proche voisin depuis le départ, puis 2-opt (supprime les croisements), puis or-opt.
function routeSolve(pts, start) {
  if (pts.length < 2) return pts.slice();
  let cur = start ? pts.reduce((b, p) => rdist(p, start) < rdist(b, start) ? p : b, pts[0]) : pts[0];
  const left = new Set(pts); const tour = [];
  while (left.size) { tour.push(cur); left.delete(cur); let nx = null, nd = Infinity; for (const p of left) { const d = rdist(cur, p); if (d < nd) { nd = d; nx = p; } } cur = nx; if (!cur) break; }
  const n = tour.length; let improved = true, guard = 0;
  while (improved && guard++ < 60) {
    improved = false;
    for (let i = 0; i < n - 1; i++) for (let k = i + 2; k < n; k++) {
      const a = tour[i], b = tour[i + 1], c = tour[k], d = tour[(k + 1) % n];
      if (a === d) continue;
      if (rdist(a, c) + rdist(b, d) < rdist(a, b) + rdist(c, d) - 1e-9) {
        for (let lo = i + 1, hi = k; lo < hi; lo++, hi--) [tour[lo], tour[hi]] = [tour[hi], tour[lo]];
        improved = true;
      }
    }
    // or-opt : déplacer un point ailleurs si ça raccourcit
    for (let i = 0; i < tour.length && tour.length > 3; i++) {
      const p = tour[i], prev = tour[(i - 1 + tour.length) % tour.length], next = tour[(i + 1) % tour.length];
      const gain = rdist(prev, p) + rdist(p, next) - rdist(prev, next);
      let best = null, bestCost = gain - 1e-9;
      for (let j = 0; j < tour.length; j++) {
        const u = tour[j], v = tour[(j + 1) % tour.length]; if (u === p || v === p) continue;
        const cost = rdist(u, p) + rdist(p, v) - rdist(u, v); if (cost < bestCost) { bestCost = cost; best = j; }
      }
      if (best != null) { const u = tour[best]; tour.splice(i, 1); tour.splice(tour.indexOf(u) + 1, 0, p); improved = true; }
    }
  }
  if (start) { const s = tour.reduce((b, p) => rdist(p, start) < rdist(b, start) ? p : b, tour[0]); const k = tour.indexOf(s); return tour.slice(k).concat(tour.slice(0, k)); }
  return tour;
}
// Villes Alliance : jamais proposées comme départ d'une route (le site est réglé pour la Horde).
const ALLIANCE_TOWNS = new Set(['Colline des Sentinelles', 'Sombre-Comté', 'Comté-du-Lac', 'Thelsamar', "Comté-de-l'Or", 'Port de Menethil', 'Auberdine',
  'Astranaar', 'Pointe de Nijel', 'Île de Theramore', 'Bastion de Plume-de-lune', 'Pointe Talrendis', 'Clairière de Serre-Branche', 'Camp de Vent-Glacial', 'Donjon de Garde-Néant']);
// Départ : la ville / le maître de vol Horde ou neutre le plus proche du centre des points.
function zoneStart(zone, pts) {
  const towns = ((typeof GPS_TOWNS !== 'undefined' && GPS_TOWNS[zone]) || []).filter(w => !ALLIANCE_TOWNS.has(w[0]));
  if (!towns.length) return null;
  const c = pts && pts.length ? { x: pts.reduce((s, p) => s + p.x, 0) / pts.length, y: pts.reduce((s, p) => s + p.y, 0) / pts.length } : { x: 50, y: 50 };
  const tw = towns.reduce((b, w) => rdist({ x: w[1], y: w[2] }, c) < rdist({ x: b[1], y: b[2] }, c) ? w : b, towns[0]);
  return { name: tw[0], x: tw[1], y: tw[2] };
}
function routeAvailable(id) { const rs = routeSources(id); return Object.keys(routePoints(rs.ids.concat(rs.maybe))).length > 0; }
// Distance d'un point à la route (segments), dans la même unité que rdist.
function distToPath(p, path) {
  let best = Infinity;
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i], b = path[i + 1];
    const ax = a.x * MAP_ASPECT, ay = a.y, bx = b.x * MAP_ASPECT, by = b.y, px = p.x * MAP_ASPECT, py = p.y;
    const dx = bx - ax, dy = by - ay, L = dx * dx + dy * dy;
    const tt = L ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L)) : 0;
    best = Math.min(best, Math.hypot(px - (ax + tt * dx), py - (ay + tt * dy)));
  }
  return best;
}
const NEAR_ROUTE = 3; // ≈ 3 % de la carte de chaque côté du chemin
// Autres ressources qui ont des points le long de la route, classées par valeur (prix HDV × nombre de points).
function routeExtras(zone, path, exclude, mk) {
  const out = [];
  for (const k of Object.keys(S.farm || {})) {
    const sid = Number(k); if (exclude.includes(sid) || !S.items[sid]) continue;
    const pts = (routePoints([sid])[zone]) || []; if (!pts.length) continue;
    const near = routeCluster(pts.filter(p => distToPath(p, path) <= NEAR_ROUTE));
    if (!near.length) continue;
    const fi = farmInfo(sid); const r = mk && mk.items[sid]; const price = r ? r[MKT] : null;
    out.push({ sid, n: near.length, price, value: (price || 0) * near.length, pd: r ? r[PD] : null, tooHigh: !!(fi && fi.tooHigh), kind: fi && fi.kind });
  }
  return out.sort((a, b) => (a.tooHigh - b.tooHigh) || (b.value - a.value) || (b.n - a.n)).slice(0, 8);
}
function openRoute(id, mk) {
  const rs = routeSources(id);
  let useMaybe = false, cur = null; const excluded = new Set(); const added = new Set();
  let ov = $('#gps'); if (!ov) { ov = document.createElement('div'); ov.id = 'gps'; document.body.appendChild(ov); }
  const close = () => { ov.style.display = 'none'; ov.innerHTML = ''; document.body.style.overflow = ''; document.removeEventListener('keydown', esc_); };
  const esc_ = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', esc_); document.body.style.overflow = 'hidden';
  ov._redraw = () => render();
  const render = () => {
    const all = (useMaybe ? rs.ids.concat(rs.maybe) : rs.ids).concat([...added]);
    // On retire les sources que ta compétence ne permet pas encore de récolter.
    const tooHigh = all.filter(s => { const fi = farmInfo(s); return fi && fi.tooHigh; });
    const ids = all.filter(s => !tooHigh.includes(s));
    const zones = routePoints(ids);
    if (ov._side !== farmSide()) { ov._side = farmSide(); cur = null; }
    const ranked = Object.entries(zones).map(([z, pts]) => [z, routeCluster(pts)]).sort((a, b) => sideRank(a[0]) - sideRank(b[0]) || b[1].length - a[1].length);
    if (!cur || !zones[cur]) cur = ranked.length ? ranked[0][0] : null;
    const srcNames = ids.map(s => itemName(s));
    const warn = tooHigh.map(s => { const fi = farmInfo(s); return itemName(s) + ' (' + t('sk_' + fi.kind) + ' ' + fi.skill + ')'; });
    let body = '';
    if (!cur) body = `<p class="muted" style="padding:16px">${t('rt_none')}</p>`;
    else {
      const clusters = ranked.find(r => r[0] === cur)[1].filter(c => !excluded.has(c.x + ',' + c.y));
      const st = zoneStart(cur, clusters);
      const startPt = st ? { x: st.x, y: st.y } : null;
      // Le départ fait partie de la boucle pendant l'optimisation (sinon les segments vers lui peuvent se croiser).
      let tour;
      if (startPt && clusters.length) { const sp = { x: startPt.x, y: startPt.y, isStart: true }; const tt = routeSolve(clusters.concat([sp]), null); const k = tt.indexOf(sp); tour = tt.slice(k + 1).concat(tt.slice(0, k)); }
      else tour = routeSolve(clusters, null);
      const naive = tourLen(clusters), opt = tourLen(tour);
      const pathPts = startPt ? [startPt].concat(tour, [startPt]) : tour.concat(tour.length ? [tour[0]] : []);
      const extras = routeExtras(cur, pathPts, ids.concat(tooHigh), mk);
      const bonus = Object.entries(SCARCE).filter(([en, sc]) => en !== (S.items[id].n || {}).en && sc.src.some(x => ids.includes(x)))
        .map(([en]) => Object.keys(S.items).find(k => S.items[k].n && S.items[k].n.en === en)).filter(Boolean);
      const path = startPt ? [startPt].concat(tour, [startPt]) : tour.concat(tour.length ? [tour[0]] : []);
      body = `<div class="gps-body"><div class="gps-route rt-mapcol">
        <div class="row" style="padding:8px 12px;gap:8px">${ranked.map(([z, c]) => `<button class="chip ${z === cur ? 'on' : ''} ${sideOk(z) ? '' : 'off-side'}" data-rz="${esc(z)}">${zoneTag(z)} ${zoneName(z)} <span class="dim">${c.length}</span></button>`).join('')}</div>
        <div style="padding:0 12px">${sideBar()}${cur && !sideOk(cur) ? `<p class="note warn">${t('fs_enemy', { z: zoneName(cur) })}</p>` : ''}</div>
        <div class="wmap rt-map"><img src="maps/z_${zoneSlug(cur)}.jpg" alt="" onerror="this.parentNode.classList.add('nomap')"><div class="nomapmsg">${t('ht_nomap')}</div>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="${path.map(p => p.x + ',' + p.y).join(' ')}" fill="none" stroke="#000" stroke-opacity=".75" vector-effect="non-scaling-stroke" class="rl-out" stroke-linejoin="round"/><polyline points="${path.map(p => p.x + ',' + p.y).join(' ')}" fill="none" stroke="#ffd23f" vector-effect="non-scaling-stroke" class="rl-in" stroke-linejoin="round"/></svg>
          ${st ? `<span class="pin start" style="left:${st.x}%;top:${st.y}%" title="${esc(st.name)}">▶</span>` : ''}
          ${tour.map((c, i) => `<span class="rpt" data-rx="${c.x},${c.y}" style="left:${c.x}%;top:${c.y}%;background:${ROUTE_COLORS[[...c.srcs][0] % ROUTE_COLORS.length]}" title="${i + 1}. ${esc(c.nm)} (${c.x}, ${c.y})${c.n > 1 ? ' ×' + c.n : ''} · ${t('rt_click_skip')}">${i + 1}</span>`).join('')}
          ${[...excluded].filter(k => ranked.find(r => r[0] === cur)[1].some(c => c.x + ',' + c.y === k)).map(k => { const [x, y] = k.split(','); return `<span class="rpt off" data-rx="${k}" style="left:${x}%;top:${y}%" title="${t('rt_click_back')}">✕</span>`; }).join('')}
        </div></div>
        <div class="gps-side">
          <h3>${t('rt_summary')}</h3>
          <p>${t('rt_points', { n: tour.length, z: zoneName(cur) })}${excluded.size ? ' · ' + t('rt_skipped', { n: excluded.size }) : ''}</p>
          <p>${t('rt_gain', { p: naive > 0 ? Math.round((1 - opt / naive) * 100) : 0 })}</p>
          ${st ? `<p>${t('rt_start', { s: esc(st.name) })} <button class="act" id="rtGps">🧭 ${t('rt_go_start')}</button></p>` : `<p class="note">${t('rt_no_town')}</p>`}
          <div class="row legend">${ids.map((s, i) => `<span class="chip on"><span class="dot" style="background:${ROUTE_COLORS[i % ROUTE_COLORS.length]}"></span>${esc(srcNames[i])}</span>`).join('')}</div>
          ${warn.length ? `<p class="note">⚠ ${t('rt_skill_warn')} ${warn.map(esc).join(', ')}</p>` : ''}
          <h3>${t('rt_extra_title')}</h3>
          ${bonus.length ? `<p>✨ ${t('rt_bonus')} ${bonus.map(b => `<a href="#/item/${b}">${esc(itemName(+b))}</a>`).join(', ')}</p>` : ''}
          ${(extras.length || added.size) ? `<ul class="vlist rt-extra">${[...added].map(a => ({ sid: a, n: (routeCluster((routePoints([a])[cur]) || [])).length, price: mk && mk.items[a] ? mk.items[a][MKT] : null, pd: mk && mk.items[a] ? mk.items[a][PD] : null, tooHigh: false })).concat(extras).map(x => `<li class="${x.tooHigh ? 'dim' : ''}"><label><input type="checkbox" data-add="${x.sid}" ${added.has(x.sid) ? 'checked' : ''} ${x.tooHigh ? 'disabled' : ''}>
              <b>${esc(itemName(x.sid))}</b></label> · ${t('rt_extra_n', { n: x.n })}${x.price ? ` · ${money(x.price)} ${t('rt_each')}` : ''}${x.pd ? ` · ${num(x.pd)} ${t('rt_sold_day')}` : ''}
              ${x.tooHigh ? `<br><span class="small">${t('rt_extra_skill')}</span>` : ''}</li>`).join('')}</ul><p class="note">${t('rt_extra_help')}</p>`
            : `<p class="muted">${t('rt_extra_none')}</p>`}
          <p class="note">${t('rt_help')}</p>
          <p class="note">${t('rt_limits')}</p>
        </div></div>`;
    }
    ov.innerHTML = `<div class="gps-box">
      <div class="gps-head"><div class="gps-dest">🗺️ <b>${t('rt_title')} : ${esc(itemName(id))}</b>${rs.note ? `<br><span class="small dim">${t(rs.note)}</span>` : ''}</div>
        ${rs.maybe.length ? `<label class="chk"><input type="checkbox" id="rtMaybe" ${useMaybe ? 'checked' : ''}> ${t('rt_maybe', { l: rs.maybe.map(itemName).join(', ') })}</label>` : ''}
        <button class="act big" id="rtClose">✕</button></div>${body}</div>`;
    ov.style.display = 'flex';
    $('#rtClose').onclick = close; if ($('#rtMaybe')) $('#rtMaybe').onchange = e => { useMaybe = e.target.checked; render(); };
    ov.querySelectorAll('[data-rz]').forEach(b => b.onclick = () => { cur = b.dataset.rz; excluded.clear(); render(); });
    ov.querySelectorAll('[data-add]').forEach(cb => cb.onchange = () => { const k = Number(cb.dataset.add); cb.checked ? added.add(k) : added.delete(k); render(); });
    ov.querySelectorAll('[data-rx]').forEach(el => el.onclick = () => { const k = el.dataset.rx; excluded.has(k) ? excluded.delete(k) : excluded.add(k); render(); });
    if ($('#rtGps')) $('#rtGps').onclick = () => { const st = zoneStart(cur, routeCluster(routePoints(useMaybe ? rs.ids.concat(rs.maybe) : rs.ids)[cur])); close(); openGps([null, cur, [[st.name, 'v']], [[st.x, st.y, 0]]], [st.x, st.y, 0]); };
  };
  render();
}


// ------------------------------------------------------------------ zoom des cartes
// Molette ou boutons +/- pour zoomer, glisser pour se déplacer, double-clic pour zoomer, pincer sur téléphone.
// Les points gardent leur taille. Le zoom est conservé quand la même carte est redessinée (ex. point évité).
const ZOOM_MEM = new Map();
const HD_BASE = 'https://raw.githubusercontent.com/k4rimm0/hdv-forever/main/maps_hd/';
const TERR_BASE = 'https://raw.githubusercontent.com/k4rimm0/hdv-forever/main/maps_terrain/';
const TERR_ZONES = new Set(["alterac-mountains", "arathi-highlands", "ashenvale", "azshara", "badlands", "blasted-lands", "burning-steppes", "darkshore", "desolace", "dun-morogh", "durotar", "duskwood", "dustwallow-marsh", "eastern-plaguelands", "elwynn-forest", "felwood", "feralas", "hillsbrad-foothills", "loch-modan", "moonglade", "mulgore", "redridge-mountains", "searing-gorge", "silithus", "silverpine-forest", "stonetalon-mountains", "stranglethorn-vale", "swamp-of-sorrows", "tanaris", "teldrassil", "the-barrens", "the-hinterlands", "thousand-needles", "tirisfal-glades", "ungoro-crater", "western-plaguelands", "westfall", "wetlands", "winterspring"]);
const terrMode = () => { try { return localStorage.getItem('hdv_terr') || 'auto'; } catch (e) { return 'auto'; } };
const setTerrMode = v => { try { localStorage.setItem('hdv_terr', v); } catch (e) {} };
function enhanceMap(w) {
  if (w.querySelector(':scope > .wz')) return;
  const img = w.querySelector(':scope > img'); if (!img) return;
  const key = img.getAttribute('src') + '|' + (w.id || w.className);
  const inner = document.createElement('div'); inner.className = 'wz';
  [...w.childNodes].filter(n => !(n.classList && n.classList.contains('nomapmsg'))).forEach(n => inner.appendChild(n));
  w.prepend(inner);
  const ctl = document.createElement('div'); ctl.className = 'wz-ctl';
  ctl.innerHTML = '<button type="button" data-z="in" title="Zoom +">+</button><button type="button" data-z="out" title="Zoom −">−</button><button type="button" data-z="reset" title="Vue entière">⤢</button>';
  w.appendChild(ctl);
  let st = ZOOM_MEM.get(key) || { z: 1, x: 0, y: 0 };
  const clamp = () => { const W = w.clientWidth, H = w.clientHeight; st.z = Math.min(8, Math.max(1, st.z)); st.x = Math.min(0, Math.max(W - W * st.z, st.x)); st.y = Math.min(0, Math.max(H - H * st.z, st.y)); };
  let apply = () => { clamp(); inner.style.transform = `translate(${st.x}px,${st.y}px) scale(${st.z})`; w.style.setProperty('--z', st.z); w.classList.toggle('zoomed', st.z > 1.01); ZOOM_MEM.set(key, { ...st }); };
  const zoomAt = (f, cx, cy) => { const r = w.getBoundingClientRect(); const px = cx - r.left, py = cy - r.top; const nz = Math.min(8, Math.max(1, st.z * f)); st.x = px - (px - st.x) * nz / st.z; st.y = py - (py - st.y) * nz / st.z; st.z = nz; apply(); };
  w.addEventListener('wheel', e => { e.preventDefault(); zoomAt(e.deltaY < 0 ? 1.25 : 0.8, e.clientX, e.clientY); }, { passive: false });
  w.addEventListener('dblclick', e => { if (e.target.closest('.wz-ctl')) return; e.preventDefault(); zoomAt(2, e.clientX, e.clientY); });
  ctl.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; e.stopPropagation(); const r = w.getBoundingClientRect();
    if (b.dataset.z === 'reset') { st = { z: 1, x: 0, y: 0 }; apply(); } else zoomAt(b.dataset.z === 'in' ? 1.6 : 1 / 1.6, r.left + r.width / 2, r.top + r.height / 2); });
  // Glisser pour se déplacer ; un glissement n'est pas un clic (ne déclenche ni point ni « je suis ici »).
  let drag = null, moved = false; const pts = new Map(); let pinch = null;
  w.addEventListener('pointerdown', e => { if (e.target.closest('.wz-ctl')) return; pts.set(e.pointerId, [e.clientX, e.clientY]);
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), z: st.z }; drag = null; }
    else { drag = { x: e.clientX, y: e.clientY, sx: st.x, sy: st.y }; moved = false; } });
  w.addEventListener('pointermove', e => { if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, [e.clientX, e.clientY]);
    if (pinch && pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); zoomAt((pinch.z * d / pinch.d) / st.z, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); moved = true; return; }
    if (!drag || st.z <= 1.01) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) { moved = true; w.classList.add('dragging'); }
    st.x = drag.sx + dx; st.y = drag.sy + dy; apply(); });
  const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; drag = null; w.classList.remove('dragging'); };
  w.addEventListener('pointerup', up); w.addEventListener('pointercancel', up); w.addEventListener('pointerleave', up);
  w.addEventListener('click', e => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  // Carte HD (4x) chargée seulement quand on zoome ; si elle n'existe pas pour cette zone, on garde l'actuelle.
  const m = (img.getAttribute('src') || '').match(/maps\/(z_[a-z0-9-]+)\.jpg/);
  let hdTried = false;
  const tryHd = () => {
    if (hdTried || !m || st.z < 1.3) return; hdTried = true;
    const hd = new Image(); hd.onload = () => { img.src = hd.src; w.classList.add('hd'); };
    hd.src = HD_BASE + m[1] + '.jpg';
  };
  // Vrai terrain (minimap du jeu, comme OpenMap) : chargé au zoom, affiché en fondu à partir de x2.2.
  // Bouton « relief » : auto / toujours / jamais (mémorisé).
  const tz = m && TERR_ZONES.has(m[1].slice(2));
  let terr = null;
  if (tz) {
    const tb = document.createElement('button'); tb.type = 'button'; tb.className = 'wz-terr'; ctl.appendChild(tb);
    const lbl = () => { const md = terrMode(); tb.textContent = md === 'on' ? '⛰' : md === 'off' ? '🗺' : 'A'; tb.title = t('terr_' + md); };
    lbl();
    tb.addEventListener('click', e => { e.stopPropagation(); const md = terrMode(); setTerrMode(md === 'auto' ? 'on' : md === 'on' ? 'off' : 'auto'); lbl(); apply(); });
  }
  const terrUpd = () => {
    if (!tz) return; const md = terrMode();
    const want = md === 'on' || (md === 'auto' && st.z >= 2.2);
    if ((want || (md === 'auto' && st.z >= 1.6)) && !terr) {
      terr = document.createElement('img'); terr.className = 'terr'; terr.alt = ''; terr.draggable = false;
      terr.onerror = () => { terr.remove(); };
      terr.onload = () => terr.classList.add('ok');
      terr.src = TERR_BASE + m[1] + '.jpg'; img.after(terr);
    }
    w.classList.toggle('terr-on', !!want);
  };
  const apply0 = apply; apply = () => { apply0(); tryHd(); terrUpd(); };
  apply();
}
new MutationObserver(() => document.querySelectorAll('.wmap').forEach(enhanceMap)).observe(document.body, { childList: true, subtree: true });
// Position d'un clic sur une carte zoomée, en % de la carte.
function mapPct(w, e) { const r = (w.querySelector('.wz') || w).getBoundingClientRect(); return [Math.round((e.clientX - r.left) / r.width * 1000) / 10, Math.round((e.clientY - r.top) / r.height * 1000) / 10]; }

// ------------------------------------------------------------------ encyclopédie des monstres
const mobLink = (name, slug) => `<a href="#" class="moblink" data-mob="${esc(JSON.stringify([name, slug || '']))}" title="${t('mob_open')}">${esc(name)}</a>`;
function itemByEn(en) {
  if (!S._byEn) { S._byEn = {}; for (const [k, m] of Object.entries(S.items)) if (m.n && m.n.en && !S._byEn[m.n.en]) S._byEn[m.n.en] = Number(k); }
  return S._byEn[en] || null;
}
// Rassemble tout ce qu'on sait d'un monstre : sa fiche metabot (si elle existe) + ce que disent les objets qu'il lâche.
function mobData(name, slug) {
  const npc = (slug && S.npcs && S.npcs[slug]) || (S.npcs && Object.values(S.npcs).find(n => n.nm === name)) || null;
  const d = { name, slug, lv: npc && npc.lv, zone: npc && npc.zone, role: npc && npc.role, sp: npc && npc.sp, elite: npc && npc.elite, rare: npc && npc.rare, maps: {}, drops: [] };
  if (npc && npc.p) for (const [z, pts] of npc.p) d.maps[z] = pts.map(p => ({ x: p[0], y: p[1] }));
  const seen = new Set();
  if (npc && npc.dr) for (const [en, , pct, qty, col] of npc.dr) { const id = itemByEn(en); d.drops.push({ en, id, pct, qty, col }); seen.add(en); }
  for (const [k, f] of Object.entries(S.farm || {})) {
    for (const m of f.m || []) {
      if (m[0] !== name) continue;
      if (!d.lv && m[1]) d.lv = [m[1], m[2]];
      if (!d.zone) d.zone = m[3];
      const id = Number(k); const en = S.items[id] && S.items[id].n ? S.items[id].n.en : '';
      if (!seen.has(en)) { d.drops.push({ en, id, pct: m[4], qty: m[5] || '1' }); seen.add(en); }
    }
    if (!Object.keys(d.maps).length || !npc) for (const [, zone, names, pins] of f.p || []) {
      const ni = names.findIndex(n => n[0] === name && n[1] === 'd'); if (ni < 0) continue;
      const arr = d.maps[zone] = d.maps[zone] || [];
      for (const [x, y, i] of pins) if (i === ni && !arr.some(p => p.x === x && p.y === y)) arr.push({ x, y });
    }
  }
  d.drops.sort((a, b) => b.pct - a.pct);
  return d;
}
function qtyAvg(q) { const m = String(q || '1').match(/(\d+)(?:[–-](\d+))?/); return m ? (Number(m[1]) + Number(m[2] || m[1])) / 2 : 1; }
async function openMob(name, slug) {
  const mk = await market(viewHouseId());
  const d = mobData(name, slug);
  let ov = $('#gps'); if (!ov) { ov = document.createElement('div'); ov.id = 'gps'; document.body.appendChild(ov); }
  const close = () => { ov.style.display = 'none'; ov.innerHTML = ''; document.body.style.overflow = ''; document.removeEventListener('keydown', esc_); };
  const esc_ = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', esc_); document.body.style.overflow = 'hidden';
  const zones = Object.keys(d.maps).sort((a, b) => sideRank(a) - sideRank(b) || d.maps[b].length - d.maps[a].length);
  let cur = zones[0] || null, loop = false;
  // Valeur moyenne d'un monstre tué : chaque objet × chance × quantité × prix (HDV, sinon prix de vente au PNJ).
  let perKill = 0;
  const rows = d.drops.map(x => {
    const r = x.id && mk && mk.items[x.id]; const ah = r ? r[MKT] : null; const vendor = x.id && S.items[x.id] ? S.items[x.id].sp || 0 : 0;
    const unit = ah || vendor || 0; const ev = unit * (x.pct / 100) * qtyAvg(x.qty); perKill += ev;
    return { ...x, ah, vendor, ev };
  });
  ov._redraw = () => render();
  const render = () => {
    let mapHtml = `<p class="muted">${t('mob_nomap')}</p>`;
    if (cur) {
      const pts = d.maps[cur]; let path = '';
      if (loop && pts.length > 2) { const tour = routeSolve(routeCluster(pts.map(p => ({ ...p, si: 0, nm: name }))), null); path = tour.concat([tour[0]]).map(p => p.x + ',' + p.y).join(' '); }
      mapHtml = `${zones.length > 1 ? `<div class="row" style="margin-bottom:8px">${zones.map(z => `<button class="chip ${z === cur ? 'on' : ''} ${sideOk(z) ? '' : 'off-side'}" data-mz="${esc(z)}">${zoneTag(z)} ${zoneName(z)} <span class="dim">${d.maps[z].length}</span></button>`).join('')}</div>` : ''}
        <div class="wmap rt-map" style="margin:0"><img src="maps/z_${zoneSlug(cur)}.jpg" alt="" onerror="this.parentNode.classList.add('nomap')"><div class="nomapmsg">${t('ht_nomap')}</div>
        ${path ? `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="${path}" fill="none" stroke="#000" stroke-opacity=".75" vector-effect="non-scaling-stroke" class="rl-out"/><polyline points="${path}" fill="none" stroke="#ffd23f" vector-effect="non-scaling-stroke" class="rl-in"/></svg>` : ''}
        ${pts.map((p, i) => `<span class="pin" style="left:${p.x}%;top:${p.y}%;background:#ff4d4d" data-mg="${i}" title="${esc(name)} (${p.x}, ${p.y}) · ${t('gps_click')}"></span>`).join('')}</div>
        <div class="row" style="margin-top:8px"><label class="chk"><input type="checkbox" id="mobLoop" ${loop ? 'checked' : ''}> ${t('mob_loop')}</label></div>
        <p class="note">${t('mob_map_help')}</p>`;
    }
    const tag = [d.elite ? `<span class="badge bad">${t('mob_elite')}</span>` : '', d.rare ? `<span class="badge warn">${t('mob_rare')}</span>` : ''].join(' ');
    ov.innerHTML = `<div class="gps-box"><div class="gps-head"><div class="gps-dest">🐾 <b>${esc(name)}</b> ${tag}
        <span class="dim">· ${d.lv ? t('lvl_s') + ' ' + d.lv[0] + (d.lv[1] && d.lv[1] !== d.lv[0] ? '–' + d.lv[1] : '') : ''}${d.zone ? ' · ' + zoneName(d.zone) : ''}</span></div>
        <button class="act big" id="mobClose">✕</button></div>
      <div class="gps-body"><div class="gps-route rt-mapcol" style="padding:12px">${mapHtml}</div>
      <div class="gps-side">
        <h3>${t('mob_card')}</h3>
        <table class="t mobfacts"><tbody>
          <tr><td>${t('mob_level')}</td><td>${d.lv ? d.lv[0] + (d.lv[1] !== d.lv[0] ? '–' + d.lv[1] : '') : '?'}</td></tr>
          <tr><td>${t('ht_zone')}</td><td>${d.zone ? zoneName(d.zone) : '?'}</td></tr>
          ${d.role ? `<tr><td>${t('mob_role')}</td><td>${esc(d.role === 'Enemy' ? t('mob_enemy') : d.role)}</td></tr>` : ''}
          ${d.sp ? `<tr><td>${t('mob_spawns')}</td><td>${d.sp}</td></tr>` : ''}
          <tr><td>${t('mob_value')}</td><td><b>${money(perKill)}</b></td></tr>
        </tbody></table>
        <h3>${t('mob_drops')} <span class="dim">(${rows.length})</span></h3>
        <div class="tablewrap"><table class="t"><thead><tr><th>${t('col_item')}</th><th class="r">${t('ht_rate')}</th><th class="r">${t('mob_price')}</th></tr></thead><tbody>
        ${rows.map(x => `<tr><td>${x.id ? itemCell(x.id, false) : `<span style="color:${x.col || '#fff'}">${esc(x.en)}</span>`}${x.qty && x.qty !== '1' ? ` <span class="dim">×${esc(x.qty)}</span>` : ''}</td>
          <td class="r"><b>${pctTxt(x.pct)}</b></td><td class="r">${x.ah ? money(x.ah) : x.vendor ? `<span class="dim">${t('mob_vendor')} ${money(x.vendor)}</span>` : '–'}</td></tr>`).join('')}
        </tbody></table></div>
        <p class="note">${t('mob_value_help')}</p>
        <p class="note">${t('farm_src_note')}</p>
      </div></div></div>`;
    ov.style.display = 'flex';
    $('#mobClose').onclick = close;
    ov.querySelectorAll('[data-mz]').forEach(b => b.onclick = () => { cur = b.dataset.mz; render(); });
    if ($('#mobLoop')) $('#mobLoop').onchange = e => { loop = e.target.checked; render(); };
    ov.querySelectorAll('[data-mg]').forEach(el => el.onclick = e => { e.stopPropagation(); const p = d.maps[cur][+el.dataset.mg]; close(); openGps([null, cur, [[name, 'd']], [[p.x, p.y, 0]]], [p.x, p.y, 0]); });
    ov.querySelectorAll('a.it').forEach(a => a.addEventListener('click', close));
  };
  render();
}
document.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('[data-mob]'); if (!a) return;
  e.preventDefault(); e.stopPropagation(); const [n, s] = JSON.parse(a.dataset.mob); openMob(n, s);
});

// ------------------------------------------------------------------ guide de montée de métier
// Paliers à débloquer (formation) : valeurs de WoW Forever d'après Wowhead (overview des métiers, novembre 2026).
// ------------------------------------------------------------------ guides des métiers de récolte
// Niveaux de Classic (Forever a pu en changer quelques-uns). Un filon/une plante reste orange jusqu'à +25, jaune jusqu'à +50,
// vert jusqu'à +100, puis gris (plus de point).
const GATHER = {
  Herbalism: [[2447, 'Peacebloom', 1], [765, 'Silverleaf', 1], [2449, 'Earthroot', 15], [785, 'Mageroyal', 50], [2450, 'Briarthorn', 70],
    [3820, 'Stranglekelp', 85], [2453, 'Bruiseweed', 100], [3355, 'Wild Steelbloom', 115], [3369, 'Grave Moss', 120], [3356, 'Kingsblood', 125],
    [3357, 'Liferoot', 150], [3818, 'Fadeleaf', 160], [3821, 'Goldthorn', 170], [3358, "Khadgar's Whisker", 185], [3819, 'Wintersbite', 195],
    [4625, 'Firebloom', 205], [8831, 'Purple Lotus', 210], [8836, "Arthas' Tears", 220], [8838, 'Sungrass', 230], [8839, 'Blindweed', 235],
    [8845, 'Ghost Mushroom', 245], [8846, 'Gromsblood', 250], [13464, 'Golden Sansam', 260], [13463, 'Dreamfoil', 270],
    [13465, 'Mountain Silversage', 280], [13466, 'Plaguebloom', 285], [13467, 'Icecap', 290], [13468, 'Black Lotus', 300]],
  Mining: [[2770, 'Copper Vein', 1], [2771, 'Tin Vein', 65], [2775, 'Silver Vein', 75, 1], [2772, 'Iron Deposit', 125], [2776, 'Gold Vein', 155, 1],
    [3858, 'Mithril Deposit', 175], [7911, 'Truesilver Deposit', 230, 1], [11370, 'Dark Iron Deposit', 230, 1], [10620, 'Small Thorium Vein', 245],
    [10620, 'Rich Thorium Vein', 275]],
};
const GATHER_PROFS = ['Mining', 'Herbalism', 'Skinning', 'Fishing'];
// Zones par niveau de monstres (pour le dépeçage), version Horde.
const SKIN_ZONES = [[1, 10, ['Durotar', 'Mulgore', 'Tirisfal Glades']], [10, 20, ['The Barrens', 'Silverpine Forest']], [20, 25, ['The Barrens', 'Stonetalon Mountains', 'Ashenvale']],
  [25, 30, ['Ashenvale', 'Hillsbrad Foothills', 'Thousand Needles']], [30, 40, ['Arathi Highlands', 'Stranglethorn Vale', 'Desolace', 'Dustwallow Marsh']],
  [40, 48, ['Tanaris', 'Feralas', 'The Hinterlands']], [48, 55, ["Un'Goro Crater", 'Felwood', 'Azshara']], [55, 61, ['Winterspring', 'Eastern Plaguelands', 'Burning Steppes']]];
const FISH_STEPS = [[1, 75, ['Durotar', 'Mulgore', 'Tirisfal Glades', 'Orgrimmar'], 'fish_1'], [75, 150, ['The Barrens', 'Silverpine Forest', 'Ashenvale', 'Stonetalon Mountains'], 'fish_75'],
  [150, 225, ['Desolace', 'Thousand Needles', 'Arathi Highlands', 'Stranglethorn Vale', 'Dustwallow Marsh'], 'fish_150'],
  [225, 300, ['Tanaris', 'Feralas', 'Azshara', 'The Hinterlands', "Un'Goro Crater"], 'fish_225']];
function skinLevel(s) { return s <= 100 ? Math.max(1, Math.floor(10 + s / 10)) : Math.floor(s / 5); }
function gatherZones(id) {
  const f = S.farm && S.farm[id]; const z = [];
  for (const n of (f && f.n) || []) for (const zz of n[1] || []) if (!z.includes(zz)) z.push(zz);
  return z;
}
function gatherGuideHtml(prof, my, mk) {
  const head = `<p class="help">${t('gg_help_' + prof)}</p>`;
  const cur = (a, b) => my != null && my >= a && my < b ? ' class="gg-cur"' : '';
  if (GATHER[prof]) {
    const ALL = GATHER[prof]; const L = ALL.filter(x => !x[3]); const RARE = ALL.filter(x => x[3]); const rows = [];
    for (let i = 0; i < L.length; i++) {
      const [id, en, req] = L[i];
      // on change de cible dès que la suivante (plus haute) est disponible et pas déjà prise à ce niveau
      let j = i + 1; while (j < L.length && L[j][2] === req) j++;
      const until = j < L.length ? L[j][2] : 300;
      if (until <= req && i < L.length - 1) continue;
      const zones = gatherZones(id).slice(0, 4);
      const price = mk && mk.items[id] ? mk.items[id][MKT] : null;
      const same = L.filter(x => x[2] === req && x !== L[i]).map(x => x[1]);
      if (L.slice(0, i).some(x => x[2] === req)) continue;
      rows.push(`<tr${cur(req, until)}><td><b>${req}–${Math.min(300, until)}</b></td>
        <td class="l"><span class="gdi">${diffIcon('orange')}${S.items[id] ? itemCell(id, false) : `<b>${esc(en)}</b>`}</span>${same.length ? `<span class="dim small">+ ${same.map(n => { const o = L.find(x => x[1] === n); return o && S.items[o[0]] ? esc(itemName(o[0])) : esc(n); }).join(', ')}</span>` : ''}${prof === 'Mining' ? `<div class="dim small">${esc(en)}</div>` : ''}${RARE.filter(x => x[2] >= req && x[2] < until).map(x => `<div class="small">✨ ${t('gg_rare')} ${S.items[x[0]] ? esc(itemName(x[0])) : esc(x[1])} <span class="dim">(${x[2]})</span></div>`).join('')}</td>
        <td class="l small">${zones.length ? zones.map(zoneName).join(', ') : `<span class="dim">${t('gg_nozone')}</span>`}</td>
        <td>${money(price)}</td>
        <td>${routeAvailable(id) ? `<button class="chip small" data-route="${id}">🗺️ ${t('rt_btn')}</button>` : ''}</td></tr>`);
    }
    return head + `<div class="tablewrap"><table class="gd"><thead><tr><th>${t('gd_range')}</th><th class="l">${t('gg_what')}</th><th class="l">${t('gg_where')}</th><th>${t('gg_value')}</th><th></th></tr></thead><tbody>${rows.join('')}</tbody></table></div>
      <p class="note">${t('gg_note')}</p>`;
  }
  if (prof === 'Skinning') {
    const rows = []; for (let s = 1; s < 300; s += 25) {
      const e = Math.min(300, s === 1 ? 75 : s + 25); const lo = s === 1 ? 1 : skinLevel(s), hi = skinLevel(e);
      const zs = SKIN_ZONES.filter(z => z[1] > lo && z[0] <= hi).flatMap(z => z[2]).filter((v, i, a) => a.indexOf(v) === i).slice(0, 5);
      rows.push(`<tr${cur(s, e)}><td><b>${s}–${e}</b></td><td>${t('gg_beasts', { a: lo, b: hi })}</td><td class="l small">${zs.map(zoneName).join(', ')}</td></tr>`);
      if (s === 1) s = 50;
    }
    return head + `<div class="tablewrap"><table class="gd"><thead><tr><th>${t('gd_range')}</th><th>${t('gg_mobs')}</th><th class="l">${t('gg_where')}</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>
      <p class="note">${t('gg_skin_note')}</p>`;
  }
  if (prof === 'Fishing') {
    return head + `<div class="tablewrap"><table class="gd"><thead><tr><th>${t('gd_range')}</th><th class="l">${t('gg_where')}</th><th class="l">${t('gg_tip')}</th></tr></thead><tbody>
      ${FISH_STEPS.map(([a, b, zs, k]) => `<tr${cur(a, b)}><td><b>${a}–${b}</b></td><td class="l small">${zs.map(zoneName).join(', ')}</td><td class="l small">${t(k)}</td></tr>`).join('')}</tbody></table></div>
      <p class="note">${t('gg_fish_note')}</p>`;
  }
  return '';
}
// Paliers de Forever : pour dépasser 75 / 150 / 225, il faut apprendre le rang suivant (compétence mini + niveau du perso).
// [plafond, compétence mini pour l'apprendre, niveau de perso requis, clé du texte « comment »]
const RANKS_CRAFT = [[75, 50, 10, 'rk_train_j'], [150, 125, 20, 'rk_train_e'], [225, 200, 35, 'rk_train_a']];
const RANKS = {
  _craft: RANKS_CRAFT,
  _gather: [[75, 50, 0, 'rk_train_j'], [150, 125, 10, 'rk_train_e'], [225, 200, 25, 'rk_train_a']],
  Cooking: [[75, 50, 10, 'rk_train_j'], [150, 125, 20, 'rk_cook_e'], [225, 225, 35, 'rk_cook_a']],
  'First Aid': [[75, 50, 0, 'rk_train_j'], [150, 125, 0, 'rk_fa_e'], [225, 225, 35, 'rk_fa_a']],
  Fishing: [[75, 50, 10, 'rk_train_j'], [150, 125, 20, 'rk_fish_e'], [225, 225, 35, 'rk_fish_a']],
};
const rankList = prof => RANKS[prof] || (['Mining', 'Herbalism', 'Skinning'].includes(prof) ? RANKS._gather : RANKS._craft);
function charLevel() { const v = Number(store('hf_charlvl') || 0); return v > 0 ? v : null; }
const RANK_NAME = { 75: 'rk_n_j', 150: 'rk_n_e', 225: 'rk_n_a' };
// Encadré « paliers à débloquer », avec ton niveau de perso si tu l'as entré.
function ranksHtml(prof, my) {
  const cl = charLevel();
  const rows = rankList(prof).map(([cap, from, lvl, how]) => {
    const past = my != null && my > cap; const soon = my != null && !past && my >= from - 15;
    const lvlBad = cl != null && lvl && cl < lvl;
    return `<li class="${past ? 'dim' : soon ? 'rk-soon' : ''}">${past ? '✅' : soon ? '⚠️' : '🔒'} <b>${t('rk_pass', { c: cap })}</b> : ${t(RANK_NAME[cap])}, ${t(how)}
      <span class="small"> · ${t('rk_skill', { s: from })}${lvl ? ` · <span class="${lvlBad ? 'down' : ''}">${t('rk_lvl', { l: lvl })}${lvlBad ? ' ' + t('rk_missing', { n: lvl - cl }) : ''}</span>` : ''}</span></li>`;
  }).join('');
  return `<div class="panel rk"><h3>${t('rk_title')}</h3><ul class="vlist">${rows}</ul>
    <label class="small">${t('rk_mylvl')} <input type="number" id="charlvl" min="1" max="60" value="${cl || ''}" style="width:60px"></label></div>`;
}
const PROF_RANKS = {
  _default: [[75, 'rank_journeyman'], [150, 'rank_expert'], [225, 'rank_artisan']],
  Cooking: [[75, 'rank_journeyman'], [150, 'rank_cook_expert'], [225, 'rank_cook_artisan']],
  'First Aid': [[75, 'rank_journeyman'], [150, 'rank_fa_expert'], [225, 'rank_fa_artisan']],
};
// Plan le moins cher de `from` à `to` : à chaque point, la recette (connue ou achetable) qui coûte le moins par point
// gagné, puis on regroupe en étapes et on évite les étapes trop courtes (on ne change pas de recette pour 3 points).
function buildGuide(prof, from, to, mk, vs, opts) {
  const cands = S.recipes.filter(rc => rc.p === prof).map(rc => {
    const ci = craftInfo(rc.o, prof); if (!ci || !ci.sk) return null;
    const c = craftCost(rc, mk.items, vs); if (c.missing) return null;
    let learn = 0, learnTxt = 'trainer';
    if (!ci.tr) {
      const r = recipeInfo(ci); if (!r) return null;
      const ah = r.id && mk.items[r.id] ? mk.items[r.id][MKT] : null;
      const v = r.v && r.v.length ? r.v.filter(x => x[1] !== 'a').sort((a, b) => (a[6] || 1e12) - (b[6] || 1e12))[0] : null;
      if (v && v[6] != null) { learn = v[6]; learnTxt = 'vendor'; }
      if (ah != null && (!learn || ah < learn)) { learn = ah; learnTxt = 'ah'; }
      if (!learn && !(v && v[6] == null)) return null; // recette introuvable (drop rare, pas en vente)
      if (opts.noRecipe) return null;
    }
    const out = mk.items[rc.o]; const resale = opts.resale && out && out[MKT] ? out[MKT] * rc.oq * 0.95 * 0.5 : 0;
    return { rc, ci, cost: Math.max(0, c.cost - resale), raw: c.cost, learn, learnTxt, r: recipeInfo(ci) };
  }).filter(Boolean);
  const steps = []; let s = from; const learned = new Set();
  while (s < to) {
    let best = null;
    for (const x of cands) {
      const ch = skillChance(x.ci.sk, s); if (ch <= 0) continue;
      const v = x.cost / ch + (learned.has(x) ? 0 : x.learn / 20); // le prix de la recette est étalé sur ~20 points
      if (!best || v < best.v) best = { x, v, ch };
    }
    if (!best) {
      let nx = s + 1; while (nx < to && !cands.some(x => skillChance(x.ci.sk, nx) > 0)) nx++;
      steps.push({ gap: true, from: s, to: nx }); s = nx; continue;
    }
    const last = steps[steps.length - 1];
    if (last && !last.gap && last.x === best.x) { last.to = s + 1; last.crafts += 1 / best.ch; }
    else steps.push({ x: best.x, from: s, to: s + 1, crafts: 1 / best.ch });
    learned.add(best.x); s++;
  }
  // Lissage : une étape de moins de 5 points est absorbée par la précédente si cette recette rapporte encore des points.
  for (let i = 1; i < steps.length; i++) {
    const a = steps[i - 1], b = steps[i]; if (a.gap || b.gap || b.to - b.from >= 5) continue;
    let crafts = 0, ok = true; for (let p = b.from; p < b.to; p++) { const ch = skillChance(a.x.ci.sk, p); if (ch <= 0) { ok = false; break; } crafts += 1 / ch; }
    if (ok && crafts * a.x.cost <= b.crafts * b.x.cost * 1.25 + (learned.has(b.x) ? b.x.learn : 0)) { a.to = b.to; a.crafts += crafts; steps.splice(i, 1); i--; }
  }
  for (const st of steps) if (!st.gap) { st.n = Math.ceil(st.crafts); st.cost = st.n * st.x.raw; }
  return steps;
}
function guideHtml(prof, from, mk, vs, opts) {
  const to = 300; const steps = buildGuide(prof, from, to, mk, vs, opts);
  const ranks = rankList(prof).filter(r => r[0] >= from && r[0] < to).map(([cap, sk, lvl, how]) => [cap, `${t(RANK_NAME[cap])}, ${t(how)} (${t('rk_skill', { s: sk })}${lvl ? ', ' + t('rk_lvl', { l: lvl }) : ''})`]);
  let total = 0, learnTotal = 0; const shop = {};
  const rowsHtml = steps.map(st => {
    if (st.gap) return `<tr><td colspan="6" class="dim">${st.to < 300 ? t('gd_gap2', { s: st.from, e: st.to }) : t('gd_gap', { s: st.from })}${prof === 'Mining' ? ' ' + t('gd_gap_mining') : ''}</td></tr>`;
    total += st.cost; if (!st.x.ci.tr) learnTotal += st.x.learn;
    st.x.rc.r.forEach(([rid, q]) => { shop[rid] = (shop[rid] || 0) + q * st.n; });
    const rank = ranks.filter(r => r[0] >= st.from && r[0] < st.to).map(r => `<div class="note">🔒 ${t('rk_pass', { c: r[0] })} : ${r[1]}</div>`).join('');
    const r = st.x.r; const v = r && r.v ? r.v.filter(x => x[1] !== 'a')[0] : null;
    const learn = st.x.ci.tr ? `<span class="tag">${t('pr_trainer')}</span>`
      : `<span class="tag warn">${t('pr_recipe')}</span> ${st.x.learnTxt === 'ah' ? `${t('pr_ah')} ${money(st.x.learn)}` : v ? `<a href="#" class="vgps" data-vg="${esc(JSON.stringify([v[3], v[4], v[5], v[0]]))}"><b>${esc(v[0])}</b> 🧭</a> · ${zoneName(v[3])} · ${money(st.x.learn)}` : ''}`;
    const dc = st.x.ci && st.x.ci.sk ? skillColor(st.x.ci.sk, st.from) : ''; return `<tr><td><b>${st.from}–${st.to}</b></td><td><span class="gdi">${dc ? diffIcon(dc) : ''}${itemCell(st.x.rc.o, false)}</span></td><td class="r"><b>${st.n}</b></td>
      <td class="l small">${st.x.rc.r.map(([rid, q]) => `${q * st.n}× <a href="#/item/${rid}">${esc(itemName(rid))}</a>`).join('<br>')}</td>
      <td class="r">${money(st.cost)}</td><td class="l small">${learn}${rank}</td></tr>`;
  }).join('');
  const shopRows = Object.entries(shop).map(([rid, q]) => {
    rid = Number(rid); const ah = mk.items[rid] ? mk.items[rid][MKT] : null; const vp = vendorBuyPrice(rid, vs);
    const unit = [ah, vp].filter(x => x != null && x > 0).sort((a, b) => a - b)[0];
    return { rid, q, unit, src: unit === vp && vp ? 'pnj' : 'hdv' };
  }).sort((a, b) => (b.unit || 0) * b.q - (a.unit || 0) * a.q);
  return `<div class="grid g3 gd-kpi">
      <div class="kpi"><div class="l">${t('gd_total')}</div><div class="v">${money(total + learnTotal)}</div><div class="s">${t('gd_total_s', { a: from, b: to })}</div></div>
      <div class="kpi"><div class="l">${t('gd_steps')}</div><div class="v">${steps.filter(s => !s.gap).length}</div><div class="s">${t('gd_crafts', { n: steps.reduce((a, s) => a + (s.n || 0), 0) })}</div></div>
      <div class="kpi"><div class="l">${t('gd_recipes')}</div><div class="v">${money(learnTotal)}</div><div class="s">${t('gd_recipes_s')}</div></div></div>
    <div class="tablewrap"><table class="t gd"><thead><tr><th>${t('gd_range')}</th><th>${t('gd_recipe')}</th><th class="r">${t('gd_n')}</th><th>${t('gd_mats')}</th><th class="r">${t('col_cost')}</th><th>${t('gd_learn')}</th></tr></thead><tbody>${rowsHtml}</tbody></table></div>
    <h3>${t('gd_shop')}</h3><div class="tablewrap"><table class="t"><thead><tr><th>${t('col_item')}</th><th class="r">${t('gd_qty')}</th><th class="r">${t('gd_unit')}</th><th>${t('gd_where')}</th></tr></thead><tbody>
    ${shopRows.map(x => `<tr><td>${itemCell(x.rid, false)}</td><td class="r"><b>${x.q}</b></td><td class="r">${money(x.unit)}</td><td class="small">${x.src === 'pnj' ? t('gd_vendor') : t('gd_ah')}</td></tr>`).join('')}</tbody></table></div>
    <p class="note">${t('gd_note')}</p>
    ${prof === 'Cooking' ? `<p class="note">${t('gd_ref')} <a href="https://www.wowhead.com/forever/profession-leveling-guides/cooking" target="_blank" rel="noopener">Wowhead ↗</a></p>` : `<p class="note">${t('gd_ref')} <a href="https://www.wowhead.com/forever/profession-leveling-guides/${PF_SLUG(prof)}" target="_blank" rel="noopener">Wowhead ↗</a></p>`}`;
}

// ------------------------------------------------------------------ cadre
function setLang(l) { S.lang = l; store('hf_lang', l); document.documentElement.lang = l; renderChrome(); route(); }
async function renderNav() {
  const cur = (location.hash.split('/')[1] || '').split('?')[0];
  const n = await alertsCount();
  $('#nav').innerHTML = [['gear', 'nav_gear'], ['', 'nav_market'], ['best', 'nav_best'], ['farm', 'nav_farm'], ['craft', 'nav_craft'], ['guide', 'nav_guide'], ['vendor', 'nav_vendor'], ['gaps', 'nav_gaps'], ['watch', 'nav_watch'], ['settings', 'nav_settings']]
    .map(([k, l]) => `<a href="#/${k}" class="${cur === k ? 'on' : ''}">${t(l)}${k === 'watch' && n ? ` <span class="badge warn">${n}</span>` : ''}</a>`).join('');
}
function renderHousebar() {
  const mine = myHouses();
  $('#housebar').innerHTML = ['horde', 'alliance', 'neutral'].map(f => `<button class="chip ${f} ${S.view === f ? 'on' : ''}" data-v="${f}">${t(f)}</button>`).join('')
    + `<span class="note" style="margin-left:auto">${t('updated')} ${when(S.meta.t)} · ${t('next_update')} ${new Date((S.meta.t + 3600) * 1000).toLocaleTimeString(S.lang, { hour: '2-digit', minute: '2-digit' })}</span>`;
  $('#housebar').querySelectorAll('[data-v]').forEach(b => b.onclick = () => { S.view = b.dataset.v; store('hf_view', S.view); renderHousebar(); route(); });
}
function renderChrome() {
  $('#q').placeholder = t('search_ph');
  $('#langBtn').textContent = S.lang === 'fr' ? 'EN' : 'FR';
  $('#foot').textContent = (S.lang === 'fr' ? 'Données : API Blizzard (WoW Forever), relevées toutes les heures. Site personnel.' : 'Data: Blizzard API (WoW Forever), read hourly. Personal site.');
  if (S.meta) { renderNav(); renderHousebar(); }
}
// Toutes les 10 min : si les prix ont été mis à jour, on recharge les marchés et on revérifie les alertes (notification).
setInterval(async () => {
  if (!S.key || !S.meta) return;
  try {
    S.cache.delete('meta'); const nm = await load('meta');
    if (nm && nm.t !== S.meta.t) { for (const k of [...S.cache.keys()]) if (k.startsWith('m_') || k.startsWith('h_')) S.cache.delete(k); S.meta = nm; renderNav(); renderHousebar(); }
    else if (nm) S.cache.set('meta', Promise.resolve(nm));
  } catch (e) {}
}, 600000);
// ===================== ÉQUIPEMENT (stuffs par classe, spé et niveau) =====================
// Poids de stats : tirés des guides WoW Forever (Icy Veins pour le niveau 60, Mobalytics pour le leveling),
// recoupés avec Warcraft Tavern et l'addon GearQuest. Voir docs/stuff-sources.md dans le dépôt.
// Unités : 1 point de la stat de base de la spé (PA pour les physiques, PdS pour les lanceurs, Puissance de soins
// pour les soigneurs, Endurance pour les tanks). Les stats en % (crit, toucher...) sont comptées par 1 %.
// lev = poids pendant le leveling, end = poids au niveau 60 ; entre 50 et 60 on passe progressivement de l'un à l'autre.
const G_ARMOR = { cloth: 16, leather: 17, mail: 18, plate: 19 };
const G_CLASSES = {
  warrior: { fr: 'Guerrier', en: 'Warrior', col: '#C69B6D', arm: [['mail', 1], ['plate', 40]], w: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14], sh: 1, dw: 20 },
  paladin: { fr: 'Paladin', en: 'Paladin', col: '#F48CBA', arm: [['mail', 1], ['plate', 40]], w: [1, 2, 3, 4, 5, 6, 7], sh: 1, relic: 1 },
  hunter: { fr: 'Chasseur', en: 'Hunter', col: '#AAD372', arm: [['leather', 1], ['mail', 40]], w: [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 14], dw: 20 },
  rogue: { fr: 'Voleur', en: 'Rogue', col: '#FFF468', arm: [['leather', 1]], w: [0, 1, 3, 5, 9, 10, 11, 12, 14], dw: 10 },
  priest: { fr: 'Prêtre', en: 'Priest', col: '#FFFFFF', arm: [['cloth', 1]], w: [0, 5, 8, 13] },
  shaman: { fr: 'Chaman', en: 'Shaman', col: '#0070DD', arm: [['leather', 1], ['mail', 40]], w: [0, 3, 4, 5, 6, 8, 9], sh: 1, relic: 1 },
  mage: { fr: 'Mage', en: 'Mage', col: '#3FC7EB', arm: [['cloth', 1]], w: [0, 1, 8, 13] },
  warlock: { fr: 'Démoniste', en: 'Warlock', col: '#8788EE', arm: [['cloth', 1]], w: [0, 1, 8, 13] },
  druid: { fr: 'Druide', en: 'Druid', col: '#FF7C0A', arm: [['leather', 1]], w: [0, 5, 6, 8, 9], relic: 1 },
};
// Conversion des valeurs de metabot (exprimées en « rating » du niveau 60) en %.
const G_PCT = { 'crit-rating': ['crit', 14], 'hit-rating': ['hit', 10], 'haste-rating': ['haste', 10], 'expertise-rating': ['exp', 10],
  'dodge-rating': ['dodge', 12], 'parry-rating': ['parry', 15], 'block-rating': ['block', 5] };
const G_FLAT = { strength: 'str', agility: 'agi', stamina: 'sta', intellect: 'int', spirit: 'spi', 'attack-power': 'ap',
  'ranged-attack-power': 'rap', 'spell-power': 'sp', 'spell-damage': 'sd', healing: 'heal', 'mana-regen': 'mp5', 'health-regen': 'hp5',
  'defense-rating': 'def', 'block-value': 'bv', 'bonus-armor': 'armor', 'spell-penetration': 'spen',
  'shadow-damage-done': 'shadow', 'fire-damage-done': 'fire', 'frost-damage-done': 'frost', 'arcane-damage-done': 'arcane',
  'nature-damage-done': 'nature', 'holy-damage-done': 'holy' };
// Politique d'armes : two = arme à deux mains, dw = deux armes (ambidextrie), sh = arme + bouclier, cast = bâton ou arme + main gauche.
const P = (o) => o;
const G_SPECS = {
  warrior: {
    arms: P({ fr: 'Armes', en: 'Arms', role: 'dps', pol: 'two', cap: { hit: 8, exp: 6.5 },
      lev: { str: 2, agi: 1.8, sta: 1.6, spi: 2, int: 0.1, ap: 1, crit: 20, hit: 14, exp: 14, haste: 10, armor: 0.01, th: 16, mh: 10, oh: 4, rg: 0.3 },
      end: { str: 2.2, agi: 1.2, sta: 0.25, spi: 0.05, ap: 1, crit: 24, hit: 28, exp: 26, haste: 14, armor: 0.005, th: 18, mh: 12, oh: 5, rg: 0.3 } }),
    fury: P({ fr: 'Fureur', en: 'Fury', role: 'dps', pol: 'dw', cap: { hit: 8, exp: 6.5 },
      lev: { str: 2, agi: 1.8, sta: 1.6, spi: 2, int: 0.1, ap: 1, crit: 20, hit: 14, exp: 14, haste: 12, armor: 0.01, th: 16, mh: 14, oh: 8, rg: 0.3 },
      end: { str: 2.2, agi: 1.2, sta: 0.25, spi: 0.05, ap: 1, crit: 24, hit: 26, exp: 24, haste: 16, armor: 0.005, th: 16, mh: 16, oh: 9, rg: 0.3 } }),
    prot: P({ fr: 'Protection (tank)', en: 'Protection (tank)', role: 'tank', pol: 'sh', cap: { hit: 8, exp: 6.5 },
      lev: { sta: 1, agi: 0.9, str: 0.6, spi: 0.4, armor: 0.035, def: 0.9, dodge: 12, parry: 10, block: 6, bv: 0.2, hit: 8, exp: 8, crit: 3, ap: 0.25, mh: 2, th: 1.5, oh: 0.5, rg: 0.1 },
      end: { sta: 1, agi: 0.85, str: 0.45, armor: 0.05, def: 0.7, dodge: 13, parry: 11, block: 6, bv: 0.2, hit: 10, exp: 11, crit: 4, ap: 0.2, mh: 2, th: 1.5, oh: 0.5, rg: 0.1 } }),
  },
  paladin: {
    holy: P({ fr: 'Sacré (soins)', en: 'Holy (healer)', role: 'heal', pol: 'cast',
      lev: { heal: 1, sp: 1, int: 0.6, spi: 0.5, mp5: 1.3, sta: 0.25, crit: 9, str: 0.05 },
      end: { heal: 1, sp: 1, int: 0.6, spi: 0.45, mp5: 1.3, sta: 0.1, crit: 9 } }),
    prot: P({ fr: 'Protection (tank)', en: 'Protection (tank)', role: 'tank', pol: 'sh', cap: { hit: 8, exp: 6.5 },
      lev: { sta: 1, def: 0.9, sp: 0.55, sd: 0.4, holy: 0.4, int: 0.45, str: 0.5, agi: 0.45, spi: 0.3, armor: 0.04, dodge: 10, parry: 9, block: 6, bv: 0.25, hit: 8, exp: 7, crit: 3, mp5: 0.6, mh: 1.5, th: 1, oh: 0.3 },
      end: { sta: 1, def: 0.95, sp: 0.55, sd: 0.45, holy: 0.45, int: 0.4, str: 0.4, agi: 0.4, spi: 0.1, armor: 0.05, dodge: 10, parry: 9, block: 6, bv: 0.25, hit: 9, exp: 8, crit: 3, mp5: 0.5, mh: 1.5, th: 1, oh: 0.3 } }),
    ret: P({ fr: 'Vindicte', en: 'Retribution', role: 'dps', pol: 'two', cap: { hit: 8, exp: 6.5 }, int40: 1,
      lev: { str: 1.8, sta: 2, spi: 2, int: 1.4, sp: 1.4, sd: 1.2, holy: 1.2, ap: 0.9, heal: 0.3, agi: 0.7, crit: 18, hit: 16, exp: 10, mp5: 2, th: 16, mh: 9, oh: 3 },
      end: { str: 2.2, sp: 1.1, sd: 1, holy: 1, ap: 1, agi: 0.9, int: 0.5, sta: 0.2, spi: 0.1, crit: 20, hit: 26, exp: 22, mp5: 0.8, th: 18, mh: 10, oh: 3 } }),
  },
  hunter: {
    bm: P({ fr: 'Maîtrise des bêtes', en: 'Beast Mastery', role: 'dps', pol: 'dw', cap: { hit: 8 },
      lev: { agi: 2.4, ap: 1, rap: 1, str: 0.05, sta: 0.9, spi: 0.7, int: 0.35, crit: 18, hit: 12, haste: 12, mp5: 0.5, armor: 0.005, rg: 18, th: 0.8, mh: 0.6, oh: 0.3 },
      end: { agi: 2.4, ap: 1, rap: 1, sta: 0.2, spi: 0.1, int: 0.3, crit: 28, hit: 26, haste: 14, mp5: 0.5, armor: 0.003, rg: 20, th: 0.8, mh: 0.6, oh: 0.3 } }),
    mm: P({ fr: 'Précision', en: 'Marksmanship', role: 'dps', pol: 'dw', cap: { hit: 8 },
      lev: { agi: 2.4, ap: 1, rap: 1, str: 0.05, sta: 0.9, spi: 0.45, int: 0.9, crit: 18, hit: 12, haste: 12, mp5: 0.5, armor: 0.005, rg: 18, th: 0.8, mh: 0.6, oh: 0.3 },
      end: { agi: 2.4, ap: 1, rap: 1, sta: 0.2, spi: 0.1, int: 1.2, crit: 28, hit: 26, haste: 14, mp5: 0.5, armor: 0.003, rg: 20, th: 0.8, mh: 0.6, oh: 0.3 } }),
    sv: P({ fr: 'Survie (mêlée)', en: 'Survival (melee)', role: 'dps', pol: 'dw', cap: { hit: 8, exp: 6.5 },
      lev: { agi: 1.9, str: 1, ap: 1, rap: 0.3, int: 0.45, sta: 0.8, spi: 0.5, crit: 20, hit: 14, exp: 10, haste: 10, armor: 0.005, th: 13, mh: 14, oh: 8, rg: 3 },
      end: { agi: 1.9, str: 1, ap: 1, rap: 0.3, int: 0.4, sta: 0.2, spi: 0.1, crit: 26, hit: 26, exp: 18, haste: 12, armor: 0.003, th: 13, mh: 15, oh: 9, rg: 3 } }),
  },
  rogue: {
    assa: P({ fr: 'Assassinat (dagues)', en: 'Assassination (daggers)', role: 'dps', pol: 'dw', cats: [0], cap: { hit: 8, exp: 6.5 },
      lev: { agi: 1.85, str: 1, ap: 1, sta: 0.7, crit: 16, hit: 18, exp: 18, haste: 12, armor: 0.005, mh: 14, oh: 8, th: 0, rg: 0.3 },
      end: { agi: 1.85, str: 1, ap: 1, sta: 0.15, crit: 20, hit: 28, exp: 30, haste: 14, armor: 0.003, mh: 16, oh: 9, th: 0, rg: 0.3 } }),
    combat: P({ fr: 'Combat', en: 'Combat', role: 'dps', pol: 'dw', cap: { hit: 8, exp: 6.5 },
      lev: { agi: 1.85, str: 1, ap: 1, sta: 0.7, crit: 16, hit: 18, exp: 18, haste: 12, armor: 0.005, mh: 15, oh: 8, th: 0, rg: 0.3 },
      end: { agi: 1.85, str: 1, ap: 1, sta: 0.15, crit: 20, hit: 28, exp: 30, haste: 14, armor: 0.003, mh: 17, oh: 9, th: 0, rg: 0.3 } }),
    sub: P({ fr: 'Finesse', en: 'Subtlety', role: 'dps', pol: 'dw', cap: { hit: 8, exp: 6.5 },
      lev: { agi: 1.85, str: 1, ap: 1, sta: 0.7, crit: 16, hit: 18, exp: 18, haste: 10, armor: 0.005, mh: 16, oh: 7, th: 0, rg: 0.3 },
      end: { agi: 1.8, str: 1, ap: 1, sta: 0.15, crit: 18, hit: 28, exp: 30, haste: 10, armor: 0.003, mh: 18, oh: 8, th: 0, rg: 0.3 } }),
  },
  priest: {
    disc: P({ fr: 'Discipline (soins)', en: 'Discipline (healer)', role: 'heal', pol: 'cast',
      lev: { heal: 1, sp: 1, mp5: 1.6, spi: 0.6, int: 0.5, sta: 0.25, crit: 8, rg: 0.5 },
      end: { heal: 1, sp: 1, mp5: 1.8, spi: 0.55, int: 0.5, sta: 0.1, crit: 8, rg: 0.1 } }),
    holy: P({ fr: 'Sacré (soins)', en: 'Holy (healer)', role: 'heal', pol: 'cast',   // Spiritual Guidance : 25 % de l'Esprit devient puissance de soins
      lev: { heal: 1, sp: 1, mp5: 1.6, spi: 0.8, int: 0.5, sta: 0.25, crit: 8, rg: 0.5 },
      end: { heal: 1, sp: 1, mp5: 1.8, spi: 0.8, int: 0.5, sta: 0.1, crit: 8, rg: 0.1 } }),
    shadow: P({ fr: 'Ombre', en: 'Shadow', role: 'cast', pol: 'cast', cap: { hit: 12 },
      lev: { sp: 1, sd: 1, shadow: 1, spi: 0.55, int: 0.45, sta: 0.3, crit: 7, hit: 6, haste: 4, mp5: 0.6, spen: 0.1, rg: 4 },
      end: { sp: 1, sd: 1, shadow: 1, spi: 0.25, int: 0.35, sta: 0.1, crit: 11, hit: 14, haste: 7, mp5: 0.6, spen: 0.4, rg: 0.5 } }),
  },
  shaman: {
    ele: P({ fr: 'Élémentaire', en: 'Elemental', role: 'cast', pol: 'cast', cap: { hit: 17 },
      lev: { sp: 1, sd: 1, nature: 0.9, fire: 0.35, frost: 0.25, int: 0.45, spi: 0.3, sta: 0.35, mp5: 1, crit: 9, hit: 6, haste: 6 },
      end: { sp: 1, sd: 1, nature: 0.9, fire: 0.3, frost: 0.2, int: 0.4, spi: 0.1, sta: 0.1, mp5: 1, crit: 12, hit: 14, haste: 8 } }),
    enh: P({ fr: 'Amélioration', en: 'Enhancement', role: 'dps', pol: 'two', cap: { hit: 8, exp: 6.5 },
      lev: { str: 2, ap: 1, int: 1.5, sp: 1, sd: 1, nature: 0.5, fire: 0.3, frost: 0.3, agi: 1, spi: 0.5, sta: 0.7, crit: 20, hit: 10, exp: 10, mp5: 0.5, th: 16, mh: 10, oh: 0.5 },
      end: { str: 2, ap: 1, int: 1.7, sp: 1.6, sd: 1.6, nature: 0.5, fire: 0.3, frost: 0.3, agi: 1, spi: 0.1, sta: 0.15, crit: 18, hit: 24, exp: 20, mp5: 0.5, th: 18, mh: 10, oh: 0.5 } }),
    resto: P({ fr: 'Restauration (soins)', en: 'Restoration (healer)', role: 'heal', pol: 'cast',
      lev: { heal: 1, sp: 1, crit: 13, int: 0.5, spi: 0.35, mp5: 1.2, sta: 0.25 },
      end: { heal: 1, sp: 1, crit: 13, int: 0.5, spi: 0.35, mp5: 1.2, sta: 0.1 } }),
  },
  mage: {
    arcane: P({ fr: 'Arcanes', en: 'Arcane', role: 'cast', pol: 'cast', cap: { hit: 11 },
      lev: { sp: 1, sd: 1, arcane: 1, fire: 0.1, frost: 0.1, int: 0.45, spi: 0.4, sta: 0.3, crit: 9, hit: 8, haste: 7, mp5: 0.8, rg: 4 },
      end: { sp: 1, sd: 1, arcane: 1, fire: 0.1, frost: 0.1, int: 0.4, spi: 0.15, sta: 0.1, crit: 12, hit: 15, haste: 9, mp5: 0.6, rg: 0.5 } }),
    fire: P({ fr: 'Feu', en: 'Fire', role: 'cast', pol: 'cast', cap: { hit: 11 },
      lev: { sp: 1, sd: 1, fire: 1, frost: 0.1, arcane: 0.1, int: 0.45, spi: 0.4, sta: 0.3, crit: 9, hit: 8, haste: 7, mp5: 0.8, rg: 4 },
      end: { sp: 1, sd: 1, fire: 1, frost: 0.05, arcane: 0.05, int: 0.4, spi: 0.15, sta: 0.1, crit: 12, hit: 15, haste: 9, mp5: 0.6, rg: 0.5 } }),
    frost: P({ fr: 'Givre', en: 'Frost', role: 'cast', pol: 'cast', cap: { hit: 11 },
      lev: { sp: 1, sd: 1, frost: 1, fire: 0.15, arcane: 0.1, int: 0.45, spi: 0.4, sta: 0.3, crit: 9, hit: 8, haste: 7, mp5: 0.8, rg: 4 },
      end: { sp: 1, sd: 1, frost: 1, fire: 0.1, arcane: 0.05, int: 0.4, spi: 0.15, sta: 0.1, crit: 12, hit: 15, haste: 9, mp5: 0.6, rg: 0.5 } }),
  },
  warlock: {
    affli: P({ fr: 'Affliction', en: 'Affliction', role: 'cast', pol: 'cast', cap: { hit: 12 },
      lev: { sp: 1, sd: 1, shadow: 1, fire: 0.15, hit: 9, int: 0.45, sta: 0.45, crit: 8, spi: 0.3, haste: 4, mp5: 0.6, rg: 4 },
      end: { sp: 1, sd: 1, shadow: 1, fire: 0.15, hit: 15, crit: 11, haste: 8, int: 0.35, sta: 0.15, spi: 0.1, mp5: 0.5, rg: 0.5 } }),
    demo: P({ fr: 'Démonologie', en: 'Demonology', role: 'cast', pol: 'cast', cap: { hit: 12 },
      lev: { sp: 1, sd: 1, shadow: 0.8, fire: 0.5, hit: 9, int: 0.45, sta: 0.5, crit: 8, spi: 0.3, haste: 4, mp5: 0.6, rg: 4 },
      end: { sp: 1, sd: 1, shadow: 0.8, fire: 0.5, hit: 15, crit: 11, haste: 8, int: 0.35, sta: 0.15, spi: 0.1, mp5: 0.5, rg: 0.5 } }),
    destro: P({ fr: 'Destruction', en: 'Destruction', role: 'cast', pol: 'cast', cap: { hit: 12 },
      lev: { sp: 1, sd: 1, fire: 1, shadow: 0.45, hit: 9, int: 0.45, sta: 0.45, crit: 8, spi: 0.3, haste: 6, mp5: 0.6, rg: 4 },
      end: { sp: 1, sd: 1, fire: 1, shadow: 0.45, hit: 15, haste: 11, crit: 9, int: 0.35, sta: 0.15, spi: 0.1, mp5: 0.5, rg: 0.5 } }),
  },
  druid: {
    balance: P({ fr: 'Équilibre', en: 'Balance', role: 'cast', pol: 'cast', cap: { hit: 17 },
      lev: { sp: 1, sd: 1, nature: 0.6, arcane: 0.6, int: 0.45, spi: 0.35, sta: 0.35, crit: 10, hit: 8, haste: 6, mp5: 0.8 },
      end: { sp: 1, sd: 1, nature: 0.6, arcane: 0.6, int: 0.4, spi: 0.1, sta: 0.1, crit: 13, hit: 15, haste: 8, mp5: 0.8 } }),
    cat: P({ fr: 'Farouche (chat)', en: 'Feral (cat)', role: 'dps', pol: 'two', cap: { hit: 8, exp: 6.5 },
      lev: { str: 2, agi: 2, ap: 1, sta: 0.8, spi: 0.6, int: 0.1, crit: 21, hit: 14, exp: 14, haste: 6, armor: 0.005, th: 14, mh: 14, oh: 0 },
      end: { str: 2, agi: 2, ap: 1, sta: 0.2, spi: 0.05, int: 0.05, crit: 22, hit: 24, exp: 26, haste: 6, armor: 0.003, th: 14, mh: 14, oh: 0 } }),
    bear: P({ fr: 'Farouche (ours, tank)', en: 'Feral (bear, tank)', role: 'tank', pol: 'two', cap: { hit: 8, exp: 6.5 },
      lev: { sta: 1, agi: 1, str: 0.55, armor: 0.08, def: 0.5, dodge: 12, exp: 10, hit: 8, crit: 3, ap: 0.25, spi: 0.3, th: 3, mh: 3, oh: 0 },
      end: { sta: 1, agi: 1, str: 0.5, armor: 0.09, def: 0.5, dodge: 12, exp: 12, hit: 9, crit: 3, ap: 0.2, th: 3, mh: 3, oh: 0 } }),
    resto: P({ fr: 'Restauration (soins)', en: 'Restoration (healer)', role: 'heal', pol: 'cast',
      lev: { heal: 1, sp: 1, int: 0.55, spi: 0.45, mp5: 1.4, crit: 8, sta: 0.25 },
      end: { heal: 1, sp: 1, int: 0.55, spi: 0.45, mp5: 1.4, crit: 8, sta: 0.1 } }),
  },
};
const G_SLOTS = ['head', 'neck', 'shoulder', 'back', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet', 'finger1', 'finger2', 'trinket1', 'trinket2', 'mh', 'oh', 'ranged'];
const G_SLOT_FR = { head: 'Tête', neck: 'Cou', shoulder: 'Épaules', back: 'Dos', chest: 'Torse', wrist: 'Poignets', hands: 'Mains', waist: 'Taille', legs: 'Jambes', feet: 'Pieds', finger1: 'Doigt', finger2: 'Doigt', trinket1: 'Bijou', trinket2: 'Bijou', mh: 'Main droite', oh: 'Main gauche', ranged: 'Distance' };
const G_SLOT_EN = { head: 'Head', neck: 'Neck', shoulder: 'Shoulders', back: 'Back', chest: 'Chest', wrist: 'Wrists', hands: 'Hands', waist: 'Waist', legs: 'Legs', feet: 'Feet', finger1: 'Finger', finger2: 'Finger', trinket1: 'Trinket', trinket2: 'Trinket', mh: 'Main hand', oh: 'Off hand', ranged: 'Ranged' };
const G_STAT_FR = { str: 'Force', agi: 'Agilité', sta: 'Endurance', int: 'Intelligence', spi: 'Esprit', ap: 'Puissance d\'attaque', rap: 'PA à distance',
  sp: 'Puissance des sorts', sd: 'Dégâts des sorts', heal: 'Puissance de soins', mp5: 'Mana/5 s', hp5: 'Vie/5 s', crit: 'Critique', hit: 'Toucher', haste: 'Hâte',
  exp: 'Expertise', dodge: 'Esquive', parry: 'Parade', block: 'Blocage', bv: 'Valeur de blocage', def: 'Défense', armor: 'Armure', spen: 'Pénétration des sorts',
  shadow: 'Dégâts d\'ombre', fire: 'Dégâts de feu', frost: 'Dégâts de givre', arcane: 'Dégâts des arcanes', nature: 'Dégâts de nature', holy: 'Dégâts du sacré' };
const G_STAT_EN = { str: 'Strength', agi: 'Agility', sta: 'Stamina', int: 'Intellect', spi: 'Spirit', ap: 'Attack Power', rap: 'Ranged AP', sp: 'Spell Power',
  sd: 'Spell Damage', heal: 'Healing', mp5: 'Mp5', hp5: 'Hp5', crit: 'Crit', hit: 'Hit', haste: 'Haste', exp: 'Expertise', dodge: 'Dodge', parry: 'Parry', block: 'Block',
  bv: 'Block Value', def: 'Defense', armor: 'Armor', spen: 'Spell Pen.', shadow: 'Shadow dmg', fire: 'Fire dmg', frost: 'Frost dmg', arcane: 'Arcane dmg', nature: 'Nature dmg', holy: 'Holy dmg' };
const G_PCTKEYS = new Set(['crit', 'hit', 'haste', 'exp', 'dodge', 'parry', 'block']);
const statLbl = k => (S.lang === 'fr' ? G_STAT_FR : G_STAT_EN)[k] || k;
const slotLbl = k => (S.lang === 'fr' ? G_SLOT_FR : G_SLOT_EN)[k] || k;
const G_RAID = /Molten Core|Blackwing|Ahn'Qiraj|Naxxramas|Onyxia|Zul'Gurub|Ruins of Ahn/;
const G_PVP = /^(?:Premier )?(Private|Corporal|Sergeant|Master Sergeant|Sergeant Major|Knight|Knight-Lieutenant|Knight-Captain|Knight-Champion|Lieutenant Commander|Commander|Marshal|Field Marshal|Grand Marshal|Scout|Grunt|Senior Sergeant|First Sergeant|Stone Guard|Blood Guard|Legionnaire|Centurion|Champion|Lieutenant General|General|Warlord|High Warlord)'s /;
// Récompenses de champs de bataille (réputation JcJ) : noms des intendants et des factions.
const G_BG = /Defilers|League of Arathor|Frostwolf|Stormpike|Warsong Outriders|Silverwing|Alterac Valley|Arathi Basin|Warsong Gulch/;
const G_BG_NAME = /^(Defiler's|Highlander's|Outrider's|Sentinel's|Legionnaire's|Deathguard's|Arathor|Frostwolf|Stormpike)/;
const G_JUNK = /^(Monster|Test|OLD|Deprecated|\[|QA|zzz|Gnome Head|Cosmic)/i;

// Objet metabot -> {slug, n, ic, q, il, rl, slot, cat, dps, armor, st:{clé: valeur}, cls, src, f}
function gearPrep(raw) {
  return raw.map(r => {
    const st = {};
    for (const [k, v] of Object.entries(r[10] || {})) {
      if (G_PCT[k]) st[G_PCT[k][0]] = (st[G_PCT[k][0]] || 0) + v / G_PCT[k][1];
      else if (G_FLAT[k]) st[G_FLAT[k]] = (st[G_FLAT[k]] || 0) + v;
    }
    // Niveau réel : certains objets n'ont pas de niveau requis (craft, quête, et même des objets de raid comme
    // Quick Strike Ring). Sans niveau requis on prend niveau d'objet − 9 (les nouvelles récompenses de quête Forever sont souvent 9 à 11 niveaux sous leur niveau d'objet), sinon au moins niveau d'objet − 10.
    const rl = r[5] > 1 ? Math.max(r[5], r[4] - 10) : Math.max(1, r[4] - 9);
    return { slug: r[0], n: r[1], ic: r[2], q: r[3], il: r[4], rl, rl0: rl !== (r[5] || 1), slot: r[6], cat: r[7], dps: r[8], armor: r[9], st, cls: r[11] || [], src: r[12], f: r[13] };
  }).filter(it => !G_JUNK.test(it.n) && !G_PVP.test(it.n));
}
function gearWeights(cls, spec, L) {
  const sp = G_SPECS[cls][spec]; const t = Math.max(0, Math.min(1, (L - 50) / 10)); const w = {};
  for (const k of new Set([...Object.keys(sp.lev), ...Object.keys(sp.end)])) w[k] = (sp.lev[k] || 0) * (1 - t) + (sp.end[k] || 0) * t;
  if (sp.int40 && L < 40) w.int *= 0.4;   // Vindicte : l'Intelligence ne donne de la puissance des sorts qu'avec Champion of the Light (40+)
  return w;
}
function gearStatScore(it, w) {
  let s = (w.armor || 0) * (it.armor || 0);
  for (const [k, v] of Object.entries(it.st)) s += (w[k] || 0) * v;
  return s;
}
// Ce que la classe peut porter à ce niveau.
function gearArmorMax(cls, L) { let m = 16; for (const [a, lv] of G_CLASSES[cls].arm) if (L >= lv) m = G_ARMOR[a]; return m; }
function gearUsable(it, cls, L) {
  if (it.rl > L) return false;
  if (it.cls.length && !it.cls.includes(cls)) return false;
  const c = G_CLASSES[cls];
  if (it.cat >= 16 && it.cat <= 19) return it.cat <= gearArmorMax(cls, L);
  if (it.cat === 20) return !!c.sh;
  if (it.cat === 26) return !!c.relic && it.cls.length > 0;
  if (it.cat <= 14) { if (!c.w.includes(it.cat)) return false; if (it.cat === 7 && L < 20) return false; return true; }
  return true;   // cou, anneaux, bijoux, capes, main gauche tenue
}
// Coût et disponibilité d'un objet pour la faction choisie.
function gearAvail(it, ctx) {
  const d = ctx.det[it.slug]; const fac = ctx.fac; const out = { ok: true, free: false, cost: null, how: [], raid: false, rare: false };
  const id = itemByEn(it.n); out.id = id;
  const ah = id && ctx.mk && ctx.mk.items[id] ? ctx.mk.items[id][MKT] : null;
  if (d) {
    if (d.q && d.q.length) {
      const qs = d.q.map(q => [q, ctx.qu[q[0]]]);
      const okq = qs.filter(([q, info]) => !info || !info[0] || info[0] === fac);
      if (okq.length) { out.free = true; out.how.push('q'); out.quests = okq; }
      else if (!d.b && !d.v && !ah) out.ok = false;
    }
    if (d.b && d.b.length) {
      const z = d.b.map(b => b[2]).join(' ');
      if (G_RAID.test(z)) out.raid = true;
      // Gratuit si c'est un boss / un élite de donjon avec au moins 2 % de chance, ou un monstre à 8 % et plus.
      const top = d.b[0]; const pct = top[1] || 0;
      if ((top[3] && pct >= 2) || pct >= 8 || (/drops from/.test(d.t || '') && pct >= 2)) { out.free = true; out.how.push('d'); }
      else { out.rare = true; out.how.push('w'); }
    }
    if (d.v && d.v.length) {
      const vs = d.v.filter(v => !v[1] || v[1] === fac);
      if (vs.length) { out.vendor = vs; const p = vs.map(v => v[6]).filter(x => x != null); out.vprice = p.length ? Math.min(...p) : null; out.how.push('v'); }
      else if (!out.how.length && !ah) out.ok = false;
    }
    if (d.c) out.how.push('c');
    if (d.bop) out.bop = true;
  } else if (it.src === 'q') { out.free = true; out.how.push('q'); out.unk = true; }
  else if (it.src === 'd') { out.how.push('w'); out.unk = true; }
  else if (it.src === 'v') { out.how.push('v'); out.unk = true; }
  else if (it.src === 'c') out.how.push('c');
  if (it.il >= 66 && it.rl >= 60) out.raid = true;
  // Quêtes de raid (Zul'Gurub, Ahn'Qiraj...) : metabot les classe dans la zone « Raid ».
  if (out.quests && out.quests.every(([q, info]) => info && (info[3] === 'Raid' || G_RAID.test(info[3]) || info[4] === 'Anachronos'))) out.raid = true;
  if (/^Zandalar /.test(it.n)) out.raid = true;
  // Objets d'événements saisonniers (Fête du Feu, Sanssaint...) : pas disponibles toute l'année.
  if (/Festival|Hallow|Winter Veil|Lunar|Noblegarden|Brewfest|Children's Week|Love is in the Air|Harvest Festival/i.test(it.n + ' ' + (out.quests || []).map(([q]) => q[1]).join(' '))) out.ok = false;
  // Quêtes qui demandent un objet de boss de raid (tête d'Onyxia, de Nefarian...).
  if (out.quests && out.quests.every(([q]) => /Onyxia|Nefarian|Ragnaros|C'Thun|Ossirian|Hakkar|Victory for the|Paragons of Power|Path of the Invoker|Kel'Thuzad|Majordomo|Scepter of the Shifting/.test(q[1]))) out.raid = true;
  // JcJ : récompenses de rang d'honneur ou de réputation de champ de bataille.
  if (G_BG_NAME.test(it.n) || (d && ((d.v || []).some(v => G_BG.test(v[2] + ' ' + v[3])) || (out.quests || []).some(([q, info]) => info && G_BG.test(info[3]))))) out.pvp = true;
  if (ah) { out.ah = ah; out.how.push('ah'); }
  // Objet crafté : coût des composants (prix HDV ou vendeur), comme dans les guides métiers.
  if (out.how.includes('c') && id && ctx.mk) {
    if (!S._rcByOut) { S._rcByOut = {}; for (const rc of S.recipes || []) if (!S._rcByOut[rc.o]) S._rcByOut[rc.o] = rc; }
    const rc = S._rcByOut[id];
    if (rc) { const cc = craftCost(rc, ctx.mk.items, ctx.vs || (ctx.vs = vendorSet())); if (!cc.missing) out.craft = Math.round(cc.cost / (rc.oq || 1)); }
  }
  // Niveau requis de la quête qui donne l'objet.
  if (out.quests) { const r = out.quests.map(([q, info]) => info && info[1] ? info[1] : 0); out.qreq = Math.min(...r); }
  // Coût : gratuit si quête ou boss de donjon, sinon le moins cher entre le vendeur et l'HDV.
  if (out.free) out.cost = 0;
  else { const c = [out.vprice, out.ah, out.craft].filter(x => x != null); out.cost = c.length ? Math.min(...c) : null; }
  return out;
}
function gearOpts() {
  let o = {}; try { o = JSON.parse(store('hf_gear') || '{}') || {}; } catch (e) {}
  if (o.v !== 2) { delete o.unk; o.v = 2; }   // anciennes préférences : « sources inconnues » repasse à non
  return Object.assign({ cls: 'hunter', spec: 'bm', lvl: charLevel() || 20, fac: farmSide() === 'a' ? 'a' : 'h', budget: -1, raid: 0, dung: 1, craft: 1, unk: 0, pvp: 0 }, o);
}
function gearSave(o) { store('hf_gear', JSON.stringify(o)); }
// Construit le meilleur stuff. Renvoie {slots:{slot:{it, sc, av, alts}}, total, cost, stats}.
function gearBuild(items, ctx, cls, spec, L, budget) {
  const sp = G_SPECS[cls][spec]; const c = G_CLASSES[cls];
  let w = gearWeights(cls, spec, L);
  const avail = new Map();
  const pool = items.filter(it => gearUsable(it, cls, L)).filter(it => {
    if (sp.cats && it.cat <= 9 && !sp.cats.includes(it.cat)) return false;
    const av = gearAvail(it, ctx); avail.set(it, av);
    if (!av.ok) return false;
    // Récompense de quête : la quête doit être faisable à ce niveau (sauf si on peut l'avoir autrement).
    if (av.qreq > L && av.how.every(h => h === 'q')) return false;
    if (av.raid && !ctx.raid) return false;
    if (av.pvp && !ctx.pvp) return false;
    // Butin aléatoire rare (monstres du monde, faible taux) : seulement s'il est en vente à l'HDV.
    if (av.how.length && av.how.every(h => h === 'w')) return false;
    if (!av.how.length && !ctx.unk) return false;
    if (!ctx.dung && av.how.length === 1 && av.how[0] === 'd' && !av.ah) return false;
    if (!ctx.craft && av.how.length === 1 && av.how[0] === 'c' && !av.ah) return false;
    return true;
  });
  const dwOk = c.dw && L >= c.dw && sp.pol === 'dw';
  const build = (w) => {
    // Source inconnue (souvent un nouvel objet Forever que metabot n'a pas encore relié à sa quête) : léger malus,
    // pour préférer un objet équivalent dont on sait où le trouver.
    const sc = (it, role) => (gearStatScore(it, w) + (role ? (w[role] || 0) * (it.dps || 0) : 0)) * (avail.get(it).how.length ? 1 : 0.85);
    const cand = {};
    const add = (slot, it, s) => { (cand[slot] = cand[slot] || []).push({ it, sc: s, av: avail.get(it) }); };
    for (const it of pool) {
      switch (it.slot) {
        case 'finger': add('finger', it, sc(it)); break;
        case 'trinket': add('trinket', it, sc(it)); break;
        case 'two-hand': add('th', it, sc(it, 'th')); break;
        case 'main-hand': add('mh', it, sc(it, 'mh')); break;
        case 'one-hand': add('mh', it, sc(it, 'mh')); if (dwOk) add('ohw', it, sc(it, 'oh')); break;
        case 'off-hand': if (it.cat === 20) add('shield', it, sc(it)); else if (dwOk) add('ohw', it, sc(it, 'oh')); break;
        case 'held-in-off-hand': add('frill', it, sc(it)); break;
        case 'ranged': case 'thrown': add('ranged', it, sc(it, 'rg')); break;
        case 'relic': add('ranged', it, sc(it)); break;
        default: add(it.slot, it, sc(it));
      }
    }
    for (const k in cand) cand[k] = cand[k].filter(e => e.sc > 0).sort((a, b) => b.sc - a.sc);
    return cand;
  };
  const choose = (cand) => {
    const pick = {}; const used = new Set();
    const fits = e => budget < 0 || (e.av.cost != null && e.av.cost === 0) || (e.av.cost != null && e.av.cost <= budget);
    const firstFree = (list, excl) => (list || []).find(e => !excl.has(e.it.n) && (budget < 0 ? true : e.av.cost === 0));
    const first = (list, excl) => (list || []).find(e => !excl.has(e.it.n) && fits(e));
    // 1. stuff de départ : budget < 0 = sans limite, sinon on part des objets gratuits.
    const get = (list) => budget < 0 ? first(list, used) : firstFree(list, used);
    for (const s of ['head', 'neck', 'shoulder', 'back', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet']) pick[s] = get(cand[s]);
    pick.finger1 = get(cand.finger); if (pick.finger1) used.add(pick.finger1.it.n);
    pick.finger2 = get(cand.finger); used.clear();
    pick.trinket1 = get(cand.trinket); if (pick.trinket1) used.add(pick.trinket1.it.n);
    pick.trinket2 = get(cand.trinket); used.clear();
    pick.ranged = get(cand.ranged);
    weaponPick(pick, cand, get);
    // Panoplies : bonus pris en compte (on ne garde que les pièces qui rentrent dans le budget).
    gearApplySets(pick, budget < 0 ? cand : Object.fromEntries(Object.entries(cand).map(([k, l]) => [k, l.filter(e => e.av.cost === 0)])), w);
    // 2. budget : on dépense dans les meilleures améliorations par pièce d'or.
    if (budget > 0) {
      let left = budget;
      for (let guard = 0; guard < 60; guard++) {
        let best = null;
        for (const s of G_SLOTS) {
          if (s === 'oh' && pick.mh && pick.mh.two) continue;
          const listKey = s.startsWith('finger') ? 'finger' : s.startsWith('trinket') ? 'trinket' : s;
          if (['mh', 'oh'].includes(s)) continue;
          const curSc = pick[s] ? pick[s].sc : 0; const curC = pick[s] && pick[s].av.cost ? pick[s].av.cost : 0;
          const other = s === 'finger1' ? pick.finger2 : s === 'finger2' ? pick.finger1 : s === 'trinket1' ? pick.trinket2 : s === 'trinket2' ? pick.trinket1 : null;
          for (const e of cand[listKey] || []) {
            if (e.sc <= curSc) break;
            if (other && other.it.n === e.it.n) continue;
            const extra = (e.av.cost || 0) - curC; if (e.av.cost == null || extra > left) continue;
            const ratio = (e.sc - curSc) / Math.max(extra, 1);
            if (!best || ratio > best.ratio) best = { s, e, ratio, extra };
          }
        }
        if (!best) break;
        pick[best.s] = best.e; left -= best.extra;
      }
      // Armes (combinaisons) avec ce qui reste.
      weaponPick(pick, cand, list => (list || []).find(e => e.av.cost === 0 || (e.av.cost != null && e.av.cost <= left)));
    }
    return pick;
  };
  const weaponPick = (pick, cand, get) => {
    const th = get(cand.th); const mh = get(cand.mh);
    let oh = null;
    if (sp.pol === 'sh') oh = get(cand.shield) || get(cand.frill);
    else if (dwOk) { const l = (cand.ohw || []).filter(e => !mh || e.it.n !== mh.it.n); oh = get(l); }
    else if (sp.pol === 'cast' || sp.pol === 'two') oh = get(cand.frill) || (c.sh ? get(cand.shield) : null);
    const one = (mh ? mh.sc : 0) + (oh ? oh.sc : 0);
    let twoH = th ? th.sc : -1;
    if (sp.pol === 'two' && th) twoH *= 1.0; else if (sp.pol === 'sh') twoH = -1;   // tanks : bouclier obligatoire
    if (th && twoH >= one) { pick.mh = Object.assign({}, th, { two: true }); pick.oh = null; }
    else { pick.mh = mh || null; pick.oh = oh || null; }
  };
  let cand = build(w); let pick = choose(cand);
  // Plafonds de toucher/expertise : au-delà, la stat ne sert presque plus ; on recalcule avec un poids réduit.
  if (sp.cap && L >= 50) {
    const tot = gearTotals(pick); let again = false;
    for (const k of Object.keys(sp.cap)) if ((tot[k] || 0) > sp.cap[k]) { w = Object.assign({}, w, { [k]: w[k] * sp.cap[k] / tot[k] * 0.5 }); again = true; }
    if (again) { cand = build(w); pick = choose(cand); }
  }
  const out = { slots: {}, cand };
  let total = 0, cost = 0;
  for (const s of G_SLOTS) {
    const e = pick[s]; out.slots[s] = e || null;
    if (e) { total += e.sc; cost += e.av.cost || 0; }
  }
  out.total = total; out.cost = cost; out.stats = gearTotals(pick); out.w = w;
  return out;
}
// Bonus de panoplie -> stats (quand le texte est une stat simple) ; le reste (effets, procs) est affiché sans être chiffré.
const G_BONUS_STAT = { strength: 'str', agility: 'agi', stamina: 'sta', intellect: 'int', spirit: 'spi', 'attack power': 'ap', 'ranged attack power': 'rap',
  armor: 'armor', defense: 'def', 'spell power': 'sp', healing: 'heal', 'healing power': 'heal', 'spell damage': 'sd', 'block value': 'bv' };
function gearBonusStats(txt) {
  const st = {}; let m;
  const rx = /\+(\d+) (Ranged Attack Power|Attack Power|Strength|Agility|Stamina|Intellect|Spirit|Armor|Defense|Spell Power|Healing Power|Healing|Spell Damage|Block Value)\b/gi;
  while ((m = rx.exec(txt))) { const k = G_BONUS_STAT[m[2].toLowerCase()]; st[k] = (st[k] || 0) + Number(m[1]); }
  if ((m = /damage and healing done by magical spells and effects by up to (\d+)/i.exec(txt))) st.sp = (st.sp || 0) + Number(m[1]);
  else if ((m = /healing done by spells and effects by up to (\d+)/i.exec(txt))) st.heal = (st.heal || 0) + Number(m[1]);
  if ((m = /chance to hit by (\d+(?:\.\d+)?)%/i.exec(txt))) st.hit = (st.hit || 0) + Number(m[1]);
  if ((m = /critical strike by (\d+(?:\.\d+)?)%/i.exec(txt))) st.crit = (st.crit || 0) + Number(m[1]);
  if ((m = /(\d+) mana (?:every|per) 5 sec/i.exec(txt))) st.mp5 = (st.mp5 || 0) + Number(m[1]);
  if ((m = /Increases attack power by (\d+)/i.exec(txt))) st.ap = (st.ap || 0) + Number(m[1]);
  if ((m = /chance to dodge an attack by (\d+(?:\.\d+)?)%/i.exec(txt))) st.dodge = (st.dodge || 0) + Number(m[1]);
  return st;
}
function gearSetOf(slug) {
  const sets = (S.gearDet && S.gearDet.sets) || {};
  if (!S._setBySlug) { S._setBySlug = {}; for (const [k, v] of Object.entries(sets)) for (const p of v[1]) S._setBySlug[p] = k; }
  return S._setBySlug[slug] || null;
}
function gearSetValue(setKey, n, w) {
  const set = S.gearDet.sets[setKey]; let v = 0;
  for (const [c, txt] of set[2]) if (c <= n) { const st = gearBonusStats(txt); for (const [k, x] of Object.entries(st)) v += (w[k] || 0) * x; }
  return v;
}
// Essaie, panoplie par panoplie, de remplacer des pièces quand le bonus vaut plus que ce qu'on perd.
function gearApplySets(pick, cand, w) {
  if (!S.gearDet || !S.gearDet.sets) return;
  const DOLL = { head: 'head', neck: 'neck', shoulder: 'shoulder', back: 'back', chest: 'chest', wrist: 'wrist', hands: 'hands', waist: 'waist', legs: 'legs', feet: 'feet', finger: ['finger1', 'finger2'], trinket: ['trinket1', 'trinket2'] };
  const locked = new Set();
  for (let round = 0; round < 3; round++) {
    let best = null;
    const bySet = {};
    for (const [lk, slots] of Object.entries(DOLL)) for (const e of cand[lk] || []) {
      const sk = gearSetOf(e.it.slug); if (!sk) continue;
      (bySet[sk] = bySet[sk] || []).push({ e, slots: [].concat(slots) });
    }
    for (const [sk, mem] of Object.entries(bySet)) {
      // Une pièce par emplacement (la meilleure), avec ce qu'on perd à la mettre.
      const opts = [];
      const used = new Set();
      for (const m of mem.sort((a, b) => b.e.sc - a.e.sc)) {
        const slot = m.slots.filter(s => !locked.has(s) && !used.has(s)).sort((a, b) => (pick[a] ? pick[a].sc : 0) - (pick[b] ? pick[b].sc : 0))[0];
        if (!slot || opts.some(o => o.e.it.n === m.e.it.n)) continue;
        const already = pick[slot] && pick[slot].it === m.e.it;
        opts.push({ e: m.e, slot, loss: already ? 0 : (pick[slot] ? pick[slot].sc : 0) - m.e.sc });
        used.add(slot);
      }
      opts.sort((a, b) => a.loss - b.loss);
      const base = gearSetValue(sk, opts.filter(o => o.loss === 0 && pick[o.slot] && pick[o.slot].it === o.e.it).length, w);
      for (let n = 2; n <= opts.length; n++) {
        const take = opts.slice(0, n); const loss = take.reduce((a, o) => a + o.loss, 0);
        const gain = gearSetValue(sk, n, w) - base - loss;
        if (gain > 0.5 && (!best || gain > best.gain)) best = { gain, take, sk };
      }
    }
    if (!best) break;
    for (const o of best.take) { pick[o.slot] = o.e; locked.add(o.slot); }
  }
}
function gearSetsIn(slots) {
  const cnt = {};
  for (const s of G_SLOTS) { const e = slots[s]; if (!e) continue; const sk = gearSetOf(e.it.slug); if (sk) (cnt[sk] = cnt[sk] || []).push(e.it); }
  return Object.entries(cnt).map(([sk, its]) => ({ sk, its, set: S.gearDet.sets[sk] }));
}
function gearBonusLbl(txt) {
  const st = gearBonusStats(txt);
  if (/^\+\d+ [A-Za-z ]+\.?$/.test(txt.trim()) && Object.keys(st).length) return Object.entries(st).map(([k, v]) => `+${v}${G_PCTKEYS.has(k) ? ' %' : ''} ${statLbl(k)}`).join(', ');
  return esc(txt);
}
function gearSetsHtml(slots) {
  if (!S.gearDet || !S.gearDet.sets) return '';
  const list = gearSetsIn(slots).filter(g => g.its.length >= 1);
  if (!list.length) return `<h3>${t('ge_sets')}</h3><p class="small muted">${t('ge_sets_none')}</p>`;
  return `<h3>${t('ge_sets')}</h3>` + list.map(g => `<div class="gset"><b>${esc(g.set[0])}</b> <span class="dim">(${g.its.length}/${g.set[1].length})</span>
    <div class="small dim">${g.set[1].map(p => { const has = g.its.some(i => i.slug === p); const it = S.gear.find(x => x.slug === p); return `<span class="${has ? 'q-2' : ''}">${esc(it ? it.n : p)}</span>`; }).join(' · ')}</div>
    ${g.set[2].map(([c, txt]) => `<div class="small ${c <= g.its.length ? 'gset-on' : 'dim'}">(${c}) ${gearBonusLbl(txt)}</div>`).join('')}</div>`).join('')
    + `<p class="note">${t('ge_sets_note')}</p>`;
}
function gearTotals(pick) {
  const tot = {};
  for (const s of G_SLOTS) { const e = pick[s]; if (!e) continue; for (const [k, v] of Object.entries(e.it.st)) tot[k] = (tot[k] || 0) + v; tot.armor = (tot.armor || 0) + (e.it.armor || 0); }
  if (S.gearDet && S.gearDet.sets) for (const g of gearSetsIn(pick)) for (const [c, txt] of g.set[2]) if (c <= g.its.length) for (const [k, v] of Object.entries(gearBonusStats(txt))) tot[k] = (tot[k] || 0) + v;
  return tot;
}
function gearIcon(it, size = 36) {
  return `<img class="gi q${it.q}" src="https://render.worldofwarcraft.com/eu/icons/56/${esc(it.ic)}.jpg" width="${size}" height="${size}" alt="" loading="lazy" onerror="if(!this.dataset.f){this.dataset.f=1;this.src='https://metabot.gg/web/wow-forever/icons/${esc(it.ic)}.webp'}">`;
}
function gearStatLine(it, max = 4) {
  const parts = [];
  if (it.dps) parts.push(`${num(it.dps, 1)} ${t('ge_dps')}`);
  const keys = Object.entries(it.st).sort((a, b) => b[1] - a[1]);
  for (const [k, v] of keys.slice(0, max)) parts.push(`${v < 0 ? '−' : '+'}${G_PCTKEYS.has(k) ? num(Math.abs(v), 1) + ' %' : num(Math.abs(v))} ${statLbl(k)}`);
  if (!keys.length && it.armor) parts.push(`${num(it.armor)} ${statLbl('armor')}`);
  return parts.join(' · ');
}
function gearHowShort(av) {
  const m = { q: t('ge_h_q'), d: t('ge_h_d'), w: t('ge_h_w'), v: t('ge_h_v'), c: t('ge_h_c'), ah: t('ge_h_ah') };
  return av.how.map(h => m[h]).filter(Boolean).join(' · ') || t('ge_h_unk');
}
const QFAC = f => f === 'h' ? 'Horde' : f === 'a' ? 'Alliance' : t('ge_both');
function gearHowLong(it, av, ctx) {
  const d = ctx.det[it.slug]; const L = [];
  if (av.quests) for (const [q, info] of av.quests) L.push(`📜 ${t('ge_quest')} <b>${esc(q[1])}</b>${info ? `${info[3] && info[3] !== 'Dungeon' ? ' · ' + zoneName(info[3]) : ''} · ${QFAC(info[0])}${info[1] ? ` · ${t('ge_req')} ${info[1]}` : ''}${info[4] ? ` · ${t('ge_start')} ${esc(info[4])}${info[5] != null ? ` (${info[5]}, ${info[6]})` : ''}` : ''}` : ''}`);
  if (d && d.b) for (const b of d.b.slice(0, 3)) L.push(`⚔️ ${esc(b[0])}${b[4] ? ` (${t('lvl_s')} ${b[4]}${b[5] && b[5] !== b[4] ? '–' + b[5] : ''})` : ''} · ${zoneName(b[2].split('/')[0])}${b[1] != null ? ` · <b>${b[1] < 0.1 ? '< 0,1 %' : pctTxt(b[1])}</b>` : ''}`);
  if (d && d.bn > 3) L.push(`<span class="dim">${t('ge_more_mobs', { n: d.bn - 3 })}</span>`);
  if (av.vendor) for (const v of av.vendor.slice(0, 3)) L.push(`🛒 ${esc(v[0])} · ${zoneName(v[3])}${v[4] != null ? ` (${v[4]}, ${v[5]})` : ''}${v[6] != null ? ` · ${money(v[6])}` : ''}`);
  if (d && d.c) L.push(`🔨 ${profName(d.c[0])} ${d.c[1]}`);
  if (av.ah) L.push(`💰 ${t('ge_ah')} ${money(av.ah)}`);
  if (!L.length) L.push(d ? `<b>${t('ge_h_unk')}</b>${d.t ? `<div class="dim small">${esc(d.t)}</div>` : ''}` : `<span class="dim">${t('ge_h_pending')}</span>`);
  return L.join('<br>');
}
// Colonne coût : gratuit (quête/donjon) mais on dit aussi si on peut l'acheter à l'HDV et combien.
function gearCostCell(av) {
  const ahLine = av.ah ? `<div class="small">${av.cost === 0 ? t('ge_or_ah') : t('ge_ah')} ${money(av.ah)}</div>` : '';
  if (av.cost === 0) return `<span class="badge good">${t('ge_free')}</span>${ahLine || `<div class="small dim">${av.bop ? t('ge_bop') : t('ge_not_ah')}</div>`}`;
  if (av.cost) return money(av.cost) + (av.cost === av.craft ? `<div class="small dim">${t('ge_mats')}</div>` : '') + (av.ah && av.ah !== av.cost ? ahLine : '');
  return `<span class="dim">?</span>${ahLine}`;
}
function gearItemLink(it, av) {
  const name = `<span class="q-${it.q}">${esc(av && av.id ? itemName(av.id) : it.n)}</span>`;
  return av && av.id ? `<a href="#/item/${av.id}">${name}</a>` : `<a href="https://metabot.gg/en/wow-forever/items/${esc(it.slug)}" target="_blank" rel="noopener">${name} ↗</a>`;
}
function gearSpecName(cls, spec) { const s = G_SPECS[cls][spec]; return S.lang === 'fr' ? s.fr : s.en; }
function gearClassName(cls) { const c = G_CLASSES[cls]; return S.lang === 'fr' ? c.fr : c.en; }
const G_DOLL_L = ['head', 'neck', 'shoulder', 'back', 'chest', 'wrist'];
const G_DOLL_R = ['hands', 'waist', 'legs', 'feet', 'finger1', 'finger2', 'trinket1', 'trinket2'];
const G_DOLL_B = ['mh', 'oh', 'ranged'];
function gearSlotBox(s, e) {
  if (!e) return `<div class="gs empty" title="${esc(slotLbl(s))}"><span>${esc(slotLbl(s)).slice(0, 3)}</span></div>`;
  const it = e.it; const tip = `${it.n} (${t('lvl_s')} ${it.rl})\n${gearStatLine(it, 6).replace(/<[^>]+>/g, '')}\n${gearHowShort(e.av)}${e.av.cost ? ' · ' + (e.av.cost / 10000).toFixed(2) + ' po' : e.av.ah ? ' · HDV ' + (e.av.ah / 10000).toFixed(2) + ' po' : ''}`;
  return `<div class="gs" title="${esc(tip)}">${gearIcon(it)}</div>`;
}
function gearKeyStats(cls, spec, tot) {
  const sp = G_SPECS[cls][spec]; const w = sp.end;
  const keys = Object.keys(tot).filter(k => k !== 'armor' && (w[k] || 0) > 0 && tot[k]).sort((a, b) => (w[b] * tot[b]) - (w[a] * tot[a])).slice(0, 5);
  return keys.map(k => `<div><b>${G_PCTKEYS.has(k) ? num(tot[k], 1) + ' %' : num(tot[k])}</b> <span class="dim">${esc(statLbl(k))}</span></div>`).join('');
}
function gearCard(cls, spec, L, r, opts) {
  const c = G_CLASSES[cls];
  return `<a class="gcard" href="#/gear/${cls}/${spec}/${L}">
    <div class="gc-head" style="--cc:${c.col}"><b>${esc(gearSpecName(cls, spec))}</b><span>${esc(gearClassName(cls))} · ${t('lvl_s')} ${L}</span></div>
    <div class="gc-doll"><div class="gc-col">${G_DOLL_L.map(s => gearSlotBox(s, r.slots[s])).join('')}</div>
      <div class="gc-mid"><img src="https://render.worldofwarcraft.com/eu/icons/56/classicon_${cls}.jpg" width="44" height="44" alt=""><div class="gc-stats">${gearKeyStats(cls, spec, r.stats)}</div></div>
      <div class="gc-col">${G_DOLL_R.map(s => gearSlotBox(s, r.slots[s])).join('')}</div></div>
    <div class="gc-wep">${G_DOLL_B.map(s => s === 'oh' && r.slots.mh && r.slots.mh.two ? '<div class="gs empty two"><span>2M</span></div>' : gearSlotBox(s, r.slots[s])).join('')}</div>
    <div class="gc-foot"><span>${r.cost ? money(r.cost) : t('ge_free')}</span><span class="dim">${t('ge_see')}</span></div></a>`;
}
async function gearData() {
  if (!S.gear) {
    const g = await load('gear').catch(() => null);
    if (!g || !g.items || !g.items.length) return null;
    S.gear = gearPrep(g.items); S.gearT = g.t;
  }
  if (!S.gearDet) { const d = await load('geardet').catch(() => null); S.gearDet = d || { det: {}, qu: {} }; }
  return S.gear;
}
async function gearCtx(o) {
  const m = await market(viewHouseId()).catch(() => null);
  return { det: S.gearDet.det || {}, qu: S.gearDet.qu || {}, mk: m, fac: o.fac, raid: o.raid, dung: o.dung, craft: o.craft, unk: o.unk, pvp: o.pvp };
}
const G_LEVELS = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
const G_BUDGETS = [[-1, 'ge_b_all'], [0, 'ge_b_free'], [10000, '1 po'], [50000, '5 po'], [200000, '20 po'], [1000000, '100 po']];
async function viewGear() {
  const items = await gearData();
  const o = gearOpts();
  if (!items) { app().innerHTML = `<div class="hero"><h1>${t('ge_title')}</h1></div><div class="panel">${t('ge_nodata')}</div>`; return; }
  const ctx = await gearCtx(o);
  const known = Object.keys(ctx.det).length;
  const cls = G_CLASSES[o.cls] ? o.cls : 'hunter'; const specs = Object.keys(G_SPECS[cls]);
  const spec = o.spec === 'all' || specs.includes(o.spec) ? o.spec : specs[0];
  app().innerHTML = `<div class="hero"><h1>${t('ge_title')}</h1><p>${t('ge_sub')}</p></div>
    <div class="gwrap"><aside class="panel gfilt">
      <h3>${t('ge_filters')}</h3>
      <div class="gf"><span class="small muted">${t('ge_class')}</span><div class="gcls">${Object.keys(G_CLASSES).map(k => `<button class="chip ${k === cls ? 'on' : ''}" data-gc="${k}" title="${esc(gearClassName(k))}"><img src="https://render.worldofwarcraft.com/eu/icons/56/classicon_${k}.jpg" width="22" height="22" alt=""> ${esc(gearClassName(k))}</button>`).join('')}</div></div>
      <div class="gf"><span class="small muted">${t('ge_spec')}</span><div class="row">${['all', ...specs].map(k => `<button class="chip small ${k === spec ? 'on' : ''}" data-gsp="${k}">${k === 'all' ? t('ge_all_specs') : esc(gearSpecName(cls, k))}</button>`).join('')}</div></div>
      <div class="gf"><label>${t('ge_level')} <input type="number" id="glvl" min="1" max="60" value="${o.lvl}"></label></div>
      <div class="gf"><span class="small muted">${t('ge_faction')}</span><div class="row">${['h', 'a'].map(k => `<button class="chip small ${k === o.fac ? 'on' : ''}" data-gfa="${k}">${k === 'h' ? 'Horde' : 'Alliance'}</button>`).join('')}</div></div>
      <div class="gf"><span class="small muted">${t('ge_budget')}</span><div class="row">${G_BUDGETS.map(([v, l]) => `<button class="chip small ${v === o.budget ? 'on' : ''}" data-gb="${v}">${l.startsWith('ge_') ? t(l) : l}</button>`).join('')}</div></div>
      <div class="gf"><label class="chk"><input type="checkbox" id="gdung" ${o.dung ? 'checked' : ''}> ${t('ge_dung')}</label>
        <label class="chk"><input type="checkbox" id="gcraft" ${o.craft ? 'checked' : ''}> ${t('ge_craft')}</label>
        <label class="chk"><input type="checkbox" id="graid" ${o.raid ? 'checked' : ''}> ${t('ge_raid')}</label>
        <label class="chk"><input type="checkbox" id="gpvp" ${o.pvp ? 'checked' : ''}> ${t('ge_pvp')}</label>
        <label class="chk"><input type="checkbox" id="gunk" ${o.unk ? 'checked' : ''}> ${t('ge_unk')}</label></div>
      <p class="note">${t('ge_src_note', { k: num(known), n: num(items.length) })}</p>
      <p class="note">${t('ge_cover')}</p>
    </aside><div class="ggrid" id="ggrid"></div></div>`;
  const draw = () => {
    const L = Math.max(1, Math.min(60, Number(o.lvl) || 1));
    const cards = [];
    if (spec === 'all') for (const s of specs) cards.push([s, L]);
    else { cards.push([spec, L]); for (const l of G_LEVELS) if (l !== L) cards.push([spec, l]); }
    $('#ggrid').innerHTML = cards.map(([s, l]) => gearCard(cls, s, l, gearBuild(items, ctx, cls, s, l, o.budget), o)).join('');
  };
  const save = () => { gearSave(o); };
  app().querySelectorAll('[data-gc]').forEach(b => b.onclick = () => { o.cls = b.dataset.gc; o.spec = 'all'; save(); viewGear(); });
  app().querySelectorAll('[data-gsp]').forEach(b => b.onclick = () => { o.spec = b.dataset.gsp; save(); viewGear(); });
  app().querySelectorAll('[data-gfa]').forEach(b => b.onclick = () => { o.fac = b.dataset.gfa; save(); viewGear(); });
  app().querySelectorAll('[data-gb]').forEach(b => b.onclick = () => { o.budget = Number(b.dataset.gb); save(); viewGear(); });
  $('#glvl').onchange = () => { o.lvl = Number($('#glvl').value) || 1; save(); draw(); };
  [['gdung', 'dung'], ['gcraft', 'craft'], ['graid', 'raid'], ['gpvp', 'pvp'], ['gunk', 'unk']].forEach(([id, k]) => $('#' + id).onchange = e => { o[k] = e.target.checked ? 1 : 0; save(); viewGear(); });
  draw();
}
async function viewGearDetail(cls, spec, L) {
  const items = await gearData();
  if (!items || !G_SPECS[cls] || !G_SPECS[cls][spec]) { location.hash = '#/gear'; return; }
  const o = gearOpts(); const ctx = await gearCtx(o);
  const r = gearBuild(items, ctx, cls, spec, L, o.budget);
  const c = G_CLASSES[cls]; const sp = G_SPECS[cls][spec];
  // Améliorations à venir : on recalcule le stuff aux niveaux suivants et on repère les gros bonds par emplacement.
  const hz = o.hz || 5; const up = {};
  const wsc = (sl) => sl.mh ? sl.mh.sc + (sl.oh && !sl.mh.two ? sl.oh.sc : 0) : 0;
  for (let k = 1; k <= hz && L + k <= 60; k++) {
    const rk = gearBuild(items, ctx, cls, spec, L + k, o.budget);
    for (const s of G_SLOTS) {
      if (s === 'oh') continue;
      const cur = s === 'mh' ? wsc(r.slots) : (r.slots[s] ? r.slots[s].sc : 0);
      const nx = s === 'mh' ? wsc(rk.slots) : (rk.slots[s] ? rk.slots[s].sc : 0);
      const e2 = rk.slots[s]; if (!e2 || (r.slots[s] && e2.it === r.slots[s].it)) continue;
      // Gain mesuré sur l'ensemble du stuff (sinon remplacer un objet blanc donne des +5000 % sans intérêt).
      const gain = (nx - cur) / Math.max(r.total, 1);
      if (gain < 0.03) continue;
      if (!up[s] || gain > up[s].gain + 0.05) up[s] = { gain, lvl: L + k, e: e2, oh: s === 'mh' && !e2.two ? rk.slots.oh : null };
    }
  }
  const upHtml = (s) => {
    const u = up[s]; if (!u) return '';
    const big = u.gain >= 0.07;
    const cur = r.slots[s]; const wait = cur && cur.av.cost > 0 && u.lvl - L <= 3;
    return `<div class="gup ${big ? 'big' : ''}">${big ? '🔥' : '⏫'} ${t('ge_up', { n: u.lvl - L, l: u.lvl })} : ${gearIcon(u.e.it, 20)} ${gearItemLink(u.e.it, u.e.av)}${u.oh ? ' + ' + gearItemLink(u.oh.it, u.oh.av) : ''}
      <b>+${Math.round(u.gain * 100)} %</b> <span class="dim">· ${gearHowShort(u.e.av)}${u.e.av.cost ? ' · ' + money(u.e.av.cost) : u.e.av.ah ? ' · ' + t('ge_ah') + ' ' + money(u.e.av.ah) : ''}</span>
      <div class="small">${gearStatLine(u.e.it, 5)}</div>${wait ? `<div class="small warnc">${t('ge_wait')}</div>` : ''}</div>`;
  };
  const upList = Object.entries(up).sort((a, b) => b[1].gain - a[1].gain);
  const row = (s) => {
    const e = r.slots[s];
    if (!e) { if (s === 'oh' && r.slots.mh && r.slots.mh.two) return ''; return `<tr><td class="l dim">${esc(slotLbl(s))}</td><td colspan="3" class="dim">${t('ge_none')}${upHtml(s)}</td></tr>`; }
    const listKey = s.startsWith('finger') ? 'finger' : s.startsWith('trinket') ? 'trinket' : s === 'mh' ? (e.two ? 'th' : 'mh') : s === 'oh' ? null : s;
    const alts = listKey && r.cand[listKey] ? r.cand[listKey].filter(x => x.it !== e.it).slice(0, 3) : [];
    return `<tr><td class="l">${esc(slotLbl(s))}${e.two ? ' <span class="badge">2M</span>' : ''}</td>
      <td class="l"><div class="gitem">${gearIcon(e.it, 32)}<div>${gearItemLink(e.it, e.av)} <span class="dim">· ${t('lvl_s')} ${e.it.rl}</span><div class="small">${gearStatLine(e.it, 6)}</div></div></div>
        ${alts.length ? `<details class="galts"><summary class="small">${t('ge_alts')}</summary>${alts.map(a => `<div class="gitem small">${gearIcon(a.it, 20)}<div>${gearItemLink(a.it, a.av)} <span class="dim">${t('lvl_s')} ${a.it.rl} · ${Math.round(a.sc / Math.max(e.sc, 1) * 100)} % · ${gearHowShort(a.av)}${a.av.cost ? ' · ' + money(a.av.cost) : a.av.ah ? ' · ' + t('ge_ah') + ' ' + money(a.av.ah) : ''}</span></div></div>`).join('')}</details>` : ''}${upHtml(s)}</td>
      <td class="l small">${gearHowLong(e.it, e.av, ctx)}</td><td class="r">${gearCostCell(e.av)}</td></tr>`;
  };
  const tot = r.stats;
  const w = r.w;
  const prio = Object.keys(w).filter(k => !['th', 'mh', 'oh', 'rg', 'armor'].includes(k) && w[k] > 0).sort((a, b) => w[b] / (G_PCTKEYS.has(b) ? 15 : 1) - w[a] / (G_PCTKEYS.has(a) ? 15 : 1)).slice(0, 7);
  app().innerHTML = `<div class="hero"><p><a href="#/gear">← ${t('ge_back')}</a></p><h1 style="color:${c.col}">${esc(gearSpecName(cls, spec))} · ${esc(gearClassName(cls))}</h1>
      <p>${t('lvl_s')} <input type="number" id="gdl" min="1" max="60" value="${L}" style="width:64px"> · ${o.fac === 'h' ? 'Horde' : 'Alliance'} · ${t('ge_budget')} ${o.budget < 0 ? t('ge_b_all') : o.budget === 0 ? t('ge_b_free') : money(o.budget)}</p></div>
    <div class="gwrap"><aside class="panel">${gearCard(cls, spec, L, r, o).replace('<a class="gcard"', '<div class="gcard static"').replace(/<\/a>$/, '</div>')}
      <h3>${t('ge_totals')}</h3><div class="gtot">${Object.keys(tot).filter(k => tot[k] && (k === 'armor' || (w[k] || 0) > 0)).sort((a, b) => (w[b] || 0) * tot[b] - (w[a] || 0) * tot[a]).map(k => `<div><span class="dim">${esc(statLbl(k))}</span><b>${G_PCTKEYS.has(k) ? num(tot[k], 1) + ' %' : num(tot[k])}</b></div>`).join('')}</div>
      <h3>${t('ge_prio')}</h3><ol class="small">${prio.map(k => `<li>${esc(statLbl(k))}</li>`).join('')}</ol>
      <p class="note">${t('ge_prio_src')}</p>
      ${sp.cap && L >= 50 ? `<p class="note">${t('ge_caps', { h: sp.cap.hit, e: sp.cap.exp || '–' })}</p>` : ''}
      <p><b>${t('ge_total_cost')} :</b> ${r.cost ? money(r.cost) : t('ge_free')}</p>
      ${gearSetsHtml(r.slots)}</aside>
    <div class="panel"><div class="gupbox"><div class="row"><h3 style="margin:0">${t('ge_up_title')}</h3>
        <span class="small muted" style="margin-left:auto">${t('ge_up_hz')}</span>${[3, 5, 10].map(h => `<button class="chip small ${h === hz ? 'on' : ''}" data-hz="${h}">${h}</button>`).join('')}</div>
      ${upList.length ? `<ul class="small">${upList.slice(0, 6).map(([s2, u]) => `<li>${u.gain >= 0.07 ? '🔥' : '⏫'} <b>${esc(slotLbl(s2))}</b> : ${gearItemLink(u.e.it, u.e.av)} ${t('lvl_s')} ${u.lvl} (<b>+${Math.round(u.gain * 100)} %</b>, ${gearHowShort(u.e.av)})</li>`).join('')}</ul><p class="note">${t('ge_up_note')}</p>` : `<p class="small muted">${t('ge_up_none', { n: hz })}</p>`}</div>
      <div class="tablewrap"><table class="t gtab"><thead><tr><th class="l">${t('ge_slot')}</th><th class="l">${t('ge_item')}</th><th class="l">${t('ge_how')}</th><th class="r">${t('ge_cost')}</th></tr></thead>
      <tbody>${G_SLOTS.map(row).join('')}</tbody></table></div>
      <p class="note">${t('ge_method')}</p></div></div>`;
  app().querySelectorAll('[data-hz]').forEach(b => b.onclick = () => { o.hz = Number(b.dataset.hz); gearSave(o); viewGearDetail(cls, spec, L); });
  $('#gdl').onchange = () => { location.hash = `#/gear/${cls}/${spec}/${Math.max(1, Math.min(60, Number($('#gdl').value) || 1))}`; };
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
    else if (h.startsWith('/craft')) await viewCraft('craft');
    else if (h.startsWith('/guide')) await viewCraft('guide');
    else if (h.startsWith('/gear/')) { const [, , c, sp, l] = h.split('/'); await viewGearDetail(c, sp, Number(l) || 20); }
    else if (h.startsWith('/gear')) await viewGear();
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
  load('npcs').then(x => { S.npcs = x || {}; }).catch(() => { S.npcs = {}; });
  S.items = S.items || {}; S.recipes = S.recipes || [];
  applyWfb(await load('wfb').catch(() => null));
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
