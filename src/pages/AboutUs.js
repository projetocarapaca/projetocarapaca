import React from 'react';
import './AboutUs.css'; // Certifique-se de criar ou atualizar este arquivo com os estilos abaixo.

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>Sobre Nós</h1>
      <p>
        Bem-vindo ao Projeto Carapaça! Este site foi criado para mostrar o desempenho de jogadores de Airsoft. Aqui você pode consultar suas estatísticas, participações em eventos e muito mais.
      </p>

      {/* Seção de fotos */}
      <div className="photo-gallery">
        <div className="photo-item">
          <img src="/assets/marcio.jpg" alt="Foto 1" className="photo" />
          <h2>Marcio Henrique de Tulio</h2>
          <h3>Dev, Hardware</h3>
        </div>
        <div className="photo-item">
          <img src="/assets/maria.jpeg" alt="Foto 2" className="photo" />
          <h2>Maria Eduarda Massotte</h2>
          <h3>Dev, Webdesign</h3>
        </div>
        <div className="photo-item">
          <img src="/assets/kallyne.jpeg" alt="Foto 3" className="photo" />
          <h2>Maria Kallyne Tenório da Silva</h2>
          <h3>Dev, Banco de dados NoSQL</h3>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
