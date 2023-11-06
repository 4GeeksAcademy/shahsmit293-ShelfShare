import React, { useState } from 'react';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = () => {
    // Validação de entrada
    if (!password || !confirmPassword || !token) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    resetPassword(password, token);

    // Limpar os campos e erros após a chamada
    setPassword('');
    setConfirmPassword('');
    setToken('');
    setError('');
  };

  return (
    <div className=" justify-content-center align-items-center vh-100">
      <div className="text-center login">
        <div>
          <h2>Reset Passaword</h2>
        </div>
        <div>  
          <input
            className="input"
            type="password"
            placeholder="Nova Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div>  
          <input
            className="input"
            type="password"
            placeholder="Confirme a Nova Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>  
          <input
            className="input"
            type="text"
            placeholder="Cole o Token Recebido por Email"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={handleResetPassword}>Submit
          </button>
        </div> 
    </div>
  </div>  
  );
};


