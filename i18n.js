// Internationalization System for Wedding Website
// Supports: English, French, Greek

const pageTranslations = {
  en: {
    // Language Labels
    lang_en: "EN",
    lang_fr: "FR",
    lang_el: "ΕΛ",
    
    // Hero Section
    wedding_date: "SEPTEMBER 4, 2026",
    days_to_go: "DAYS TO GO!",
    
    // Navigation
    nav_home: "Home",
    nav_venue: "Venue",
    nav_accommodation: "Accommodation",
    nav_faq: "FAQ",
    nav_rsvp: "RSVP",
    nav_logout: "Logout",
    
    // Home Page
    hero_title: "Together Forever",
    hero_subtitle: "Join us for our wedding celebration",
    hero_date: "February 14th, 2026",
    hero_cta: "RSVP Now",
    welcome_heading: "Welcome to Our Wedding",
    welcome_text_1: "We are thrilled to invite you to celebrate our love and commitment. This website contains all the details you need to make the most of our special day.",
    welcome_text_2: "Explore the venue information, accommodation options, and frequently asked questions. Don't forget to RSVP so we can plan for your arrival!",
    child_free_notice: "This is a child-free wedding celebration. We appreciate your understanding.",
    quick_links_venue: "📍 Venue",
    quick_links_venue_desc: "Discover the beautiful location where our celebration will take place.",
    quick_links_venue_btn: "Learn More",
    quick_links_accommodation: "🏨 Stay Nearby",
    quick_links_accommodation_desc: "Find recommended accommodations for you and your family.",
    quick_links_accommodation_btn: "Browse Options",
    quick_links_faq: "❓ Questions?",
    quick_links_faq_desc: "Common questions answered to help you prepare.",
    quick_links_faq_btn: "View FAQ",
    
    // Venue Page
    venue_heading: "Our Venue",
    venue_intro: "We've chosen a beautiful location in Thessaloniki for our celebration.",
    venue_date_time: "Date & Time",
    venue_location: "Location",
    venue_address_label: "Address",
    venue_address: "Ktima Xristidi, Thessaloniki, Greece",
    venue_arrival_time: "Guest Arrival: 4:45 PM",
    venue_ceremony_time: "Ceremony: 5:15 PM",
    venue_cocktail_time: "Cocktail: 6:00 PM",
    venue_parking: "Parking",
    venue_parking_desc: "Parking is available on-site for all our guests.",
    venue_spaces: "Indoor & Outdoor Spaces",
    venue_spaces_desc: "The venue features both elegant indoor spaces and beautiful outdoor areas for your celebration.",
    venue_amenities: "Amenities",
    venue_details_title: "Venue Details",
    venue_description: "Ktima Xristidi is a beautiful wedding venue in Thessaloniki featuring elegant indoor spaces and stunning outdoor gardens. The venue provides the perfect setting for both the ceremony and celebrations.",
    
    // Accommodation Page
    accommodation_heading: "Accommodation",
    accommodation_intro: "We have selected a few accommodations in Perea (Thessaloniki), about 20 minutes from the venue. Filter with a rating above 8.0 to avoid surprises!",
    hotel_1_name: "Luxury Palace Hotel",
    hotel_1_rating: "5-star luxury",
    hotel_1_distance: "2 km from venue",
    hotel_1_amenities: "Free WiFi, Spa, Restaurant",
    hotel_1_rate: "€150 per night",
    hotel_1_contact: "Tel: +30 210 9999 000",
    hotel_2_name: "Elegant Boutique Inn",
    hotel_2_rating: "4-star boutique",
    hotel_2_distance: "1.5 km from venue",
    hotel_2_amenities: "Free breakfast, Gym, Bar",
    hotel_2_rate: "€120 per night",
    hotel_2_contact: "Tel: +30 210 8888 000",
    hotel_3_name: "Athens Modern Hotel",
    hotel_3_rating: "4-star contemporary",
    hotel_3_distance: "3 km from venue",
    hotel_3_amenities: "Business center, Pool, WiFi",
    hotel_3_rate: "€100 per night",
    hotel_3_contact: "Tel: +30 210 7777 000",
    booking_info_title: "How to Book",
    booking_step_1: "Visit the hotel's website or call the contact number",
    booking_step_2: "Mention our wedding for the special rate",
    booking_step_3: "Provide your name and number of rooms needed",
    booking_step_4: "Confirm your reservation before January 31st, 2026",
    alternative_stays_title: "Alternative Accommodations",
    alternative_stays_desc: "If none of the above suit you, Thessaloniki has many other hotels available on booking.com, kayak, etc.",
    
    // FAQ Page
    faq_heading: "Frequently Asked Questions",
    faq_q1: "When and where is the wedding?",
    faq_a1: "Our wedding will be held on Friday, February 14th, 2026 at Ktima Xristidi, Thessaloniki, Greece. Guests should arrive at 4:45 PM. The ceremony begins at 5:15 PM, followed by cocktail at 6:00 PM.",
    faq_q2: "When is the RSVP deadline?",
    faq_a2: "Please RSVP by January 31st, 2026. This helps us with final headcounts and seating arrangements. If you have questions or need special accommodations, please reach out early.",
    faq_q3: "What is the dress code?",
    faq_a3: "Formal Attire is requested. Think black-tie optional or elegant cocktail dress. We encourage guests to wear colors that make them feel beautiful and confident. The celebration takes place indoors with outdoor garden access, so plan accordingly.",
    faq_q4: "Can I bring a guest/plus one?",
    faq_a4: "Plus-ones are indicated on your invitation. Please only RSVP for guests listed. If you have a significant other not listed and would like them to attend, please contact us as soon as possible at info@ourwedding.com.",
    faq_q5: "Is this a child-free wedding?",
    faq_a5: "Yes, this is a child-free celebration. We appreciate your understanding and are looking forward to an elegant evening with our adult guests. This allows us to create a sophisticated atmosphere and ensures all attendees can fully relax and enjoy the celebration. If you have questions about childcare options in Athens, please don't hesitate to reach out.",
    faq_q6: "What about dietary restrictions?",
    faq_a6: "We're happy to accommodate dietary needs! When you RSVP, please select your dietary preferences. Options include vegetarian, vegan, gluten-free, and allergy accommodations. If your needs aren't listed, please provide details in the message section.",
    faq_q7: "What languages will be spoken?",
    faq_a7: "The ceremony will be conducted in French, English, and Greek. All readings and speeches will include translations to ensure everyone feels included. Our website and materials are available in all three languages.",
    faq_q8: "Where should I stay?",
    faq_a8: "We've partnered with several hotels offering special rates for our guests. Visit the Accommodation page for details and booking information. These rates are available until January 31st, 2026.",
    faq_q9: "Is there gift registry or preferred gifts?",
    faq_a9: "Your presence is the greatest gift! However, if you wish to give a gift, we've created a registry at [Registry Link] (coming soon). We also appreciate contributions toward our honeymoon fund or any charitable donations in our name.",
    faq_q10: "Will there be transportation from hotels?",
    faq_a10: "We're arranging shuttle service from select hotels to the venue. Details will be provided closer to the date. Alternatively, taxis and ride-sharing apps are readily available in Athens for your convenience.",
    faq_q11: "Can I take photos/videos?",
    faq_a11: "Professional photography and videography will be provided. We kindly request that you refrain from taking photos or videos during the ceremony so everyone can be fully present. Feel free to capture moments during the reception and share your photos using our wedding hashtag: #OurWeddingDay2026",
    faq_q12: "What if I have more questions?",
    faq_a12: "We're here to help! Please don't hesitate to reach out: 📧 Email: info@ourwedding.com 📱 Phone: +30 210 9999 000 We'll get back to you as soon as possible!",
    
    // RSVP Page
    rsvp_heading: "RSVP",
    rsvp_intro: "Please confirm your attendance and let us know your dietary preferences.",
    rsvp_name_label: "Your Name",
    rsvp_dietary_label: "Dietary Preference",
    rsvp_dietary_none: "No restrictions",
    rsvp_dietary_vegetarian: "Vegetarian",
    rsvp_dietary_vegan: "Vegan",
    rsvp_dietary_gluten_free: "Gluten-free",
    rsvp_attendance_label: "Attendance",
    rsvp_attendance_yes: "I will attend",
    rsvp_attendance_no: "I cannot attend",
    rsvp_attendance_maybe: "Awaiting confirmation",
    rsvp_message_label: "Special Messages or Requests",
    rsvp_message_placeholder: "Any dietary notes, allergies, or messages for us...",
    rsvp_review_btn: "Review & Send",
    rsvp_language_label: "Language",
    rsvp_thank_you_title: "Thank You!",
    rsvp_thank_you_msg: "Your RSVP has been received. We look forward to celebrating with you!",
    rsvp_error: "Failed to submit RSVP. Please try again.",
    
    // Footer
    footer_text: "© 2026 Our Wedding. All rights reserved.",
  },
  
  fr: {
    // Language Labels
    lang_en: "EN",
    lang_fr: "FR",
    lang_el: "EL",
    
    // Hero Section
    wedding_date: "4 SEPTEMBRE 2026",
    days_to_go: "JOURS À ATTENDRE!",
    
    // Navigation
    nav_home: "Accueil",
    nav_venue: "Lieu",
    nav_accommodation: "Hébergement",
    nav_faq: "FAQ",
    nav_rsvp: "RSVP",
    nav_logout: "Déconnexion",
    
    // Home Page
    hero_title: "Pour Toujours Ensemble",
    hero_subtitle: "Rejoignez-nous pour célébrer notre mariage",
    hero_date: "14 février 2026",
    hero_cta: "RSVP Maintenant",
    welcome_heading: "Bienvenue à Notre Mariage",
    welcome_text_1: "Nous sommes ravis de vous inviter à célébrer notre amour et notre engagement. Ce site Web contient tous les détails dont vous avez besoin pour profiter au maximum de notre grand jour.",
    welcome_text_2: "Explorez les informations sur le lieu, les options d'hébergement et les questions fréquemment posées. N'oubliez pas de RSVP pour que nous puissions planifier votre arrivée!",
    child_free_notice: "Ceci est une célébration de mariage sans enfants. Nous apprécions votre compréhension.",
    quick_links_venue: "📍 Lieu",
    quick_links_venue_desc: "Découvrez le bel endroit où notre célébration aura lieu.",
    quick_links_venue_btn: "En savoir plus",
    quick_links_accommodation: "🏨 Où séjourner",
    quick_links_accommodation_desc: "Trouvez des hébergements recommandés pour vous et votre famille.",
    quick_links_accommodation_btn: "Parcourir les options",
    quick_links_faq: "❓ Des questions?",
    quick_links_faq_desc: "Questions courantes répondues pour vous aider à préparer.",
    quick_links_faq_btn: "Voir FAQ",
    
    // Venue Page
    venue_heading: "Notre Lieu",
    venue_intro: "Nous avons choisi un beau lieu à Thessalonique pour notre célébration.",
    venue_date_time: "Date et Heure",
    venue_location: "Localisation",
    venue_address_label: "Adresse",
    venue_address: "Ktima Xristidi, Thessaloniki, Grèce",
    venue_arrival_time: "Arrivée des Invités : 16h45",
    venue_ceremony_time: "Cérémonie : 17h15",
    venue_cocktail_time: "Cocktail : 18h00",
    venue_parking: "Stationnement",
    venue_parking_desc: "Un stationnement est disponible sur place pour tous nos invités.",
    venue_spaces: "Espaces Intérieurs et Extérieurs",
    venue_spaces_desc: "Le lieu dispose d'espaces intérieurs élégants et de beaux espaces extérieurs pour votre célébration.",
    venue_amenities: "Équipements",
    venue_details_title: "Détails du Lieu",
    venue_description: "Ktima Xristidi est un beau lieu de mariage à Thessalonique disposant d'espaces intérieurs élégants et de magnifiques jardins extérieurs. Le lieu offre le cadre parfait pour à la fois la cérémonie et les festivités.",
    
    // Accommodation Page
    accommodation_heading: "Hébergement",
    accommodation_intro: "Nous avons sélectionné quelques logements sur booking.com à Perea (Thessalonique), à environ 20 minutes du lieu. Pensez à filtrer avec une note supérieure à 8.0 pour éviter les mauvaises surprises !",
    hotel_1_name: "Hôtel Luxury Palace",
    hotel_1_rating: "Luxe 5 étoiles",
    hotel_1_distance: "2 km du lieu",
    hotel_1_amenities: "WiFi gratuit, Spa, Restaurant",
    hotel_1_rate: "€150 par nuit",
    hotel_1_contact: "Tél: +30 210 9999 000",
    hotel_2_name: "Auberge Boutique Élégante",
    hotel_2_rating: "Boutique 4 étoiles",
    hotel_2_distance: "1,5 km du lieu",
    hotel_2_amenities: "Petit déjeuner gratuit, Gym, Bar",
    hotel_2_rate: "€120 par nuit",
    hotel_2_contact: "Tél: +30 210 8888 000",
    hotel_3_name: "Hôtel Modern Athens",
    hotel_3_rating: "Contemporain 4 étoiles",
    hotel_3_distance: "3 km du lieu",
    hotel_3_amenities: "Centre d'affaires, Piscine, WiFi",
    hotel_3_rate: "€100 par nuit",
    hotel_3_contact: "Tél: +30 210 7777 000",
    booking_info_title: "Comment Réserver",
    booking_step_1: "Visitez le site Web de l'hôtel ou appelez le numéro de contact",
    booking_step_2: "Mentionnez notre mariage pour le tarif spécial",
    booking_step_3: "Fournissez votre nom et le nombre de chambres nécessaires",
    booking_step_4: "Confirmez votre réservation avant le 31 janvier 2026",
    alternative_stays_title: "Hébergements Alternatifs",
    alternative_stays_desc: "Si aucune option ci-dessus ne vous convient, Thessalonique dispose de nombreux hôtels disponibles sur booking.com, kayak, etc.",
    
    // FAQ Page
    faq_heading: "Questions Fréquemment Posées",
    faq_q1: "Quand et où est le mariage?",
    faq_a1: "Notre mariage aura lieu le vendredi 14 février 2026 à Ktima Xristidi, Thessaloniki, Grèce. Les invités doivent arriver à 16h45. La cérémonie commence à 17h15, suivi du cocktail à 18h00.",
    faq_q2: "Quelle est la date limite de RSVP?",
    faq_a2: "Veuillez RSVP avant le 31 janvier 2026. Cela nous aide avec les décomptes finaux et les arrangements de sièges. Si vous avez des questions ou besoin d'aménagements spéciaux, veuillez nous contacter tôt.",
    faq_q3: "Quel est le code vestimentaire?",
    faq_a3: "La tenue formelle est demandée. Pensez à la cravate noire optionnelle ou à la robe de cocktail élégante. Nous encourageons les invités à porter des couleurs qui les mettent à l'aise. La célébration a lieu à l'intérieur avec accès au jardin, planifiez en conséquence.",
    faq_q4: "Puis-je amener un invité supplémentaire?",
    faq_a4: "Les +1 sont indiqués sur votre invitation. Veuillez ne RSVP que pour les invités énumérés. Si vous avez une personne importante non énumérée et souhaitez qu'elle participe, veuillez nous contacter dès que possible à info@ourwedding.com.",
    faq_q5: "Ceci est-il un mariage sans enfants?",
    faq_a5: "Oui, c'est une célébration sans enfants. Nous apprécions votre compréhension et attendons avec impatience une soirée élégante avec nos invités adultes. Cela nous permet de créer une atmosphère sophistiquée et grante à chacun de se détendre pleinement et de profiter de la célébration. Si vous avez des questions sur les options de garde d'enfants à Athènes, n'hésitez pas à nous contacter.",
    faq_q6: "Et les restrictions alimentaires?",
    faq_a6: "Nous sommes heureux d'accommoder les préférences alimentaires! Lorsque vous RSVP, veuillez sélectionner vos préférences alimentaires. Les options incluent végétarien, végan, sans gluten et accommodations pour allergies. Si vos besoins ne sont pas énumérés, veuillez fournir les détails dans la section messages.",
    faq_q7: "Quelles langues seront parlées?",
    faq_a7: "La cérémonie sera menée en français, anglais et grec. Tous les lectures et discours incluront des traductions pour assurer que chacun se sent inclus. Notre site Web et nos matériaux sont disponibles dans les trois langues.",
    faq_q8: "Où dois-je séjourner?",
    faq_a8: "Nous avons des partenariats avec plusieurs hôtels offrant des tarifs spéciaux à nos invités. Visitez la page Hébergement pour les détails et les informations de réservation. Ces tarifs sont disponibles jusqu'au 31 janvier 2026.",
    faq_q9: "Y a-t-il un registre de cadeaux ou des cadeaux préférés?",
    faq_a9: "Votre présence est le plus beau cadeau! Cependant, si vous souhaitez offrir un cadeau, nous avons créé un registre à [Lien du registre] (à venir). Nous apprécions également les contributions vers notre lune de miel ou toute donation caritative en notre nom.",
    faq_q10: "Y aura-t-il un transport depuis les hôtels?",
    faq_a10: "Nous organisons un service de navette depuis certains hôtels vers le lieu. Les détails seront fournis plus tard. Sinon, les taxis et les services de covoiturage sont facilement disponibles à Athènes.",
    faq_q11: "Puis-je prendre des photos/vidéos?",
    faq_a11: "La photographie et la vidéographie professionnelles seront fournies. Nous vous demandons gentiment de ne pas prendre de photos ou vidéos pendant la cérémonie pour que chacun soit pleinement présent. N'hésitez pas à capturer des moments pendant la réception et à partager vos photos en utilisant notre hashtag de mariage: #OurWeddingDay2026",
    faq_q12: "Si j'ai d'autres questions?",
    faq_a12: "Nous sommes là pour vous aider! N'hésitez pas à nous contacter: 📧 Email: info@ourwedding.com 📱 Téléphone: +30 210 9999 000 Nous vous répondrons dès que possible!",
    
    // RSVP Page
    rsvp_heading: "RSVP",
    rsvp_intro: "Veuillez confirmer votre présence et nous faire savoir vos préférences alimentaires.",
    rsvp_name_label: "Votre Nom",
    rsvp_dietary_label: "Préférence Alimentaire",
    rsvp_dietary_none: "Sans restrictions",
    rsvp_dietary_vegetarian: "Végétarien",
    rsvp_dietary_vegan: "Végan",
    rsvp_dietary_gluten_free: "Sans gluten",
    rsvp_attendance_label: "Présence",
    rsvp_attendance_yes: "Je participerai",
    rsvp_attendance_no: "Je ne participera pas",
    rsvp_attendance_maybe: "En attente de confirmation",
    rsvp_message_label: "Messages Spéciaux ou Demandes",
    rsvp_message_placeholder: "N'importe quelles notes alimentaires, allergies, ou messages pour nous...",
    rsvp_review_btn: "Vérifier & Envoyer",
    rsvp_language_label: "Langue",
    rsvp_thank_you_title: "Merci!",
    rsvp_thank_you_msg: "Votre RSVP a été reçu. Nous avons hâte de célébrer avec vous!",
    rsvp_error: "Impossible de soumettre le RSVP. Veuillez réessayer.",
    
    // Footer
    footer_text: "© 2026 Notre Mariage. Tous droits réservés.",
  },
  
  el: {
    // Language Labels
    lang_en: "EN",
    lang_fr: "FR",
    lang_el: "EL",
    
    // Hero Section
    wedding_date: "4 ΣΕΠΤΕΜΒΡΊΟΥ 2026",
    days_to_go: "ΗΜΈΡΕΣ ΓΙΑ ΝΑ ΠΕΡΙΜΈΝΕΤΕ!",
    
    // Navigation
    nav_home: "Αρχική",
    nav_venue: "Χώρος",
    nav_accommodation: "Κατάλυμα",
    nav_faq: "FAQ",
    nav_rsvp: "RSVP",
    nav_logout: "Αποσύνδεση",
    
    // Home Page
    hero_title: "Μαζί για Πάντα",
    hero_subtitle: "Συμμετέχετε στην γιορτή του γάμου μας",
    hero_date: "14 Φεβρουαρίου 2026",
    hero_cta: "RSVP Τώρα",
    welcome_heading: "Καλώς ήρθατε στο Γάμο μας",
    welcome_text_1: "Είμαστε ενθουσιασμένοι που σας καλούμε να γιορτάσετε την αγάπη και την δέσμευσή μας. Αυτός ο ιστότοπος περιέχει όλες τις πληροφορίες που χρειάζεστε για να κάνετε το καλύτερο από την ειδική ημέρα μας.",
    welcome_text_2: "Εξερευνήστε τις πληροφορίες χώρου, τις επιλογές κατάλυματος και τις συχνές ερωτήσεις. Μην ξεχάσετε να RSVP ώστε να μπορέσουμε να σχεδιάσουμε την άφιξή σας!",
    child_free_notice: "Αυτός είναι ένας γάμος χωρίς παιδιά. Εκτιμούμε την κατανόησή σας.",
    quick_links_venue: "📍 Χώρος",
    quick_links_venue_desc: "Ανακαλύψτε τον όμορφο χώρο όπου θα γίνει η γιορτή μας.",
    quick_links_venue_btn: "Μάθετε περισσότερα",
    quick_links_accommodation: "🏨 Στυλ διαμονής",
    quick_links_accommodation_desc: "Βρείτε συνιστώμενα καταλύματα για εσάς και την οικογένειά σας.",
    quick_links_accommodation_btn: "Περιηγηθείτε στις επιλογές",
    quick_links_faq: "❓ Ερωτήσεις;",
    quick_links_faq_desc: "Συνήθη ερωτήματα που απαντώνται για να σας βοηθήσουν να προετοιμαστείτε.",
    quick_links_faq_btn: "Δείτε FAQ",
    
    // Venue Page
    venue_heading: "Ο Χώρος μας",
    venue_intro: "Έχουμε επιλέξει ένα όμορφο χώρο στη Θεσσαλονίκη για την γιορτή μας.",
    venue_date_time: "Ημερομηνία & Ώρα",
    venue_location: "Τοποθεσία",
    venue_address_label: "Διεύθυνση",
    venue_address: "Ktima Xristidi, Θεσσαλονίκη, Ελλάδα",
    venue_arrival_time: "Άφιξη Επισκεπτών: 16:45",
    venue_ceremony_time: "Τελετή: 17:15",
    venue_cocktail_time: "Κοκτέιλ: 18:00",
    venue_parking: "Χώρος Στάθμευσης",
    venue_parking_desc: "Η στάθμευση είναι διαθέσιμη στο χώρο για όλους τους επισκέπτες μας.",
    venue_spaces: "Εσωτερικοί και Εξωτερικοί Χώροι",
    venue_spaces_desc: "Το χώρο διαθέτει κομψούς εσωτερικούς χώρους και όμορφες εξωτερικές περιοχές για την γιορτή σας.",
    venue_amenities: "Παροχές",
    venue_details_title: "Λεπτομέρειες Χώρου",
    venue_description: "Το Ktima Xristidi είναι ένας όμορφος χώρος γάμου στη Θεσσαλονίκη με κομψούς εσωτερικούς χώρους και εκπληκτικούς εξωτερικούς κήπους. Ο χώρος παρέχει το τέλειο σκηνικό για τόσο την τελετή όσο και τις γιορτές.",
    
    // Accommodation Page
    accommodation_heading: "Κατάλυμα",
    accommodation_intro: "Επιλέξαμε μερικά καταλύματα στη Βούλγαρη/Περαία (Θεσσαλονίκη), περίπου 20 λεπτά από τον χώρο. Φιλτράρετε με βαθμολογία 8.0+ για να αποφύγετε εκπλήξεις!",
    hotel_1_name: "Luxury Palace Hotel",
    hotel_1_rating: "Ξενοδοχείο 5 αστέρων",
    hotel_1_distance: "2 χλμ από τον χώρο",
    hotel_1_amenities: "Δωρεάν WiFi, Spa, Εστιατόριο",
    hotel_1_rate: "€150 ανά νύχτα",
    hotel_1_contact: "Τηλ: +30 210 9999 000",
    hotel_2_name: "Elegant Boutique Inn",
    hotel_2_rating: "Μπουτίκ ξενοδοχείο 4 αστέρων",
    hotel_2_distance: "1,5 χλμ από τον χώρο",
    hotel_2_amenities: "Δωρεάν πρωινό, Γυμναστήριο, Bar",
    hotel_2_rate: "€120 ανά νύχτα",
    hotel_2_contact: "Τηλ: +30 210 8888 000",
    hotel_3_name: "Athens Modern Hotel",
    hotel_3_rating: "Σύγχρονο ξενοδοχείο 4 αστέρων",
    hotel_3_distance: "3 χλμ από τον χώρο",
    hotel_3_amenities: "Επιχειρησιακό κέντρο, Πισίνα, WiFi",
    hotel_3_rate: "€100 ανά νύχτα",
    hotel_3_contact: "Τηλ: +30 210 7777 000",
    booking_info_title: "Πώς να Κάνετε Κράτηση",
    booking_step_1: "Επισκεφθείτε το ιστό του ξενοδοχείου ή καλέστε τον αριθμό επικοινωνίας",
    booking_step_2: "Αναφέρετε το γάμο μας για την ειδική τιμή",
    booking_step_3: "Δώστε το όνομά σας και τον αριθμό δωματίων που χρειάζεστε",
    booking_step_4: "Επιβεβαιώστε την κράτησή σας πριν από 31 Ιανουαρίου 2026",
    alternative_stays_title: "Εναλλακτικές Διαμονές",
    alternative_stays_desc: "Εάν καμία από τις παραπάνω επιλογές δεν σας ταιριάζει, η Θεσσαλονίκη έχει πολλά ξενοδοχεία στο booking.com, kayak κ.λπ.",
    
    // FAQ Page
    faq_heading: "Συχνές Ερωτήσεις",
    faq_q1: "Πότε και πού είναι ο γάμος;",
    faq_a1: "Ο γάμος μας θα πραγματοποιηθεί την Παρασκευή 14 Φεβρουαρίου 2026 στο Ktima Xristidi, Θεσσαλονίκη, Ελλάδα. Οι επισκέπτες θα πρέπει να φτάσουν στις 16:45. Η τελετή ξεκινά στις 17:15, ακολουθούμενη από κοκτέιλ στις 18:00.",
    faq_q2: "Ποια είναι η προθεσμία RSVP;",
    faq_a2: "Παρακαλώ RSVP πριν από 31 Ιανουαρίου 2026. Αυτό μας βοηθά με τους τελικούς αριθμούς και τις ρυθμίσεις καθισμάτων. Εάν έχετε ερωτήσεις ή χρειάζεστε ειδικές ρυθμίσεις, παρακαλώ επικοινωνήστε νωρίς.",
    faq_q3: "Ποιος είναι ο κωδικός ντυσίματος;",
    faq_a3: "Ζητούνται τα πολύ κομψές ενδυμασίες. Σκεφτείτε μαύρη φανέλα προαιρετικά ή κομψό κοκτέιλ. Ενθαρρύνουμε τους καλεσμένους να φορούν χρώματα που τους κάνουν να νιώθουν όμορφοι. Η γιορτή πραγματοποιείται στο εσωτερικό με πρόσβαση στον κήπο, σχεδιάστε ανάλογα.",
    faq_q4: "Μπορώ να φέρω κάποιον συνοδό;",
    faq_a4: "Οι συνοδοί αναφέρονται στην πρόσκλησή σας. Παρακαλώ RSVP μόνο για τους κατονομασμένους καλεσμένους. Εάν έχετε κάποιον σημαντικό που δεν είναι κατονομασμένος και θέλετε να παρευρεθεί, παρακαλώ επικοινωνήστε μαζί μας το συντομότερο δυνατόν στο info@ourwedding.com.",
    faq_q5: "Είναι αυτός ένας γάμος χωρίς παιδιά;",
    faq_a5: "Ναι, αυτή είναι μια γιορτή χωρίς παιδιά. Εκτιμούμε την κατανόησή σας και προσβλέπουμε σε μια κομψή βράδυ με τους ενήλικες καλεσμένους μας. Αυτό μας επιτρέπει να δημιουργήσουμε μια εξεζητημένη ατμόσφαιρα και να εξασφαλίσουμε ότι όλοι μπορούν να χαλαρώσουν πλήρως και να απολαύσουν τη γιορτή. Εάν έχετε ερωτήσεις για επιλογές φύλαξης παιδιών στην Αθήνα, μην διστάσετε να επικοινωνήσετε.",
    faq_q6: "Τι γίνεται με τις διατροφικές περιορισμούς;",
    faq_a6: "Είμαστε ευχαριστημένοι να φιλοξενήσουμε διατροφικές ανάγκες! Όταν RSVP, παρακαλώ επιλέξτε τις διατροφικές σας προτιμήσεις. Οι επιλογές περιλαμβάνουν χορτοφάγο, vegan, χωρίς γλουτένη, και φιλοξενία για αλλεργίες. Εάν οι ανάγκες σας δεν αναφέρονται, παρακαλώ δώστε λεπτομέρειες στην ενότητα μηνυμάτων.",
    faq_q7: "Ποιες γλώσσες θα μιλούνται;",
    faq_a7: "Η τελετή θα διεξαχθεί στα Γαλλικά, Αγγλικά και Ελληνικά. Όλες οι αναγνώσεις και τα λόγια θα περιλαμβάνουν μεταφράσεις για να εξασφαλίσουν ότι όλοι αισθάνονται συμπεριλαμβανόμενοι. Ο ιστότοπος και τα υλικά μας είναι διαθέσιμα στις τρεις γλώσσες.",
    faq_q8: "Που πρέπει να μείνω;",
    faq_a8: "Έχουμε συμμετοχή με αρκετά ξενοδοχεία που προσφέρουν ειδικές τιμές για τους καλεσμένους μας. Επισκεφθείτε τη σελίδα Κατάλυμα για λεπτομέρειες και πληροφορίες κράτησης. Αυτές οι τιμές είναι διαθέσιμες έως 31 Ιανουαρίου 2026.",
    faq_q9: "Υπάρχει κατάλογος δώρων ή προτιμώμενα δώρα;",
    faq_a9: "Η παρουσία σας είναι το μεγαλύτερο δώρο! Ωστόσο, εάν θέλετε να δώσετε δώρο, δημιουργήσαμε ένα μητρώο σε [Σύνδεσμος μητρώου] (σύντομα). Εκτιμούμε επίσης τις συνεισφορές για το ταξίδι του μήνα του μέλιτος ή οποιαδήποτε φιλανθρωπική δωρεά για την άχρηστη ημέρα.",
    faq_q10: "Θα υπάρχει μεταφορά από τα ξενοδοχεία;",
    faq_a10: "Διατάσσουμε υπηρεσία μεταφοράς από επιλεγμένα ξενοδοχεία προς τον χώρο. Λεπτομέρειες θα παρέχονται πιο κοντά στην ημερομηνία. Εναλλακτικά, τα ταξί και οι εφαρμογές κοινοχρησίας είναι εύκολα διαθέσιμα στην Αθήνα.",
    faq_q11: "Μπορώ να τραβήξω φωτογραφίες/βίντεο;",
    faq_a11: "Θα παρέχεται επαγγελματική φωτογραφία και βιντεογραφία. Σας ζητούμε ευγενικά να αποχωρήσετε από λήψη φωτογραφιών ή βίντεο κατά τη διάρκεια της τελετής ώστε όλοι να είναι πλήρως παρόντες. Μη διστάσετε να καταγράψετε στιγμές κατά τη διάρκεια της δεξίωσης και να μοιραστείτε τις φωτογραφίες σας χρησιμοποιώντας τον κατακερματισμό γάμου μας: #OurWeddingDay2026",
    faq_q12: "Τι αν έχω περισσότερες ερωτήσεις;",
    faq_a12: "Είμαστε εδώ για να βοηθήσουμε! Μη διστάσετε να επικοινωνήσετε: 📧 Email: info@ourwedding.com 📱 Τηλ: +30 210 9999 000 Θα σας απαντήσουμε το συντομότερο δυνατόν!",
    
    // RSVP Page
    rsvp_heading: "RSVP",
    rsvp_intro: "Παρακαλώ επιβεβαιώστε την παρουσία σας και ενημερώστε μας για τις διατροφικές σας προτιμήσεις.",
    rsvp_name_label: "Το Όνομά σας",
    rsvp_dietary_label: "Διατροφική Προτίμηση",
    rsvp_dietary_none: "Χωρίς περιορισμούς",
    rsvp_dietary_vegetarian: "Χορτοφάγο",
    rsvp_dietary_vegan: "Vegan",
    rsvp_dietary_gluten_free: "Χωρίς γλουτένη",
    rsvp_attendance_label: "Παρουσία",
    rsvp_attendance_yes: "Θα παρευρεθώ",
    rsvp_attendance_no: "Δεν μπορώ να παρευρεθώ",
    rsvp_attendance_maybe: "Περιμένοντας επιβεβαίωση",
    rsvp_message_label: "Ειδικά Μηνύματα ή Αιτήματα",
    rsvp_message_placeholder: "Οποιαδήποτε διατροφικές σημειώσεις, αλλεργίες ή μηνύματα για εμάς...",
    rsvp_review_btn: "Αναθεώρηση & Αποστολή",
    rsvp_language_label: "Γλώσσα",
    rsvp_thank_you_title: "Ευχαριστούμε!",
    rsvp_thank_you_msg: "Το RSVP σας έχει λήφθει. Δεν μπορούμε να περιμένουμε να γιορτάσουμε μαζί σας!",
    rsvp_error: "Αποτυχία υποβολής RSVP. Παρακαλώ δοκιμάστε ξανά.",
    
    // Footer
    footer_text: "© 2026 Ο Γάμος μας. Με επιφύλαξη παντός δικαιώματος.",
  }
};

// Current language (will be set during initialization)
let currentLanguage = 'en';

// Get browser's language
function getDetectedLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  const langMap = {
    'en': 'en',
    'fr': 'fr',
    'el': 'el',
    'gr': 'el',
    'ga': 'el'
  };
  
  return langMap[langCode] || 'en';
}

// Initialize language
function initLanguage() {
  const savedLang = localStorage.getItem('_wedding_language');
  if (savedLang && Object.keys(pageTranslations).includes(savedLang)) {
    currentLanguage = savedLang;
  } else {
    currentLanguage = getDetectedLanguage();
    localStorage.setItem('_wedding_language', currentLanguage);
  }
  
  updateLanguageUI();
  translatePage();
}

// Set language
function setLanguage(lang) {
  if (Object.keys(pageTranslations).includes(lang)) {
    currentLanguage = lang;
    localStorage.setItem('_wedding_language', currentLanguage);
    updateLanguageUI();
    translatePage();
  }
}

// Update language button UI
function updateLanguageUI() {
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === currentLanguage) {
      btn.classList.add('active');
    }
  });
}

// Translate page content
function translatePage() {
  const dict = pageTranslations[currentLanguage];
  
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (dict[key]) {
      elem.textContent = dict[key];
    }
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
    const key = elem.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      elem.placeholder = dict[key];
    }
  });
}

// Get translation for a key
function t(key) {
  return pageTranslations[currentLanguage][key] || pageTranslations['en'][key] || key;
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  initLanguage();
}
