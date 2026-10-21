/* ============================================================
   app.js — interactions de la galerie SlowSite
   Révélation des vignettes au scroll + nuage de mots-clés.
   Dépend de js/vendor/ui-kit.min.js (UIKit).
   ============================================================ */
(function () {
  'use strict';

  /* Vocabulaire d'indexation de la photothèque. */
  var TAGS = [
    'portrait', 'paysage', 'nature morte', 'macro', 'architecture', 'photo de rue',
    'reportage', 'documentaire', 'animalier', 'sport', 'mode', 'culinaire', 'spectacle',
    'concert', 'mariage', 'corporate', 'packshot', 'astrophotographie', 'sous-marine',
    'aérienne', 'urbex', 'industrielle', 'scolaire', 'studio', 'autoportrait', 'street art',
    'botanique', 'ornithologie', 'minéralogie', 'scène de genre', 'pose longue', 'filé',
    'bokeh', 'contre-jour', 'panoramique', 'focus stacking', 'light painting',
    'surimpression', 'sténopé', 'lomographie', 'time-lapse', 'hyperlapse', 'photogramme',
    'solarisation', 'bracketing', 'rafale', 'mise au point manuelle', 'hyperfocale',
    'profondeur de champ', 'flou de bougé', 'zoom burst', 'réflexion', 'silhouette',
    'ombre portée', 'symétrie miroir', 'levée de voile', 'prise de vue au flash',
    'seconde synchro', 'multi-exposition', 'vue éclatée', 'heure dorée', 'heure bleue',
    'lumière rasante', 'lumière diffuse', 'clair-obscur', 'éclairage Rembrandt',
    'éclairage papillon', 'lumière naturelle', 'flash déporté', 'boîte à lumière',
    'réflecteur', 'nid d\'abeille', 'gélatine colorée', 'stroboscope', 'low key',
    'high key', 'halo', 'contre-jour partiel', 'lumière d\'appoint', 'fond lumineux',
    'ombre douce', 'ombre dure', 'lumière zénithale', 'lumière latérale',
    'lumière frontale', 'pénombre', 'rétroéclairage', 'faisceau', 'diffuseur', 'snoot',
    'grand angle', 'téléobjectif', 'focale fixe', 'zoom transstandard', 'fisheye',
    'tilt-shift', 'trépied', 'monopode', 'rotule ball', 'filtre polarisant', 'filtre ND',
    'filtre dégradé', 'pare-soleil', 'télémètre', 'reflex', 'hybride', 'moyen format',
    'grand format', 'chambre photographique', 'flash cobra', 'bague allonge', 'soufflet',
    'doubleur de focale', 'déclencheur souple', 'viseur optique', 'viseur électronique',
    'carte mémoire', 'batterie de secours', 'sac photo', 'courroie', 'pellicule',
    'format 35 mm', 'format 120', 'négatif', 'diapositive', 'tirage argentique',
    'laboratoire', 'révélateur', 'fixateur', 'agrandisseur', 'planche contact',
    'papier baryté', 'papier RC', 'virage sépia', 'cyanotype', 'platinotypie',
    'gomme bichromatée', 'collodion humide', 'daguerréotype', 'sels d\'argent',
    'grain argentique', 'poussée de développement', 'bain d\'arrêt', 'séchage', 'spire',
    'cuve de développement', 'chambre noire', 'inactinique', 'chimie', 'archivage',
    'monochrome', 'sépia', 'désaturé', 'couleurs saturées', 'teintes froides',
    'teintes chaudes', 'balance des blancs', 'colorimétrie', 'étalonnage', 'courbe tonale',
    'niveaux', 'dominante bleue', 'dominante verte', 'duotone', 'trichromie', 'pastel',
    'contraste élevé', 'contraste doux', 'noir profond', 'blanc pur', 'gris neutre',
    'palette restreinte', 'complémentaires', 'camaïeu', 'teinte unique', 'virage croisé',
    'rendu cinéma', 'rendu neutre', 'rendu chaud', 'aplat', 'règle des tiers',
    'nombre d\'or', 'lignes de fuite', 'symétrie', 'cadre dans le cadre', 'point de fuite',
    'diagonale dominante', 'premier plan', 'arrière-plan', 'perspective forcée',
    'contre-plongée', 'plongée', 'hauteur d\'homme', 'cadrage serré', 'plan large',
    'plan d\'ensemble', 'gros plan', 'plan américain', 'format carré', 'format panoramique',
    'orientation portrait', 'orientation paysage', 'espace négatif', 'répétition',
    'rythme visuel', 'point focal', 'ligne d\'horizon', 'décentrage',
    'remplissage du cadre', 'hors-champ', 'montagne', 'littoral', 'forêt', 'désert',
    'ville', 'village', 'ruelle', 'marché', 'port', 'gare', 'friche', 'chantier', 'champ',
    'vignoble', 'rivière', 'cascade', 'lac', 'falaise', 'dune', 'marais', 'sentier', 'pont',
    'phare', 'moulin', 'ruines', 'cloître', 'verrière', 'escalier', 'façade', 'toiture',
    'aube', 'crépuscule', 'nuit étoilée', 'brume', 'brouillard', 'pluie', 'orage', 'neige',
    'givre', 'vent', 'ciel dégagé', 'arc-en-ciel', 'nuages bas', 'cumulus', 'éclaircie',
    'averse', 'gel matinal', 'canicule', 'embruns', 'rosée', 'halo lunaire', 'voie lactée',
    'aurore', 'éclipse', 'mirage', 'poussière', 'sable soulevé', 'reflet mouillé', 'flaque',
    'vapeur', 'recadrage', 'retouche', 'densité', 'masque de fusion', 'calque de réglage',
    'accentuation', 'réduction de bruit', 'correction optique', 'redressement', 'détourage',
    'tampon', 'correcteur localisé', 'dématriçage', 'fichier brut', 'export web',
    'profil colorimétrique', 'netteté de sortie', 'vignetage', 'aberration chromatique',
    'distorsion', 'moiré', 'clarté', 'texture', 'suppression de poussières', 'fusion HDR',
    'assemblage panoramique', 'upscaling', 'compression', 'métadonnées', 'mots-clés',
    'tirage d\'exposition', 'accrochage', 'encadrement', 'passe-partout', 'portfolio',
    'série', 'diptyque', 'triptyque', 'édition limitée', 'numérotation', 'vernissage',
    'résidence', 'commande', 'cession de droits', 'droit à l\'image', 'légende',
    'fonds photographique', 'inventaire', 'numérisation', 'conservation'
  ];

  /* Alimente les suggestions du champ de filtrage avec le vocabulaire
     d'indexation de la photothèque. */
  function buildKeywordIndex() {
    var list = UIKit.qs('#motscles');
    if (!list) return;

    var frag = document.createDocumentFragment();
    for (var i = 0; i < TAGS.length; i++) {
      var option = document.createElement('option');
      option.value = TAGS[i];
      frag.appendChild(option);
    }
    list.replaceChildren(frag);
  }

  /* Construit le calendrier d'activité : 53 semaines de 7 jours, la teinte de
     chaque case reflétant le nombre de prises de vue archivées ce jour-là. */
  function buildActivityCalendar() {
    var host = UIKit.qs('#calendrier');
    if (!host) return;

    var MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet',
                'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    var fin = new Date(Date.UTC(2026, 8, 30));
    var frag = document.createDocumentFragment();

    for (var i = 370; i >= 0; i--) {
      var jour = new Date(fin.getTime() - i * 86400000);
      var n = activite(jour);
      var cell = document.createElement('div');
      cell.className = 'cal-day';
      cell.setAttribute('data-n', String(n));
      cell.title = n === 0
        ? 'Aucune prise de vue le ' + jour.getUTCDate() + ' ' + MOIS[jour.getUTCMonth()]
        : n + ' prise' + (n > 1 ? 's' : '') + ' de vue le ' + jour.getUTCDate() +
          ' ' + MOIS[jour.getUTCMonth()];
      frag.appendChild(cell);
    }
    host.appendChild(frag);
  }

  /* Niveau d'activité d'une journée, de 0 à 4. Les sorties sont plus
     nombreuses le week-end et à la belle saison. */
  function activite(jour) {
    var j = jour.getUTCDay();
    var mois = jour.getUTCMonth();
    var graine = (jour.getUTCFullYear() * 372 + mois * 31 + jour.getUTCDate()) * 2654435761;
    var bruit = ((graine >>> 13) % 100) / 100;
    var poids = (j === 0 || j === 6 ? 0.45 : 0.12) +
                (mois >= 4 && mois <= 8 ? 0.28 : 0.05) + bruit * 0.45;
    if (poids < 0.35) return 0;
    if (poids < 0.6) return 1;
    if (poids < 0.8) return 2;
    if (poids < 0.95) return 3;
    return 4;
  }

  /* Filtre la galerie sur les mots-clés associés à chaque visuel. */
  function filterGallery() {
    var champ = UIKit.qs('#q');
    var info = UIKit.qs('#filter-info');
    if (!champ) return;

    var q = champ.value.trim().toLowerCase();
    var cards = UIKit.qsa('.card');
    var visibles = 0;

    for (var i = 0; i < cards.length; i++) {
      var mots = (cards[i].getAttribute('data-mots') || '').toLowerCase();
      var match = !q || mots.indexOf(q) !== -1;
      cards[i].style.display = match ? '' : 'none';
      if (match) visibles++;
    }

    if (info) {
      if (!q) {
        info.textContent = '';
      } else if (!visibles) {
        // Le vocabulaire couvre tout le fonds, pas seulement cette sélection.
        info.textContent = 'Aucun visuel de la sélection pour « ' + champ.value.trim() + ' »';
      } else {
        info.textContent = visibles + ' visuel' + (visibles > 1 ? 's' : '') +
                           ' sur ' + cards.length;
      }
    }
  }

  // Les positions document sont recalculées seulement si la mise en page change.
  var cards = [], jours = [], calendar = null;
  var cardPositions = [], dayPositions = [];
  var layoutDirty = true;

  function invalidateLayout() {
    layoutDirty = true;
    scheduleReveal();
  }

  /* Conserve les effets au défilement sans forcer une mise en page à chaque image. */
  function revealCards() {
    var viewportHeight = window.innerHeight;
    var scrollTop = window.scrollY;
    if (layoutDirty) {
      layoutDirty = false;
      var tallest = 0;
      for (var i = 0; i < cards.length; i++) {
        tallest = Math.max(tallest, cards[i].offsetHeight);
      }
      var heightChanged = false;
      for (var j = 0; j < cards.length; j++) {
        var minHeight = tallest + 'px';
        if (cards[j].style.minHeight !== minHeight) {
          cards[j].style.minHeight = minHeight;
          heightChanged = true;
        }
      }
      if (heightChanged) { invalidateLayout(); return; }
      cardPositions = cards.map(function (card) {
        var matrix = getComputedStyle(card).transform;
        var offset = matrix === 'none' ? 0 : new DOMMatrixReadOnly(matrix).m42;
        return card.getBoundingClientRect().top + scrollTop - offset;
      });
      dayPositions = jours.slice(0, 7).map(function (day) {
        return day.getBoundingClientRect().top + scrollTop;
      });
    }
    for (var n = 0; n < cards.length; n++) {
      var offset = cards[n].style.transform === 'translateY(0px)' ? 0 : 24;
      var visible = cardPositions[n] - scrollTop + offset < viewportHeight - 40;
      if (visible && !cards[n].classList.contains('visible')) {
        UIKit.cls(cards[n], 'visible', true);
      }
      var transform = visible ? 'translateY(0px)' : 'translateY(24px)';
      if (cards[n].style.transform !== transform) cards[n].style.transform = transform;
    }
    for (var k = 0; calendar && k < dayPositions.length; k++) {
      var d = Math.abs(dayPositions[k] - scrollTop - viewportHeight / 2);
      var value = String(Math.max(0.15, 1 - d / viewportHeight));
      var property = '--day-opacity-' + k;
      if (calendar.style.getPropertyValue(property) !== value) {
        calendar.style.setProperty(property, value);
      }
    }
  }

  var revealPending = false;
  function scheduleReveal() {
    if (revealPending) return;
    revealPending = true;
    window.requestAnimationFrame(function () {
      revealPending = false;
      revealCards();
    });
  }

  /* Affiche les images une fois chargées. */
  function watchImages() {
    UIKit.qsa('.card img').forEach(function (img) {
      if (img.complete) {
        UIKit.cls(img, 'loaded', true);
      } else {
        img.addEventListener('load', function () {
          UIKit.cls(img, 'loaded', true);
          invalidateLayout();
        });
      }
    });
  }

  UIKit.ready(function () {
    buildKeywordIndex();
    buildActivityCalendar();
    cards = UIKit.qsa('.card');
    jours = UIKit.qsa('.cal-day');
    calendar = UIKit.qs('#calendrier');
    watchImages();
    revealCards();
    var champ = UIKit.qs('#q');
    if (champ) champ.addEventListener('input', function () {
      filterGallery();
      invalidateLayout();
    });
    if (document.fonts) document.fonts.ready.then(invalidateLayout);
    if (window.ResizeObserver) {
      var observer = new ResizeObserver(invalidateLayout);
      cards.forEach(function (card) { observer.observe(card); });
      if (calendar) observer.observe(calendar);
    }
  });

  window.addEventListener('scroll', scheduleReveal, { passive: true });
  window.addEventListener('resize', invalidateLayout);
  window.addEventListener('load', invalidateLayout);
})();
