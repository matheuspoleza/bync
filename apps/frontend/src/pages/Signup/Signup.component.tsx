import React from 'react';

import { Card, Label, Button, Input } from '../../components/ui';

export const SignupPage: React.FC = () => {
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
            <Input id="name" type="name" placeholder="Antônio Silva" />
          </div>

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
          <Button className="w-full" onClick={() => null}>
            Cadastrar
          </Button>
        </Card.Footer>
      </Card.Container>
    </div>
  );
};
