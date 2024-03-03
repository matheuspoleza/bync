import React from 'react';

import { Card, Label, Button, Input } from '../../components/ui';
import { useAuth } from '../../context/auth';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card.Container>
        <Card.Header className="space-y-1">
          <Card.Title className="text-2xl">Login</Card.Title>
          <Card.Description>
            Coloque suas credenciais para ter acesso a plataforma
          </Card.Description>
        </Card.Header>
        <Card.Content className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@exemplo.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button
            className="w-full"
            onClick={() => login('b66f3403-befb-46ab-9dc1-08c1105dac06')}
          >
            Entrar
          </Button>
        </Card.Footer>
      </Card.Container>
    </div>
  );
};
