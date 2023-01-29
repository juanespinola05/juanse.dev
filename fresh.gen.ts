// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from './deno.json' assert { type: 'json' };
import * as $0 from './routes/_404.tsx';
import * as $1 from './routes/api/blog/latest.ts';
import * as $2 from './routes/blog/[slug].tsx';
import * as $3 from './routes/blog/index.tsx';
import * as $4 from './routes/blog/page/[page].tsx';
import * as $5 from './routes/contacto.tsx';
import * as $6 from './routes/github.tsx';
import * as $7 from './routes/index.tsx';
import * as $8 from './routes/sitemap.xml.ts';
import * as $9 from './routes/sobre-mi.tsx';
import * as $10 from './routes/videos/index.tsx';
import * as $$0 from './islands/PostNavigations.tsx';
import * as $$1 from './islands/ScrollToTop.tsx';

const manifest = {
  routes: {
    './routes/_404.tsx': $0,
    './routes/api/blog/latest.ts': $1,
    './routes/blog/[slug].tsx': $2,
    './routes/blog/index.tsx': $3,
    './routes/blog/page/[page].tsx': $4,
    './routes/contacto.tsx': $5,
    './routes/github.tsx': $6,
    './routes/index.tsx': $7,
    './routes/sitemap.xml.ts': $8,
    './routes/sobre-mi.tsx': $9,
    './routes/videos/index.tsx': $10,
  },
  islands: {
    './islands/PostNavigations.tsx': $$0,
    './islands/ScrollToTop.tsx': $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
