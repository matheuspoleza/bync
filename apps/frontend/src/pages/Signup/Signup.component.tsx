import React, { useEffect, useState } from 'react';

import { Card, Label, Button, Input } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import { useAuthSession, useSignup } from '../../hooks';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, onSignup } = useSignup();
  const navigate = useNavigate();
  const { isLoggedIn, isFetching } = useAuthSession();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleSignup = async () => {
    setIsCreatingAccount(true);

    try {
      await onSignup({ name, email, password });
    } catch (e) {
      setIsCreatingAccount(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && !isFetching) {
      setTimeout(() => {
        setIsCreatingAccount(false);
        navigate('/dashboard');
      }, 2000);
    }
  }, [isLoggedIn, isFetching]);

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Card.Container style={{ minWidth: '360px' }}>
        <Card.Header className="space-y-1">
          <Card.Title className="text-2xl">Cadastrar</Card.Title>
          <Card.Description>
            Crie uma conta na nossa plataforma
          </Card.Description>
        </Card.Header>
        <Card.Content className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Antônio Silva"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="m@exemplo.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button
            className="w-full"
            onClick={handleSignup}
            disabled={isLoading || isCreatingAccount}
          >
            Cadastrar
          </Button>
        </Card.Footer>
      </Card.Container>
    </div>
  );
};
