# Recherche stuff WoW Forever (17/11/2026)

## Données
- metabot.gg/en/wow-forever/items/items.json : 16151 objets. rows = [slug, name, icon, quality, ilvl, reqLevel, slotIdx(j.slots), catIdx, subIdx(j.subs), dps*10, armor, forever(0 classic,1 new,2 changed), stats[idx,val,...], ?, ?, classOnly[], source]
  - source : 1 vendeur, 2 drop, 3 quête, 4 craft, 5 coffre/noeud, 6 conteneur, 7 pêche, 8 dépeçage, 9 vol à la tire, undefined inconnu
  - catIdx : 0 dague,1 épée1M,2 épée2M,3 hache1M,4 hache2M,5 masse1M,6 masse2M,7 hast,8 bâton,9 pugilat,10 arc,11 fusil,12 arbalète,13 baguette,14 jet,15 canne,16 tissu,17 cuir,18 mailles,19 plaques,20 bouclier,21 cou,22 anneau,23 bijou,24 cape,25 main gauche,26 relique,27 chemise,28 tabard
  - crit-rating 14 = 1 % ; hit-rating 10 = 1 % (valeurs niveau 60, les objets Forever donnent des % fixes, cf Warcraft Tavern « Secondary Stats are generally provided as percentages »)
- Pages objet metabot : « How to get » (quête + zone, PNJ...) ; pages quête : faction, niveau, PNJ, coords.

## Priorités niveau 60 (Icy Veins Forever, MAJ oct-nov 2026)
- Chasseur BM / Précision : Dégâts d'arme > Toucher (8 %) > Crit > Agilité > PA ; Intelligence > PA pour Précision (Careful Aim : 1 Int = 1 PA)
- Chasseur Survie (mêlée) : Dégâts d'arme > Toucher 8 % > Crit > Agilité
- Guerrier Armes : DPS arme (2M lente) > Toucher > Expertise > Crit > Force
- Guerrier Fureur : DPS arme > Toucher > Expertise > Crit > Force
- Guerrier Protection : offensif Expertise > Toucher > Agilité > Force > Endurance ; défensif Endurance > Armure > Agilité > Évitement > Défense
- Paladin Sacré : Puissance de soins > Int > Esprit > Mp5 > Crit
- Paladin Protection : Endurance > Défense (440) > Puissance des sorts > Int > Force
- Paladin Vindicte : Dégâts d'arme (2M très lente ou très rapide) > Toucher 8 % > Expertise 6,5 % > Force > Puissance des sorts
- Voleur Assassinat / Combat : Expertise 6,5 % > Toucher 8 % > Agilité > Dégâts d'arme > Crit
- Voleur Finesse : Dégâts d'arme (lente) > Expertise > Toucher > Compétence d'arme > Agilité
- Prêtre Discipline / Sacré : Puissance de soins > Mp5 > Esprit > Int > Crit
- Prêtre Ombre : Toucher 17 % > Puissance des sorts > Crit > Pénétration > Esprit
- Chaman Élémentaire : Puissance des sorts > Toucher 17 % > Crit > Int > Mp5
- Chaman Amélioration : DPS arme > Toucher > Expertise > Force > Int > Puissance des sorts
- Chaman Restauration : Puissance de soins > Crit > Int > Esprit > Mp5
- Mage (3 spés) : Toucher 17 % > Puissance des sorts > Crit > Int > Esprit/Mp5
- Démoniste Affli / Démono : Toucher > Puissance des sorts > Crit > Hâte > Int ; Destru : Toucher > PdS > Hâte > Crit > Int
- Druide Équilibre : Toucher 17 % > Crit > PdS > Int
- Druide Farouche (chat et ours menace) : DPS arme > Expertise (6,5/14 %) > Toucher 8 % > Agilité > Force
- Druide Restauration : Puissance de soins > Int > Esprit > Mp5 > Crit

## Priorités en leveling (Mobalytics, guides de leveling Forever)
- Guerrier : Esprit > Force > Agilité > Endurance > Int ; puis Toucher (8 %) > Expertise > Crit > Hâte. Endurance avant Esprit en donjon.
- Paladin : Dégâts d'arme (lente ≥ 3.3) > Endurance = Esprit > Int (40+, Champion of the Light) > Force = PdS > Soins = Agi ; 1 % toucher/crit ≈ 8-10 Force ou PdS
- Chasseur : Agilité > PA > Endurance > Esprit > Int > Crit/Toucher
- Voleur : Agilité > Force = PA > Endurance ; Toucher, Expertise, Crit très bons mais rares
- Prêtre : PdS > Esprit > Int > Endurance > Crit > Toucher > Hâte > Mp5
- Chaman (amélio en leveling) : Force = PA > Int > PdS = Agi > Esprit ; Mental Dexterity 1 Int = 1,5 PA
- Mage : Toucher > PdS > Crit > Hâte > Int > Esprit > Endurance
- Démoniste : PdS > Toucher > Int > Endurance > Crit > Esprit > Hâte
- Druide (farouche) : DPS arme > Force = Agi (1 For = 1 Agi = 2 PA) > Endurance, Esprit > Int ; 1 % toucher/crit ≈ 10-11 Force

## Conversions (Warcraft Tavern, Stats guide Forever)
- Force : 2 PA guerrier/paladin/chaman/druide, 1 PA les autres
- Agilité : chasseur 2 PA distance ; voleur/guerrier 1 PA distance ; chasseur, voleur, druide chat 1 PA mêlée ; crit 1 % = 29 Agi voleur, 53 chasseur, 20 les autres
- Int : 15 mana ; 1 % crit sort pour 54-60 Int
- Endurance : 10 PV
