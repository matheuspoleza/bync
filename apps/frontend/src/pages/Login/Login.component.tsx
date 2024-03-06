import React, { useState } from 'react';

import { Card, Label, Button, Input, useToast } from '../../components/ui';
import { useLogin } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const { login } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (e) {
      toast({ title: 'Email or password is wrong', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card.Container style={{ minWidth: '360px' }}>
        <Card.Header className="space-y-1">
          <Card.Title className="text-2xl">Login</Card.Title>
          <Card.Description>
            Coloque suas credenciais para ter acesso a plataforma
          </Card.Description>
        </Card.Header>
        <Card.Content className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="m@exemplo.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              id="password"
              type="password"
            />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button className="w-full" onClick={handleLogin}>
            Entrar
          </Button>
        </Card.Footer>
      </Card.Container>
    </div>
  );
};
