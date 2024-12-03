import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './Dashboard.css'; // Certifique-se de criar ou atualizar este arquivo com os estilos.

const Dashboard = () => {
  const [player, setPlayer] = useState(null);
  const [searchCallsign, setSearchCallsign] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPlayerData = async (callsign) => {
    setLoading(true);
    try {
      const playerDoc = await getDoc(doc(db, 'players', callsign));
      if (playerDoc.exists()) {
        const playerData = playerDoc.data();
        // Remove o processamento de eventos
        setPlayer(playerData);
      } else {
        console.error('Jogador não encontrado!');
        setPlayer(null);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do jogador:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchCallsign.trim()) {
      fetchPlayerData(searchCallsign.trim());
    } else {
      console.error('Por favor, insira um callsign válido.');
    }
  };

  return (
    <div className="dashboard">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar jogador pelo callsign..."
          value={searchCallsign}
          onChange={(e) => setSearchCallsign(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {!loading && !player && searchCallsign && (
        <p>Jogador com o callsign "{searchCallsign}" não encontrado.</p>
      )}

      {player && (
        <>
          <div className="player-info">
            <img
              src={player.photoUrl}
              alt="Foto do Jogador"
              className="player-photo"
            />
            <div className="player-details">
              <h2>Callsign: {player.callsign}</h2>
              <h3>Nome: {player.name}</h3>
              <p>Equipe: {player.team}</p>
              <p>Cidade: {player.city}</p>
            </div>
          </div>

          <div className="player-stats">
            <h2>Pontuação Total: {player.totalScore}</h2>
            <h4>Pontuação de Respawn: {player.respawnScore}</h4>
            <h4>Classe: {player.class}</h4>
          </div>

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
        </>
      )}
    </div>
  );
};

export default Dashboard;
