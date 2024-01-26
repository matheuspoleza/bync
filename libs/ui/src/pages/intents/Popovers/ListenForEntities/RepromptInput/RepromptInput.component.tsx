import { useState } from 'react';
import type { Descendant } from 'slate';

import { Box, SlateEditor } from '@/components';
import { useCreateConst, usePersistFunction } from '@/hooks';

interface IRepromptInput {
  plugins: SlateEditor.PluginsOptions;
  value: Descendant[];
}

export const RepromptInput: React.FC<IRepromptInput> = ({ plugins, value }) => {
  const editor = useCreateConst(() =>
    SlateEditor.createEditor([SlateEditor.PluginType.VARIABLE, SlateEditor.PluginType.SINGLE_LINE])
  );
  const [localValue, setLocalValue] = useState<Descendant[]>(value);

  const handleOnChange = usePersistFunction((value: Descendant[]) => {
    setLocalValue(value);
  });

  return (
    <Box>
      <SlateEditor.Component
        onValueChange={handleOnChange}
        value={localValue}
        editor={editor}
        pluginsOptions={plugins}
      />
    </Box>
  );
};
