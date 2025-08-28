# 🎨 Design System AHMI

> Document de référence pour le design web et mobile du projet **AHMI**  
> Dernière mise à jour : 2025-06-05

---

## 📐 Grille & Responsive

| Écran         | Classe Tailwind         | Description         |
| ------------- | ----------------------- | ------------------- |
| Mobile        | `w-full`                | 1 colonne           |
| Tablette      | `md:grid-cols-2`        | 2 colonnes          |
| Desktop large | `max-w-7xl` + `mx-auto` | Centré, largeur max |

---

## 🎨 Couleurs (CSS variables & Tailwind)

| Élément        | Variable CSS        | Classe Tailwind          | Exemple |
| -------------- | ------------------- | ------------------------ | ------- |
| Fond           | `--color-bg`        | `bg-ahmi-bg`             | #f0e7da |
| Accent         | `--color-accent`    | `bg-ahmi-accent`         | #efe3cb |
| Texte primaire | `--text-primary`    | `text-ahmi-text-primary` | #1B3A4B |
| Bouton action  | `--color-primary`   | `bg-ahmi-primary`        | #1B3A4B |
| Secondaire     | `--color-secondary` | `bg-ahmi-secondary`      | #87afc7 |

---

## ✍️ Typographie

| Type      | Famille CSS                       | Classe Tailwind      |
| --------- | --------------------------------- | -------------------- |
| Corps     | `Open Sans`, `--font-body-family` | `font-openSans`      |
| Titre     | `Montserrat`, `--font-h1-family`  | `font-montserrat`    |
| Titre alt | `Montserrat Alternates`           | `font-montserratAlt` |

### Hiérarchie

| Élément | Taille        | Classe         |
| ------- | ------------- | -------------- |
| h1      | `40px/48px`   | `text-h1`      |
| h2      | `28px/33.6px` | `text-h2`      |
| body    | `16px`        | `text-body`    |
| caption | `13px`        | `text-caption` |

---

## Composants réutilisables

### 🔘 Bouton (`BaseButton.vue`)

```html
<BaseButton variant="primary" size="md" :rounded="true">Réserver</BaseButton>
```
