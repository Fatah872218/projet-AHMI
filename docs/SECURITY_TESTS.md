# SECURITY-TESTS.md

## Objectif

Ce fichier documente les tests de sécurité effectués sur l'API AHMI conformément au guide **OWASP API Security Top 10**, dans une perspective de valorisation des efforts de sécurisation et de mise en œuvre de bonnes pratiques.

## Contexte

L’authentification et la gestion des rôles sont en cours de développement. Pour certains tests, des jetons JWT sont simulés afin d’émuler une connexion authentifiée. Cela limite la portée des tests réels de contrôle d'accès à ce stade.

---

## Tests OWASP réalisés sur `/api/events`

> Tests réalisés via une collection Postman dédiée : `OWASP_Postman_Events_Tests.json`

### 1. API1:2023 - Broken Object Level Authorization

- ✅ **Test simulé** : Tentative d'accès à une ressource spécifique avec un ID arbitraire.
- ℹ️ **Limite** : Les endpoints `/api/events/:id` ne vérifient pas encore les droits de l'utilisateur. Ce point devra être revu une fois la gestion des rôles active.

### 2. API2:2023 - Broken Authentication

- ✅ Tests sur les endpoints d’authentification (`/api/auth`) réalisés séparément.
- ❌ Non applicable à `/api/events`, car l’accès est pour l’instant public.

### 3. API3:2023 - Broken Object Property Level Authorization

- ✅ Tentative de création d’événement avec des champs réservés comme `statut`, `moderateur` ou `placesReservees`.
- 🛡️ Le backend ignore ou nettoie ces champs : **comportement correct**.

### 4. API5:2023 - Broken Function Level Authorization

- ⚠️ À surveiller une fois que les fonctions d'administration (approbation, rejet d'événement) seront exposées : ces actions devront être protégées par rôle.

### 5. API8:2023 - Security Misconfiguration

- ✅ Les cookies JWT sont transmis avec les flags `HttpOnly`, `Secure`, et `SameSite=strict` dans `controleurAuth.js`.
- ⚠️ Un test simule des en-têtes malformés ou absents (pas de Token). Comportement du backend : **réponse OK**. À corriger plus tard en bloquant les accès aux routes sensibles sans jeton valide.

---

## Limitations actuelles

- 🔐 **Authentification partielle** : Les routes d’événements ne sont pas encore protégées par un middleware `auth`.
- 🔑 **Pas de contrôle de rôle** : tous les utilisateurs simulés ont le rôle `admin`, ce qui limite la validité des tests de privilèges.

---

## Améliorations à venir

- [ ] Protéger `/api/events` avec un middleware d’authentification (`middlewareAuth.js`)
- [ ] Implémenter des rôles (`admin`, `utilisateur`, `moderateur`) et vérifier les autorisations sur les routes critiques
- [ ] Ajouter des tests automatisés Postman sur les routes privées dès qu'elles sont disponibles

---

## Conclusion

Même sans authentification complète, la démarche de test OWASP est amorcée. Ce document, accompagné de la collection Postman, prouve que la sécurité est intégrée dès les premières étapes du développement.
