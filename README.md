PRÉAMBULE

La page du baromètre est un ensemble de fichier statiques qui s'intègre dans une page hôte du site de la BPCE sous forme d'iframe. Ces fichiers peuvent-être stockés n'importe où puisque toutes les URL sont relatives et que la communication avec la page hôte utilise un mécanisme ne nécessitant pas une origine commune des deux pages (API postMessage[1]).
Les données affichées dans la page du baromètre sont extraites d'une base de données administrable qui pourra être hébergée n'importe où ; ici aussi la communication utilise des mécanismes ne nécessitant pas une origine commune de la page et de la base de données (API XHR[2] et entêtes CORS[3]).

FICHIERS SOURCE

Les fichiers sources sont composés :
- d'une page html (index.html)
- de fichiers javascripts
- de fichiers css
- d'images
- de polices d'écriture

Le fichier index.html charge des versions "compilées" des ressources javascript et css afin d'améliorer le temps de chargement de la page, mais des versions de développement de ces fichiers sont fournies.
Si les fichiers sources devaient être modifiés, les versions compilées peuvent être re-générées avec les tâches grunt[4] "$ grunt concat" puis "$ grunt min".

PRÉPARATION DE LA PAGE HÔTE

La page hôte du site de la BPCE est une page utilisant le modèle de mise en page standard du site de la BPCE, modifié comme suit :

1. remplacer l'élément <div class="content"></div> et son éventuel contenu par
<iframe id="frame-barometre" src="adresse du fichier index.html de la page du barometre" title="le barometre des projets des français" style="width:100%;height:4734px;" frameborder=0 ></iframe>
l'attribut "src" de cet élément devant évidemment être remplacé par l'URL à laquelle le fichier index.html de la page du baromètre est accessible.

2. le fichier host-bridge.js doit-être chargé par la page hôte avant que l'iframe soit chargée (insérer la balise <script> correspondante juste avant la balise </html> fermante suffit, mais insérer la balise <script> dynamiquement dans la page risque de poser des problèmes ; le contenu du script peut aussi être ajouté "en ligne").

CONFIGURATION DE L’URL D’ACCES À LA BASE DE DONNEES

À la ligne 11 du fichier index.html de la page du baromètre se trouve une balise script permettant de configurer l’adresse de l’API de la base de données, si celle-ci était amenée à changer.


[1] https://developer.mozilla.org/en-US/docs/DOM/window.postMessage
[2] https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest
[3] https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS
[4] voir http://gruntjs.com/ pour les instructions d'installation et d'utilisation