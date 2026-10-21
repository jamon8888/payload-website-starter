import type { Locale } from '@/i18n/config'

/**
 * Translations of the seeded content.
 *
 * The seed builders (`home.ts`, `post-*.ts`, `contact-page.ts`) are written
 * once in English; `translateSeedDoc` walks the resulting document and swaps
 * every translatable string with its translation for the target locale. The
 * dictionaries are keyed by the English string, so a missing entry shows up
 * immediately as untranslated content (and `pnpm seed:local` reports it).
 */
export type SeedDictionary = Record<string, string>

export const seedDictionaries: Record<Exclude<Locale, 'all'>, SeedDictionary> = {
  en: {},

  fr: {
    ' This content is fabricated and for demonstration purposes only. To edit this post, ':
      ' Ce contenu est fictif et sert uniquement de démonstration. Pour modifier cet article, ',
    ' to begin managing this site\'s content. The code for this template is completely open-source and can be found ':
      ' pour commencer à gérer le contenu de ce site. Le code de ce modèle est entièrement open source et se trouve ',
    'AI is optimizing operations and pioneering innovative approaches by making decisions previously left to human intuition, reshaping industries at unprecedented pace.':
      "L'IA optimise les opérations et ouvre des voies inédites en prenant des décisions jusque-là laissées à l'intuition humaine, transformant les industries à une vitesse inédite.",
    'Admin Dashboard': 'Tableau de bord',
    'All posts': 'Tous les articles',
    'An open-source website built with Payload and Next.js.':
      'Un site open source construit avec Payload et Next.js.',
    'Article exploring AI, machine learning, and IoT technologies reshaping industries and daily life.':
      'Article explorant l\'IA, l\'apprentissage automatique et l\'IoT, des technologies qui transforment les industries et le quotidien.',
    'Article on human resilience and community recovery after natural disasters, political unrest, and economic crises.':
      'Article sur la résilience humaine et le rebond des communautés après des catastrophes naturelles, des troubles politiques et des crises économiques.',
    'Communities recover through solidarity - neighbors forming rescue teams, cities rallying to rebuild, and collective purpose turning adversity into growth.':
      'Les communautés se reconstruisent par la solidarité : des voisins qui forment des équipes de secours, des villes qui se mobilisent pour rebâtir, et un sens collectif qui transforme l\'adversité en croissance.',
    Contact: 'Contact',
    'Core features': 'Fonctionnalités clés',
    'Custom page builder allows you to create unique page, post, and project layouts for any type of content.':
      'Le constructeur de pages permet de créer des mises en page uniques pour les pages, les articles et les projets, quel que soit le type de contenu.',
    'Dark Mode': 'Mode sombre',
    'Digital Horizons: A Glimpse into Tomorrow': 'Horizons numériques : un aperçu de demain',
    'Disclaimer:': 'Avertissement :',
    'Disclaimer: ': 'Avertissement : ',
    'Dive deep into its nuances, where strategy meets intuition in the vast sea of finance.':
      'Plongez dans ses subtilités, là où la stratégie croise l\'intuition dans l\'immense océan de la finance.',
    'Dive into the marvels of modern innovation, where the only constant is change. A journey where pixels and data converge to craft the future.':
      'Plongez dans les merveilles de l\'innovation moderne, où la seule constante est le changement. Un voyage où pixels et données convergent pour façonner l\'avenir.',
    'Dollar and Sense: The Financial Forecast': 'Le bon sens financier : les prévisions',
    'Editors have complete control over SEO data and site content directly from the ':
      'Les rédacteurs contrôlent complètement les données SEO et le contenu du site directement depuis le ',
    'Explore the untold and overlooked. A magnified view into the corners of the world, where every story deserves its spotlight.':
      'Explorez l\'inexploré et le méconnu. Un regard agrandi sur les coins du monde, où chaque histoire mérite son projecteur.',
    'Financial article on money as a language, stock market dynamics, bull/bear markets, and investor psychology.':
      'Article financier sur l\'argent comme langage, la dynamique des marchés, les marchés haussiers et baissiers et la psychologie de l\'investisseur.',
    'From neighbors forming makeshift rescue teams during floods to entire cities rallying to rebuild after economic collapse, the essence of humanity is most evident in these acts of solidarity. As we delve into these narratives, we witness the transformative power of community spirit, where adversity becomes a catalyst for growth, unity, and a brighter, rebuilt future.':
      'Des voisins qui montent des équipes de secours de fortune pendant les inondations aux villes entières qui se mobilisent pour rebâtir après un effondrement économique, l\'essentiel de l\'humanité se lit dans ces actes de solidarité. En explorant ces récits, nous mesurons le pouvoir transformateur de l\'esprit collectif, où l\'adversité devient un catalyseur de croissance, d\'unité et d\'un avenir plus lumineux, reconstruit.',
    'Global Gaze: Beyond the Headlines': 'Regard mondial : au-delà des gros titres',
    Home: 'Accueil',
    'How do communities recover after disasters?':
      'Comment les communautés se reconstruisent-elles après une catastrophe ?',
    'How does money function as a language?': 'Comment l\'argent fonctionne-t-il comme un langage ?',
    'How is AI transforming industries?': 'Comment l\'IA transforme-t-elle les industries ?',
    "In today's rapidly evolving technological landscape, the Internet of Things (IoT) stands out as a revolutionary force. From transforming our residences with smart home systems to redefining transportation through connected cars, IoT's influence is palpable in nearly every facet of our daily lives.":
      "Dans le paysage technologique en évolution rapide d'aujourd'hui, l'Internet des objets (IoT) s'impose comme une force révolutionnaire. Des maisons connectées qui transforment notre logement aux véhicules connectés qui redessinent les transports, l'influence de l'IoT se ressent dans presque tous les aspects de notre quotidien.",
    'IoT is the seamless integration of devices and systems allowing them to communicate and collaborate, transforming homes with smart systems and transportation with connected cars.':
      'L\'IoT est l\'intégration fluide d\'appareils et de systèmes qui leur permet de communiquer et de collaborer, transformant les logements en environnements intelligents et les transports grâce aux véhicules connectés.',
    'IoT: Connecting the World Around Us': 'IoT : connecter le monde qui nous entoure',
    "Manage this site's pages and posts from the ": 'Gérez les pages et les articles de ce site depuis le ',
    'Money isn\'t just currency; ': 'L\'argent n\'est pas qu\'une monnaie ; ',
    "Money isn't just currency; it's a language. Dive deep into its nuances, where strategy meets intuition in the vast sea of finance.":
      'L\'argent n\'est pas qu\'une monnaie ; c\'est une langue. Plongez dans ses subtilités, là où la stratégie croise l\'intuition dans l\'immense océan de la finance.',
    'Money transcends currency to become a language of value, trust, and societal structures with nuances requiring discerning understanding, where strategy meets intuition.':
      'L\'argent dépasse la monnaie pour devenir un langage de la valeur, de la confiance et des structures sociales, dont les subtilités exigent une compréhension fine, là où la stratégie croise l\'intuition.',
    'Money, in its essence, transcends the mere concept of coins and paper notes; it becomes a profound language that speaks of value, trust, and societal structures. Like any language, it possesses intricate nuances and subtleties that require a discerning understanding. It\'s in these depths where the calculated world of financial strategy collides with the raw, instinctive nature of human intuition. Just as a seasoned linguist might dissect the syntax and semantics of a sentence, a financial expert navigates the vast and tumultuous ocean of finance, guided not only by logic and data but also by gut feelings and foresight. Every transaction, investment, and financial decision becomes a dialogue in this expansive lexicon of commerce and value.':
      'L\'argent, dans son essence, dépasse la simple notion de pièces et de billets : il devient un langage profond qui parle de valeur, de confiance et de structures sociales. Comme toute langue, il possède des nuances et des subtilités qui demandent une compréhension avertie. C\'est dans ces profondeurs que le monde calculé de la stratégie financière entre en collision avec la nature brute de l\'intuition humaine. De même qu\'un linguiste chevronné dissecte la syntaxe et la sémantique d\'une phrase, un expert financier navigue dans l\'océan vaste et agité de la finance, guidé non seulement par la logique et les données, mais aussi par l\'instinct et l\'anticipation. Chaque transaction, chaque investissement et chaque décision financière devient un dialogue dans ce vaste lexique du commerce et de la valeur.',
    'Open-source website template built with Payload CMS and Next.js 16, featuring a modern admin dashboard, preview, SEO, and dark mode.':
      'Modèle de site open source construit avec Payload CMS et Next.js 16, avec un tableau de bord moderne, l\'aperçu, le SEO et le mode sombre.',
    'Page Builder': 'Constructeur de pages',
    'Payload Website Template': 'Modèle de site Payload',
    Preview: 'Aperçu',
    'Recent posts': 'Articles récents',
    SEO: 'SEO',
    'Stock Market Dynamics: Bulls, Bears, and the Uncertain Middle':
      'Dynamique des marchés : haussiers, baissiers et zone d\'incertitude',
    'Stock market trends are driven by both economics and human behavior - optimism (bullish) meets caution (bearish) with traders weighing hope against fear.':
      'Les tendances des marchés financiers sont portées par l\'économie comme par le comportement humain : l\'optimisme (haussier) y rencontre la prudence (baissier), les traders pesant l\'espoir contre la peur.',
    'The Power of Resilience: Stories of Recovery and Hope':
      'Le pouvoir de la résilience : récits de rebond et d\'espoir',
    'The Rise of AI and Machine Learning': 'L\'essor de l\'IA et de l\'apprentissage automatique',
    'The admin dashboard includes live preview, version history, draft/published workflow, SEO management, and dark mode support.':
      'Le tableau de bord inclut l\'aperçu en direct, l\'historique des versions, le workflow brouillon/publié, la gestion du SEO et le mode sombre.',
    'The indomitable human spirit emerges as an underestimated force during crises, driving survival, unity, and the ability to overcome challenges together.':
      'L\'esprit humain indomptable se révèle comme une force sous-estimée lors des crises, au service de la survie, de l\'unité et de la capacité à vaincre les défis ensemble.',
    'The posts below are displayed in an "Archive" layout building block which is an extremely powerful way to display documents on a page. It can be auto-populated by collection or by category, or posts can be individually selected. Pagination controls will automatically appear if the number of results exceeds the number of items per page.':
      'Les articles ci-dessous sont affichés dans un bloc de mise en page « Archive », une façon très puissante de présenter des documents sur une page. Il peut être rempli automatiquement par collection ou par catégorie, ou les articles peuvent être sélectionnés un par un. Les contrôles de pagination apparaissent automatiquement si le nombre de résultats dépasse le nombre d\'éléments par page.',
    'The stock market is a realm of vast opportunity but also poses risks. Discover the forces that drive market trends and the strategies employed by top traders to navigate this complex ecosystem. From market analysis to understanding investor psychology, get a comprehensive insight into the world of stocks.':
      'Le marché financier est un monde d\'opportunités immenses, mais aussi de risques. Découvrez les forces qui dictent les tendances et les stratégies des meilleurs traders pour évoluer dans cet écosystème complexe. De l\'analyse de marché à la psychologie de l\'investisseur, obtenez une vision complète du monde de la bourse.',
    'The stock market, often visualized as a bustling arena of numbers and ticker tapes, is as much about human behavior as it is about economics. It\'s a place where optimism, represented by the bullish rally, meets the caution of bearish downturns, with each vying to dictate the market\'s direction. But between these two extremes lies an uncertain middle ground, a zone populated by traders and investors who constantly weigh hope against fear. Successful navigation requires more than just financial acumen; it demands an understanding of collective sentiments and the ability to predict not just market movements, but also the reactions of other market participants. In this intricate dance of numbers and nerves, the most astute players are those who master both the hard data and the soft nuances of human behavior.':
      'Le marché financier, souvent représenté comme d\'une arène bruyante de chiffres et de tickers, relève autant du comportement humain que de l\'économie. C\'est un lieu où l\'optimisme, porté par le rallye haussier, rencontre la prudence des replis baissiers, chacun cherchant à dicter la direction du marché. Mais entre ces deux extrêmes s\'étend une zone d\'incertitude, peuplée de traders et d\'investisseurs qui pèsent sans cesse l\'espoir contre la peur. Bien y naviguer exige plus que l\'acuité financière : il faut comprendre les sentiments collectifs et savoir anticiper non seulement les mouvements du marché, mais aussi les réactions des autres participants. Dans cette danse savante des chiffres et des nerfs, les plus habiles sont ceux qui maîtrisent à la fois les données dures et les nuances du comportement humain.',
    'This content above is completely dynamic using custom layout building blocks configured in the CMS. This can be anything you\'d like from rich text and images, to highly designed, complex components.':
      'Le contenu ci-dessus est entièrement dynamique grâce à des blocs de mise en page personnalisés configurés dans le CMS. Vous pouvez y mettre ce que vous souhaitez : texte enrichi, images, ou composants complexes très soignés.',
    'This content is fabricated and for demonstration purposes only. To edit this post, ':
      'Ce contenu est fictif et sert uniquement de démonstration. Pour modifier cet article, ',
    'This is a call to action': 'Voici un appel à l\'action',
    'This is a custom layout building block ': 'Voici un bloc de mise en page personnalisé ',
    'This technology hinges on the seamless integration of devices and systems, allowing them to communicate and collaborate effortlessly. With each connected device, we move a step closer to a world where convenience and efficiency are embedded in the very fabric of our existence. As a result, we\'re transitioning into an era where our surroundings intuitively respond to our needs, heralding a smarter and more interconnected global community.':
      'Cette technologie repose sur l\'intégration fluide d\'appareils et de systèmes, qui leur permet de communiquer et de collaborer sans effort. À chaque appareil connecté, nous nous rapprochons d\'un monde où le confort et l\'efficacité sont inscrits dans le tissu même de notre existence. Nous entrons ainsi dans une ère où notre environnement répond intuitivement à nos besoins, annonçant une communauté mondiale plus intelligente et plus connectée.',
    'This template is built with Payload CMS and Next.js 16, using the App Router and Server Components.':
      'Ce modèle est construit avec Payload CMS et Next.js 16, en utilisant l\'App Router et les Server Components.',
    'Throughout history, regions across the globe have faced the devastating impact of natural disasters, the turbulence of political unrest, and the challenging ripples of economic downturns. In these moments of profound crisis, an often-underestimated force emerges: the indomitable resilience of the human spirit. These aren\'t just tales of mere survival, but stories of communities forging bonds, uniting with a collective purpose, and demonstrating an innate ability to overcome.':
      'Au fil de l\'histoire, les régions du monde entier ont subi le choc dévastateur des catastrophes naturelles, la tourmente des troubles politiques et les ondulations difficiles des crises économiques. Dans ces moments de crise profonde, une force souvent sous-estimée émerge : la résilience indomptable de l\'esprit humain. Ce ne sont pas de simples récits de survie, mais des histoires de communautés qui créent des liens, s\'unissent autour d\'un but collectif et font preuve d\'une capacité intrinsèque à vaincre les épreuves.',
    'To demonstrate basic AI functionality, here is a javascript snippet that makes a POST request to a generic AI API in order to generate text based on a prompt. ':
      'Pour illustrer le fonctionnement de base d\'une IA, voici un extrait JavaScript qui envoie une requête POST à une API d\'IA générique afin de générer du texte à partir d\'un prompt. ',
    'Users will experience this site in their preferred color scheme and each block can be inverted.':
      'Les visiteurs découvrent le site dans le mode de couleur qu\'ils préfèrent, et chaque bloc peut être inversé.',
    'Using versions, drafts, and preview, editors can review and share their changes before publishing them.':
      'Grâce aux versions, aux brouillons et à l\'aperçu, les rédacteurs peuvent relire et partager leurs modifications avant publication.',
    'Visit the admin dashboard': 'Visiter le tableau de bord',
    'We find ourselves in a transformative era where artificial intelligence (AI) stands at the forefront of technological evolution. The ripple effects of its advancements are reshaping industries at an unprecedented pace. No longer are businesses bound by the limitations of tedious, manual processes. Instead, sophisticated machines, fueled by vast amounts of historical data, are now capable of making decisions previously left to human intuition. These intelligent systems are not only optimizing operations but also pioneering innovative approaches, heralding a new age of business transformation worldwide. ':
      'Nous sommes entrés dans une ère transformatrice où l\'intelligence artificielle (IA) est en première ligne de l\'évolution technologique. Les effets d\'ondulation de ses avancées redessinent les industries à une vitesse inédite. Les entreprises ne sont plus prisonnières des limites de processus manuels fastidieux. Des machines sophistiques, alimentées par d\'immenses quantités de données historiques, prennent désormais des décisions jusque-là laissées à l\'intuition humaine. Ces systèmes intelligents n\'optimisent pas seulement les opérations, ils ouvrent également des voies inédites, annonçant un nouvel âge de la transformation des entreprises dans le monde entier. ',
    'What drives stock market trends?': 'Qu\'est-ce qui drives les tendances des marchés financiers ?',
    'What features does the admin dashboard include?':
      'Quelles fonctionnalités le tableau de bord propose-t-il ?',
    'What is the Internet of Things (IoT)?': 'Qu\'est-ce que l\'Internet des objets (IoT) ?',
    'What is this website template built with?': 'Avec quoi ce modèle de site est-il construit ?',
    'What role does human spirit play in crisis?': 'Quel rôle joue l\'esprit humain dans une crise ?',
    'admin dashboard': 'tableau de bord',
    'configured in the admin dashboard': 'configuré dans le tableau de bord',
    'it\'s a language. ': 'c\'est une langue. ',
    'navigate to the admin dashboard': 'accéder au tableau de bord',
    'navigate to the admin dashboard.': 'accédez au tableau de bord.',
    'on our Github': 'sur notre GitHub',
    'How can I contact the website administrators?':
      'Comment puis-je contacter les administrateurs du site ?',
    'Contact page with a form for reaching out to the website administrators.':
      'Page de contact avec un formulaire pour joindre les administrateurs du site.',
    'Example contact form:': 'Exemple de formulaire de contact :',
    'Use the contact form on this page to send a message to the website administrators.':
      'Utilisez le formulaire de contact de cette page pour envoyer un message aux administrateurs du site.',
    'The contact form has been submitted successfully.':
      'Le formulaire de contact a bien été envoyé.',
    'Your contact form submission was successfully received.':
      'Votre message via le formulaire de contact a bien été reçu.',
    'You\'ve received a new message.': 'Vous avez reçu un nouveau message.',
    'Contact Form': 'Formulaire de contact',
    'Full Name': 'Nom complet',
    Email: 'E-mail',
    Phone: 'Téléphone',
    Message: 'Message',
    Submit: 'Envoyer',
  },

  de: {
    ' This content is fabricated and for demonstration purposes only. To edit this post, ':
      ' Dieser Inhalt ist erfunden und dient nur der Demonstration. Um diesen Beitrag zu bearbeiten, ',
    ' to begin managing this site\'s content. The code for this template is completely open-source and can be found ':
      ' und die Inhalte dieser Website zu verwalten. Der Code dieses Templates ist vollständig Open Source und findet sich ',
    'AI is optimizing operations and pioneering innovative approaches by making decisions previously left to human intuition, reshaping industries at unprecedented pace.':
      'KI optimiert Abläufe und erschließt neue Wege, indem sie Entscheidungen trifft, die früher der menschlichen Intuition überlassen waren, und verändert Branchen in beispielloser Geschwindigkeit.',
    'Admin Dashboard': 'Dashboard',
    'All posts': 'Alle Beiträge',
    'An open-source website built with Payload and Next.js.':
      'Eine Open-Source-Website mit Payload und Next.js.',
    'Article exploring AI, machine learning, and IoT technologies reshaping industries and daily life.':
      'Beitrag über KI, maschinelles Lernen und IoT-Technologien, die Branchen und den Alltag verändern.',
    'Article on human resilience and community recovery after natural disasters, political unrest, and economic crises.':
      'Beitrag über menschliche Resilienz und den Wiederaufbau von Gemeinschaften nach Naturkatastrophen, politischen Unruhen und Wirtschaftskrisen.',
    'Communities recover through solidarity - neighbors forming rescue teams, cities rallying to rebuild, and collective purpose turning adversity into growth.':
      'Gemeinschaften erholen sich durch Solidarität – Nachbarn bilden Rettungsteams, Städte rüsten zum Wiederaufbau, und ein gemeinsames Ziel verwandelt Not in Wachstum.',
    Contact: 'Kontakt',
    'Core features': 'Kernfunktionen',
    'Custom page builder allows you to create unique page, post, and project layouts for any type of content.':
      'Mit dem Page Builder lassen sich individuelle Layouts für Seiten, Beiträge und Projekte jedes Inhaltstyps erstellen.',
    'Dark Mode': 'Dunkelmodus',
    'Digital Horizons: A Glimpse into Tomorrow': 'Digitale Horizonte: Ein Blick auf morgen',
    'Disclaimer:': 'Hinweis:',
    'Disclaimer: ': 'Hinweis: ',
    'Dive deep into its nuances, where strategy meets intuition in the vast sea of finance.':
      'Tauchen Sie tief in seine Feinheiten ein, wo Strategie und Intuition im weiten Ozean der Finanzen aufeinandertreffen.',
    'Dive into the marvels of modern innovation, where the only constant is change. A journey where pixels and data converge to craft the future.':
      'Tauchen Sie ein in die Wunder der modernen Innovation, in der die einzige Konstante der Wandel ist. Eine Reise, auf der Pixel und Daten zusammenlaufen, um die Zukunft zu gestalten.',
    'Dollar and Sense: The Financial Forecast': 'Geld und Verstand: Die Finanzprognose',
    'Editors have complete control over SEO data and site content directly from the ':
      'Redakteurinnen und Redakteure haben die volle Kontrolle über SEO-Daten und Inhalte – direkt aus dem ',
    'Explore the untold and overlooked. A magnified view into the corners of the world, where every story deserves its spotlight.':
      'Entdecken Sie das Unerzählte und Übersehene. Ein vergrößerter Blick in die Ecken der Welt, in denen jede Geschichte ihr Scheinwerfer verdient.',
    'Financial article on money as a language, stock market dynamics, bull/bear markets, and investor psychology.':
      'Finanzartikel über Geld als Sprache, die Dynamik der Börse, Bullen- und Bärenmärkte sowie die Psychologie der Anleger.',
    'From neighbors forming makeshift rescue teams during floods to entire cities rallying to rebuild after economic collapse, the essence of humanity is most evident in these acts of solidarity. As we delve into these narratives, we witness the transformative power of community spirit, where adversity becomes a catalyst for growth, unity, and a brighter, rebuilt future.':
      'Von Nachbarn, die bei Hochwassern improvisierte Rettungsteams bilden, bis zu ganzen Städten, die sich nach einem Wirtschaftszerfall zum Wiederaufbau zusammenschließen: Hier zeigt sich das Wesen der Menschlichkeit am deutlichsten. In diesen Erzählungen erleben wir die transformative Kraft des Gemeinschaftsgeists, in der Not zu Wachstum, Einigkeit und einer helleren, neu erbauten Zukunft wird.',
    'Global Gaze: Beyond the Headlines': 'Globaler Blick: Hinter den Schlagzeilen',
    Home: 'Startseite',
    'How do communities recover after disasters?':
      'Wie erholen sich Gemeinschaften nach Katastrophen?',
    'How does money function as a language?': 'Wie funktioniert Geld als Sprache?',
    'How is AI transforming industries?': 'Wie verändert KI die Branchen?',
    "In today's rapidly evolving technological landscape, the Internet of Things (IoT) stands out as a revolutionary force. From transforming our residences with smart home systems to redefining transportation through connected cars, IoT's influence is palpable in nearly every facet of our daily lives.":
      'In der rasant fortschreitenden Technologielandschaft von heute sticht das Internet der Dinge (IoT) als revolutionäre Kraft heraus. Vom vernetzten Zuhause bis zum neu definierten Verkehr durch vernetzte Fahrzeuge – der Einfluss des IoT ist in nahezu jedem Bereich unseres Alltags spürbar.',
    'IoT is the seamless integration of devices and systems allowing them to communicate and collaborate, transforming homes with smart systems and transportation with connected cars.':
      'IoT ist die nahtlose Integration von Geräten und Systemen, die miteinander kommunizieren und zusammenarbeiten – smarte Häuser und vernetzte Mobilität werden so möglich.',
    'IoT: Connecting the World Around Us': 'IoT: Die Welt um uns verbinden',
    "Manage this site's pages and posts from the ": 'Verwalten Sie die Seiten und Beiträge dieser Website im ',
    'Money isn\'t just currency; ': 'Geld ist nicht nur Währung; ',
    "Money isn't just currency; it's a language. Dive deep into its nuances, where strategy meets intuition in the vast sea of finance.":
      'Geld ist nicht nur Währung, es ist eine Sprache. Tauchen Sie tief in ihre Feinheiten ein, wo Strategie und Intuition im weiten Ozean der Finanzen aufeinandertreffen.',
    'Money transcends currency to become a language of value, trust, and societal structures with nuances requiring discerning understanding, where strategy meets intuition.':
      'Geld überschreitet die Währung und wird zu einer Sprache des Wertes, des Vertrauens und gesellschaftlicher Strukturen – mit Feinheiten, die ein differenziertes Verständnis verlangen, dort wo Strategie und Intuition aufeinandertreffen.',
    'Money, in its essence, transcends the mere concept of coins and paper notes; it becomes a profound language that speaks of value, trust, and societal structures. Like any language, it possesses intricate nuances and subtleties that require a discerning understanding. It\'s in these depths where the calculated world of financial strategy collides with the raw, instinctive nature of human intuition. Just as a seasoned linguist might dissect the syntax and semantics of a sentence, a financial expert navigates the vast and tumultuous ocean of finance, guided not only by logic and data but also by gut feelings and foresight. Every transaction, investment, and financial decision becomes a dialogue in this expansive lexicon of commerce and value.':
      'Geld transzendiert in seinem Wesen den bloßen Begriff von Münzen und Geldscheinen; es wird zu einer tiefen Sprache, die von Wert, Vertrauen und gesellschaftlichen Strukturen spricht. Wie jede Sprache birgt es verwickelte Nuancen und Feinheiten, die ein differenziertes Verständnis erfordern. In diesen Tiefen trifft die kalkulierte Welt der Finanzstrategie auf die rohe, instinktive Natur der menschlichen Intuition. So wie ein erfahrener Linguist Syntax und Semantik eines Satzes seziert, navigiert ein Finanzexperte durch den weiten und stürmischen Ozean der Finanzen, geführt nicht nur von Logik und Daten, sondern auch von Bauchgefühl und Weitblick. Jede Transaktion, jede Anlage und jede Finanzentscheidung wird zu einem Dialog in diesem weit gefächerten Lexikon des Handels und des Wertes.',
    'Open-source website template built with Payload CMS and Next.js 16, featuring a modern admin dashboard, preview, SEO, and dark mode.':
      'Open-Source-Website-Template mit Payload CMS und Next.js 16 – mit modernem Dashboard, Vorschau, SEO und Dunkelmodus.',
    'Page Builder': 'Page Builder',
    'Payload Website Template': 'Payload Website Template',
    Preview: 'Vorschau',
    'Recent posts': 'Neueste Beiträge',
    SEO: 'SEO',
    'Stock Market Dynamics: Bulls, Bears, and the Uncertain Middle':
      'Börsendynamik: Bullen, Bären und die ungewisse Mitte',
    'Stock market trends are driven by both economics and human behavior - optimism (bullish) meets caution (bearish) with traders weighing hope against fear.':
      'Börsentrends werden von Wirtschaft und menschlichem Verhalten gleichermaßen getrieben – Optimismus (bullisch) trifft auf Vorsicht (bearisch), während Händler Hoffnung gegen die Angst abwägen.',
    'The Power of Resilience: Stories of Recovery and Hope':
      'Die Kraft der Resilienz: Geschichten von Wiederaufbau und Hoffnung',
    'The Rise of AI and Machine Learning': 'Der Aufstieg von KI und maschinellem Lernen',
    'The admin dashboard includes live preview, version history, draft/published workflow, SEO management, and dark mode support.':
      'Das Dashboard bietet Live-Vorschau, Versionshistorie, Entwurf/Veröffentlicht-Workflow, SEO-Verwaltung und Dunkelmodus.',
    'The indomitable human spirit emerges as an underestimated force during crises, driving survival, unity, and the ability to overcome challenges together.':
      'Der unbezwingbare menschliche Geist erweist sich in Krisen als unterschätzte Kraft, die Überleben, Einigkeit und die Fähigkeit stärkt, Herausforderungen gemeinsam zu meistern.',
    'The posts below are displayed in an "Archive" layout building block which is an extremely powerful way to display documents on a page. It can be auto-populated by collection or by category, or posts can be individually selected. Pagination controls will automatically appear if the number of results exceeds the number of items per page.':
      'Die Beiträge unten werden im Layout-Block „Archive“ angezeigt – einer sehr mächtigen Möglichkeit, Dokumente auf einer Seite zu zeigen. Er kann automatisch nach Sammlung oder Kategorie gefüllt werden, oder die Beiträge werden einzeln ausgewählt. Paginierungssteuerelemente erscheinen automatisch, wenn die Anzahl der Ergebnisse die Anzahl der Beiträge pro Seite übersteigt.',
    'The stock market is a realm of vast opportunity but also poses risks. Discover the forces that drive market trends and the strategies employed by top traders to navigate this complex ecosystem. From market analysis to understanding investor psychology, get a comprehensive insight into the world of stocks.':
      'Der Kapitalmarkt ist ein Bereich enormer Chancen, aber auch erheblicher Risiken. Entdecken Sie die Kräfte, die Trends bewegen, und die Strategien erfolgreicher Trader in diesem komplexen Ökosystem. Von der Marktanalyse bis zur Psychologie der Anleger: ein umfassender Einblick in die Welt der Aktien.',
    'The stock market, often visualized as a bustling arena of numbers and ticker tapes, is as much about human behavior as it is about economics. It\'s a place where optimism, represented by the bullish rally, meets the caution of bearish downturns, with each vying to dictate the market\'s direction. But between these two extremes lies an uncertain middle ground, a zone populated by traders and investors who constantly weigh hope against fear. Successful navigation requires more than just financial acumen; it demands an understanding of collective sentiments and the ability to predict not just market movements, but also the reactions of other market participants. In this intricate dance of numbers and nerves, the most astute players are those who master both the hard data and the soft nuances of human behavior.':
      'Der Kapitalmarkt, oft als geschäftige Arena voller Zahlen und Kursanzeigen imaginiert, ist ebenso ein Spiegel menschlichen Verhaltens wie der Ökonomie. Hier trifft der Optimismus des Bullen-Rallys auf die Vorsicht bearisher Rückschläge, und beide wollen die Richtung des Marktes bestimmen. Zwischen diesen Extremen liegt ein unsicheres Mittelfeld, bevölkert von Händlern und Anlegern, die ständig Hoffnung gegen die Angst abwägen. Erfolgreiche Navigation verlangt mehr als finanzielle Expertise; sie erfordert ein Verständnis für kollektive Stimmungen und die Fähigkeit, nicht nur Marktbewegungen, sondern auch die Reaktionen der anderen Marktteilnehmer vorherzusehen. In diesem komplexen Tanz aus Zahlen und Nerven sind die erfolgreichsten Akteure diejenigen, die sowohl die harten Daten als auch die weichen Nuancen menschlichen Verhaltens beherrschen.',
    'This content above is completely dynamic using custom layout building blocks configured in the CMS. This can be anything you\'d like from rich text and images, to highly designed, complex components.':
      'Der obige Inhalt ist dank maßgeschneiderter Layout-Blocks im CMS vollständig dynamisch. Das kann alles sein – von Rich Text und Bildern bis zu hochwertig gestalteten, komplexen Komponenten.',
    'This content is fabricated and for demonstration purposes only. To edit this post, ':
      'Dieser Inhalt ist erfunden und dient nur der Demonstration. Um diesen Beitrag zu bearbeiten, ',
    'This is a call to action': 'Das ist ein Call to Action',
    'This is a custom layout building block ': 'Das ist ein individueller Layout-Block ',
    'This technology hinges on the seamless integration of devices and systems, allowing them to communicate and collaborate effortlessly. With each connected device, we move a step closer to a world where convenience and efficiency are embedded in the very fabric of our existence. As a result, we\'re transitioning into an era where our surroundings intuitively respond to our needs, heralding a smarter and more interconnected global community.':
      'Diese Technologie basiert auf der nahtlosen Integration von Geräten und Systemen, die mühelos miteinander kommunizieren und zusammenarbeiten. Mit jedem vernetzten Gerät kommen wir einer Welt näher, in der Komfort und Effizienz im Gewebe unserer Existenz verankert sind. Wir gehen damit in eine Ära ein, in der unsere Umgebung intuitiv auf unsere Bedürfnisse reagiert – und kündigen eine klügere, stärker vernetzte globale Gemeinschaft an.',
    'This template is built with Payload CMS and Next.js 16, using the App Router and Server Components.':
      'Dieses Template basiert auf Payload CMS und Next.js 16 mit App Router und Server Components.',
    'Throughout history, regions across the globe have faced the devastating impact of natural disasters, the turbulence of political unrest, and the challenging ripples of economic downturns. In these moments of profound crisis, an often-underestimated force emerges: the indomitable resilience of the human spirit. These aren\'t just tales of mere survival, but stories of communities forging bonds, uniting with a collective purpose, and demonstrating an innate ability to overcome.':
      'Im Laufe der Geschichte wurden Regionen weltweit von den verheerenden Auswirkungen natürlicher Katastrophen, den Unruhen politischer Krisen und den schwierigen Wellen wirtschaftlicher Abschwünge getroffen. In diesen Momenten tiefer Krise tritt eine oft unterschätzte Kraft hervor: die unbezwingbare Resilienz des menschlichen Geistes. Es sind nicht nur Geschichten des Überlebens, sondern von Gemeinschaften, die Bindungen schmieden, sich mit einem gemeinsamen Ziel vereinen und eine angeborene Fähigkeit zu überwinden zeigen.',
    'To demonstrate basic AI functionality, here is a javascript snippet that makes a POST request to a generic AI API in order to generate text based on a prompt. ':
      'Um die grundlegende Funktionsweise von KI zu zeigen, folgt ein JavaScript-Schnipsel, der eine POST-Anfrage an eine generische KI-API sendet, um Text aus einem Prompt zu erzeugen. ',
    'Users will experience this site in their preferred color scheme and each block can be inverted.':
      'Besucher erleben die Website in ihrem bevorzugten Farbschema, und jeder Block lässt sich invertieren.',
    'Using versions, drafts, and preview, editors can review and share their changes before publishing them.':
      'Mit Versionen, Entwürfen und Vorschau können Redakteurinnen und Redakteure ihre Änderungen vor der Veröffentlichung prüfen und teilen.',
    'Visit the admin dashboard': 'Dashboard besuchen',
    'We find ourselves in a transformative era where artificial intelligence (AI) stands at the forefront of technological evolution. The ripple effects of its advancements are reshaping industries at an unprecedented pace. No longer are businesses bound by the limitations of tedious, manual processes. Instead, sophisticated machines, fueled by vast amounts of historical data, are now capable of making decisions previously left to human intuition. These intelligent systems are not only optimizing operations but also pioneering innovative approaches, heralding a new age of business transformation worldwide. ':
      'Wir befinden uns in einer transformativen Ära, in der die künstliche Intelligenz (KI) an der Spitze der technologischen Entwicklung steht. Die Wellenwirkung ihrer Fortschritte formt Branchen in beispielloser Geschwindigkeit neu. Unternehmen sind nicht mehr an die Grenzen mühsamer, manueller Abläufe gebunden. Stattdessen treffen hochentwickelte Maschinen, gefüttert mit riesigen Mengen historischer Daten, heute Entscheidungen, die früher der menschlichen Intuition vorbehalten waren. Diese intelligenten Systeme optimieren nicht nur Abläufe, sondern erschließen auch innovative Wege und kündigen ein neues Zeitalter der geschäftlichen Transformation weltweit an. ',
    'What drives stock market trends?': 'Was treibt Börsentrends?',
    'What features does the admin dashboard include?':
      'Welche Funktionen bietet das Dashboard?',
    'What is the Internet of Things (IoT)?': 'Was ist das Internet der Dinge (IoT)?',
    'What is this website template built with?': 'Womit wurde dieses Website-Template gebaut?',
    'What role does human spirit play in crisis?': 'Welche Rolle spielt der menschliche Geist in Krisen?',
    'admin dashboard': 'Dashboard',
    'configured in the admin dashboard': 'im Dashboard konfiguriert',
    'it\'s a language. ': 'ist eine Sprache. ',
    'navigate to the admin dashboard': 'zum Dashboard navigieren',
    'navigate to the admin dashboard.': 'zum Dashboard navigieren.',
    'on our Github': 'auf unserem GitHub',
    'How can I contact the website administrators?':
      'Wie kann ich die Betreiber der Website kontaktieren?',
    'Contact page with a form for reaching out to the website administrators.':
      'Kontaktseite mit einem Formular, um die Betreiber der Website zu erreichen.',
    'Example contact form:': 'Beispiel-Kontaktformular:',
    'Use the contact form on this page to send a message to the website administrators.':
      'Nutzen Sie das Kontaktformular auf dieser Seite, um eine Nachricht an die Betreiber der Website zu senden.',
    'The contact form has been submitted successfully.':
      'Das Kontaktformular wurde erfolgreich abgeschickt.',
    'Your contact form submission was successfully received.':
      'Ihre Nachricht über das Kontaktformular ist erfolgreich eingegangen.',
    'You\'ve received a new message.': 'Sie haben eine neue Nachricht erhalten.',
    'Contact Form': 'Kontaktformular',
    'Full Name': 'Vollständiger Name',
    Email: 'E-Mail',
    Phone: 'Telefon',
    Message: 'Nachricht',
    Submit: 'Absenden',
  },

  es: {
    ' This content is fabricated and for demonstration purposes only. To edit this post, ':
      ' Este contenido es ficticio y solo sirve como demostración. Para editar este artículo, ',
    ' to begin managing this site\'s content. The code for this template is completely open-source and can be found ':
      ' para empezar a gestionar el contenido de este sitio. El código de esta plantilla es totalmente de código abierto y se encuentra ',
    'AI is optimizing operations and pioneering innovative approaches by making decisions previously left to human intuition, reshaping industries at unprecedented pace.':
      'La IA optimiza las operaciones y abre vías nuevas al tomar decisiones que antes dependían de la intuición humana, transformando las industrias a una velocidad sin precedentes.',
    'Admin Dashboard': 'Panel de administración',
    'All posts': 'Todos los artículos',
    'An open-source website built with Payload and Next.js.':
      'Un sitio de código abierto construido con Payload y Next.js.',
    'Article exploring AI, machine learning, and IoT technologies reshaping industries and daily life.':
      'Artículo sobre IA, aprendizaje automático e IoT, tecnologías que transforman las industrias y la vida cotidiana.',
    'Article on human resilience and community recovery after natural disasters, political unrest, and economic crises.':
      'Artículo sobre la resiliencia humana y la recuperación de las comunidades tras desastres naturales, inestabilidad política y crisis económicas.',
    'Communities recover through solidarity - neighbors forming rescue teams, cities rallying to rebuild, and collective purpose turning adversity into growth.':
      'Las comunidades se recuperan por la solidaridad: vecinos que forman equipos de rescate, ciudades que se movilizan para reconstruir y un propósito colectivo que convierte la adversidad en crecimiento.',
    Contact: 'Contacto',
    'Core features': 'Funciones clave',
    'Custom page builder allows you to create unique page, post, and project layouts for any type of content.':
      'El constructor de páginas permite crear diseños únicos para páginas, artículos y proyectos de cualquier tipo de contenido.',
    'Dark Mode': 'Modo oscuro',
    'Digital Horizons: A Glimpse into Tomorrow': 'Horizontes digitales: un vistazo al mañana',
    'Disclaimer:': 'Aviso:',
    'Disclaimer: ': 'Aviso: ',
    'Dive deep into its nuances, where strategy meets intuition in the vast sea of finance.':
      'Sumérjase en sus matices, donde la estrategia se encuentra con la intuición en el vasto mar de las finanzas.',
    'Dive into the marvels of modern innovation, where the only constant is change. A journey where pixels and data converge to craft the future.':
      'Sumérjase en las maravillas de la innovación moderna, donde lo único constante es el cambio. Un viaje en el que los píxeles y los datos convergen para forjar el futuro.',
    'Dollar and Sense: The Financial Forecast': 'El sentido del dinero: las previsiones financieras',
    'Editors have complete control over SEO data and site content directly from the ':
      'Los editores controlan por completo los datos SEO y el contenido del sitio directamente desde el ',
    'Explore the untold and overlooked. A magnified view into the corners of the world, where every story deserves its spotlight.':
      'Explore lo no contado y lo ignorado. Una vista ampliada de los rincones del mundo, donde cada historia merece su foco.',
    'Financial article on money as a language, stock market dynamics, bull/bear markets, and investor psychology.':
      'Artículo financiero sobre el dinero como lenguaje, la dinámica bursátil, los mercados alcistas y bajistas y la psicología del inversor.',
    'From neighbors forming makeshift rescue teams during floods to entire cities rallying to rebuild after economic collapse, the essence of humanity is most evident in these acts of solidarity. As we delve into these narratives, we witness the transformative power of community spirit, where adversity becomes a catalyst for growth, unity, and a brighter, rebuilt future.':
      'Desde los vecinos que forman equipos de rescate improvisados durante las inundaciones hasta las ciudades enteras que se movilizan para reconstruir tras un colapso económico, la esencia de la humanidad se manifiesta en esos actos de solidaridad. Al explorar estas historias, comprobamos el poder transformador del espíritu colectivo, donde la adversidad se convierte en un catalizador de crecimiento, unidad y un futuro más luminoso, reconstruido.',
    'Global Gaze: Beyond the Headlines': 'Mirada global: más allá de los titulares',
    Home: 'Inicio',
    'How do communities recover after disasters?':
      '¿Cómo se recuperan las comunidades tras un desastre?',
    'How does money function as a language?': '¿Cómo funciona el dinero como lenguaje?',
    'How is AI transforming industries?': '¿Cómo está transformando la IA las industrias?',
    "In today's rapidly evolving technological landscape, the Internet of Things (IoT) stands out as a revolutionary force. From transforming our residences with smart home systems to redefining transportation through connected cars, IoT's influence is palpable in nearly every facet of our daily lives.":
      'En el panorama tecnológico de rápida evolución actual, el Internet de las cosas (IoT) destaca como una fuerza revolucionaria. Desde el hogar conectado hasta el transporte redefinido por los vehículos conectados, la influencia del IoT se percibe en casi todos los ámbitos de nuestra vida diaria.',
    'IoT is the seamless integration of devices and systems allowing them to communicate and collaborate, transforming homes with smart systems and transportation with connected cars.':
      'El IoT es la integración fluida de dispositivos y sistemas que les permite comunicarse y colaborar, convirtiendo los hogares en entornos inteligentes y el transporte en movilidad conectada.',
    'IoT: Connecting the World Around Us': 'IoT: conectar el mundo que nos rodea',
    "Manage this site's pages and posts from the ": 'Gestione las páginas y los artículos de este sitio desde el ',
    'Money isn\'t just currency; ': 'El dinero no es solo moneda; ',
    "Money isn't just currency; it's a language. Dive deep into its nuances, where strategy meets intuition in the vast sea of finance.":
      'El dinero no es solo moneda, es un lenguaje. Sumérjase en sus matices, donde la estrategia se encuentra con la intuición en el vasto mar de las finanzas.',
    'Money transcends currency to become a language of value, trust, and societal structures with nuances requiring discerning understanding, where strategy meets intuition.':
      'El dinero trasciende la moneda y se convierte en un lenguaje del valor, la confianza y las estructuras sociales, con matices que exigen una comprensión perspicaz, donde la estrategia se encuentra con la intuición.',
    'Money, in its essence, transcends the mere concept of coins and paper notes; it becomes a profound language that speaks of value, trust, and societal structures. Like any language, it possesses intricate nuances and subtleties that require a discerning understanding. It\'s in these depths where the calculated world of financial strategy collides with the raw, instinctive nature of human intuition. Just as a seasoned linguist might dissect the syntax and semantics of a sentence, a financial expert navigates the vast and tumultuous ocean of finance, guided not only by logic and data but also by gut feelings and foresight. Every transaction, investment, and financial decision becomes a dialogue in this expansive lexicon of commerce and value.':
      'El dinero, en su esencia, trasciende la mera idea de monedas y billetes; se convierte en un lenguaje profundo que habla de valor, confianza y estructuras sociales. Como cualquier lengua, posee matices y sutilezas que exigen una comprensión perspicaz. Es en esas profundidades donde el mundo calculado de la estrategia financiera choca con la naturaleza cruda e instintiva de la intuición humana. Así como un lingüista experto disecciona la sintaxis y la semántica de una frase, un experto financiero navega por el vasto y agitado océano de las finanzas, guiado no solo por la lógica y los datos, sino también por las corazonadas y la visión. Cada transacción, inversión y decisión financiera se convierte en un diálogo en este amplio léxico del comercio y el valor.',
    'Open-source website template built with Payload CMS and Next.js 16, featuring a modern admin dashboard, preview, SEO, and dark mode.':
      'Plantilla de sitio de código abierto construida con Payload CMS y Next.js 16, con panel de administración moderno, vista previa, SEO y modo oscuro.',
    'Page Builder': 'Constructor de páginas',
    'Payload Website Template': 'Plantilla de sitio Payload',
    Preview: 'Vista previa',
    'Recent posts': 'Artículos recientes',
    SEO: 'SEO',
    'Stock Market Dynamics: Bulls, Bears, and the Uncertain Middle':
      'Dinámica bursátil: alcistas, bajistas y la zona incierta',
    'Stock market trends are driven by both economics and human behavior - optimism (bullish) meets caution (bearish) with traders weighing hope against fear.':
      'Las tendencias bursátiles están marcadas tanto por la economía como por la conducta humana: el optimismo (alcista) se encuentra con la prudencia (bajista), mientras los operadores sopesan la esperanza frente al miedo.',
    'The Power of Resilience: Stories of Recovery and Hope':
      'El poder de la resiliencia: historias de recuperación y esperanza',
    'The Rise of AI and Machine Learning': 'El auge de la IA y el aprendizaje automático',
    'The admin dashboard includes live preview, version history, draft/published workflow, SEO management, and dark mode support.':
      'El panel de administración incluye vista previa en vivo, historial de versiones, flujo borrador/publicado, gestión de SEO y modo oscuro.',
    'The indomitable human spirit emerges as an underestimated force during crises, driving survival, unity, and the ability to overcome challenges together.':
      'El espíritu humano indomable aflora durante las crisis como una fuerza subestimada que impulsa la supervivencia, la unidad y la capacidad de superar los desafíos juntos.',
    'The posts below are displayed in an "Archive" layout building block which is an extremely powerful way to display documents on a page. It can be auto-populated by collection or by category, or posts can be individually selected. Pagination controls will automatically appear if the number of results exceeds the number of items per page.':
      'Los artículos siguientes se muestran en un bloque de diseño «Archive», una forma muy potente de exhibir documentos en una página. Puede rellenarse automáticamente por colección o por categoría, o se pueden seleccionar artículos individualmente. Los controles de paginación aparecen automáticamente si el número de resultados supera el número de elementos por página.',
    'The stock market is a realm of vast opportunity but also poses risks. Discover the forces that drive market trends and the strategies employed by top traders to navigate this complex ecosystem. From market analysis to understanding investor psychology, get a comprehensive insight into the world of stocks.':
      'El mercado bursátil es un ámbito de enormes oportunidades, pero también de riesgos. Descubra las fuerzas que mueven las tendencias y las estrategias de los mejores operadores para navegar por este ecosistema complejo. Del análisis de mercado a la psicología del inversor, obtenga una visión completa del mundo de las acciones.',
    'The stock market, often visualized as a bustling arena of numbers and ticker tapes, is as much about human behavior as it is about economics. It\'s a place where optimism, represented by the bullish rally, meets the caution of bearish downturns, with each vying to dictate the market\'s direction. But between these two extremes lies an uncertain middle ground, a zone populated by traders and investors who constantly weigh hope against fear. Successful navigation requires more than just financial acumen; it demands an understanding of collective sentiments and the ability to predict not just market movements, but also the reactions of other market participants. In this intricate dance of numbers and nerves, the most astute players are those who master both the hard data and the soft nuances of human behavior.':
      'El mercado bursátil, a menudo imaginado como una bulliciosa arena de cifras y cotizaciones, es tanto un escenario de conducta humana como de economía. Es un lugar donde el optimismo, representado por el repunte alcista, se encuentra con la cautela de las caídas bajistas, y ambos compiten por imponer su dirección. Pero entre esos dos extremos se extiende una tierra intermedia incierta, poblada de operadores e inversores que sopesan sin descanso la esperanza contra el miedo. Navegar bien exige algo más que oficio financiero: requiere comprender los sentimientos colectivos y saber anticipar no solo los movimientos del mercado, sino también las reacciones de los demás participantes. En este intrincado baile de cifras y nervios, los jugadores más perspicaces son los que dominan tanto los datos duros como los matices blandos de la conducta humana.',
    'This content above is completely dynamic using custom layout building blocks configured in the CMS. This can be anything you\'d like from rich text and images, to highly designed, complex components.':
      'El contenido anterior es totalmente dinámico gracias a bloques de diseño personalizados configurados en el CMS. Puede ser lo que usted quiera: texto enriquecido e imágenes, o componentes complejos muy cuidadosamente diseñados.',
    'This content is fabricated and for demonstration purposes only. To edit this post, ':
      'Este contenido es ficticio y solo sirve como demostración. Para editar este artículo, ',
    'This is a call to action': 'Esto es una llamada a la acción',
    'This is a custom layout building block ': 'Esto es un bloque de diseño personalizado ',
    'This technology hinges on the seamless integration of devices and systems, allowing them to communicate and collaborate effortlessly. With each connected device, we move a step closer to a world where convenience and efficiency are embedded in the very fabric of our existence. As a result, we\'re transitioning into an era where our surroundings intuitively respond to our needs, heralding a smarter and more interconnected global community.':
      'Esta tecnología se apoya en la integración fluida de dispositivos y sistemas, que les permite comunicarse y colaborar sin esfuerzo. Con cada dispositivo conectado, nos acercamos un paso a un mundo donde la comodidad y la eficiencia están inscritas en el tejido mismo de nuestra existencia. Entramos así en una era en la que nuestro entorno responde de forma intuitiva a nuestras necesidades, anunciando una comunidad global más inteligente y mejor conectada.',
    'This template is built with Payload CMS and Next.js 16, using the App Router and Server Components.':
      'Esta plantilla está construida con Payload CMS y Next.js 16, usando el App Router y los Server Components.',
    'Throughout history, regions across the globe have faced the devastating impact of natural disasters, the turbulence of political unrest, and the challenging ripples of economic downturns. In these moments of profound crisis, an often-underestimated force emerges: the indomitable resilience of the human spirit. These aren\'t just tales of mere survival, but stories of communities forging bonds, uniting with a collective purpose, and demonstrating an innate ability to overcome.':
      'A lo largo de la historia, las regiones del mundo han afrontado el impacto devastador de los desastres naturales, la turbulencia de la inestabilidad política y las oleadas difíciles de las crisis económicas. En esos momentos de crisis profunda aflora una fuerza a menudo subestimada: la resiliencia indomable del espíritu humano. No son solo relatos de mera supervivencia, sino historias de comunidades que forjan vínculos, se unen con un propósito colectivo y demuestran una capacidad innata para superar.',
    'To demonstrate basic AI functionality, here is a javascript snippet that makes a POST request to a generic AI API in order to generate text based on a prompt. ':
      'Para demostrar el funcionamiento básico de una IA, aquí tienes un fragmento de JavaScript que envía una petición POST a una API de IA genérica para generar texto a partir de un prompt. ',
    'Users will experience this site in their preferred color scheme and each block can be inverted.':
      'Los visitantes verán el sitio con su esquema de color preferido y cada bloque puede invertirse.',
    'Using versions, drafts, and preview, editors can review and share their changes before publishing them.':
      'Con versiones, borradores y vista previa, los editores pueden revisar y compartir sus cambios antes de publicarlos.',
    'Visit the admin dashboard': 'Visitar el panel de administración',
    'We find ourselves in a transformative era where artificial intelligence (AI) stands at the forefront of technological evolution. The ripple effects of its advancements are reshaping industries at an unprecedented pace. No longer are businesses bound by the limitations of tedious, manual processes. Instead, sophisticated machines, fueled by vast amounts of historical data, are now capable of making decisions previously left to human intuition. These intelligent systems are not only optimizing operations but also pioneering innovative approaches, heralding a new age of business transformation worldwide. ':
      'Nos encontramos en una era transformadora en la que la inteligencia artificial (IA) encabeza la evolución tecnológica. Los efectos dominantes de sus avances están reestructurando las industrias a una velocidad sin precedentes. Las empresas ya no están atadas a las limitaciones de procesos manuales tediosos. En su lugar, máquinas sofisticadas, alimentadas con enormes cantidades de datos históricos, son capaces de tomar decisiones que antes quedaban en manos de la intuición humana. Estos sistemas inteligentes no solo optimizan las operaciones, sino que también abren caminos inéditos y anuncian una nueva era de transformación empresarial en todo el mundo. ',
    'What drives stock market trends?': '¿Qué impulsa las tendencias bursátiles?',
    'What features does the admin dashboard include?':
      '¿Qué funciones incluye el panel de administración?',
    'What is the Internet of Things (IoT)?': '¿Qué es el Internet de las cosas (IoT)?',
    'What is this website template built with?': '¿Con qué está construida esta plantilla de sitio?',
    'What role does human spirit play in crisis?': '¿Qué papel juega el espíritu humano en una crisis?',
    'admin dashboard': 'panel de administración',
    'configured in the admin dashboard': 'configurado en el panel de administración',
    'it\'s a language. ': 'es un lenguaje. ',
    'navigate to the admin dashboard': 'acceder al panel de administración',
    'navigate to the admin dashboard.': 'acceda al panel de administración.',
    'on our Github': 'en nuestro GitHub',
    'How can I contact the website administrators?':
      '¿Cómo puedo contactar con los administradores del sitio?',
    'Contact page with a form for reaching out to the website administrators.':
      'Página de contacto con un formulario para dirigirse a los administradores del sitio.',
    'Example contact form:': 'Ejemplo de formulario de contacto:',
    'Use the contact form on this page to send a message to the website administrators.':
      'Utilice el formulario de contacto de esta página para enviar un mensaje a los administradores del sitio.',
    'The contact form has been submitted successfully.':
      'El formulario de contacto se ha enviado correctamente.',
    'Your contact form submission was successfully received.':
      'Hemos recibido correctamente su mensaje a través del formulario de contacto.',
    'You\'ve received a new message.': 'Ha recibido un nuevo mensaje.',
    'Contact Form': 'Formulario de contacto',
    'Full Name': 'Nombre completo',
    Email: 'Correo electrónico',
    Phone: 'Teléfono',
    Message: 'Mensaje',
    Submit: 'Enviar',
  },
}
