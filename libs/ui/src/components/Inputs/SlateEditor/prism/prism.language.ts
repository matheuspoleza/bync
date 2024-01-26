import Prism from 'prismjs';

import { VF_MARKUP_GRAMMAR } from './grammars/markup.grammar';
import { PrismLanguage } from './prism.constant';

Prism.languages[PrismLanguage.VF_MARKUP] = VF_MARKUP_GRAMMAR;
