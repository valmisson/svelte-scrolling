# svelte-smartscroll

[![npm](https://img.shields.io/npm/v/svelte-smartscroll.svg)](https://www.npmjs.com/package/svelte-smartscroll)
[![license](https://img.shields.io/github/license/valmisson/svelte-smartscroll.svg)](https://github.com/valmisson/svelte-smartscroll/blob/main/LICENSE)

A Svelte plugin for scroll to hash links with smooth animations

## Install
```bash
yarn add svelte-smartscroll
```

## Usage

```html
<!-- App.svelte -->
<script>
  import { scrollTo, scrollRef } from 'svelte-smartscroll'
</script>

<nav>
  <a use:scrollTo={'home'}>Home</a>
  <a use:scrollTo={'about'}>About</a>
  <a use:scrollTo={'blog'}>Blog</a>
</nav>

<section use:scrollRef={'home'}></section>
<section use:scrollRef={'about'}></section>
<section use:scrollRef={'blog'}></section>
```

## License
[MIT](LICENSE)

Copyright (c) 2021 Valmisson Grizorte
