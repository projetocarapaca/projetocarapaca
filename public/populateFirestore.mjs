// Importa o Firebase Admin SDK
const admin = require("firebase-admin");

// Inicializa o Firebase Admin SDK
const serviceAccount = require("../src/components/carapaca-5afdf-firebase-adminsdk-o5vd1-c01fe2d56a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Função para criar os dados no Firestore
const createCollections = async () => {
  try {
    // Cria a coleção "players" e adiciona um documento
    const playerData = {
      callsign: "Raven",
      team: "A.I.M.",
      city: "Los Angeles",
      photoUrl: "https://static.wikia.nocookie.net/jaggedalliance/images/9/9a/Raven.jpg", // Substitua pelo link real
      totalScore: 980, // Pontuação total do jogador
      respawnScore: 1, // Pontuação de respawn
      gamesPlayed: 2, // Jogos participados
      class: "Designated Marksman",
      events: [
        { name: "Arulco", date: "1999-03-15" },
        { name: "Arulco", date: "2004-03-15" },
      ],
    };

    await db.collection("players").doc("jogador123").set(playerData);

    console.log("Dados do jogador adicionados com sucesso!");

    // Criação de exemplo para mais jogadores (opcional)
    const morePlayers = [
      {
        callsign: "Spider",
        team: "A.I.M.",
        city: "Houston",
        photoUrl: "https://static.wikia.nocookie.net/jaggedalliance/images/c/c4/Spider.jpg",
        totalScore: 200,
        respawnScore: 5,
        gamesPlayed: 8,
        class: "Médica",
        events: [
            { name: "Arulco", date: "1999-03-15" },
            { name: "Arulco", date: "2004-03-15" },
        ],
      },
      {
        callsign: "Scope",
        team: "M.E.R.C.",
        city: "Belfast",
        photoUrl: "https://static.wikia.nocookie.net/jaggedalliance/images/a/a4/Scope.jpg/",
        totalScore: 1050,
        respawnScore: 15,
        gamesPlayed: 20,
        class: "Atiradora de Elite",
        events: [
          { name: "Tracona", date: "2000-11-24" },
          { name: "Arulco", date: "2004-03-15" },
        ],
      },
    ];

    // Adiciona mais jogadores
    for (const player of morePlayers) {
      const docId = player.callsign.toLowerCase(); // Usar o callsign como ID do documento
      await db.collection("players").doc(docId).set(player);
      console.log(`Jogador ${player.callsign} adicionado com sucesso!`);
    }
  } catch (error) {
    console.error("Erro ao criar as coleções:", error);
  }
};

// Executa o script
createCollections();
