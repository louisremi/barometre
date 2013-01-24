PRÉAMBULE

La page du baromètre est un ensemble de fichier statiques qui s'intègre dans une page hôte du site de la BPCE sous forme d'iframe. Ces fichiers peuvent-être stockés n'importe où puisque toutes les URL sont relatives et que la communication avec la page hôte utilise un mécanisme ne nécessitant pas une origine commune des deux pages (API postMessage[1]).
Les données affichées dans la page du baromètre sont extraites d'une base de données administrable qui pourra être hébergée n'importe où ; ici aussi la communication utilise des mécanismes ne nécessitant pas une origine commune de la page et de la base de données (API XHR[2] et entêtes CORS[3]).

FICHIERS SOURCE

Deux versions des fichiers source sont fournis :
- une version de développement contenant l'ensemble des fichiers sources de la page présenté de manière lisible par un développeur et utiles pour débugger l'application
- une version de production contenant les fichiers sources de la page "compilés" pour améliorer les temps de chargement de la page.

Les fichiers sources sont composés :
- d'une page html (index.html)
- de fichiers javascripts
- de fichiers css
- d'images
- de polices d'écriture

PRÉPARATION DE LA PAGE HÔTE

La page hôte du site de la BPCE est une page utilisant le modèle de mise en page standard du site de la BPCE, modifié comme suit :

1. remplacer l'élément <div class="content"></div> et son éventuel contenu par
<iframe id="frame-barometre" src="adresse du fichier index.html de la page du barometre" title="le barometre des projets des français" style="width:100%;height:4734px;" frameborder=0 ></iframe>
l'attribut "src" de cet élément devant évidemment être remplacé par l'URL à laquelle le fichier index.html de la page du baromètre est accessible.

2. le fichier host-bridge.js doit-être chargé par la page hôte avant que l'iframe soit chargée (insérer la balise <script> correspondante juste avant la balise </html> fermante suffit, mais insérer la balise <script> dynamiquement dans la page risque de poser des problèmes ; le contenu du script peut aussi être ajouté "en ligne").

CONFIGURATION DE L’URL D’ACCES À LA BASE DE DONNEES

À la 11 ligne du fichier index.html de la page du baromètre se trouve une balise script permettant de configurer l’adresse de l’API de la base de données. Après “backendUrl:”, Il faut remplacer l’URL de test par l’URL finale de la base de données.