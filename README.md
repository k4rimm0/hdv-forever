# HDV Forever : ton site d'analyse de l'hôtel des ventes

Site personnel pour WoW Forever (Europe, ensemble de règles Normal). Toutes les heures, un robot GitHub récupère les hôtels des ventes publiés par Blizzard (Horde, Alliance, Blackwater), calcule les prix, les tendances et les ventes estimées, puis met à jour ton site. Les données sont chiffrées avec ton mot de passe : sans lui, le site n'affiche rien.

Ce qu'il y a dans le site :

| Page | À quoi elle sert |
|---|---|
| Marché | Chiffres clés, indices par secteur (tissu, cuir, herbes, potions…), ce qui monte, ce qui baisse, ce qui se vend le mieux, comparaison Horde / Alliance / Blackwater |
| Farm par niveau | Tu entres ton niveau : les ressources de ton niveau classées par or rapporté par jour, par source (monstres, dépeçage, herboristerie, minage, pêche…) |
| Craft rentable | Coût des composants (HDV ou PNJ, le moins cher) contre prix de vente, taxe déduite, et bénéfice par jour |
| PNJ → HDV | Objets vendus par les PNJ qui se revendent plus cher à l'HDV |
| Écarts entre HDV | Acheter dans un HDV, revendre dans un autre (Horde et Blackwater, Alliance en option) |
| Suivi | Tes objets suivis avec seuils d'achat et de vente |
| Fiche objet | Historique des prix, prix dans chaque HDV, recettes liées |

La recherche marche en français et en anglais, avec ou sans accents. Le bouton FR / EN en haut change la langue du site.

---

## Installation (environ 20 minutes, une seule fois)

### 1. Créer le dépôt GitHub

1. Connecte-toi sur [github.com](https://github.com) (crée un compte gratuit si besoin).
2. En haut à droite : **+** puis **New repository**.
3. Nom : `hdv-forever`. Laisse-le en **Public** : c'est gratuit et illimité, et tes données restent illisibles car chiffrées. Ne coche rien d'autre. Clique **Create repository**.
4. Sur la page du dépôt, clique **uploading an existing file**.
5. Dézippe le fichier que je t'ai envoyé, ouvre le dossier `hdv-forever`, sélectionne **tout son contenu** (y compris le dossier `.github`) et glisse-le dans la page. Clique **Commit changes**.

Vérifie que le dossier `.github/workflows` apparaît bien dans le dépôt. S'il manque (certains navigateurs ignorent les dossiers qui commencent par un point) : **Add file** puis **Create new file**, tape le nom `.github/workflows/update.yml`, colle le contenu du fichier `update.yml`, puis **Commit changes**.

### 2. Créer ta clé d'accès à l'API Blizzard

1. Va sur [develop.battle.net](https://develop.battle.net) et connecte-toi avec ton compte Battle.net.
2. **API Access** puis **Create Client**.
3. Nom : `hdv-forever`. Redirect URL : `https://localhost`. Coche « I do not have a service URL for this client ». Intended use : « Personal auction house price tracker ». Valide.
4. Note le **Client ID** et le **Client Secret** (clique « Generate » ou « Show » pour le secret).

### 3. Donner les clés et ton mot de passe au robot

Dans ton dépôt GitHub : **Settings** puis **Secrets and variables** puis **Actions** puis **New repository secret**. Crée ces trois secrets :

| Nom | Valeur |
|---|---|
| `BLIZZARD_CLIENT_ID` | le Client ID de l'étape 2 |
| `BLIZZARD_CLIENT_SECRET` | le Client Secret de l'étape 2 |
| `SITE_PASSWORD` | le mot de passe de ton choix pour ouvrir le site |

Si tu changes `SITE_PASSWORD` plus tard, l'historique déjà enregistré ne pourra plus être lu et repartira de zéro.

### 4. Lancer le premier relevé

1. Onglet **Actions** du dépôt. Si GitHub demande d'activer les workflows, accepte.
2. Clique **Mise a jour des prix** puis **Run workflow** puis **Run workflow**.
3. Le premier passage dure 5 à 15 minutes (il récupère les noms FR/EN et les icônes de tous les objets). Les suivants prennent 1 à 3 minutes, toutes les heures.

### 5. Publier le site

1. **Settings** puis **Pages**.
2. Source : **Deploy from a branch**. Branche : **gh-pages**, dossier **/ (root)**. **Save**.
3. Après une ou deux minutes, l'adresse s'affiche en haut : `https://TON-PSEUDO.github.io/hdv-forever/`. Mets-la en favori sur ton téléphone.

### 6. Premiers réglages sur le site

1. Ouvre le site et entre ton mot de passe (coche « Se souvenir de moi » sur ton téléphone).
2. Va dans **Réglages** puis **Mes HDV**. Blizzard publie 5 HDV par faction (un par ensemble de règles) sans dire lequel est lequel. Pour trouver le tien, utilise **Retrouver mon HDV** : choisis un objet courant (Étoffe de lin par exemple), regarde en jeu son prix le moins cher, entre-le, et prends l'HDV le plus proche. Fais pareil pour Blackwater.
3. Facultatif mais conseillé : une fois tes 3 HDV trouvés, dans GitHub **Settings** puis **Secrets and variables** puis **Actions** puis l'onglet **Variables** puis **New repository variable** : nom `HOUSE_IDS`, valeur les 3 numéros séparés par des virgules (par exemple `111,113,112`). Le robot ne suivra plus que tes HDV : c'est plus rapide.

---

## À savoir

- **Ventes estimées** : le jeu ne donne pas le nombre de ventes. Le site compare les relevés d'une heure à l'autre : une annonce qui disparaît alors qu'il lui restait du temps est comptée comme vendue. C'est une estimation, car une annonce annulée disparaît aussi. Il faut environ 3 heures de relevés pour les premières ventes estimées, 2 jours pour qu'elles soient fiables, et 7 et 30 jours pour les tendances du même nom.
- **API non officielle** : Blizzard publie les HDV de Forever depuis le 6 novembre 2026, mais sans documentation. Si quelque chose change de leur côté, le robot peut tomber en panne : envoie-moi le message d'erreur de l'onglet Actions et je corrige.
- **Recettes** : elles viennent de l'API Blizzard. Les nouvelles recettes de Forever peuvent manquer : ajoute-les dans `data/recipes_custom.json` (ou demande-moi).
- **Liste des objets vendus par les PNJ** : dans `data/vendor_items.json`. Les recettes marquées « à vérifier » sur la page PNJ → HDV ne sont pas forcément vendues par un PNJ.
- **Robot en pause** : GitHub peut désactiver les tâches planifiées d'un dépôt resté 60 jours sans modification. Dans ce cas tu reçois un e-mail, et il suffit de cliquer **Enable workflow** dans l'onglet Actions.
- **Coût** : 0 €. Dépôt public, GitHub Actions et GitHub Pages gratuits.

## Organisation des fichiers

| Fichier | Rôle |
|---|---|
| `collector/collect.py` | Le robot : API Blizzard, calculs, historique, chiffrement |
| `collector/mockapi.py` | Fausse API pour tester sans clé |
| `site/` | Le site (HTML, CSS, JavaScript, sans dépendance) |
| `data/` | Liste des objets vendus par les PNJ et recettes ajoutées à la main |
| `config.json` | Région, ensemble de règles, durées d'historique |
| `.github/workflows/update.yml` | Lancement automatique toutes les heures et publication |
