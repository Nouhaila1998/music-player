# <p align="center">Music Player - Lecteur Audio Web </p>

Le Lecteur Audio Web "MusicPlayer" est une solution audio créée avec passion par Ali Bennis et Nouhaila Ouahbani. Il est conçu à l'aide de l'API Web Audio et de la bibliothèque Web Audio Controls web components by g200Kg pour les boutons rotatifs de l'interface graphique.
![UI](https://github.com/Nouhaila1998/music-player/assets/54882041/ab4a795c-fd76-402f-9837-0a573510ebaa)
![UI2](https://github.com/Nouhaila1998/music-player/assets/54882041/118212f3-b867-4d9b-b2e0-379e4551ece8)

📺 [Demo Video ](https://nouhaila1998.github.io/music-player/) - 
📺 [Demo Live](https://nouhaila1998.github.io/music-player/) - https://nouhaila1998.github.io/music-player

Ce lecteur audio est un composant web qui interconnecte plusieurs autres composants web, offrant ainsi une expérience audio complète. Voici un aperçu des composants principaux :

1. **Composant Player - app-player**
   - Boutons de lecture/pause.
   - Réglage de la balance.
   - Contrôle du volume.
   - Boutons de navigation temporelle (+10s, -10s).
   - Barre de progression pour suivre la position de lecture.

2. **Composant Equalizer - app-controls**
   - 4 sliders pour différentes fréquences, offrant un contrôle sonore sur mesure.

3. **Composant Visualizer - app-visualizer**
   - Utilise la bibliothèque ButterChurn pour explorer le monde visuel de votre musique préférée, offrant une expérience immersive.

4. **Composant Playlist - app-list**
   - Permet la sélection entre différentes pistes audio d'une playlist grâce à une interface ergonomique et intuitive.

## 🧐 Comment l'utiliser  

1. Vous pouvez l'utiliser après avoir récupéré le repo en local (installation) ou directement sur [ce lien](Lien GITHUB).
2. Après avoir accédé au lecteur, et mis en lecture un son, il est possible de contrôler la balance du son et le volume en utilisant les boutons sous la barre de progression, de visualiser l'avancement du son et de le contrôler à travers cette même barre.
3. À partir de la playlist au centre du lecteur, il est possible de changer le son et visualiser les autres sons disponibles.
4. Le visualiseur permet de visualiser la fréquence du son dynamiquement selon les fréquences, le volume...
5. Enfin, l'equalizer en bas à droite est composé de 4 barres contrôlables qui permettent d'ajuster la fréquence du son.

### Architecture
![Architecture](https://github.com/Nouhaila1998/music-player/assets/54882041/19bda597-2dc0-4835-9c49-f2da6cad4a90)
- **Assets :** Contient des sous-dossiers pour les différentes images, sons, boutons du lecteur, et la bibliothèque webaudio-controls qui permet le bon fonctionnement des knobs.
- **Components :** Regroupe les 4 composants de notre lecteur et le composant app qui est le composant qui les lie entre eux.
- **Services :** Contient AudioManager qui est une composante centrale de notre lecteur audio "MusicPlayer". Elle prend en charge la gestion des pistes audio, la création de l'interface audio, et d'autres fonctionnalités pour le contrôle du son.

## Bibliothèques Utilisées

- **API Web Audio :** Utilisée pour une manipulation avancée des données audio directement dans le navigateur.
- **Web Audio Controls de g200Kg :** Composants web spécifiques pour le contrôle audio, notamment les boutons de lecture, de pause et les réglages de volume. [Documentation](https://g200kg.github.io/webaudio-controls/docs/index.html)
- **Bootstrap :** Bibliothèque CSS pour la mise en page.
- **ButterChurn :** Bibliothèque pour la visualisation audio. [GitHub Repository](https://github.com/jberg/butterchurn)

## 🛠️ Installation  

Afin de pouvoir l'utiliser en local, il faut cloner le repo, ensuite il faut préalablement avoir un environnement d'exécution afin de pouvoir l'executer et y contribuer .

## 🙇 Auteurs
- Nouhaila Ouahbani
- Ali Bennis
