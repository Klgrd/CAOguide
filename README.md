# Guide de Conception Industrielle

Ce site web est un guide interactif pour la conception industrielle, présentant les outils essentiels comme la Bête à Corne, la Pieuvre et le Diagramme de Pareto.

## Structure du Site

- `index.html` - Page principale du site
- `styles.css` - Styles et mise en page
- `script.js` - Interactions et animations
- `images/` - Dossier contenant les illustrations et exemples
- `.github/workflows/` - Configuration du déploiement automatique

## Déploiement Automatique sur GitHub Pages

1. Créez un compte GitHub si vous n'en avez pas déjà un
2. Créez un nouveau repository
3. Uploadez tous les fichiers de ce projet dans le repository
4. Allez dans les paramètres du repository
5. Dans la section "Pages", sélectionnez la branche `gh-pages` comme source
6. Le site sera automatiquement déployé à chaque push sur la branche principale

### Comment ça marche ?

- Le workflow GitHub Actions (`.github/workflows/deploy.yml`) est configuré pour se déclencher à chaque push sur la branche principale
- Il déploie automatiquement le site sur la branche `gh-pages`
- Le site sera disponible à l'adresse : `https://[votre-nom-utilisateur].github.io/[nom-du-repo]`

## Personnalisation

Pour ajouter vos propres images :
1. Placez vos images dans le dossier `images/`
2. Mettez à jour les chemins dans `index.html` pour pointer vers vos nouvelles images
3. Committez et poussez les changements - le site sera automatiquement mis à jour

## Technologies Utilisées

- HTML5
- CSS3
- JavaScript
- Bootstrap 5 