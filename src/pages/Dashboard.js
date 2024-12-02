import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';

const Dashboard = () => {
  const [player, setPlayer] = useState(null);
  const [searchCallsign, setSearchCallsign] = useState(''); // Estado para o texto da busca
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const fetchPlayerData = async (callsign) => {
    setLoading(true);
    try {
      // Buscando o jogador exatamente com a capitalização fornecida
      const playerDoc = await getDoc(doc(db, 'players', callsign));
      if (playerDoc.exists()) {
        const playerData = playerDoc.data();
        const parsedEvents = playerData.events.map((event) =>
          typeof event === 'string' ? JSON.parse(event) : event
        );
        setPlayer({ ...playerData, events: parsedEvents });
      } else {
        console.error('Jogador não encontrado!');
        setPlayer(null); // Reseta o jogador se não encontrar
      }
    } catch (error) {
      console.error('Erro ao buscar dados do jogador:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchCallsign.trim()) {
      fetchPlayerData(searchCallsign.trim()); // Busca o jogador pelo callsign
    } else {
      console.error('Por favor, insira um callsign válido.');
    }
  };

  return (
    <div className="dashboard">
      {/* Barra de busca funcional */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar jogador pelo callsign..."
          value={searchCallsign}
          onChange={(e) => setSearchCallsign(e.target.value)} // Atualiza o texto da busca
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* Exibe mensagens caso o jogador não seja encontrado */}
      {!loading && !player && searchCallsign && (
        <p>Jogador com o callsign "{searchCallsign}" não encontrado.</p>
      )}

      {/* Dados do jogador */}
      {player && (
        <>
          {/* Informações do jogador */}
          <div className="player-info">
            <img
              src={player.photoUrl}
              alt="Foto do Jogador"
              className="player-photo"
            />
            <div className="player-details">
              <h2>Callsign: {player.callsign}</h2>
              <p>Equipe: {player.team}</p>
              <p>Cidade: {player.city}</p>
            </div>
          </div>

          {/* Estatísticas do jogador */}
          <div className="player-stats">
            <h2>Pontuação Total: {player.totalScore}</h2>
            <h4>Pontuação de Respawn: {player.respawnScore}</h4>
            <h4>Classe: {player.class}</h4>
          </div>

          {/* Medalhas */}
          <div className="medals">
            <h3>Medalhas</h3>
            <div className="medals-list">
              {[
                {
                  name: 'Medalha de Ação',
                  image: '/assets/action.webp',
                  condition: player.gamesPlayed > 0,
                },
                {
                  name: 'Coração Púrpura',
                  image: '/assets/purple.webp',
                  condition: player.respawnScore > 0,
                },
                {
                  name: 'Estrela de Ouro',
                  image: '/assets/gold.webp',
                  condition: player.totalScore > 100,
                },
                {
                  name: 'Medalha de Boa Conduta',
                  image: '/assets/good.webp',
                  condition: player.totalScore > 200,
                },
                {
                  name: 'Medalha de Reconhecimento',
                  image: '/assets/nav.webp',
                  condition: player.totalScore > 500,
                },
              ].map(
                (medal, index) =>
                  medal.condition && (
                    <img
                      key={index}
                      src={medal.image}
                      alt={medal.name}
                      className="medal"
                    />
                  )
              )}
            </div>
          </div>

          {/* Eventos */}
          <div className="event-list">
            <h3>Eventos Participados</h3>
            <ul>
              {player.events.map((event, index) => (
                <li key={index}>
                  {event.name} - {event.date}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
