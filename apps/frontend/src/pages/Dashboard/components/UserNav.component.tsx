import { Avatar, Button, DropdownMenu } from '../../../components/ui';

export const UserNav: React.FC = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar.Root className="h-9 w-9">
            <Avatar.Image src="/avatars/03.png" alt="@shadcn" />
            <Avatar.Fallback>MP</Avatar.Fallback>
          </Avatar.Root>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56" align="end" forceMount>
        <DropdownMenu.Label className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">matheus poleza</p>
            <p className="text-xs leading-none text-muted-foreground">
              matheus.poleza@gmail.com
            </p>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            Perfil
            <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            Pagamento
            <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            Configurações
            <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          Sair
          <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
